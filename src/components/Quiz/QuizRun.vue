<template>
  <div>
    <b-card>
      <div>
        <vue-markdown :source="questionUrl" />
      </div>

      <h2>Options</h2>
      <div
        v-for="(option, index) in clicked.options"
        :key="index"
      >
        <div class="option-container">
          {{ option.key }}|{{ option.value }}
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
	name: 'QuizRun',
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
		duration: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			showSection: false,
			questionUrl: '',
			text: '',
			clicked: {},
			answer: null,
		};
	},
	mounted() {
		this.loadQuiz(this.$route.params.id);
		this.clicked = { ...this.$props.question, clicked: false };
	},
	methods: {
		loadQuiz(quizId) {
			quizService.getQuizById(quizId).then((res) => {
				fetch(this.question.questionUrl)
					.then((response) => response.text())
					.then((response) => (this.questionUrl = response));
			});
			this.timer();
		},
		timer() {
			setTimeout(this.next, this.question.duration * 1000);
		},
		next() {
			this.$router.push(`/quiz/${this.$route.params.id}/run/details/result`);
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
	background-color: rgb(48, 190, 238);
	color: white;
}
.option-container:hover {
	border-style: solid;
	padding: 10px;
	border-color: #dfdfdf;
	border-width: 1px;
	margin-bottom: 1px;
	background-color: black;
	color: white;
	cursor: pointer;
}
</style>
