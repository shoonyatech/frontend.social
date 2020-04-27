<template>
  <div class="host">
    <div class="framework">
      {{ framework.name }}
    </div>
    <img
      class="logo"
      :src="`/images/frameworks/${framework.name}.png`"
      alt="framework logo"
    >
    <div class="github-stars">
      {{ framework.githubStars }}
    </div>
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
  text-align: center;
}

.framework {
  height: 60px;
}

.logo {
  height: 50px;
  margin-bottom: 30px;
}

.github-stars {
  height: 80px;
}
</style>
