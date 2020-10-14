<template>
  <div>
    <b-card>
      <h2>Quiz Run ID: {{ QuestionRunId }}</h2>
      <!-- Total Question{{ quiz.questions.length }} -->
      <span>
        <button
          v-if="$route.params.runId != 'details'"
          @click="startQuiz"
        >
          Start Quiz
        </button>
      </span>
    </b-card>
    <b-container v-if="$route.params.runId === 'details'">
      <b-row>
        <b-col
          v-if="$route.params.runId != 'details'"
          md="12"
        >
          <div
            v-for="(question, index) in quiz.questions"
            :key="index"
          >
            <AllQuestionStrip
              v-if="index === currentQuestion"
              :question="question"
              :quiz-id="quiz._id"
              @timeOver="onTimeover"
            />
          </div>
        </b-col>
        <b-col
          v-else
          md="12"
        >
          <div
            v-for="(question, index) in quiz.questions"
            :key="index"
          >
            <QuizQuestion
              v-if="index === currentQuestion"
              :question="question"
              :quiz-id="quiz._id"
              @timeOver="onTimeover"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <span>
        <button
          v-if="
            $route.params.runId === 'details' &&
              this.currentQuestion < quiz.questions.length - 1
          "
          @click="nextQuestion"
        >
          Next Question
        </button>
        <button
          v-if="
            $route.params.runId === 'details' &&
              this.currentQuestion + 1 == quiz.questions.length
          "
          @click="finalResult"
        >
          End Quiz
        </button>
      </span>
    </b-container>
  </div>
</template>

<script>
import QuizQuestion from '@/components/Quiz/QuizQuestion';
import AllQuestionStrip from '@/components/Quiz/AllQuestionStrip';
import quizService from '@/services/quiz.service';
export default {
	name: 'QuestionStrip',
	components: { AllQuestionStrip, QuizQuestion },
	props: {},
	data() {
		return {
			runId: 0,
			QuestionRunId: Number,
			quiz: {},
			currentQuestion: 0,
			result: [],
			start: false,
		};
	},
	mounted() {
		this.runId = this.$route.params.runId;
		quizService.getQuizById(this.$route.params.id).then((res) => {
			this.quiz = res;
		});
		if (this.runId != 'details') {
			quizService.setRunId(this.runId);
		}
		this.QuestionRunId = quizService.getRunId();
	},
	methods: {
		startQuiz() {
			this.$router.push(`/quiz/${this.$route.params.id}/run/details`);
			this.start = true;
		},
		nextQuestion() {
			this.currentQuestion++;
			quizService
				.setQuizQuestionIndex(this.QuestionRunId, this.currentQuestion)
				.then((res) => {
					this.result = res;
				});
		},
		finalResult() {
			this.$router.push(`/quiz/${this.$route.params.id}/run/details/result`);
		},
		onTimeover() {
			quizService
				.getQuizResult(this.QuestionRunId, this.currentQuestion)
				.then((res) => {
					this.result = res;
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
