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
      <div v-if="countdown != 0">
        <h2>Options</h2>
        <div
          v-for="(option, index) in question.options"
          :key="index"
        >
          <div
            v-if="click == 0"
            class="float-child"
            :style="{
              backgroundColor: `${colors[index]}`,
            }"
            @click="submitAnswer(option.key)"
          >
            {{ option.key }}) {{ option.value }}
          </div>
        </div>
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
          :style="{
            backgroundColor: `lightblue`,
          }"
        >No option selected</span>
        <span
          v-if="selectedAnswer == answer && selectedAnswer != ''"
          :style="{
            backgroundColor: `rgb(38, 238, 81)`,
          }"
        >
          Your Answer Is Correct
        </span>
        <span
          v-if="selectedAnswer != answer && selectedAnswer != ''"
          :style="{
            backgroundColor: `red`,
          }"
        >
          Your answer is incorrect
        </span>
      </div>
      <span>
        <QuizQuestionResult :question-no="question.questionNo" />
      </span>
      <div
        v-for="(option, index) in question.options"
        :key="index"
      >
        <div
          class="float-child"
          :style="{
            backgroundColor: `${colors[index]}`,
          }"
        >
          {{ option.key }}) {{ option.value }}
          <span
            v-if="option.key == answer"
            :style="{
              color: `rgb(0, 250, 21)`,
            }"
          >
            &#x1F5F8;
          </span>
        </div>
      </div>
      <br>
      <div class="markdown">
        <vue-markdown :source="questionUrl" />
      </div>
    </b-card>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import QuizQuestionResult from '@/components/Quiz/QuizQuestionResult';
import { colorsSet } from './QuizConfig';

import quizService from '@/services/quiz.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
export default {
	name: 'QuizPlayQuestionStrip',
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
			colors: [],
			selectedAnswer: '',
			countdown: null,
			questionUrl: '',
			text: '',
			questionNo: null,
			runId: null,
			click: 0,
			answer: '',
			elementVisible: null,
		};
	},
	mounted() {
		this.colors = colorsSet;
		this.runId = this.$route.params.runId;
		this.loadQuiz(this.$route.params.id);
		this.countdown = this.question.duration;
	},
	methods: {
		submitAnswer(selectedOption) {
			this.click = 1;
			const payload = {
				username: this.$store.state.signedInUser.username,
				quizId: this.$route.params.id,
				runId: this.runId,
				questionNo: this.question.questionNo,
				selectedOption: selectedOption,
				timer: this.countdown,
			};
			quizService
				.addSubmission(payload)
				.then((res) => {
					this.selectedAnswer = selectedOption;
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
					fetch(this.question.questionUrl)
						.then((response) => response.text())
						.then((response) => {
							this.questionUrl = response;
							let timer = setInterval(() => {
								if (this.countdown > 0) {
									this.countdown--;
								} else {
									this.getAnswer();
									this.elementVisible = true;
									setTimeout(() => (this.elementVisible = false), 4000);
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
	margin-top: 120px;
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
