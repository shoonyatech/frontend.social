<template>
  <div class="events">
    <b-container>
      <b-row>
        <b-col md="9">
          <h1>
            <span>Frontend Conference and Meetups</span><button @click="showAddEventDialog = !showAddEventDialog">
              + Add Event
            </button>
          </h1>
          <div
            v-if="showAddEventDialog"
            class="events"
          >
            <EventStrip
              v-for="(event, index) in events"
              :key="index"
              :event="event"
            />
          </div>
          <AddEvent v-else />
        </b-col>
        <b-col md="3">
          <div class="filters-wrapper">
            <event-filters :on-search-params-change="onSearchParamsChange" />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import eventService from "@/services/event.service";
import EventStrip from "@/components/Events/EventStrip";
import AddEvent from "@/components/Events/AddEvent";
import EventFilters from "@/components/Events/EventFilters";

export default {
  name: "Events",
  components: { EventStrip, EventFilters, AddEvent },
  data() {
    return {
      events: [],
      showAddEventDialog: false
    };
  },
  created() {
    eventService.searchEventsBy().then(events => {
      this.events = events;
    });
  },
  methods: {
    onSearchParamsChange(param = "") {
      eventService.searchEventsBy(param).then(events => {
        this.events = events;
      });
    }
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

.filters-wrapper {
  height: 100%;
  border-left: 1px solid #aada18;
  flex-direction: column;
  display: flex;
  text-align: start;
  padding: 10px;
  cursor: pointer;
}
</style>
