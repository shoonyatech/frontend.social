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
          <div>
            <div
              v-infinite-scroll="loadEvents"
              :infinite-scroll-distance="limit"
              :infinite-scroll-disabled="isDisableInfiniteScroll"
            >
              <div v-if="events.length">
                <EventStrip
                  v-for="(event, index) in events"
                  :key="index"
                  :event="event"
                  :can-modify="canModify(event)"
                  @delete="onDeleteEvent"
                  @edit="onEditEvent"
                />
              </div>
              <div v-else>
                No events found!
              </div>
            </div>
          </div>

          <div class="center-content">
            <button
              class="mt-4"
              @click="showDialog()"
            >
              + Add Event
            </button>
          </div>
          <div class="host" />
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
import eventService from '@/services/event.service';
import EventStrip from '@/components/Events/EventStrip';
import EventFilters from '@/components/Events/EventFilters';

import eventBus from '@/utilities/eventBus';
import { ToastType, messages, EventPageLimit } from '@/constants/constants';

export default {
	name: 'Events',
	components: {
		EventStrip,
		EventFilters,
	},
	props: {},
	data() {
		return {
			events: [],
			loading: false,
			page: 1,
			limit: EventPageLimit,
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
		isDisableInfiniteScroll() {
			return !this.busy;
		},
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
					eventBus.$emit('show-toast', {
						body: messages.events.eventDeletedSuccess,
						title: messages.generic.success,
					});
					this.events = this.events.filter((e) => e._id !== event._id);
					this.loading = false;
				})
				.catch((e) => {
					eventBus.$emit('show-toast', {
						body: e.message,
						title: messages.generic.error,
						type: ToastType.ERROR,
					});
					this.loading = false;
				});
		},
		onSearchParamsChange(param = '') {
			this.loading = true;
			this.loadEvents(param, true);
		},
		showDialog() {
			if (this.signedInUser == null) {
				this.$router.push('/signin');
			} else {
				this.$router.push('/event/form/new');
			}
		},
		canModify(event) {
			if (!this.signedInUser) return false;

			if (this.$store.getters.isAdmin) return true;

			const username = this.signedInUser.username.toLowerCase();
			const admins = event.adminUsers || [];
			return (
				(event.createdBy &&
					event.createdBy.username.toLowerCase() === username) ||
				admins.some((x) => x.username.toLowerCase() === username)
			);
		},
		loadEvents(param = '', filter = false) {
			let query = '';

			this.busy = true;
			this.limit = this.limit || 10;
			this.page = filter ? 1 : this.page || 1;

			eventService.getEvents(param, this.limit, this.page).then((events) => {
				if (filter) {
					this.events = events;
				} else this.events = this.events.concat(events);
				if (events.length > 0) {
					++this.page;
				}
				this.busy = false;
				this.loading = false;
			});
		},
	},
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
