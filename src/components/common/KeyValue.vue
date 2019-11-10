<template>
  <div class="host">
    <span class="label">{{ label }}</span>
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
      type: String,
      default: ""
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
</style>
