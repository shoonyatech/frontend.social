<template>
  <div>
    <b-card>
      <h2>Quiz Run ID: {{ QuestionRunId }}</h2>
      <!-- Total Question{{ quiz.questions.length }} -->
      <span>
        <h2 v-if="$route.params.runId != 'details'">
          Waiting for host to start quiz
        </h2>
      </span>
    </b-card>
    <b-container v-if="$route.params.runId === 'details'">
      <b-row>
        <b-col md="12">
          <div
            v-for="(question, index) in quiz.questions"
            :key="index"
          >
            <QuizPlayQuestionStrip
              v-if="question.questionNo === currentQuestion"
              :question="question"
              :quiz-id="quiz._id"
              @timeOver="onTimeover"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import QuizPlayQuestionStrip from '@/components/Quiz/QuizPlayQuestionStrip';
import quizService from '@/services/quiz.service';
export default {
	name: 'QuestionStrip',
	components: { QuizPlayQuestionStrip },
	props: {},
	data() {
		return {
			runId: 0,
			QuestionRunId: Number,
			quiz: {},
			currentQuestion: Number,
			result: [],
			timer: 0,
		};
	},
	mounted() {
		this.runId = this.$route.params.runId;
		this.timer = setInterval(this.isActive, 500);
		quizService.getQuizById(this.$route.params.id).then((res) => {
			this.quiz = res;
		});
		if (this.runId != 'details') {
			quizService.setRunId(this.runId);
		}
		this.QuestionRunId = quizService.getRunId();
	},
	methods: {
		isActive() {
			quizService.getCurrentRunId(this.$route.params.id).then((res) => {
				if (res.isActive == true) {
					this.$router.push(`/quiz/${this.$route.params.id}/play/details`);
					this.currentQuestion = res.currentQuestion;
				}
				if (res.currentQuestion == 0) {
					this.$router.push(
						`/quiz/${this.$route.params.id}/run/details/result`
					);
					clearInterval(this.timer);
				}
			});
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
