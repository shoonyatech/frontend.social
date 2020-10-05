<template>
	<b-container>
		<b-col sm="12" md="12" lg="12" xl="12">
			<div id="map" class="avatar-map">
				<div v-if="isLoading" class="avatar-map__loader">Loading...</div>
			</div>
		</b-col>
	</b-container>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet-geocoder';
import usersService from '@/services/user.service';
import { groupBy } from '@/utilities/utils';
import { Countries } from '@/constants/countries.js';

export default {
	name: 'AvatarMap',
	data: () => ({
		map: null,
		users: null,
		isLoading: false,
		countryCode: null,
		baseLayer: L.tileLayer(
			'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			{
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			}
		),
		markers: L.featureGroup(),
	}),

	async mounted() {
		this.map = L.map('map', {
			center: [37.7749, -122.4194],
			zoom: 13,
			layers: [this.baseLayer, this.markers],
		});

		try {
			const { coords } = await this.getLocation();

			// Sets the center of the map in user's current location
			this.map.setView(
				{
					lat: coords.latitude,
					lon: coords.longitude,
				},
				8
			);

			// Gets the current country code based on user's location
			esri
				.geocodeService()
				.reverse()
				.latlng([coords.latitude, coords.longitude])
				.run((error, result) => {
					if (error) {
						console.log(error);
						return;
					}
					this.countryCode = 'IN'; // result.address.CountryCode.substring(0, 2);
				});
		} catch (error) {
			console.log('getLocation()', error);
		}

		this.getUsers();
	},
	methods: {
		getLocation() {
			return new Promise((resolve, reject) => {
				// Check if browser supporst geolocation
				if (!('geolocation' in navigator))
					reject('Geolocation is not available.');

				// Get current position
				navigator.geolocation.getCurrentPosition(
					(position) => resolve(position),
					(error) => reject(error.message)
				);
			});
		},

		async getUsers() {
			try {
				this.isLoading = true;
				this.users = await usersService.getAllUsers();
				const notLocatedUsers = this.users.filter((u) => !u.country && !u.city);
				const locatedUsers = this.users.filter(
					(u) => u.country === this.countryCode
				);

				for await (let user of locatedUsers) {
					let countryName = user.country
						? Countries.find((c) => c.value === user.country).text
						: null;
					let city = user.city;
					let address =
						countryName && city
							? `${city}, ${countryName}`
							: countryName && !city
							? countryName
							: !countryName && city
							? city
							: '';

					await esri
						.geocode()
						.text(address)
						.run((error, result) => {
							if (error) {
								console.log('esri.geocode()', error);
								return;
							}
							const latLng = result.results[0].latlng;
							const icon = L.icon({
								iconUrl: user.profilePic,
								iconSize: [25, 25], // size of the icon
							});
							const marker = L.marker(latLng, { icon })
								.bindPopup(
									`<a href="/user/${user.username}" class="avatar-link">${user.name}</a>`
								)
								.addTo(this.markers);
						});
				}
				this.isLoading = false;
			} catch (error) {
				this.isLoading = false;
				console.log('getUsers()', error);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.avatar-map {
	height: 450px;
	border: solid 2px #114273;

	.avatar-map__loader {
		z-index: 1010;
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>

<style lang="scss">
.leaflet-marker-icon {
	border: solid 2px #114273;
	border-radius: 50%;
}

.leaflet-popup-content-wrapper {
	min-width: fit-content;
	background: #114273;
	color: #ffffff;
	.leaflet-popup-content {
		font-family: 'Consolas', 'Inconsolata', monospace;
		font-size: 0.7;
		font-weight: 400;
		line-height: 1;
	}
}

.leaflet-popup-tip {
	background: #114273;
}

.leaflet-container a {
	color: #ffffff !important;
}
</style>
