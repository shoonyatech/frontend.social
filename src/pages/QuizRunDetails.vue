<template>
  <div>
    <b-container>
      <b-row>
        <b-col md="12">
          <QuizRun
            v-for="(question, index) in quiz.questions"
            :key="index"
            :question="question"
            :quiz-id="quiz._id"
            :duration="question.duration"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import QuizRun from '@/components/Quiz/QuizRun';
import quizService from '@/services/quiz.service';
export default {
	name: 'QuizRunDetails',
	components: {
		QuizRun,
	},
	props: {},
	data() {
		return {
			quiz: {},
			quizData: '',
			questionLength: '',
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
		items() {
			return [
				{
					text: 'Quiz',
					active: true,
				},
			];
		},
	},
	mounted() {
		this.loadQuiz(this.$route.params.id);
	},
	methods: {
		loadQuiz(quizId) {
			quizService.getQuizById(quizId).then((res) => {
				this.quiz = res;
				this.questionLength = this.quiz.questions.length;
			});
		},
		click() {
			this.$router.push(`/quiz/${this.$route.params.id}/run/details`);
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
