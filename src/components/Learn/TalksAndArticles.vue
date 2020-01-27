<template>
  <div class="host">
    <h1>
      <span>Latest talks & articles on Frontend</span><button @click="showAddArticleDialog = !showAddArticleDialog">
        + Add
      </button>
    </h1>
    <div
      v-if="!showAddArticleDialog"
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
      <div class="center-content">
        <button
          class="mt-4"
          @click="showAddArticleDialog = !showAddArticleDialog"
        >
          + Add more
        </button>
      </div>
    </div>
    <AddArticle
      v-else
      @close="refreshPage()"
    />
  </div>
</template>

<script>
import ArticleStrip from "@/components/Learn/ArticleStrip";
import AddArticle from "@/components/Learn/AddArticle";

import learnService from "@/services/learn.service";

export default {
  name: "TalksAndArticles",
  components: { ArticleStrip, AddArticle },
  props: {
    skill: {
      type: String,
      default: null,
      required: false
    }
  },
  data() {
    return {
      articles: [],
      showAddArticleDialog: false
    };
  },
  created() {
    learnService.getLatestArticles(this.skill).then(articles => {
      this.articles = articles;
    });
  },
  methods: {
    refreshPage() {
      this.showAddArticleDialog = false;
      learnService.getLatestArticles(this.skill).then(articles => {
        this.articles = articles;
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
