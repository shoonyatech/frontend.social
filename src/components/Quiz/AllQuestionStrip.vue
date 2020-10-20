<template>
  <div>
    <b-card>
      <h2>Question Number: {{ question.questionNo }}</h2>
      <div>
        <vue-markdown :source="questionUrl" />
      </div>

      <h2>Options</h2>
      <div
        v-for="(option, index) in question.options"
        :key="index"
      >
        <div
          class="float-child"
          :style="{
            backgroundColor: `${colors[index]}`,
          }"
        >
          {{ option.key }}) {{ option.value }}
          <span
            v-if="option.key == question.answer"
            :style="{
              color: `rgb(0, 250, 21)`,
            }"
          >
            &#x1F5F8;
          </span>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { colorsSet } from './QuizConfig';
import quizService from '@/services/quiz.service';
export default {
	name: 'AllQuestionStrip',
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
	padding: 10px;
	border-color: #dfdfdf;
	border-width: 1px;
	color: black;
	float: left;
	font-size: 25px;
}
</style>
