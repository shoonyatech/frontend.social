<template>
  <div class="host">
    <span class="label">{{ label }}</span>
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
export default {
  components: {},
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
  display: inline-block;
  width: 100%;
  padding-left: 10px;
  text-align: left;
}

.label {
  color: #aada18;
  width: 150px;
  display: inline-block;
}

.value {
  display: inline-block;
}

.editable-value {
  border: 3px solid #aada20;
  display: inline-block;
  margin: 2px auto;
  min-width: 15rem;
  width: 24rem;
  font-size: inherit;
  line-height: inherit;
  height: 1.5rem;
  padding: 0 10px;
}
</style>
