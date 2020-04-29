<template>
  <div class="host">
    <div
      v-infinite-scroll="loadArticles"
      infinite-scroll-disabled="isDisableInfiniteScroll"
      infinite-scroll-distance="limit"
    >
      <h1>
        <span>Latest talks & articles on Frontend</span>
        <button
          v-if="!showAddArticleDialog"
          @click="showDialog()"
        >
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
            @click="showDialog()"
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
      articles: [],
      showAddArticleDialog: false
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
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
    refreshPage() {
      this.showAddArticleDialog = false;
      this.loadArticles("refresh");
    },
    showDialog() {
      if (this.signedInUser == null) {
        this.$router.push("/signin");
      } else {
        this.showAddArticleDialog = true;
      }
    },
    loadArticles(action) {
      if (action === "refresh") {
        this.articles = [];
        action = 0;
        this.page = 1;
      }
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
</style>
