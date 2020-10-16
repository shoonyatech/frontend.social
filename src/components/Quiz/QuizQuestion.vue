<template>
  <div>
    <b-card>
      <h2>Timer: {{ countdown }}</h2>
      <h2>Question Number: {{ question.questionNo }}</h2>
      <div>
        <vue-markdown :source="questionUrl" />
      </div>
      <div v-if="countdown != 0">
        <h2>Options</h2>
        <div
          v-for="(option, index) in question.options"
          :key="index"
        >
          <div
            v-if="option.key == question.answer"
            class="option-container"
          >
            {{ option.value }}
          </div>
          <div
            v-else
            class="option"
          >
            {{ option.value }}
          </div>
        </div>
      </div>
    </b-card>
    <br>
    <b-card v-if="countdown == 0">
      <QuizQuestionResult :question-no="question.questionNo" />
    </b-card>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import QuizQuestionResult from '@/components/Quiz/QuizQuestionResult';

import quizService from '@/services/quiz.service';
export default {
	name: 'QuestionStrip',
	components: { VueMarkdown, QuizQuestionResult },
	props: {
		question: {
			type: Object,
			required: true,
		},
		quizId: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			countdown: null,
			questionUrl: '',
			text: '',
			answer: null,
			questionNo: null,
			runId: null,
		};
	},
	mounted() {
		this.runId = this.$route.params.runId;
		if (this.runId != null) {
			this.updateQuizRun(
				this.$route.params.id,
				this.runId,
				this.question.questionNo
			);
		}
		this.loadQuiz(this.$route.params.id);
		this.countdown = this.question.duration;
	},
	methods: {
		updateQuizRun(quizId, runId, currentQuestion) {
			quizService
				.updateQuizRun(quizId, runId, currentQuestion)
				.then((res) => {})
				.catch((e) => {});
		},
		loadQuiz(quizId) {
			quizService.getQuizById(quizId).then((res) => {
				fetch(this.question.questionUrl)
					.then((response) => response.text())
					.then((response) => {
						this.questionUrl = response;
						let timer = setInterval(() => {
							if (this.countdown > 0) {
								this.countdown--;
							} else {
								this.$emit('timeOver');
								clearInterval(timer);
							}
						}, 1000);
					});
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
