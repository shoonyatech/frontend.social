<template>
  <div>
    <b-card>
      <h2>Question Number: {{ question.questionNo }}</h2>
      <div>
        <vue-markdown :source="questionUrl" />
      </div>

      <h2>Options</h2>
      <div
        v-for="(option, index) in question.options"
        :key="index"
      >
        <div
          v-if="option.key == question.answer"
          class="option-container"
        >
          {{ option.value }}
        </div>
        <div
          v-else
          class="option"
        >
          {{ option.value }}
        </div>
      </div>
    </b-card>
    <br>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';

import quizService from '@/services/quiz.service';
export default {
	name: 'AllQuestionStrip',
	components: { VueMarkdown },
	props: {
		question: {
			type: Object,
			required: true,
		},
		quizId: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			questionUrl: '',
		};
	},
	mounted() {
		console.log(this.question.questionNo);
		this.loadQuiz(this.$route.params.id);
	},
	methods: {
		loadQuiz(quizId) {
			quizService.getQuizById(quizId).then((res) => {
				fetch(this.question.questionUrl)
					.then((response) => response.text())
					.then((response) => {
						this.questionUrl = response;
					});
			});
		},
	},
};
</script>

<style scoped lang="scss">
/* style for course thumbnail */

.option-container {
	border-style: solid;
	padding: 10px;
	border-color: #dfdfdf;
	border-width: 1px;
	margin-bottom: 1px;
	background-color: rgb(47, 255, 47);
	color: black;
}
.option {
	border-style: solid;
	padding: 10px;
	border-color: #dfdfdf;
	border-width: 1px;
	margin-bottom: 1px;
	background-color: white;
	color: black;
}
</style>
