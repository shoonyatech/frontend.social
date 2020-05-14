<template>
  <div>
    <b-carousel
      fade
      indicators
      img-width="800"
      img-height="1000"
    >
      <b-carousel-slide
        v-for="(image, index) in images"
        :key="index"
        :img-src="image"
      />
    </b-carousel>
  </div>
</template>

<script>

export default {
  name: 'ComicStrips',
  data() {
    return {
      images: [
        '/images/comics/Page-01.jpg',
        '/images/comics/Page-02.jpg',
        '/images/comics/Page-03.jpg',
        '/images/comics/Page-04.jpg',]
    }
  }
};
</script>
<style scoped lang="scss">

</style>
