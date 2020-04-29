<template>
  <div class="host">
    <h1>
      Upcoming Events
      <!-- <span v-if="!infiniteScroll" class="navigation-button">
        <button :disabled="events.length === 0" @click="loadEvents(1)">Next</button>
        <button :disabled="page === 1" @click="loadEvents(-1)">Previous</button>
      </span> -->
    </h1>

    <div
      v-infinite-scroll="loadEvents"
      infinite-scroll-disabled="isDisableInfiniteScroll"
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
      required: false
    },
    infiniteScroll: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      events: []
    };
  },
  computed: {
    isDisableInfiniteScroll() {
      return !this.infiniteScroll || this.busy;
    }
  },
  created() {
    if (!this.infiniteScroll) {
      this.loadEvents();
    }
  },
  methods: {
    loadEvents(action) {
      this.busy = false;
      this.limit = this.limit || 10;
      this.page = action + this.page || this.page || 1;

      eventService
        .getUpcomingEvents(this.skill, this.limit, this.page)
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

.navigation-button {
  float: right;
}
</style>