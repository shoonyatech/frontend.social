<template>
  <div>
    <div>Upcoming events</div>
    <div class="city-events">
      <div
        v-for="(event, index) in upcomingEvents"
        :key="index"
        class="event-line"
      >
        <a
          class="city-event"
          :href="event.url"
        >
          <span>{{ event.name }}</span>
          <div class="event-date">
            <span>{{ event.dateFrom | moment("DD MMM YYYY") }} - </span>
            <span>{{ event.dateTo | moment("DD MMM YYYY") }}</span>
          </div>
        </a>
      </div>
    </div>
    <div>Past events</div>
    <div class="city-events">
      <div
        v-for="(event, index) in pastEvents"
        :key="index"
        class="event-line"
      >
        <a
          class="city-event"
          :href="event.url"
        >
          <span>{{ event.name }}</span>
          <div class="event-date">
            <span>{{ event.dateFrom | moment("DD MMM YYYY") }} - </span>
            <span>{{ event.dateTo | moment("DD MMM YYYY") }}</span>
          </div>
        </a>
      </div>
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
}

.city-event {
  flex: 0 1 auto;
  font-size: 0.8rem;
  margin: 10px;
}

.event-line {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.event-date {
  font-size: 0.65rem;
  color: #2c3e50;
}
</style>
