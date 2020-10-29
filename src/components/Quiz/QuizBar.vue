<template>
  <div class="barchart">
    <div
      v-for="(option, index) in result"
      :key="index"
    >
      <div v-if="option.key == answer">
        <p class="text">
          <img src="/images/check-mark.svg">
        </p>
      </div>

      <div
        v-if="option.length != 0"
        class="bar"
        :style="{
          height: `${option.length * 30}px`,
          backgroundColor: `${colors[index]}`,
        }"
      >
        {{ option.length }}
      </div>
      <div
        class="text"
        :style="{
          backgroundColor: `${colors[index]}`,
        }"
      >
        {{ option.key }}
      </div>
    </div>
  </div>
</template>
<script>
import quizService from '@/services/quiz.service';
import { colorsSet } from './QuizConfig';
export default {
	props: {
		result: {
			type: Array,
			default: () => [],
		},
		questionNo: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			colors: [],
			answer: '',
		};
	},

	mounted() {
		this.colors = colorsSet;
		if (this.questionNo != 0) {
			this.loadAnswer(this.$route.params.id, this.questionNo);
		}
	},
	methods: {
		loadAnswer(quizId, questionNo) {
			quizService
				.getAnswer(quizId, questionNo)
				.then((ans) => {
					this.answer = ans;
				})
				.catch((e) => {});
		},
	},
};
</script>
<style>
.barchart {
	width: 100%;
	display: flex;
	flex-direction: row;
	color: white;
	justify-content: center;
	align-items: flex-end;
}
.bar {
	width: 100px;
	margin-right: 50px;
	text-align: center;
	margin-bottom: 5px;
}
.text {
	margin-right: 50px;
	width: 100px;
	text-align: center;
}
</style>
