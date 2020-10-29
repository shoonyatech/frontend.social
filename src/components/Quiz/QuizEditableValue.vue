<template>
  <span
    v-if="isEditable"
    class="input-area"
  >
    <br>
    Question Number :{{ index + 1 }}
    <div class="relatedSkills form-field">
      <div class="form-label">Question</div>
      <ckeditor
        v-model="question.questionText"
        :editor="editor"
        :config="editorConfig"
        class="editor"
        @change="onQuestionTextChange"
      />
    </div>
    <div class="relatedSkills form-field">
      <div class="form-label">Duration</div>
      <input
        v-model="question.duration"
        class="editable-value"
        type="text"
        @change="onQuestionDurationChange"
      >
    </div>
    <div class="form-field">
      <div class="form-label">Question Image</div>
      <div><input
        type="file"
        class="image-input"
        @change="image"
      ></div>
    </div>
    <div>
      <img
        :src="question.questionImage"
        class="user-profile-photo"
      >
    </div>
    <br>
    <div>Options</div>
    <div
      v-for="(option, index) in key"
      :key="index"
      class="wrapper"
    >
      <div v-if="option == question.answer">
        <Checkbox
          :id="option"
          :is-checked="true"
          :label="option"
          :on-click="toggleCheckbox"
        />
      </div>
      <div v-else>
        <Checkbox
          :id="option"
          :is-checked="isChecked"
          :label="option"
          :on-click="toggleCheckbox"
        />
      </div>
      <div class="input-option">
        <input
          v-model="inputOption[index]"
          class="editable-value"
          type="text"
          @change="setOption($event, index, option)"
        >
      </div>
    </div>
    <div>
      <button @click.prevent="save()">Done</button>
    </div>
  </span>
</template>

<script>
import config from '@/config/config.js';
import Checkbox from '@/components/Checkbox/Checkbox';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';

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
		questionNuber: {
			type: Number,
			default: 1,
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
			file: {},
			editor: ClassicEditor,
			editorConfig: {},
			cloudinaryUrl: config.cloudinaryUrl,
			cloudinaryUploadPreset: config.cloudinaryUploadPreset,
			isChecked: false,
			editedValue: this.value,
			key: ['A', 'B', 'C', 'D'],
			inputOption: [],
			question: {
				questionNo: 0,
				questionText: '',
				questionImage: '',
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
	created() {
		if (this.value.options != undefined) {
			this.question = this.value;
			this.value.options.map((re) => {
				this.inputOption.push(re.value);
			});
		}
	},
	methods: {
		image() {
			this.file = event.target.files[0];
		},
		onQuestionTextChange(e) {
			this.question.questionText = e.target.value;
		},
		onQuestionDurationChange(e) {
			this.question.duration = e.target.value;
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
		save() {
			var formData = new FormData();
			formData.append('file', this.file);
			formData.append('upload_preset', this.cloudinaryUploadPreset);
			axios({
				url: this.cloudinaryUrl,
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				data: formData,
			})
				.then((re) => {
					this.question.questionImage = re.data.secure_url;
					eventBus.$emit('show-toast', {
						body: messages.picUpdate.picUpdateSuccess,
						title: messages.generic.success,
					});
				})
				.catch((e) => {});
			this.question.questionNo = this.index + 1;
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
.user-profile-photo {
	max-width: 100%;
	text-align: left;
}
.image-input {
	width: 100%;
	font-size: 15px;
}
.form-field {
	display: flex;
	margin-bottom: 10px;
}
.form-label {
	width: 150px;
	color: #114273;
	min-width: 7rem;
}
.wrapper {
	display: flex;

	.input-option {
		width: 100%;
		padding: 0 10px;
	}
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
.input-area {
	flex-direction: column;
}
</style>
