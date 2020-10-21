<template>
  <div>
    <h1>Final Results</h1>
    <br>
    <h3>Your Final Result : {{ points }}</h3>
    <br>
    <b-container>
      <h1>Winners Are</h1>
      <div
        v-for="(Result, index) in FinalResult"
        :key="index"
      >
        <ResultStrip
          :result="Result"
          :index="index"
        />
      </div>
    </b-container>
  </div>
</template>
<script>
import ResultStrip from '@/components/Quiz/ResultStrip';
import userService from '@/services/user.service';
import quizService from '@/services/quiz.service';
export default {
	name: 'QuizRunResult',
	components: {
		ResultStrip,
	},
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
h3 {
	background-color: rgb(52, 191, 238);
	font-size: 25px;
	text-align: center;
	color: white;
}
</style>
