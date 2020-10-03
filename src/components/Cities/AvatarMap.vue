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
      />
    </b-col>
  </b-container>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

export default {
	name: 'AvatarMap',
	data: () => ({
		map: null,
	}),

	mounted() {
		const baseLayer = L.tileLayer(
			'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			{
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			}
		);

		(this.map = L.map('map', {
			center: [37.7749, -122.4194],
			zoom: 13,
			layers: [baseLayer],
		})),
			this.getLocation()
				.then((position) => {
					console.log(position);
					this.map.setView({
						lon: position.coords.longitude,
						lat: position.coords.latitude,
					});
				})
				.catch((error) => console.log(error))
				.finally(() => console.log('Ended'));
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
	},
};
</script>

<style lang="scss" scoped>
.avatar-map {
	height: 300px;
	border: solid 2px #114273;
}
</style>
