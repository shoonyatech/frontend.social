<template>
  <div>
    <b-card>
      <h2>{{ countdown }}</h2>

      <div>
        <vue-markdown :source="questionUrl" />
      </div>

      <h2>Options</h2>
      <div
        v-for="(option, index) in clicked.options"
        :key="index"
      >
        <div class="option-container">
          {{ option.key }}|{{ option.value }}
        </div>
      </div>
    </b-card>
    <br>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';

import quizService from '@/services/quiz.service';
export default {
	name: 'QuestionStrip',
	components: { VueMarkdown },
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
			countdown: 0,
			questionUrl: '',
			text: '',
			clicked: {},
			answer: null,
		};
	},
	mounted() {
		this.loadQuiz(this.$route.params.id);
		this.clicked = { ...this.$props.question, clicked: false };
		this.countdown = this.question.duration;
	},
	methods: {
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
