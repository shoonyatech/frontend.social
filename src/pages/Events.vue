<template>
  <div class="events">
    <Loader v-show="loading" />
    <b-container>
      <b-row
        v-infinite-scroll="loadEvents"
        infinite-scroll-disabled="isDisableInfiniteScroll"
        infinite-scroll-distance="limit"
      >
        <b-col md="9">
          <h1>
            <span>Frontend Conference and Meetups</span>
            <button @click="showDialog()">
              + Add Event
            </button>
          </h1>
          <div class="events">
            <div v-if="signedInUser">
              <h1>
                My Events
                <span
                  v-if="!infiniteScroll"
                  class="navigation-button"
                >
                  <button
                    :disabled="events.length === 0"
                    @click="loadEvents('','next')"
                  >&#8250;</button>
                  <button
                    :disabled="page === 1"
                    @click="loadEvents('','previous')"
                  >&#8249;</button>
                </span>
              </h1>
              <EventStrip
                v-for="event in events"
                :key="event._id"
                :event="event"
                :can-modify="canModify(event)"
                @edit="onEditEvent"
                @delete="onDeleteEvent"
              />
            </div>
            <AllEvents
              :infinite-scroll="false"
              :limit="20"
            />
            <!-- <UpcomingOnlineEvents
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
            /> -->
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
import AllEvents from "@/components/Events/AllEvents";

// import UpcomingOnlineEvents from "@/components/Events/UpcomingOnlineEvents";
// import UpcomingOfflineEvents from "@/components/Events/UpcomingOfflineEvents";
// import PastEvents from "@/components/Events/PastEvents";

import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";

export default {
  name: "Events",
  components: {
    EventStrip,
    EventFilters,
    AllEvents,
    // UpcomingOnlineEvents,
    // UpcomingOfflineEvents,
    // PastEvents
  },
  props: {
    infiniteScroll: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      events: [],
      loading: false,
      page: 1
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
    isDisableInfiniteScroll() {
      return !this.infiniteScroll || this.busy;
    }
  },
  created() {
    setTimeout(() => {
      if (!this.infiniteScroll) {
        this.loadEvents();
      }
    }, 500);
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
      // this.$refs.upcomingOnlineEvents.loadEvents(param);
      // this.$refs.upcomingOfflineEvents.loadEvents(param);
      // this.$refs.pastEvents.loadEvents(param);
      this.loadEvents(param);
    },
    refreshPage() {
      // this.$refs.upcomingOnlineEvents.loadEvents();
      // this.$refs.upcomingOfflineEvents.loadEvents();
      // this.$refs.pastEvents.loadEvents();
      this.loadEvents();
    },
    showDialog() {
      if (this.signedInUser == null) {
        this.$router.push("/signin");
      } else {
        this.$router.push("/event/form/new");
      }
    },
    canModify(event) {
      if (!this.signedInUser) return false;

      const username = this.signedInUser.username.toLowerCase();
      const admins = event.adminUsers || [];
      return (event.createdBy && event.createdBy.username.toLowerCase() === username) || admins.some(x => x.username.toLowerCase() === username);
    },
    loadEvents(param, action) {
      switch (action) {
        case "previous":
          action = -1;
          break;
        case "next":
          action = 1;
          break;
        default:
          action = 0;
          break;
      }
      let query = "";
      if (this.signedInUser) {
        query = "&username=" + this.signedInUser.username;
      }

      this.busy = false;
      this.limit = this.limit || 10;
      this.page = action + this.page || 1;

      eventService
        .getMyEvents(param + query, this.limit, this.page)
        .then(events => {
          if (!this.infiniteScroll) {
            this.events = events;
          } else {
            this.events = this.events.concat(events);
            if (events.length > 0) {
              ++this.page;
            }
          }
          this.busy = true;
          this.loading = false;
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
  border-left: 1px solid #114273;
  flex-direction: column;
  display: flex;
  text-align: start;
  padding: 10px;
  cursor: pointer;
}
</style>
