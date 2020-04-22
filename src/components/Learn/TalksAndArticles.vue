<template>
  <div class="host">
    <h1>
      <span>Latest talks & articles on Frontend</span><button
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
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    }
  },
  created() {
    this.$parent.loading = true;
    learnService.getLatestArticles(this.skill).then(articles => {
      this.articles = articles;
      this.$parent.loading = false;
    });
  },
  methods: {
    refreshPage() {
      this.$parent.loading = true;
      this.showAddArticleDialog = false;
      learnService.getLatestArticles(this.skill).then(articles => {
        this.articles = articles;
        this.$parent.loading = false;
      });
    },
    showDialog() {
      if (this.signedInUser == null) {
        this.$router.push("/signin");
      } else {
        this.showAddArticleDialog = true;
      }
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
