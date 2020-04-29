<template>
  <div class="host">
    <h1>Latest talks & articles on Frontend</h1>
    <div class="articles">
      <div v-if="articles.length">
        <article-strip
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        />
      </div>
      <div v-else>
        No articles found!
      </div>
    </div>
  </div>
</template>

<script>
import ArticleStrip from "@/components/Learn/ArticleStrip";
import learnService from "@/services/learn.service";

export default {
  components: { ArticleStrip },
  props: {
    skill: {
      type: String,
      default: null,
      required: false,
    },
  },
  data() {
    return {
      articles: [],
    };
  },
  created() {
    setTimeout(() => {
      learnService.getLatestArticles(this.skill).then((articles) => {
        this.articles = articles;
      });
    }, 500);
  },
};
</script>

<style scoped lang="scss">
.host {
  width: 100%;
  margin-bottom: 2.5rem;
}

.articles {
  margin: 20px 10px;
  text-align: left;
  width: 100%;
}

.article {
  margin-bottom: 40px;
}

.courtesy {
  font-size: 0.75rem;
  text-align: right;
}
</style>
