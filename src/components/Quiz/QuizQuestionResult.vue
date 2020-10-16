<template>
  <div>
    <h2>Results</h2>
    <div
      v-for="(option, index) in result"
      :key="index"
      class="option"
    >
      Users Who asnwered {{ option.key }} option: {{ option.length }}
    </div>
    <br>
  </div>
</template>

<script>
import quizService from '@/services/quiz.service';
export default {
	name: 'QuestionResult',
	components: {},
	props: {
		questionNo: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			result: {},
			runId: null,
		};
	},
	mounted() {
		this.runId = this.$route.params.runId;
		if (this.questionNo != 0) {
			this.loadResult(this.runId, this.questionNo, this.$route.params.id);
		}
	},
	methods: {
		loadResult(runId, questionNo, quizId) {
			quizService
				.getQuestionResult(runId, questionNo, quizId)
				.then((result) => {
					this.result = result;
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
