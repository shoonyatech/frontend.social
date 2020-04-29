<template>
  <div class="host">
    <h1>Upcoming Events</h1>
    <div
      v-infinite-scroll="loadEvents"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="limit"
      class="events"
    >
      <div v-if="events.length">
        <EventStrip
          v-for="(event, index) in events"
          :key="index"
          :event="event"
        />
      </div>
      <div v-else>
        No events found!
      </div>
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
      default: null,
      required: false,
      page: 1,
      limit: 10,
      busy: false
    }
  },
  data() {
    return {
      events: []
    };
  },
  created() {
    setTimeout(() => {
      this.loadEvents();
    }, 500);
  },
  methods: {
    loadEvents() {
      this.busy = false;
      this.limit = this.limit || 10;
      this.page = ++this.page || 1;
      eventService
        .getUpcomingEvents(this.skill, this.limit, this.page)
        .then(events => {
          this.events = this.events.concat(events);
          this.busy = true;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.host {
  width: 100%;
  margin-bottom: 2.5rem;
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