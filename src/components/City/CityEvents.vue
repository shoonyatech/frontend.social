<template>
  <div>
    <div>Upcoming events</div>
    <div class="city-events">
      <a
        v-for="event in upcomingEvents"
        :key="event.name"
        class="city-event"
        :href="event.url"
      >
        {{ event.name }}
      </a>
    </div>
    <div>Past events</div>
    <div class="city-events">
      <a
        v-for="event in pastEvents"
        :key="event.name"
        class="city-event"
        :href="event.url"
      >
        {{ event.name }}
      </a>
    </div>
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
.city-events {
  display: flex;
  flex-direction: row;
}

.city-event {
  flex: 0 1 auto;
  font-size: 0.8rem;
  margin: 10px;
}
</style>
