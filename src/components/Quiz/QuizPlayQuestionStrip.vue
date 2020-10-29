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
        <div v-html="question.questionText">
          <br>
        </div>
        <div class="image">
          <img :src="question.questionImage">
        </div>
      </div>
      <div v-if="countdown != 0">
        <QuestionOptions
          :options="question.options"
          :answer="answer"
          :show-answer="false"
          :submit-answers="true"
          @sendSelected="submitAnswer"
        />
      </div>
    </b-card>
    <br>
    <b-card v-if="countdown == 0">
      <div
        v-show="elementVisible"
        class="answer"
      >
        <span
          v-if="selectedAnswer == ''"
          class="notSelected"
        >No option selected</span>
        <span v-if="selectedAnswer != ''">
          <span
            v-if="selectedAnswer == answer"
            class="correct"
          >
            Your Answer Is Correct
          </span>
          <span
            v-else
            class="wrong"
          > Your answer is incorrect </span>
        </span>
      </div>
      <span>
        <QuizQuestionResult :question-no="question.questionNo" />
      </span>
      <h2>Options</h2>
      <QuestionOptions
        :options="question.options"
        :answer="answer"
        :show-answer="true"
        :submit-answers="false"
      />
      <br>
      <div class="markdown">
        <div v-html="question.questionText">
          <br>
        </div>
        <div class="image">
          <img :src="question.questionImage">
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import QuizQuestionResult from '@/components/Quiz/QuizQuestionResult';

import QuestionOptions from '@/components/Quiz/QuestionOptions';
import quizService from '@/services/quiz.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
export default {
	name: 'QuizPlayQuestionStrip',
	components: { QuizQuestionResult, QuestionOptions },
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
			selectedAnswer: '',
			countdown: null,
			questionText: '',
			text: '',
			questionNo: null,
			runId: null,
			answer: '',
			elementVisible: null,
		};
	},
	mounted() {
		this.runId = this.$route.params.runId;
		this.loadQuiz(this.$route.params.id);
		this.countdown = this.question.duration;
	},
	methods: {
		submitAnswer(selectedAns) {
			const payload = {
				username: this.$store.state.signedInUser.username,
				quizId: this.$route.params.id,
				runId: this.runId,
				questionNo: this.question.questionNo,
				selectedOption: selectedAns,
				timer: this.countdown,
			};
			quizService
				.addSubmission(payload)
				.then((res) => {
					this.selectedAnswer = selectedAns;
				})
				.catch((e) => {
					eventBus.$emit('show-toast', {
						body: e.message,
						title: messages.generic.error,
						type: ToastType.ERROR,
					});
				});
		},
		getAnswer() {
			quizService
				.getAnswer(this.$route.params.id, this.question.questionNo)
				.then((ans) => {
					this.answer = ans;
				})
				.catch((e) => {});
		},
		loadQuiz(quizId) {
			quizService
				.getQuizByIdPlay(quizId)
				.then((res) => {
					fetch(this.question.questionText)
						.then((response) => response.text())
						.then((response) => {
							this.questionText = response;
							let timer = setInterval(() => {
								if (this.countdown > 0) {
									this.countdown--;
								} else {
									this.getAnswer();
									this.elementVisible = true;
									setTimeout(() => (this.elementVisible = false), 2000);
									this.$emit('timeOver');
									clearInterval(timer);
								}
							}, 1000);
						});
				})
				.catch((e) => {});
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
	cursor: pointer;
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
.answer {
	font-size: 30px;
	text-align: center;
	color: white;
}
.correct {
	background-color: rgb(38, 238, 81);
	padding: 20px;
	border-radius: 20px;
}
.wrong {
	background-color: red;
	padding: 20px;
	border-radius: 20px;
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
.notSelected {
	background-color: lightblue;
	padding: 20px;
	border-radius: 20px;
}
.image {
	img {
		width: 50%;
	}
}
</style>
