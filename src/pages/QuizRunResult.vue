<template>
  <div>
    <h1>Final Results</h1>
    <br>
    <h3>Your Final Result : {{ points }}</h3>
    <br>
    <b-container>
      <h1>Winners Are</h1>
      <div>
        <ResultBar :result="FinalResult" />
      </div>
    </b-container>
  </div>
</template>
<script>
import userService from '@/services/user.service';
import quizService from '@/services/quiz.service';
import ResultBar from '@/components/Quiz/ResultBar';
export default {
	name: 'QuizRunResult',
	components: {
		ResultBar,
	},
	data() {
		return {
			runId: null,
			currentQuestion: 0,
			points: 0,
			Result: [],
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
					this.Result = result;
					result.map((re, index) => {
						if (index == 0) {
							this.FinalResult.splice(1, 0, {
								username: `${re.username}`,
								points: `${re.points}`,
							});
						}
						if (index == 1) {
							this.FinalResult.splice(0, 0, {
								username: `${re.username}`,
								points: `${re.points}`,
							});
						}
						if (index == 2) {
							this.FinalResult.splice(2, 0, {
								username: `${re.username}`,
								points: `${re.points}`,
							});
						}
					});
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

h3 {
	background-color: rgb(52, 191, 238);
	font-size: 25px;
	text-align: center;
	color: white;
}
</style>
