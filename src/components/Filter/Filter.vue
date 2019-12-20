<template>
  <div class="filter">
    <input
      :id="id"
      :type="type"
      :value="value"
      :name="name"
      :checked="isSelected"
      @input="onClick(id)"
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
      default:""
    },
    name: {
      type: String,
      default: ""
    },
    onClick: {
      type: Function,
      default: () => {}
    },
    type: {
      type: String,
      default: "checkbox"
    },
    value: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.filter > label {
  margin-left: 5px;
}
</style>
