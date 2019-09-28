<template>
  <button
    :class="[type]"
    @click="onClick"
  >
    {{ label }}
  </button>
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
    type: {
      type: String,
      default: "primary"
    }
  }
};
</script>

<style scoped>
button {
  padding: 5px;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 19px;
  cursor: pointer;
}
button.primary {
  background-color: #aada18;
  color: white;
}
</style>
