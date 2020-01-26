<template>
  <div>
    <KeyValue
      label="Event Title"
      :is-editable="true"
      @change="onTitleChange"
    />
    <KeyValue
      label="Description"
      placeholder="Optional"
      :is-editable="true"
      :multiline="true"
      @change="onDescriptionChange"
    />

    <b-row class="row">
      <b-col
        md="3"
        sm="12"
      >
        <span class="label">Event Type</span>
      </b-col>
      <b-col
        md="9"
        sm="12"
      >
        <span class="radio">
          <input
            v-model="event.type"
            class="radio-input"
            type="radio"
            value="c"
          >
          <span class="radio-label"> Conference</span>
        </span>
        <span class="radio">
          <input
            v-model="event.type"
            class="radio-input"
            type="radio"
            value="m"
          >
          <span class="radio-label"> Meetup</span>
        </span>
      </b-col>
    </b-row>

    <b-row class="row">
      <b-col
        md="3"
        sm="12"
      >
        <span class="label">Location</span>
      </b-col>
      <b-col
        md="9"
        sm="12"
      >
        <edit-city
          :edit-mode="true"
          :city="event.city"
          :country="event.country"
          @change="onCityChange"
        />
      </b-col>
    </b-row>

    <b-row class="row">
      <b-col
        md="3"
        sm="12"
      >
        <span class="label">Date</span>
      </b-col>
      <b-col
        md="3"
        sm="12"
      >
        <span class="date">Start</span>
      </b-col>
      <b-col
        md="6"
        sm="12"
      >
        <input
          type="date"
          class="editable-value"
          @change="onStartDateChange"
        >
      </b-col>
    </b-row>

    <b-row class="row">
      <b-col
        md="3"
        sm="12"
      >
        <span />
      </b-col>
      <b-col
        md="3"
        sm="12"
      >
        <span class="date">End (optional)</span>
      </b-col>
      <b-col
        md="6"
        sm="12"
      >
        <input
          type="date"
          class="editable-value"
          @change="onEndDateChange"
        >
      </b-col>
    </b-row>

    <key-multi-value
      label="Technologies"
      :is-editable="true"
      :auto-select="skillsLookup"
      @change="onSkillsChange"
    />

    <KeyValue
      label="Website"
      :is-editable="true"
      placeholder="Optional"
      @change="onWebsiteChange"
    />
    <KeyValue
      label="Twitter"
      :is-editable="true"
      placeholder="Optional"
      @change="onTwitterChange"
    />
    <KeyValue
      label="Youtube"
      :is-editable="true"
      placeholder="Optional"
      @change="onYoutubeChange"
    />
    <KeyValue
      label="Facebook"
      :is-editable="true"
      placeholder="Optional"
      @change="onFacebookChange"
    />
    <KeyValue
      label="Instagram"
      :is-editable="true"
      placeholder="Optional"
      @change="onInstagramChange"
    />
    <KeyValue
      label="LinkedIn"
      :is-editable="true"
      placeholder="Optional"
      @change="onLinkedinChange"
    />
    <KeyValue
      label="Schedule"
      :is-editable="true"
      placeholder="Optional"
      @change="onScheduleChange"
    />

    <div class="action-buttons">
      <button
        class="save-button"
        @click="save"
      >
        Save
      </button>
      <button @click="cancel">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import KeyValue from "@/components/common/KeyValue";
import KeyMultiValue from "@/components/common/KeyMultiValue";
import EditCity from "@/components/City/EditCity";

import eventService from "@/services/event.service";
import skillService from "@/services/skill.service";

export default {
  name: "AddEvent",
  components: {
    KeyValue,
    KeyMultiValue,
    EditCity
  },
  data() {
    return {
      event: {
        title: "",
        description: "",
        type: "c",
        city: null,
        country: null,
        dateFrom: null,
        dateTo: null
      },
      skillsLookup: []
    };
  },
  async created() {
    this.skillsLookup = (await skillService.fetchSkills()).map(s => s.name);
  },
  methods: {
    onTitleChange(e) {
      this.event.title = e.value;
    },
    onDescriptionChange(e) {
      this.event.description = e.value;
    },
    onCityChange(city) {
      this.event.city = city.name;
      this.event.country = city.country;
    },
    onStartDateChange(e) {
      this.event.dateFrom = e.currentTarget.valueAsDate;
    },
    onEndDateChange(e) {
      this.event.dateTo = e.currentTarget.valueAsDate;
    },
    onSkillsChange: function(skills) {
      this.event.relatedSkills = skills;
    },
    onWebsiteChange(e) {
      this.event.website = e.value;
    },
    onTwitterChange(e) {
      this.event.twitter = e.value;
    },
    onYoutubeChange(e) {
      this.event.youtube = e.value;
    },
    onFacebookChange(e) {
      this.event.facebook = e.value;
    },
    onInstagramChange(e) {
      this.event.instagram = e.value;
    },
    onLinkedinChange(e) {
      this.event.linkedin = e.value;
    },
    onScheduleChange(e) {
      this.event.schedule = e.value;
    },
    close: function(val) {
      this.$emit("close", {});
    },
    save() {
      if (!this.event.title.length) {
        alert("Please specify event title");
        return;
      } else if (!this.event.dateFrom) {
        alert("Please specify start date of the event");
        return;
      } else if (!this.event.city || !this.event.country) {
        alert("Please specify city and country");
        return;
      }

      try {
        eventService.addEvent(this.event).then(() => {
          alert("Event added successfully!");
          this.close();
        });
      } catch (e) {
        alert(e.message);
      }
    },
    cancel() {
      this.close();
    }
  }
};
</script>

<style scoped lang="scss">
.event-strip {
  flex: 0 1 auto;
  font-size: 0.9rem;
  margin: 10px;
  width: 95%;
  height: 80px;
  position: relative;
  border-bottom: dotted 1px #aada20;
  padding-bottom: 10px;
  margin-right: 20px;
}

.event-line {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.event-skills {
  font-size: 0.65rem;
  color: #2c3e50;
}

.event-date {
  font-size: 0.65rem;
  color: #2c3e50;
}

.links {
  position: absolute;
  right: 10px;
  top: 20px;
}

.icon-links {
  display: flex;
  flex-direction: row;
}

.event-row {
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

.radio {
  margin-right: 1rem;
}

.end-date {
  margin-right: 1.5rem;
  display: inline-block;
}

.action-buttons {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 1rem;

  button {
    margin-left: 0.5rem;
  }
}

.row {
  margin-bottom: 15px;
}
</style>
