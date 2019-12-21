<template>
  <div class="layout">
    <div class="article-strip">
      <a :href="article.url">
        <span>{{ article.title }}</span>
      </a>
      <span class="article-author"> by {{ article.author }}</span>
      <div class="article-details">
        <span>{{ article.details }}</span>
      </div>
      <div class="article-skills">
        {{ article.relatedSkills.join(", ") }}
      </div>
      <div class="courtesy">
        Courtesy: {{ article.courtesy }}
      </div>
    </div>
    <div class="links icon-links">
      <icon-link
        v-if="article.type === 'blog'"
        icon="/images/web.svg"
        :url="article.url"
      />
      <icon-link
        v-if="article.type === 'talk'"
        icon="/images/youtube.svg"
        :url="article.url"
      />
      <icon-link
        v-if="article.type === 'video'"
        icon="/images/youtube.svg"
        :url="article.url"
      />
      <icon-link
        v-if="article.type === 'podcast'"
        icon="/images/podcast.svg"
        :url="article.url"
      />
    </div>
  </div>
</template>

<script>
import IconLink from "@/components/common/IconLink";

export default {
  components: {
    IconLink
  },
  props: {
    article: {
      type: Object
    }
  },
  created() {
    console.log(this.article);
  }
};
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: row;
}

.article-strip {
  flex: 0 1 auto;
  font-size: 0.9rem;
  margin: 10px;
  width: 95%;
  position: relative;
  border-bottom: dotted 1px #aada20;
  padding-bottom: 10px;
  margin-right: 20px;
}

.article-line {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.article-type {
  font-size: 0.65rem;
  color: #2c3e50;
  float: right;
}

.article-skills {
  font-size: 0.65rem;
  color: #2c3e50;
}

.article-date {
  font-size: 0.65rem;
  color: #2c3e50;
}

.icon-links {
  margin-top: 10px;
}

.article-author {
  font-size: 0.65rem;
}

.article-details {
  font-size: 0.65rem;
}

.courtesy {
  font-size: 0.65rem;
}
</style>
