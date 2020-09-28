<template>
  <div>
    <div class="submission-box-container">
      <div class="submission-box">
        <EditableValue
          ref="submissionBox"
          v-model="submission"
          :index="1"
          :is-editable="true"
          class="value"
          placeholder="Paste your solution here..."
          :multiline="true"
        />
      </div>
    </div>
    <div class="action-buttons">
      <button
        class="save-button"
        @click="save"
      >
        Save
      </button>
      <!-- <button @click="cancel">
        Cancel
      </button> -->
    </div>
  </div>
</template>
<script>
import eventBus from '@/utilities/eventBus';
import EditableValue from '@/components/common/EditableValue';
import challengeService from '@/services/challenges.service';
import { ToastType, messages } from '@/constants/constants';

export default {
	name: 'AddSubmission',
	components: {
		EditableValue,
	},
	props: {
		challengeId: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			submission: '',
		};
	},

	methods: {
		save() {
			if (this.$refs.submissionBox.editedValue) {
				challengeService
					.postSubmission({
						submission: this.$refs.submissionBox.editedValue,
						challengeId: this.challengeId,
					})
					.then(() => {
						this.$emit('save', this.submission);
						eventBus.$emit('show-toast', {
							body: messages.challenge.challengeSubmissionSuccess,
							title: messages.generic.success,
						});

						this.reset();
					})
					.catch((error) => {
						eventBus.$emit('show-toast', {
							body: messages.challenge.challengeSubmissionFailure,
							title: messages.generic.error,
							type: ToastType.ERROR,
						});
					});
			}
		},
		reset() {
			this.$refs.submissionBox.selectItem('');
			this.submission = '';
		},
	},
};
</script>
<style lang="scss" scoped>
.action-buttons {
	display: flex;
	justify-content: flex-end;
}
</style>
