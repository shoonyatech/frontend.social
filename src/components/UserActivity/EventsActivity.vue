<template>
  <div class="learn">
    <b-container>
      <b-row>
        <b-col
          md="12"
          class="text"
        >
          Event Page : {{ events.length }}
          <br>
          <UserEventActivity
            v-for="(event, index1) in events"
            :key="index1"
            :event="event"
            :profile="event.createdBy"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UserEventActivity from '@/components/Events/UserEventActivity';
import eventService from '@/services/event.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
export default {
	name: 'EventActivity',
	components: { UserEventActivity },
	props: {
		dateCreated: {
			type: String,
			default: () => {},
		},
	},
	data() {
		return {
			events: [],
		};
	},
	created() {
		eventService
			.getEventsAddedOnDate(this.dateCreated)
			.then((event) => {
				this.events = event;
			})
			.catch((e) => {
				eventBus.$emit('show-toast', {
					body: e.message,
					title: messages.generic.error,
					type: ToastType.ERROR,
				});
			});
	},
};
</script>

<style scoped lang="scss">
.text {
	color: rgb(48, 190, 238);
}
</style>
