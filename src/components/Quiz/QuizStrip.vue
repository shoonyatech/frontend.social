<template>
  <div class="layout">
    <div class="quiz-strip">
      <b-row>
        <b-col sm="8">
          <router-link :to="'../quiz/' + quiz._id">
            <span>{{ quiz.title }}</span>
          </router-link>
          <div>
            <span
              v-if="canModify"
              class="event-action"
              @click.prevent="editQuiz(quiz)"
            >
              <img
                :src="`/images/edit.svg`"
                class="icon-button"
                alt="edit"
              >
            </span>
            <span
              v-if="canModify"
              class="event-action"
              @click.prevent="deleteQuiz(quiz)"
            >
              <img
                :src="`/images/delete.svg`"
                class="icon-button"
                alt="delete"
              >
            </span>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="8">
          <SkillTags
            v-if="quiz.relatedSkills"
            :skills="quiz.relatedSkills"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import SkillTags from '@/components/Skills/SkillTags';

export default {
	name: 'QuizStrip',
	components: {
		SkillTags,
	},
	props: {
		quiz: {
			type: Object,
			default: () => {},
		},
		canModify: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		deleteQuiz(quiz) {
			this.$emit('delete', quiz);
		},
		editQuiz(quiz) {
			this.$emit('edit', quiz);
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

.quiz-strip {
	flex: 0 1 auto;
	font-size: 0.9rem;
	margin: 10px;
	width: 95%;
	position: relative;
	padding-bottom: 10px;
	margin-right: 20px;
}

.quiz-line {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.quiz-type {
	font-size: 0.65rem;
	float: right;
}

.quiz-skills {
	font-size: 0.65rem;
	color: #2c3e50;
}

.quiz-date {
	font-size: 0.65rem;
	color: #2c3e50;
}

.icon-links {
	display: flex;
	flex-direction: row-reverse;
}

.quiz-author {
	font-size: 0.65rem;
}

.quiz-description {
	font-size: 0.8rem;
}

.tags {
	font-size: 0.65rem;
}
</style>
