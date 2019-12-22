<template>
  <div class="host">
    <span class="label">{{ label }}</span>
    <div class="value-list">
      <div class="events">
        <EventStrip
          v-for="(event, index) in events"
          :key="index"
          :event="event"
        />
      </div>
      <span
        v-for="(value, index) in events"
        :key="index"
        class="value"
      >
        <!-- <EventStrip :key="index" :event="value" /> -->

        <EditableValue
          :value="value"
          :is-editable="isEditable"
          :index="index"
          placeholder="Search conference or meetup name"
          @change="onChange"
        />
        <!-- <button
          v-if="isEditable"
          class="delete"
          :data-index="index"
          @click="deleteItem"
        >
          X
        </button> -->
      </span>
    </div>
    <!-- <button v-if="isEditable" class="add" @click="add">
      +
    </button> -->
  </div>
</template>

<script>
import EditableValue from "@/components/common/EditableValue";
import EventStrip from "@/components/Events/EventStrip";

export default {
  components: { EditableValue, EventStrip },
  props: {
    label: {
      type: String,
      default: ""
    },
    eventIds: {
      type: Array,
      default: () => [""]
    },
    isEditable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      events: []
    };
  },
  methods: {
    add: function(event) {
      this.events.push("");
    },
    deleteItem: function(event) {
      const index = event.target.dataset.index;
      this.events.splice(index, 1);
      this.$emit("change", this.events);
    },
    onChange: function({ val, index }) {
      if (index < this.events.length) {
        this.events[index] = val;
      } else {
        this.events.push(val);
      }
      this.$emit("change", this.events);
    }
  }
};
</script>

<style scoped lang="scss">
.host {
  display: flex;
  width: 100%;
  padding-left: 10px;
  text-align: left;
}

.label {
  color: #aada18;
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

.delete {
  flex: 0 0 auto;
  margin: 2px 0 0 10px;
  height: 1.5rem;
  background-color: rgb(212, 68, 68);
}
</style>
