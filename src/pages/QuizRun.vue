<template>
  <div>
    <b-card>
      <h2>Quiz Run ID: {{ runId }}</h2>
      <span>
        <button @click="click">Start Quiz</button>
      </span>
    </b-card>
  </div>
</template>

<script>
import quizService from '@/services/quiz.service';
export default {
	name: 'QuestionStrip',
	components: {},
	props: {},
	data() {
		return {
			runId: 0,
		};
	},
	mounted() {
		this.runId = this.$route.params.runId;
	},
	methods: {
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
