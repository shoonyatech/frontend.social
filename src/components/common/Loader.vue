<template>
  <div class="loader">
    <h3 class="loading-message" />
  </div>
</template>

<script>
export default {
	name: 'Loader',
};
</script>

<style scoped>
.loader {
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: #fff;
	z-index: 100;
	top: 0;
	left: 0;
	opacity: 0.7;
	background-repeat: no-repeat;
	background-position: center center;
	background-image: url('../../../public/images/loader.gif');
}
.loading-message {
	position: fixed;
	width: 100%;
	top: calc(50% + 20px);
	text-align: center;
}
</style>
