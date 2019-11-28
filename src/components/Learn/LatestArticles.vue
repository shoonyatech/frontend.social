<template>
  <div class="host">
    <h1>Latest articles on Frontend</h1>
    <div class="articles">
      <a
        v-for="article in articles"
        :key="article.url"
        :href="article.url"
      >{{
        article.title
      }}</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: []
    };
  }
};
</script>

<style scoped>
.host {
  width: 100%;
}

.articles {
  margin: 0 10px;
}
</style>
