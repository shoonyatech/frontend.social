<template>
  <div>
    <h2>Results</h2>
    <QuizBar
      :result="result"
      :question-no="questionNo"
    />
    <br>
  </div>
</template>

<script>
import QuizBar from '@/components/Quiz/QuizBar';
import quizService from '@/services/quiz.service';
export default {
	name: 'QuestionResult',
	components: { QuizBar },
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

<style scoped lang="scss"></style>
