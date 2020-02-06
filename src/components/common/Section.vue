<template>
  <div class="section-box">
    <span
      class="section-title"
    >{{ title }}
      <img
        v-if="!editMode"
        :src="`/images/edit.svg`"
        class="icon-button edit"
        title="Edit"
        @click="editMode = true"
      >
    </span>
    <div class="content">
      <slot />
      <div class="buttons">
        <button
          v-if="editMode"
          class="save-button"
          @click="save"
        >
          Save
        </button>
        <button
          v-if="editMode"
          @click="cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import EditableValue from "@/components/common/EditableValue";

export default {
  components: {},
  props: {
    title: {
      type: String,
      default: ""
    },
    isEditable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editMode: false
    };
  },
  methods: {
    save: function(event) {
      this.editMode = false;
    },
    cancel: function(event) {
      this.editMode = false;
    }
  }
};
</script>

<style scoped lang="scss">
.section-box {
  border: 2px solid #aada20;
  margin: 0 auto;
  text-align: left;
}

.content {
  padding: 0 15px 10px 15px;
}

.section-title {
  background: #aada20;
  color: #fff;
  border: none;
  padding: 4px 15px;
  margin-bottom: 12px;
  width: 100%;
  display: inline-block;
}

.edit {
  float: right;
}

.buttons {
  margin-top: 10px;
  width: 100%;
  text-align: right;
}

.save-button {
  margin-right: 10px;
}
</style>
