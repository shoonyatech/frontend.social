<template>
  <div class="host">
    <span class="skill-name">
      <EditableValue
        :value="label"
        :is-editable="isEditable"
      />
    </span>
    <span class="skill-years">
      <EditableValue
        :value="label"
        :is-editable="isEditable"
      />
    </span>
    <input
      :disabled="!isEditable"
      type="range"
      :value="value"
      :max="max"
      class="editable-value"
    >
  </div>
</template>

<script>
import EditableValue from "@/components/common/EditableValue";

export default {
  components: { EditableValue },
  props: {
    label: {
      type: String,
      default: ""
    },
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 10
    },
    isEditable: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.host {
  display: flex;
  width: 100%;
  padding-left: 10px;
  text-align: left;
}

.skill-name {
  flex: 0 0 auto;
  width: 6rem;
  margin-right: 1rem;
}

.skill-years {
  flex: 0 0 auto;
  width: 2rem;
  margin-right: 1rem;
}

.editable-value {
  border: 3px solid #aada20;
  flex: 1 1 auto;
  margin: 2px auto;
  width: 100%;
  font-size: inherit;
  line-height: inherit;
  height: 1.5rem;
  padding: 0 10px;
}
</style>
