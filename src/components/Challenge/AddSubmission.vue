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
import eventBus from "@/utilities/eventBus";
import EditableValue from "@/components/common/EditableValue";
import challengeService from "@/services/challenges.service";

export default {
  name: "AddSubmission",
  components: {
    EditableValue
  },
  props: {
    challengeId: {
      type: String
    }
  },
  data() {
    return {
      submission: ''
    };
  },
  
  methods: {
    save() {
      if (this.$refs.submissionBox.editedValue) {
        challengeService.postSubmission({submission: this.$refs.submissionBox.editedValue, challengeId: this.challengeId}).then(() => {
          this.$emit('save', this.submission);
          this.reset();
        });
      }
    },
    reset() {
      this.$refs.submissionBox.selectItem("");
      this.submission = "";
    }
  }
};
</script>
<style lang="scss" scoped>
.action-buttons {
  display: flex;
  justify-content: flex-end;
}
</style>