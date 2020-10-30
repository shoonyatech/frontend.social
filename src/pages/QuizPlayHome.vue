<template>
  <div>
    <b-card>
      <h2>Quiz Run ID: {{ runId }}</h2>
      <span>
        <h2>Waiting for host to start quiz</h2>
      </span>
    </b-card>
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
	name: 'QuestionStrip',
	components: {
		ResultStrip,
	},
	props: {},
	data() {
		return {
			runId: 0,
			quiz: {},
			currentQuestion: null,
			result: [],
			timer: 0,
			participants: {},
			participantTimer: 0,
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
			this.addParticipants(
				this.$route.params.id,
				this.$route.params.runId,
				this.signedInUser.username
			);

			this.participantTimer = setInterval(() => this.getParticipants(), 1000);
		}
	},
	mounted() {
		this.runId = this.$route.params.runId;
		this.timer = setInterval(this.isActive, 500);
	},
	methods: {
		addParticipants(quizId, runId, username) {
			const payload = {
				quizId: quizId,
				runId: runId,
				username: username,
			};
			quizService
				.addParticipants(payload)
				.then((re) => {})
				.catch({});
		},
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
		isActive() {
			quizService.getCurrentRunId(this.$route.params.id).then((res) => {
				if (res.isActive == true) {
					clearInterval(this.participantTimer);
					this.currentQuestion = res.currentQuestion;
					this.$router.push(
						`/quiz/${this.$route.params.id}/play/${this.runId}/${this.currentQuestion}`
					);
				}
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
