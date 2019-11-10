<template>
  <div>
    <input
      :id="id"
      type="radio"
      :checked="isChecked"
      :name="name"
      :value="value"
      @click="onClick(value)"
    >
    <label :for="id">{{ label }}</label>
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
    onClick: {
      type: Function,
      default: () => {}
    },
    id: {
      type: String,
      required: true
    },
    isChecked: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: "0"
    }
  }
};
</script>

<style scoped>
</style>
