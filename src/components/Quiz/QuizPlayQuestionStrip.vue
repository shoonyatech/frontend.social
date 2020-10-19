<template>
  <div>
    <b-card>
      <div class="timer">
        {{ countdown }}
      </div>
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
            v-if="click == 0"
            class="option"
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
      <QuizQuestionResult :question-no="question.questionNo" />
      <div
        v-for="(option, index) in question.options"
        :key="index"
      >
        <div
          class="option"
          :style="{
            backgroundColor: `${colors[index]}`,
          }"
          @click="submitAnswer(option.key)"
        >
          {{ option.key }}) {{ option.value }}
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import QuizQuestionResult from '@/components/Quiz/QuizQuestionResult';

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
			colors: ['yellow', 'red', 'rgb(0,186,240)', 'orange'],
			selectedAnswer: '',
			countdown: null,
			questionUrl: '',
			text: '',
			questionNo: null,
			runId: null,
			click: 0,
		};
	},
	mounted() {
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
.correctAnswer {
	border-style: solid;
	padding: 10px;
	border-color: #dfdfdf;
	border-width: 1px;
	margin-bottom: 1px;
	background-color: rgb(38, 238, 81);
	color: black;
}
.wrongAnswer {
	border-style: solid;
	padding: 10px;
	border-color: #dfdfdf;
	border-width: 1px;
	margin-bottom: 1px;
	background-color: rgb(245, 13, 13);
	color: white;
}
.option:hover {
	border-style: solid;
	padding: 10px;
	border-color: #dfdfdf;
	border-width: 1px;
	margin-bottom: 1px;
	background-color: #31bfee;
	color: black;
	cursor: pointer;
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
.timer {
	height: 60px;
	width: 60px;
	border-radius: 50%;
	background-color: purple;
	color: white;
	font-size: 40px;
	text-align: center;
}
</style>
