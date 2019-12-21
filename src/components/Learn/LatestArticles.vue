<template>
  <div class="host">
    <h1>Latest articles on Frontend</h1>
    <div class="articles">
      <article-strip
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
      />
    </div>
  </div>
</template>

<script>
import ArticleStrip from "@/components/Learn/ArticleStrip";
import learnService from "@/services/learn.service";

export default {
  components: { ArticleStrip },
  data() {
    return {
      articles: []
    };
  },
  created() {
    learnService.getLatestArticles().then(articles => {
      this.articles = articles;
    });
  }
};
</script>

<style scoped lang="scss">
.host {
  width: 100%;
}

.articles {
  margin: 20px 10px;
  text-align: left;
}

.article {
  margin-bottom: 40px;
}

.courtesy {
  font-size: 0.75rem;
  text-align: right;
}
</style>
