<template>
  <div class="host">
    <h1>Latest articles on Frontend</h1>
    <div class="articles">
      <div
        v-for="article in articles"
        :key="article.url"
        class="article"
      >
        <div>
          <a
            :href="article.url"
            target="_blank"
          >{{ article.title }}</a>
          <span> by {{ article.author }}</span>
        </div>
        <div>{{ article.details }}</div>
        <div class="courtesy">
          courtesy {{ article.courtesy }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import learnService from "@/services/learn.service";

export default {
  data() {
    return {
      articles: []
    };
  },
  created() {
    learnService.getLatestArticles().then(response => {
      this.articles = response.data;
    });
  }
};
</script>

<style scoped>
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
