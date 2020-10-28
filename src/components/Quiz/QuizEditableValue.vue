<template>
  <span
    v-if="isEditable"
    class="input-area"
  >
    <div>
      <textarea
        v-if="multiline"
        v-model="editedValue"
        class="editable-value"
        :placeholder="placeholder"
        @change="onChange"
      />
    </div>
    <div class="relatedSkills form-field">
      <div>Question URL</div>
      <input
        v-model="question.questionUrl"
        class="editable-value"
        type="text"
        @change="onQuestionUrlChange"
      >
    </div>
    <div class="relatedSkills form-field">
      <div>Duration</div>
      <input
        v-model="question.duration"
        class="editable-value"
        type="text"
        @change="onQuestionDurationChange"
      >
    </div>
    <div class="relatedSkills form-field">
      <div>Question Number</div>
      <input
        v-model="question.questionNo"
        class="editable-value"
        type="text"
        @change="onQuestionNumberChange"
      >
    </div>
    <br>
    <div>Options</div>
    <div
      v-for="(option, index) in key"
      :key="index"
    >
      <Checkbox
        :id="option"
        :is-checked="isChecked"
        :label="option"
        :on-click="toggleCheckbox"
      />

      <input
        class="editable-value"
        type="text"
        @change="setOption($event, index, option)"
      >
    </div>

    <div>
      <button @click.prevent="save()">Done</button>
    </div>
  </span>
</template>

<script>
import Checkbox from '@/components/Checkbox/Checkbox';

export default {
	components: { Checkbox },
	props: {
		multiline: {
			type: Boolean,
			default: false,
		},
		value: {
			type: [String, Number, Object],
			default: '',
		},
		placeholder: {
			type: String,
			default: '',
		},
		index: {
			type: Number,
			default: -1,
		},
		isEditable: {
			type: Boolean,
			default: false,
		},
		autoSelect: {
			type: Array,
			default: () => [],
		},
		typeahead: {
			type: Boolean,
			default: false,
		},
		typeaheadSource: {
			type: Array,
			default: () => [],
			required: false,
		},
	},
	data() {
		return {
			isChecked: false,
			editedValue: this.value,
			key: ['A', 'B', 'C', 'D'],
			question: {
				questionNo: 0,
				questionUrl: '',
				options: [],
				answer: '',
				duration: 0,
			},
			OptionArray: [
				{
					key: '',
					value: '',
				},
				{
					key: '',
					value: '',
				},
				{
					key: '',
					value: '',
				},
				{
					key: '',
					value: '',
				},
			],
		};
	},
	methods: {
		onQuestionUrlChange(e) {
			this.question.questionUrl = e.target.value;
		},
		onQuestionDurationChange(e) {
			this.question.duration = e.target.value;
		},
		onQuestionNumberChange(e) {
			this.question.questionNo = e.target.value;
		},
		rightAnswer(option) {
			this.question.answer = option;
		},
		setOption(event, index, option) {
			this.OptionArray[index].value = event.target.value;
			this.OptionArray[index].key = option;
			this.question.options.push(this.OptionArray[index]);
		},
		toggleCheckbox(id) {
			this.rightAnswer(id);
			this[id] = !this[id];
		},
		save: function () {
			if (this.index === -1) {
				this.$emit('change', this.question);
			} else {
				this.$emit('change', { val: this.question, index: this.index });
			}
		},
	},
};
</script>

<style scoped lang="scss">
.readonly-value {
	border-bottom: 1px solid var(--fs-primary-color);
	flex: 1 1 auto;
	margin: 2px auto;
	min-width: 15rem;
	width: 100%;
	font-size: inherit;
	line-height: inherit;
	height: 1.5rem;
	padding: 0 10px;
}

.editable-value {
	border: 3px solid #114273;
	display: inline-block;
	margin: 2px auto;
	width: 100%;
	font-size: inherit;
	line-height: inherit;
	height: 1.5rem;
	padding: 0 10px;
}

textarea {
	min-height: 5rem;
}

.auto-option {
	border-bottom: dotted 1px #114273;
	cursor: pointer;

	&:hover {
		background-color: #1142736c;
	}
}

.input-area {
	flex-direction: column;
}
</style>
