<template>
  <div>
    <b-card>
      <div>
        <vue-markdown :source="questionUrl" />
      </div>

      <h2>Options</h2>
      <div
        v-for="(option, index) in clicked.options"
        :key="index"
      >
        <div
          class="option-container"
          @click="onclick(option.key)"
        >
          {{ option.key }}|{{ option.value }}
        </div>
      </div>
    </b-card>
    <br>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';

import quizService from '@/services/quiz.service';
export default {
	name: 'QuestionStrip',
	components: { VueMarkdown },
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
			quiz: {
				_id: '5f62a9bc2736589fc02c036d',
				title: 'Testing',
				relatedSkills: ['Angular', 'Vuejs', 'react', 'GraphQL'],
				questions: [
					{
						questionUrl:
							'https://raw.githubusercontent.com/FrontendSocial/code-challenges/master/01-events-calendar/problem_statement.MD',
						options: [
							{
								key: 'A',
								value: 'Angular',
							},
							{
								key: 'B',
								value: 'React',
							},
							{
								key: 'C',
								value: 'Vue',
							},
							{
								key: 'D',
								value: 'GraphQL',
							},
						],
						answer: 'A',
						duration: '10',
					},
					{
						questionUrl:
							'https://raw.githubusercontent.com/FrontendSocial/code-challenges/master/01-events-calendar/problem_statement.MD',
						options: [
							{
								key: 'A',
								value: 'Angular',
							},
							{
								key: 'B',
								value: 'React',
							},
							{
								key: 'C',
								value: 'Vue',
							},
							{
								key: 'D',
								value: 'GraphQL',
							},
						],
						answer: 'A',
						duration: '10',
					},
				],
			},
			showSection: false,
			questionUrl: '',
			text: '',
			clicked: {},
			answer: null,
		};
	},
	mounted() {
		this.loadQuiz(this.$route.params.id);
		this.clicked = { ...this.$props.question, clicked: false };
	},
	methods: {
		loadQuiz(quizId) {
			quizService.getQuizById(quizId).then((res) => {
				fetch(this.question.questionUrl)
					.then((response) => response.text())
					.then((response) => (this.questionUrl = response));
			});
		},
		onclick(index) {
			quizService.updateQuiz(this.quizId, this.quiz).then((res) => {
				console.log(res);
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
