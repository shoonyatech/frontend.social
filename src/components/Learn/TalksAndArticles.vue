<template>
  <div class="articles">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col md="9">
          <h1>
            <span>Latest talks & articles on Frontend</span>
            <button @click="showDialog()">
              + Add
            </button>
          </h1>
          <div>
            <div
              v-infinite-scroll="loadArticles"
              infinite-scroll-disabled="isDisableInfiniteScroll"
              infinite-scroll-distance="limit"
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
          <div class="center-content">
            <button
              class="mt-4"
              @click="showDialog()"
            >
              + Add more
            </button>
          </div>
          <div class="host" />
        </b-col>
        <b-col md="3">
          <div class="filters-wrapper">
            <LearnFilter :on-search-params-change="onSearchParamsChange" />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ArticleStrip from "@/components/Learn/ArticleStrip";
import LearnFilter from "@/components/Learn/LearnFilter";
import learnService from "@/services/learn.service";

export default {
  name: "TalksAndArticles",
  components: {
    ArticleStrip,
    LearnFilter,
  },
  props: {},
  data() {
    return {
      articles: [],
      showAddArticleDialog: false,
      loading: false,
      page: 1,
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
    isDisableInfiniteScroll() {
      return !this.busy;
    },
  },
  created() {
    if (!this.infiniteScroll) {
      this.loadArticles();
    }
  },
  methods: {
    onSearchParamsChange(param = "") {
      this.loading = true;
      this.loadArticles(param, true);
    },
    showDialog() {
      if (this.signedInUser == null) {
        this.$router.push("/signin");
      } else {
        this.$router.push("/article/form/new");
      }
    },
    loadArticles(param = "", filter = false) {
      let query = "";
      this.busy = false;
      this.limit = this.limit || 10;
      this.page = filter ? 1 : this.page || 1;
      learnService
        .getLatestArticles(param, this.limit, this.page)
        .then((articles) => {
          if (filter) {
            this.articles = articles;
          } else this.articles = this.articles.concat(articles);

          if (!this.infiniteScroll) {
            this.articles = articles;
          } else {
            this.articles = this.articles.concat(articles);
            if (articles.length > 0) {
              ++this.page;
            }
          }
          this.loading = false;
          this.busy = true;
        });
    },
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
