<template>
  <div class="host">
    <div class="framework">
      {{ framework.name }}
    </div>
    <img
      class="logo"
      :src="`/images/frameworks/${framework.name}.png`"
    >
  </div>
</template>

<script>
export default {
  name: "FrameworkStats",
  components: {},
  props: {
    framework: {
      type: Object,
      default: () => {}
    }
  },
  created() {}
};
</script>

<style scoped lang="scss">
.host {
  width: 100%;
}

.logo {
  height: 50px;
}
</style>
