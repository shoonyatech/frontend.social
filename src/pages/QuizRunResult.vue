<template>
  <div>
    <h3>Final Results</h3>
    <h3>Your Final Result : {{ points }}</h3>
    <br>
    <b-container>
      <h1>Winners Are</h1>
      <div
        v-for="(Result, index) in FinalResult"
        :key="index"
      >
        <b-card>
          <h2>{{ index + 1 }} is</h2>
          <h1>{{ Result.username }} with {{ Result.points }}</h1>
        </b-card>
      </div>
    </b-container>
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
			points: 0,
			FinalResult: [],
		};
	},
	mounted() {
		this.runId = this.$route.params.runId;
		this.getResult();
		this.getFinalResults();
		this.updateQuizRun();
	},
	methods: {
		getFinalResults() {
			quizService
				.getFinalQuizResults(this.$route.params.id, this.$route.params.runId)
				.then((result) => {
					this.FinalResult = result;
				})
				.catch((e) => {});
		},
		getResult() {
			quizService
				.getUserResult(
					this.$route.params.id,
					this.$route.params.runId,
					this.$store.state.signedInUser.username
				)
				.then((result) => {
					this.points = result.points;
				})
				.catch((e) => {});
		},
		updateQuizRun() {
			quizService
				.updateQuizRun(
					this.$route.params.id,
					this.$route.params.runId,
					this.currentQuestion
				)
				.then((res) => {})
				.catch((e) => {});
		},
	},
};
</script>
<style>
h1 {
	text-align: center;
}
h2 {
	text-align: center;
}
</style>
