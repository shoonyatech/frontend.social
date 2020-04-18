  
<template>
  <div class="zoom-container">
    <iframe :src="zoomUrl" />
  </div>
</template>

<script>
export default {
  computed: {
    zoomUrl() {
      return `/zoom.html${window.location.search}`;
    },
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
.zoom-container {
  width: 80%;
  margin: 0 10%;
  height: 70vh;
  iframe {
    height: 100%;
    width: 100%;
  }
}
</style>