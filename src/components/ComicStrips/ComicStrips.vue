<template>
  <div class="comic-box">
    <h1>Frontend City Comic</h1>
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
    <div class="twitter-handle">
      <span class="created-by">Created by</span>
      <a
        class="link"
        href="https://twitter.com/FrontendCity"
        target="_blank"
      >
        <img src="/images/twitter.svg">
        <span>@FrontendCity</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComicStrips",
  data() {
    return {
      images: [
        "/images/comics/Page-01.jpg",
        "/images/comics/Page-02.jpg",
        "/images/comics/Page-03.jpg",
        "/images/comics/Page-04.jpg",
      ],
    };
  },
  methods: {
    onClick() {
      window.open("https://twitter.com/FrontendCity", "_blank");
    },
  },
};
</script>
<style scoped lang="scss">
.comic-box {
  margin-top: 70px;
}

.twitter-handle {
  margin-top: 30px;
  margin-right: 10px;
  display: flex;
  justify-content: flex-end;
  img {
    height: 20px;
    width: 20px;
  }
}
.link {
  color: #1d8db1 !important;
  cursor: pointer;
  font-size: 0.65rem;
}
.created-by {
  font-size: 0.65rem;
  margin-right: 10px;
}
</style>
<style lang="scss">
.carousel-indicators {
  bottom: -40px !important;
  li {
    background-color: black;
    opacity: 0.2;
  }
}
</style>
