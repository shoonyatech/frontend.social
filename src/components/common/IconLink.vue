<template>
  <span class="icon-link">
    <a
      :href="url"
      target="_blank"
    >
      <img :src="icon">
    </a>
  </span>
</template>

<script>
export default {
  props: {
    url: {
      type: String
    },
    icon: {
      type: String
    }
  }
};
</script>

<style scoped lang="scss">
.icon-link {
  flex: 0 1 auto;
  height: 35px;
  width: 35px;
  display: flex;
  background-color: #fff;
  border-radius: 50%;
  padding: 3px;
  cursor: pointer;

  &:hover {
    border-radius: 50%;
    border-bottom: solid #aada18 2px;
  }

  a {
    border-radius: 50%;
  }
  img {
    width: 30px;
    height: 30px;
  }
}
</style>
