<template>
  <div class="host">
    <h1>
      Latest talks & articles on Frontend
      <!-- <span v-if="!infiniteScroll" class="navigation-button">
        <button :disabled="articles.length === 0" @click="loadArticles(1)">Next</button>
        <button :disabled="page === 1" @click="loadArticles(-1)">Previous</button>
      </span> -->
    </h1>

    <div
      v-infinite-scroll="loadArticles"
      infinite-scroll-disabled="isDisableInfiniteScroll"
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
      required: false
    },
    infiniteScroll: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      articles: []
    };
  },
  computed: {
    isDisableInfiniteScroll() {
      return !this.infiniteScroll || this.busy;
    }
  },
  created() {
    if (!this.infiniteScroll) {
      this.loadArticles();
    }
  },
  methods: {
    loadArticles(action) {
      this.busy = false;
      this.limit = this.limit || 10;
      this.page = action + this.page || this.page || 1;

      learnService
        .getLatestArticles(this.skill, this.limit, this.page)
        .then(articles => {
          if (!this.infiniteScroll) {
            this.articles = articles;
          } else {
            this.articles = this.articles.concat(articles);
            if (articles.length > 0) {
              ++this.page;
            }
          }
          this.busy = true;
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

.navigation-button {
  float: right;
}
</style>
