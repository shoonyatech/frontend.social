<template>
  <div>
    <b-container>
      <h2>Quiz Run ID: {{ runId }}</h2>
      <h2>
        <a>{{ `${url}/quiz/${quizId}/play/${runId}` }}</a>
      </h2>
      <span>
        <button @click="startQuiz">Start Quiz</button>
      </span>
    </b-container>
    <b-container>
      <br>
      <h1>
        <span>All Participants</span><button>Total :{{ total }}</button>
      </h1>

      <div
        v-for="(participant, index) in participants"
        :key="index"
      >
        <ResultStrip :result="participant" />
      </div>
    </b-container>
  </div>
</template>

<script>
import ResultStrip from '@/components/Quiz/ResultStrip';
import quizService from '@/services/quiz.service';
export default {
	name: 'QuizRunHome',
	components: {
		ResultStrip,
	},
	props: {},
	data() {
		return {
			runId: 0,
			quizId: 0,
			currentQuestion: 0,
			url: '',
			participants: {},
			timer: 0,
			total: 0,
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
	},
	created() {
		if (this.signedInUser == null) {
			this.$router.push('/signin');
		} else {
			this.timer = setInterval(() => this.getParticipants(), 1000);
		}
		this.url = window.location.origin;
	},
	destroyed() {
		clearInterval(this.timer);
	},
	mounted() {
		this.runId = this.$route.params.runId;
		this.quizId = this.$route.params.id;
	},
	methods: {
		getParticipants() {
			quizService
				.getParticipants(this.$route.params.id, this.$route.params.runId)
				.then((re) => {
					this.participants = re;
					if (re.length > 0) {
						this.total = re.length;
					}
				})
				.catch({});
		},
		startQuiz() {
			clearInterval(this.timer);
			this.$router.push(
				`/quiz/${this.$route.params.id}/run/${this.runId}/${
					this.currentQuestion + 1
				}`
			);
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
