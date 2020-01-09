<template>
  <div class="host">
    <span class="label">{{ label }}</span>
    <EditableValue
      v-model="value"
      :is-editable="isEditable"
      class="value"
      :placeholder="placeholder"
      :multiline="multiline"
      @change="onChange"
    />
  </div>
</template>

<script>
import EditableValue from "@/components/common/EditableValue";

export default {
  components: { EditableValue },
  props: {
    multiline: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    isEditable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange: function(val) {
      this.$emit("change", { label: this.label, value: val });
    }
  }
};
</script>

<style scoped lang="scss">
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
