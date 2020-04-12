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
            <EventStrip
              v-for="(event, index) in events"
              :key="index"
              :event="event"
              :can-modify="canModify(event)"
              @edit="onEditEvent"
              @delete="onDeleteEvent"
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
            :event-details="editedEvent"
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

import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";

export default {
  name: "Events",
  components: { EventStrip, EventFilters, AddEvent },
  data() {
    return {
      events: [],
      showAddEventDialog: false,
      editedEvent: null
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    }
  },
  created() {
    eventService.searchEventsBy().then(events => {
      this.events = events;
    });

  },
  methods: {
    onEditEvent(event) {
      this.editedEvent = event;
      this.showAddEventDialog = true;
    },
    onDeleteEvent(event) {
      eventService.deleteEvent(event._id)
        .then(() => {
          eventBus.$emit('show-toast', {body: messages.events.eventDeletedSuccess, title: messages.generic.success});
          this.events = this.events.filter(e => e._id !== event._id);
        }).catch(e => {
          eventBus.$emit('show-toast', {body: e.message, title: messages.generic.error, type: ToastType.ERROR});
        });
    },
    onSearchParamsChange(param = "") {
      eventService.searchEventsBy(param).then(events => {
        this.events = events;
      });
    },
    refreshPage() {
      this.editedEvent = null;
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
    },
    canModify(event) {
      return event.createdBy.username === this.signedInUser.username
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
