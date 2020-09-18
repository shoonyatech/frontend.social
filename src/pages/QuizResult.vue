<template>
  <div>
    <b-card>
      <span>
        <button @click="click">NextQuestion</button>
      </span>
    </b-card>
  </div>
</template>

<script>
import quizService from '@/services/quiz.service';
export default {
	name: 'QuizResult',
	components: {},
	props: {},
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
