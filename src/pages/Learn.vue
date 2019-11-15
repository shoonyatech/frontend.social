<template>
  <div class="learn">
    <b-container>
      <b-row>
        <h1>Latest articles on Frontend</h1>
        <div class="articles">
          <a
            v-for="article in articles"
            :key="article.url"
            :href="article.url"
          >{{ article.title }}</a>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Learn",
  components: {},
  data() {
    return {
      articles: []
    };
  },
  created() {},
  methods: {}
};
</script>


<style scoped>
.articles {
  margin: 0 10px;
}
</style>