<template>
  <div class="host">
    <b-container>
      <b-row class="description">
        <b-col>
          <h1>{{ quiz.title }}</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <QuestionStrip
            v-for="(question, index) in quiz.questions"
            :key="index"
            :question="question"
            :quiz-id="quiz._id"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import quizService from '@/services/quiz.service';
import eventBus from '@/utilities/eventBus';
import QuestionStrip from '@/components/Quiz/QuestionStrip';
import { ToastType, messages } from '@/constants/constants';
export default {
	name: 'QuizDetails',
	components: {
		QuestionStrip,
	},
	props: {},
	data() {
		return {
			quiz: {},
			quizData: '',
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
	created() {},
	beforeDestroy() {
		clearInterval(this.timer);
	},

	methods: {
		loadQuiz(quizId) {
			quizService.getQuizById(quizId).then((res) => {
				this.quiz = res;
			});
		},
	},
};
</script>

<style scoped lang="scss"></style>
