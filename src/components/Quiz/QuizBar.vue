<template>
  <div class="barchart">
    <div
      v-for="(option, index) in result"
      :key="index"
    >
      <div
        class="text"
        :style="{
          backgroundColor: `${colors[index]}`,
        }"
      >
        {{ option.key }}
      </div>
      <br>
      <div
        class="bar"
        :style="{
          height: `${option.length * 30}px`,
          backgroundColor: `${colors[index]}`,
        }"
      >
        {{ option.length }}
      </div>
      <br>
      <div v-if="option.key == answer">
        <p class="tick">
          &#x1F5F8;
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import quizService from '@/services/quiz.service';
export default {
	props: {
		result: {
			type: Object,
			default: () => {},
		},
		questionNo: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			colors: ['yellow', 'red', 'rgb(0,186,240)', 'orange'],
			styleObject: {
				color: 'red',
				fontSize: '13px',
				height: '100px',
			},
			answer: '',
		};
	},

	mounted() {
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
}
.bar {
	width: 100px;
	margin-right: 50px;
	text-align: center;
}
.text {
	margin-right: 50px;
	width: 100px;
	text-align: center;
}
.tick {
	font-size: 50px;
	color: rgb(0, 250, 21);
	text-align: center;
}
</style>
