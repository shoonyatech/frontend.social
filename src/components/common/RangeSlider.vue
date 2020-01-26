<template>
  <div class="host">
    <span class="label">
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

<style scoped lang="scss">
.host {
  display: flex;
  width: 100%;
  text-align: left;
}

.label {
  flex: 0 0 auto;
  width: 6rem;
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
