<template>
  <div>
    <b-card>
      <div>
        <vue-markdown :source="this.questionUrl" />
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
      <div
        v-if="showSection"
        class="answer"
      >
        {{ this.text }}
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
			submit: [],
			showSection: false,
			questionUrl: '',
			text: '',
			clicked: {},
		};
	},
	mounted() {
		this.loadBlog(this.$route.params.id);
		this.clicked = { ...this.$props.question, clicked: false };
	},
	methods: {
		loadBlog(quizId) {
			quizService.getQuizById(quizId).then((res) => {
				fetch(this.question.questionUrl)
					.then((response) => response.text())
					.then((response) => (this.questionUrl = response));
			});
		},
		onclick(index) {
			this.showSection = true;
			if (index === this.question.answer) {
				this.text = `Your Answer is Correct i.e : ${index}`;
			} else {
				this.text = `The Correct Answer is : ${this.question.answer}`;
			}
		},
	},
};
</script>

<style scoped lang="scss">
/* style for course thumbnail */
.thumbnail {
	border: solid #114273 2px;
	height: 12rem;
	width: 12rem;
	min-width: 12rem;
	color: #2c3e50;
	text-decoration: none;
}

.details {
	padding: 0.5rem;
	margin-top: -0.75rem;
	text-align: left;
}

.half-width {
	width: 50%;
}

.pr-2 {
	padding-right: 10px;
}

.course-title {
	font-weight: bold;
	text-align: center;
	padding-top: 0.8rem;
	overflow: hidden;
	white-space: nowrap;
}
.course-technology {
	font-size: 0.6rem;
	font-weight: bold;
	text-align: center;
}

.course-description {
	font-size: 0.6rem;
	block-size: 6.5rem;
	overflow: hidden;
}

.button {
	text-align: center;
	position: inherit;
	padding: 0.5rem;
}

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
.answer {
	text-align: center;
	background-color: chartreuse;
}
</style>
