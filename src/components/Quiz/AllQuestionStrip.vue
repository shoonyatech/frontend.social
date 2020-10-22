<template>
	<div>
		<b-card>
			<h2>Question Number: {{ question.questionNo }}</h2>
			<div>
				<vue-markdown :source="questionUrl" />
			</div>

			<h2>Options</h2>
			<QuestionOptions
				:options="question.options"
				:answer="question.answer"
				:show-answer="true"
				:submit-answer="false"
			/>
		</b-card>
	</div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { colorsSet } from './QuizConfig';
import QuestionOptions from '@/components/Quiz/QuestionOptions';
import quizService from '@/services/quiz.service';
export default {
	name: 'AllQuestionStrip',
	components: { VueMarkdown, QuestionOptions },
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
			colors: [],
			questionUrl: '',
		};
	},
	mounted() {
		this.colors = colorsSet;
		this.loadQuiz(this.$route.params.id);
	},
	methods: {
		loadQuiz(quizId) {
			quizService.getQuizById(quizId).then((res) => {
				fetch(this.question.questionUrl)
					.then((response) => response.text())
					.then((response) => {
						this.questionUrl = response;
					});
			});
		},
	},
};
</script>

<style scoped lang="scss">
/* style for course thumbnail */
.float-child {
	width: 50%;
	border-style: solid;
	padding: 30px;
	border-color: #dfdfdf;
	border-width: 1px;
	color: black;
	float: left;
	font-size: 25px;
	color: white;
}

.tick {
	fill: #11c232;
	padding-left: 5px;
	padding-right: 5px;
}
</style>
