<template>
  <span class="icon-link">
    <a
      :href="url"
      target="_blank"
      rel="noopener"
    >
      <img
        :src="icon"
        alt="icon-link"
      >
    </a>
  </span>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
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
  border-radius: 50%;
  padding: 3px;
  cursor: pointer;

  &:hover {
    border-radius: 50%;
    border-bottom: solid #114273 2px;
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
