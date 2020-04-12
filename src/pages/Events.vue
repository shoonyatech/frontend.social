<template>
  <div class="events">
    <b-container>
      <b-row>
        <b-col md="9">
          <h1>
            <span>Frontend Conference and Meetups</span><button
              v-if="!showAddEventDialog"
              @click="showDialog()"
            >
              + Add Event
            </button>
          </h1>
          <div
            v-if="!showAddEventDialog"
            class="events"
          >
            <h1 v-if="categorisedEvents.upcomingOnlineEvents.length">
              Upcoming Online Events
            </h1>
            <EventStrip
              v-for="(event, index) in categorisedEvents.upcomingOnlineEvents"
              :key="index"
              :event="event"
            />
            <h1 v-if="categorisedEvents.upcomingOfflineEvents.length">
              Upcoming Offline Events
            </h1>
            <EventStrip
              v-for="(event, index) in categorisedEvents.upcomingOfflineEvents"
              :key="index"
              :event="event"
            />
            <h1 v-if="categorisedEvents.pastEvents.length">
              Past Events
            </h1>
            <EventStrip
              v-for="(event, index) in categorisedEvents.pastEvents"
              :key="index"
              :event="event"
            />
            <div class="center-content">
              <button
                class="mt-4"
                @click="showDialog()"
              >
                + Add Event
              </button>
            </div>
          </div>
          <AddEvent
            v-else
            @close="refreshPage()"
          />
        </b-col>
        <b-col md="3">
          <div
            v-if="!showAddEventDialog"
            class="filters-wrapper"
          >
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
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
    categorisedEvents() {
      const todaysDate = new Date();
      return {
        upcomingOnlineEvents: this.events.filter(event => event.isOnline && todaysDate <= new Date(event.dateFrom)),
        upcomingOfflineEvents: this.events.filter(event => !event.isOnline && todaysDate <= new Date(event.dateFrom)),
        pastEvents: this.events.filter(event => todaysDate > new Date(event.dateFrom)),
      }
    },
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
    },
    refreshPage() {
      this.showAddEventDialog = false;
      eventService.searchEventsBy().then(events => {
        this.events = events;
      });
    },
    showDialog() {
      if (this.signedInUser == null) {
        this.$router.push("/signin");
      } else {
        this.showAddEventDialog = true;
      }
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
