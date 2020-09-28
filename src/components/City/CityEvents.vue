<template>
  <div class="host">
    <h1>Upcoming Events</h1>
    <div class="city-events">
      <div v-if="upcomingEvents.length">
        <EventStrip
          v-for="(event, index) in upcomingEvents"
          :key="index"
          :event="event"
          class="event-line"
        />
      </div>
      <div v-else>
        No events found!
      </div>
    </div>
    <h1>Past Events</h1>
    <div class="city-events">
      <div v-if="pastEvents.length">
        <EventStrip
          v-for="(event, index) in pastEvents"
          :key="index"
          :event="event"
          class="event-line"
        />
      </div>
      <div v-else>
        No events found!
      </div>
    </div>
  </div>
</template>

<script>
import EventStrip from '@/components/Events/EventStrip';

export default {
	components: { EventStrip },

	props: {
		upcomingEvents: { type: Array, required: true },
		pastEvents: { type: Array, required: true },
	},

	methods: {},
};
</script>

<style scoped lang="scss">
.host {
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
	color: var(--fs-primary-color);
}
</style>
