<template>
  <div>
    <div>
      <h1>Top Participants</h1>
      <ResultBar
        :result="topUser"
        :show-medal="false"
      />
    </div>
    <div>
      <h1>Results</h1>
      <QuizBar
        :result="result"
        :question-no="questionNo"
      />
      <br>
    </div>
  </div>
</template>

<script>
import QuizBar from '@/components/Quiz/QuizBar';
import quizService from '@/services/quiz.service';
import ResultBar from '@/components/Quiz/ResultBar';
export default {
	name: 'QuestionResult',
	components: { QuizBar, ResultBar },
	props: {
		questionNo: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			result: [],
			topUser: [],
			runId: null,
		};
	},
	mounted() {
		this.runId = this.$route.params.runId;
		if (this.questionNo != 0) {
			this.loadResult(this.runId, this.questionNo, this.$route.params.id);
			this.getPerQuizQuestionResults(
				this.runId,
				this.$route.params.id,
				this.questionNo
			);
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
		getPerQuizQuestionResults(runId, quizId, questionNo) {
			quizService
				.getPerQuizQuestionResults(quizId, runId, questionNo)
				.then((result) => {
					this.topUser = result;
				});
		},
	},
};
</script>

<style scoped lang="scss"></style>
