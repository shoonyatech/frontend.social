<template>
  <div class="host">
    <h1>Latest talks & articles on Frontend</h1>
    <div
      v-infinite-scroll="loadArticles"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="limit"
      class="articles"
    >
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
      page: 1,
      limit: 10,
      busy: false
    }
  },
  data() {
    return {
      articles: []
    };
  },
  created() {},
  methods: {
    loadArticles() {
      this.busy = false;
      this.limit = this.limit || 10;
      this.page = this.page || 1;
      learnService
        .getLatestArticles(this.skill, this.limit, this.page)
        .then(articles => {
          this.articles = this.articles.concat(articles);
          this.busy = true;
          if (articles.length > 0) {
            //incrementing value of page so it will point to next page
            ++this.page;
          }
        });
    }
  }
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
