<template>
  <div>
    <b-card>
      <div
        v-if="countdown > 5"
        class="timer"
      >
        {{ countdown }}
      </div>
      <div
        v-else
        class="timerRed"
      >
        {{ countdown }}
      </div>
      <h2>Question Number: {{ question.questionNo }}</h2>
      <div v-if="countdown != 0">
        <vue-markdown :source="questionUrl" />
      </div>
      <div>
        <b-card v-if="countdown == 0">
          <QuizQuestionResult :question-no="question.questionNo" />
        </b-card>
      </div>
      <div>
        <h2>Options</h2>
        <QuestionOptions
          :options="question.options"
          :answer="question.answer"
          :show-answer="true"
          :submit-answers="false"
        />

        <br>
      </div>
      <div
        v-if="countdown == 0"
        class="markdown"
      >
        <vue-markdown :source="questionUrl" />
      </div>
    </b-card>
    <br>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import QuizQuestionResult from '@/components/Quiz/QuizQuestionResult';

import QuestionOptions from '@/components/Quiz/QuestionOptions';
import quizService from '@/services/quiz.service';
export default {
	name: 'QuestionStrip',
	components: { VueMarkdown, QuizQuestionResult, QuestionOptions },
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
.markdown {
	margin-top: 200px;
}
.float-child {
	width: 50%;
	border-style: solid;
	padding: 10px;
	border-color: #dfdfdf;
	border-width: 1px;
	color: black;
	float: left;
}
.timer {
	height: 60px;
	width: 60px;
	border-radius: 50%;
	background-color: purple;
	color: white;
	font-size: 40px;
	text-align: center;
}
.timerRed {
	height: 60px;
	width: 60px;
	border-radius: 50%;
	background-color: red;
	color: white;
	font-size: 40px;
	text-align: center;
}
</style>
