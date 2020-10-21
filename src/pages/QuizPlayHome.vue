<template>
  <div>
    <b-card>
      <h2>Quiz Run ID: {{ runId }}</h2>
      <span>
        <h2>Waiting for host to start quiz</h2>
      </span>
    </b-card>
  </div>
</template>

<script>
import quizService from '@/services/quiz.service';
export default {
	name: 'QuestionStrip',
	props: {},
	data() {
		return {
			runId: 0,
			quiz: {},
			currentQuestion: null,
			result: [],
			timer: 0,
		};
	},
	mounted() {
		this.runId = this.$route.params.runId;
		this.timer = setInterval(this.isActive, 500);
	},
	methods: {
		isActive() {
			quizService.getCurrentRunId(this.$route.params.id).then((res) => {
				if (res.isActive == true) {
					this.currentQuestion = res.currentQuestion;
					this.$router.push(
						`/quiz/${this.$route.params.id}/play/${this.runId}/${this.currentQuestion}`
					);
				}
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
