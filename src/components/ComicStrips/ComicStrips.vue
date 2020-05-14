<template>
  <div class="comic-box">
    <span class="label">Frontend City Comic</span>
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
        @click.native="onClick"
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
  },
  methods: {
    onClick() {
      window.open('https://twitter.com/FrontendCity', '_blank')
    }
  }
};
</script>
<style scoped lang="scss">
.comic-box {
  border: 2px solid #114273;
  margin: 0 auto;
  padding-bottom: 5px;
  text-align: center;
  margin-top: 10px;
}

.label {
  background: #114273;
  color: #fff;
  border: none;
  padding: 4px;
  margin-bottom: 12px;
  width: 100%;
  display: inline-block;
}
</style>
