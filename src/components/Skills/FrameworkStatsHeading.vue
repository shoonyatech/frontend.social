<template>
  <div class="host">
    <div class="framework" />
    <div class="logo" />
    <div class="github-stars">
      Github stars
    </div>
  </div>
</template>

<script>
export default {
  name: "FrameworkStatsHeading",
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
  text-align: center;
}

.framework {
  height: 60px;
}

.logo {
  height: 80px;
}

.github-stars {
  height: 80px;
}
</style>
