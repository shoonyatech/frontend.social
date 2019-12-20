<template>
  <div class="text-xs host">
    <span>{{ label }}</span>
    <span class="value">{{ value }}</span>
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
      type: [String, Number],
      default: ""
    }
  }
};
</script>

<style scoped lang="scss">
.host {
  display: inline-block;
  width: 100%;
}

.value {
  float: right;
}
</style>
