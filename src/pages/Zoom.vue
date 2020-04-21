  
<template>
  <div class="zoom-container">
    <iframe :src="zoomUrl" />
  </div>
</template>

<script>
export default {
  computed: {
    zoomUrl() {
      return `/jitsi.html${window.location.search}`;
    },
    signedInUser() {
      return this.$store.state.signedInUser;
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.signedInUser == null) {
        this.$router.push("/signin");
        return;
      }
    }, 1000)
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