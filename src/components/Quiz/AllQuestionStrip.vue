<template>
  <div>
    <b-card>
      <h2>Question Number: {{ question.questionNo }}</h2>

      <div v-html="question.questionText">
        <br>
      </div>
      <div class="image">
        <img :src="question.questionImage">
      </div>
      <h2>Options</h2>
      <QuestionOptions
        :options="question.options"
        :answer="question.answer"
        :show-answer="true"
        :submit-answer="false"
      />
    </b-card>
  </div>
</template>

<script>
import { colorsSet } from './QuizConfig';
import QuestionOptions from '@/components/Quiz/QuestionOptions';
import quizService from '@/services/quiz.service';
export default {
	name: 'AllQuestionStrip',
	components: { QuestionOptions },
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
			questionText: '',
		};
	},
	mounted() {
		this.colors = colorsSet;
		this.loadQuiz(this.$route.params.id);
	},
	methods: {
		loadQuiz(quizId) {
			quizService.getQuizById(quizId).then((res) => {
				fetch(this.question.questionText)
					.then((response) => response.text())
					.then((response) => {
						this.questionText = response;
					});
			});
		},
	},
};
</script>

<style scoped lang="scss">
/* style for course thumbnail */
.float-child {
	width: 50%;
	border-style: solid;
	padding: 30px;
	border-color: #dfdfdf;
	border-width: 1px;
	color: black;
	float: left;
	font-size: 25px;
	color: white;
}

.tick {
	fill: #11c232;
	padding-left: 5px;
	padding-right: 5px;
}
.image {
	img {
		width: 50%;
	}
}
</style>
