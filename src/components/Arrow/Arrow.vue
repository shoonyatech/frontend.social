<template>
  <img
    class="arrow"
    :src="`/images/${imgSrc}.svg`"
    alt="arrow"
    @click="handleClick"
  >
</template>

<script>
export default {
  components: {},
  props: {
    isExpanded: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    imgSrc() {
      return this.isExpanded ? "up-arrow" : "down-arrow";
    },
    handleClick() {
      return this.onClick;
    }
  }
};
</script>

<style scoped lang="scss">
.arrow {
  width: 15px;
  display: flex;
  cursor: pointer;
  color: #114273;
}
</style>
