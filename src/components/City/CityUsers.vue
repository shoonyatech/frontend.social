<template>
  <div class="city-users">
    <div>{{ userGroup }} from {{ city }}</div>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    userGroup: { type: String, required: true },
    city: { type: String, required: true },
    users: { type: Array, required: true }
  },

  methods: {}
};
</script>

<style scoped>
</style>
