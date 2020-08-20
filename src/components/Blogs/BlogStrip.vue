<template>
  <div class="layout">
    <div class="blog-strip">
      <b-row>
        <b-col sm="8">
          <a :href="blog.url">
            <span>{{ blog.title }}</span>
          </a>
          <span class="blog-author"> by {{ blog.author }}</span>
        </b-col>
        <b-col sm="4">
          <span
            v-if="blog.type"
            class="blog-type capsule"
          > {{ blog.type }}</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="8">
          <SkillTags
            v-if="blog.relatedSkills"
            :skills="blog.relatedSkills"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12">
          <div class="blog-description">
            <span>{{ blog.description }}</span>
          </div>
          <div class="courtesy">
            Courtesy:
            <a
              name="courtesy"
              :href="blog.courtesyUrl"
              target="_blank"
              rel="noopener"
            >{{ blog.courtesy }}</a>
          </div>
          <div class="tags">
            Tags:
            {{ blog.tags.join(", ") }}
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import SkillTags from "@/components/Skills/SkillTags";

export default {
  name: "BlogStrip",
  components: {
    SkillTags,
  },
  props: {
    blog: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: columns;
  border-bottom: dotted 1px #114273;
}

.blog-strip {
  flex: 0 1 auto;
  font-size: 0.9rem;
  margin: 10px;
  width: 95%;
  position: relative;
  padding-bottom: 10px;
  margin-right: 20px;
}

.blog-line {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.blog-type {
  font-size: 0.65rem;
  float: right;
}

.blog-skills {
  font-size: 0.65rem;
  color: #2c3e50;
}

.blog-date {
  font-size: 0.65rem;
  color: #2c3e50;
}

.icon-links {
  display: flex;
  flex-direction: row-reverse;
}

.blog-author {
  font-size: 0.65rem;
}

.blog-description {
  font-size: 0.8rem;
}

.courtesy,
.tags {
  font-size: 0.65rem;
}
</style>
