<template>
  <div class="host">
    <h1>Upcoming Events</h1>
    <div class="events">
      <EventStrip
        v-for="(event, index) in events"
        :key="index"
        :event="event"
      />
    </div>
  </div>
</template>

<script>
import eventService from "@/services/event.service";
import EventStrip from "@/components/Events/EventStrip";

export default {
  components: { EventStrip },
  props: {
    skill: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      events: []
    };
  },
  created() {
    eventService.getUpcomingEvents(this.skill).then(events => {
      this.events = events;
    });
  }
};
</script>

<style scoped lang="scss">
.host {
  width: 100%;
}

.events {
  margin: 20px 10px;
  text-align: left;
  width: 100%;
}

.courtesy {
  font-size: 0.75rem;
  text-align: right;
}
</style>
