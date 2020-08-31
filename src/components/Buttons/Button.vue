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
      default: ""
    }
  }
};
</script>

<style scoped lang="scss">
button {
  &:focus {
    outline: none;
  }
  &.primary {
    padding: 5px;
    width: 100%;
    height: 100%;
    border: none;
    font-size: 19px;
    cursor: pointer;
    border-radius: 10px;
  }
}
</style>
