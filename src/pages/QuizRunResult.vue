<template>
  <div>
    <h1>Final Results</h1>
    <span>
      <button @click="endQuiz()">Finish</button>
    </span>
  </div>
</template>
<script>
import quizService from '@/services/quiz.service';
export default {
	name: 'QuizRunResult',
	data() {
		return {
			runId: null,
			currentQuestion: 0,
		};
	},
	mounted() {
		this.runId = quizService.getRunId();
		this.updateQuizRun();
	},
	methods: {
		endQuiz() {
			console.log('click');
		},
		updateQuizRun() {
			quizService
				.updateQuizRun(this.$route.params.id, this.runId, this.currentQuestion)
				.then((res) => {})
				.catch((e) => {});
		},
	},
};
</script>
<style></style>
