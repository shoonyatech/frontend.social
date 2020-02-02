<template>
  <b-row class="content">
    <b-col md="12">
      <div>
        This websit uses cookies to ensure you get the best experience on our
        website. Please read
        <a
          href="/privacy"
          class="static-links"
          target="_blank"
        >Privacy Policy</a>
        for more details.
        <button class="error">
          Opt out
        </button>
        <button>Got it</button>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {}
};
</script>
<style scoped lang="scss">
.content {
  margin: 10px;
  padding: 20px;
  background-color: darkolivegreen;
  color: white;
}

.error {
  margin-right: 20px;
}
</style>
