<template>
  <div>
    <b-container>
      <h2>Quiz Run ID: {{ runId }}</h2>
      <h2>
        <a>{{ `http://localhost:8080/quiz/${quizId}/play/${runId}` }}</a>
      </h2>
      <span>
        <button @click="startQuiz">Start Quiz</button>
      </span>
    </b-container>
  </div>
</template>

<script>
import quizService from '@/services/quiz.service';
export default {
	name: 'QuizRunHome',
	props: {},
	data() {
		return {
			runId: 0,
			quizId: 0,
			currentQuestion: 0,
		};
	},
	mounted() {
		this.runId = this.$route.params.runId;
		this.quizId = this.$route.params.id;
	},
	methods: {
		startQuiz() {
			this.$router.push(
				`/quiz/${this.$route.params.id}/run/${this.runId}/${
					this.currentQuestion + 1
				}`
			);
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
