<template>
  <iframe
    :src="url"
    class="code-iframe"
    title="vvue-youtube-embed-example"
    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
  />
</template>

<script>
export default {
  name: "CodeEditor",
  props: {
    url: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped lang="scss">
.code-iframe {
  width: 100%;
  height: 400px;
  border: 0;
  border-radius: 4px;
  overflow: hidden;
}
</style>
