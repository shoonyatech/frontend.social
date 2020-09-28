<template>
  <div class="layout">
    <div class="article-strip">
      <b-row>
        <b-col sm="8">
          <a :href="article.url">
            <span>{{ article.title }}</span>
          </a>
          <span class="article-author"> by {{ article.author }}</span>
        </b-col>
        <b-col sm="4">
          <span
            v-if="article.type"
            class="article-type capsule"
          >
            {{ article.type }}</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="8">
          <SkillTags
            v-if="article.relatedSkills"
            :skills="article.relatedSkills"
          />
        </b-col>
        <b-col sm="4">
          <div class="links icon-links">
            <icon-link
              v-if="article.medium === 'blog'"
              icon="/images/web.svg"
              :url="article.url"
            />
            <icon-link
              v-if="article.medium === 'video'"
              icon="/images/youtube.svg"
              :url="article.url"
            />
            <icon-link
              v-if="article.medium === 'podcast'"
              icon="/images/podcast.svg"
              :url="article.url"
            />
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12">
          <div class="article-description">
            <span>{{ article.description }}</span>
          </div>
          <div class="courtesy">
            Courtesy:
            <a
              name="courtesy"
              :href="article.courtesyUrl"
              target="_blank"
              rel="noopener"
            >{{ article.courtesy }}</a>
          </div>
          <div class="tags">
            Tags:
            {{ article.tags.join(', ') }}
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import IconLink from '@/components/common/IconLink';
import SkillTags from '@/components/Skills/SkillTags';

export default {
	components: {
		IconLink,
		SkillTags,
	},
	props: {
		article: {
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

.article-strip {
	flex: 0 1 auto;
	font-size: 0.9rem;
	margin: 10px;
	width: 95%;
	position: relative;
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
	display: flex;
	flex-direction: row-reverse;
}

.article-author {
	font-size: 0.65rem;
}

.article-description {
	font-size: 0.8rem;
}

.courtesy,
.tags {
	font-size: 0.65rem;
}
</style>
