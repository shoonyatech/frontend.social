<template>
  <div class="host">
    <div>Upcoming events</div>
    <div class="city-events">
      <EventStrip
        v-for="(event, index) in upcomingEvents"
        :key="index"
        :event="event"
        class="event-line"
      />
    </div>
    <div>Past events</div>
    <div class="city-events">
      <EventStrip
        v-for="(event, index) in pastEvents"
        :key="index"
        :event="event"
        class="event-line"
      />
    </div>
  </div>
</template>

<script>
import EventStrip from "@/components/Events/EventStrip";

export default {
  components: { EventStrip },

  props: {
    upcomingEvents: { type: Array, required: true },
    pastEvents: { type: Array, required: true }
  },

  methods: {}
};
</script>

<style scoped lang="scss">
.host {
  border-bottom: dotted 1px #aada20;
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
