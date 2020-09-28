<template>
  <div class="host">
    <div class="value-list">
      <div
        v-for="(event, index) in events"
        :key="index"
        class="events"
      >
        <EventStrip
          :event="event"
          class="event-strip-selected"
        />
        <div
          v-if="isEditable"
          class="delete"
          :data-index="index"
          @click="deleteItem(event)"
        >
          <img
            :src="`/images/delete.svg`"
            class="icon-button"
            alt="Delete"
          >
        </div>
      </div>
      <div v-if="isEditable">
        <input
          v-if="isEditable"
          v-model="searchText"
          placeholder="Search conference or meetup name"
          class="search-box"
          @input="onSearchTextChange"
        >
        <span
          v-for="(event, index) in options"
          :key="index"
          class="value"
        >
          <div
            class="select-event"
            @click="add(event)"
          >
            <EventStrip
              :event="event"
              :is-read-only="true"
            />
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import EventStrip from '@/components/Events/EventStrip';

import eventService from '@/services/event.service';

export default {
	components: { EventStrip },
	props: {
		label: {
			type: String,
			default: '',
		},
		eventIds: {
			type: Array,
			default: () => [],
		},
		isEditable: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			events: [],
			options: [],
			searchText: '',
		};
	},
	created() {
		if (this.eventIds && this.eventIds.length) {
			eventService.getEventWithIds(this.eventIds).then((events) => {
				this.events = events;
			});
		}
	},
	methods: {
		add: function (event) {
			this.events.push(event);
			this.eventIds.push(event._id);
			this.$emit('change', this.eventIds);
		},
		deleteItem: function (event) {
			this.events.splice(this.events.indexOf(event), 1);
			this.eventIds.splice(this.eventIds.indexOf(event._id), 1);
			this.$emit('change', this.eventIds);
		},
		onSearchTextChange: function (e) {
			if (this.searchText) {
				eventService.searchEvents(this.searchText).then((events) => {
					this.options = events;
				});
			} else {
				this.options = [];
			}
		},
	},
};
</script>

<style scoped lang="scss">
.host {
	display: flex;
	width: 100%;
	text-align: left;
}

.label {
	color: #114273;
	width: 7rem;
	min-width: 7rem;
}

.value {
	display: flex;
}

.value-list {
	flex: 1 1 auto;
}

.add {
	flex: 0 0 auto;
	margin: 2px 0 0 10px;
	height: 1.5rem;
}

.events {
	display: flex;
	width: 100%;
}

.event-strip-selected {
	flex: 1 1 auto;
}

.delete {
	flex: 1 1 auto;
	margin-left: 10px;
}

.select-event {
	width: 100%;
	cursor: pointer;

	&:hover {
		background-color: #1142736c;
	}
}

.search-box {
	width: 100%;
}
</style>
