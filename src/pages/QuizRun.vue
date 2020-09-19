<template>
  <div>
    <b-card>
      <h2>Quiz Run ID: {{ runId }}</h2>
      <span>
        <button @click="startQuiz">Start Quiz</button>
        <button @click="nextQuestion">Next Question</button>
      </span>
    </b-card>
    <b-container>
      <b-row>
        <b-col md="12">
          <div
            v-for="(question, index) in quiz.questions"
            :key="index"
          >
            <QuizQuestion
              v-if="index === currentQuestion"
              :question="question"
              :quiz-id="quiz._id"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import QuizQuestion from '@/components/Quiz/QuizQuestion';
import quizService from '@/services/quiz.service';
export default {
	name: 'QuestionStrip',
	components: { QuizQuestion },
	props: {},
	data() {
		return {
			runId: 0,
			quiz: {},
			currentQuestion: 0,
		};
	},
	mounted() {
		this.runId = this.$route.params.runId;
		quizService.getQuizById(this.$route.params.id).then((res) => {
			this.quiz = res;
		});
	},
	methods: {
		startQuiz() {
			this.$router.push(`/quiz/${this.$route.params.id}/run/details`);
		},
		nextQuestion() {
			this.currentQuestion++;
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
