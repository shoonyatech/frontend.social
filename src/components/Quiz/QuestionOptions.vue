<template>
  <div>
    <div
      v-for="(option, index) in options"
      :key="index"
    >
      <div
        v-if="click == 0 && submitAnswers == true"
        class="float-child"
        :style="{
          backgroundColor: `${colors[index]}`,
        }"
        @click="submitAnswer(option.key)"
      >
        {{ option.key }}) {{ option.value }}
        <span
          v-if="option.key == answer"
          class="tickBox"
        >
          <img
            class="tick"
            src="/images/check-mark.svg"
          >
        </span>
      </div>
      <div
        v-if="showAnswer"
        class="float-child1"
        :style="{
          backgroundColor: `${colors[index]}`,
        }"
      >
        <span>{{ option.key }}) {{ option.value }}</span>
        <span
          v-if="option.key == answer"
          class="tickBox"
        >
          <img
            class="tick"
            src="/images/check-mark.svg"
          >
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { colorsSet } from './QuizConfig';
export default {
	name: 'QuestionOptions',
	props: {
		options: {
			type: Array,
			required: true,
		},
		answer: {
			type: String,
			default: '',
		},
		showAnswer: {
			type: Boolean,
			default: false,
		},
		submitAnswers: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			colors: [],
			click: 0,
		};
	},
	mounted() {
		this.colors = colorsSet;
	},
	methods: {
		submitAnswer(Selectedvalue) {
			this.click = 1;
			this.$emit('sendSelected', Selectedvalue);
		},
	},
};
</script>
<style>
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
	cursor: pointer;
}
.float-child1 {
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
.tickBox {
	color: #11c232;
	float: right;
	background-color: white;
	display: inline-block;
	border-radius: 999px;
}
</style>
