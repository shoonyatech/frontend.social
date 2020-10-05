<template>
  <b-container>
    <b-col
      sm="12"
      md="12"
      lg="12"
      xl="12"
    >
      <div
        id="map"
        class="avatar-map"
      >
        <div
          v-if="isLoading"
          class="avatar-map__loader"
        >
          <div class="spinner" />
        </div>
      </div>
    </b-col>
  </b-container>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet-geocoder';
import usersService from '@/services/user.service';
import { GestureHandling } from 'leaflet-gesture-handling';
import { groupBy } from '@/utilities/utils';
import { Countries } from '@/constants/countries.js';
import EventBus from '@/utilities/eventBus.js';
import { ToastType, messages } from '@/constants/constants';

export default {
	name: 'AvatarMap',
	data: () => ({
		map: null,
		users: null,
		isLoading: false,
		countryCode: null,
		baseLayer: L.tileLayer(
			'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
			{
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
				subdomains: 'abcd',
				maxZoom: 19,
			}
		),
		markers: L.featureGroup(),
	}),

	async mounted() {
		L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling);
		this.map = L.map('map', {
			center: [37.7749, -122.4194],
			zoom: 13,
			layers: [this.baseLayer, this.markers],
			gestureHandling: true,
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
						console.error('Something went wrong', { error });
						return;
					}
					this.countryCode = result.address.CountryCode.substring(0, 2);
				});
		} catch (error) {
			console.error('Something went wrong', { error });
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

				if (locatedUsers.length === 0) {
					console.log('There are no developers in your area');
					EventBus.$emit('show-toast', {
						type: ToastType.ERROR,
						title: messages.generic.error,
						body: messages.cities.userErrorBody,
					});
					this.isLoading = false;
					return;
				}

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
								console.error('Something went wrong', { error });
								return;
							}
							const resultsLength = result.results.length;
							const randomItem = Math.floor(Math.random() * resultsLength);
							let latLng = result.results[randomItem].latlng;
							const icon = L.icon({
								iconUrl: user.profilePic,
								iconSize: [25, 25], // size of the icon
							});
							const marker = L.marker(latLng, { icon })
								.bindPopup(`<a href="/user/${user.username}">${user.name}</a>`)
								.addTo(this.markers);
						});
				}
				this.isLoading = false;
			} catch (error) {
				this.isLoading = false;
				console.error('Something went wrong', { error });
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.theme-dark {
	.avatar-map {
		border: solid 2px #b8daff;
	}
}

.avatar-map {
	height: 350px;
	border: solid 2px #114273;

	.avatar-map__loader {
		z-index: 1010;
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.spinner {
			width: 40px;
			height: 40px;
			background-color: #114273;

			margin: 100px auto;
			-webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
			animation: sk-rotateplane 1.2s infinite ease-in-out;
		}
	}
}

@-webkit-keyframes sk-rotateplane {
	0% {
		-webkit-transform: perspective(120px);
	}
	50% {
		-webkit-transform: perspective(120px) rotateY(180deg);
	}
	100% {
		-webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg);
	}
}

@keyframes sk-rotateplane {
	0% {
		transform: perspective(120px) rotateX(0deg) rotateY(0deg);
		-webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
	}
	50% {
		transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
		-webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
	}
	100% {
		transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
		-webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
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
	border: solid 2px #114273;
	border-radius: 0;
	.leaflet-popup-content {
		font-family: 'Consolas', 'Inconsolata', monospace;
		font-size: 1em;
		font-weight: 400;
		line-height: 1;
	}
}
</style>
