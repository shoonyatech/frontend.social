<template>
  <div class="host">
    <span class="label">{{ label }}</span>
    <EditableValue
      :value="value"
      :is-editable="isEditable"
      class="value"
    />
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
      type: String,
      default: ""
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

.label {
  color: #aada18;
  width: 7rem;
  min-width: 7rem;
}

.value {
  flex: 1 1 auto;
}
</style>
