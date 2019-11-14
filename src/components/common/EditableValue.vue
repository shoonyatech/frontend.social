<template>
  <input
    v-if="isEditable"
    :value="value"
    class="editable-value"
  >
  <span
    v-else
    class="value"
  >{{ value }}</span>
</template>

<script>
export default {
  components: {},
  props: {
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
