<template>
  <div class="events">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col md="9">
          <h1>
            <span>Frontend Conference and Meetups</span>
            <button @click="showDialog()">
              + Add Event
            </button>
          </h1>
          <div class="events">
            <h1 v-if="categorisedEvents.myEvents.length">
              My Events
            </h1>
            <EventStrip
              v-for="event in categorisedEvents.myEvents"
              :key="event._id"
              :event="event"
              :can-modify="canModify(event)"
              @edit="onEditEvent"
              @delete="onDeleteEvent"
            />

            <UpcomingOnlineEvents
              ref="upcomingOnlineEvents"
              :infinite-scroll="false"
              :limit="5"
            />

            <UpcomingOfflineEvents
              ref="upcomingOfflineEvents"
              :infinite-scroll="false"
              :limit="5"
            />

            <PastEvents
              ref="pastEvents"
              :infinite-scroll="false"
              :limit="5"
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
import EventFilters from "@/components/Events/EventFilters";
import UpcomingOnlineEvents from "@/components/Events/UpcomingOnlineEvents";
import UpcomingOfflineEvents from "@/components/Events/UpcomingOfflineEvents";
import PastEvents from "@/components/Events/PastEvents";

import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";

export default {
  name: "Events",
  components: {
    EventStrip,
    EventFilters,
    UpcomingOnlineEvents,
    UpcomingOfflineEvents,
    PastEvents
  },
  data() {
    return {
      events: [],
      loading: true
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
    categorisedEvents() {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (this.signedInUser) {
        return {
          myEvents: this.events.filter(
            event => event.createdBy.username === this.signedInUser.username
          ),
          upcomingOnlineEvents: this.events.filter(
            event =>
              event.isOnline &&
              yesterday <= new Date(event.dateFrom) &&
              event.createdBy.username !== this.signedInUser.username &&
              event.isPrivate !== true
          ),
          upcomingOfflineEvents: this.events.filter(
            event =>
              !event.isOnline &&
              yesterday <= new Date(event.dateFrom) &&
              event.createdBy.username !== this.signedInUser.username &&
              event.isPrivate !== true
          ),
          pastEvents: this.events
            .filter(
              event =>
                yesterday > new Date(event.dateFrom) &&
                event.createdBy.username !== this.signedInUser.username &&
                event.isPrivate !== true
            )
            .sort((e1, e2) => new Date(e2.dateFrom) - new Date(e1.dateFrom))
        };
      } else {
        return {
          myEvents: [],
          upcomingOnlineEvents: this.events.filter(
            event =>
              event.isOnline &&
              yesterday <= new Date(event.dateFrom) &&
              event.isPrivate !== true
          ),
          upcomingOfflineEvents: this.events.filter(
            event =>
              !event.isOnline &&
              yesterday <= new Date(event.dateFrom) &&
              event.isPrivate !== true
          ),
          pastEvents: this.events
            .filter(
              event =>
                yesterday > new Date(event.dateFrom) && event.isPrivate !== true
            )
            .sort((e1, e2) => new Date(e2.dateFrom) - new Date(e1.dateFrom))
        };
      }
    }
  },
  created() {
    this.loading = true;
    eventService.searchEventsBy().then(events => {
      this.loading = false;
      this.events = events;
    });
  },
  methods: {
    onEditEvent(event) {
      this.$router.push(`/event/form/${event._id}`);
    },
    onDeleteEvent(event) {
      this.loading = true;
      eventService
        .deleteEvent(event._id)
        .then(() => {
          eventBus.$emit("show-toast", {
            body: messages.events.eventDeletedSuccess,
            title: messages.generic.success
          });
          this.events = this.events.filter(e => e._id !== event._id);
          this.loading = false;
        })
        .catch(e => {
          eventBus.$emit("show-toast", {
            body: e.message,
            title: messages.generic.error,
            type: ToastType.ERROR
          });
          this.loading = false;
        });
    },
    onSearchParamsChange(param = "") {
      this.loading = true;
      this.$refs.upcomingOnlineEvents.loadEvents(param);
      this.$refs.upcomingOfflineEvents.loadEvents(param);
      this.$refs.pastEvents.loadEvents(param);

      eventService.searchEventsBy(param).then(events => {
        this.loading = false;
        this.events = events;
      });
    },
    refreshPage() {
      this.loading = true;
      eventService.searchEventsBy().then(events => {
        this.events = events;
        this.loading = false;
      });
    },
    showDialog() {
      if (this.signedInUser == null) {
        this.$router.push("/signin");
      } else {
        this.$router.push("/event/form/new");
      }
    },
    canModify(event) {
      return (
        this.signedInUser &&
        event.createdBy &&
        event.createdBy.username === this.signedInUser.username
      );
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
  border-left: 1px solid #114273;
  flex-direction: column;
  display: flex;
  text-align: start;
  padding: 10px;
  cursor: pointer;
}
</style>
