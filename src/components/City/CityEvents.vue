<template>
  <div class="city-events">
    <div>Upcoming conferences/meetups</div>
    <div>Past conferences/meetups</div>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    upcomingEvents: { type: Array, required: true },
    pastEvents: { type: Array, required: true }
  },

  methods: {}
};
</script>

<style scoped>
</style>
