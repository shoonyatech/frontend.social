  
<template>
  <div class="zoom-container">
    <iframe
      ref="frame"
      :src="zoomUrl"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      meetingId: this.$route.query.id,
      meetingPasword: this.$route.query.password,
      nickName: this.$route.query.name,
    }
  },
  computed: {
    zoomUrl() {
      return `/zoom.html${window.location.search}`;
    },
  },
  mounted() {
    setTimeout(() => {
    
    }, 3000);
    const iframe = this.$refs.fra

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