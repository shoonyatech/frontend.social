<template>
  <div>
    <KeyValue
      label="Event Title"
      :is-editable="true"
      :value="event.title"
      @change="onTitleChange"
    />
    <b-row class="row">
      <b-col
        md="3"
        sm="12"
      >
        <span class="label">Description</span>
      </b-col>
      <b-col
        md="9"
        sm="12"
      >
        <ckeditor
          v-model="event.description"
          :editor="editor"
          :config="editorConfig"
        />
      </b-col>
    </b-row>
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
          <span class="radio-label">Conference</span>
        </span>
        <span class="radio">
          <input
            v-model="event.type"
            class="radio-input"
            type="radio"
            value="m"
          >
          <span class="radio-label">Meetup</span>
        </span>
        <span class="radio">
          <input
            v-model="event.type"
            class="radio-input"
            type="radio"
            value="w"
          >
          <span class="radio-label">Workshop</span>
        </span>
        <span class="radio">
          <input
            v-model="event.type"
            class="radio-input"
            type="radio"
            value="i"
          >
          <span class="radio-label">Interview</span>
        </span>
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
          :value="event.dateFrom"
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
          :value="event.dateTo"
          @change="onEndDateChange"
        >
      </b-col>
    </b-row>

    <b-row class="row">
      <b-col
        md="3"
        sm="12"
      />
      <b-col
        md="9"
        sm="12"
      >
        <Checkbox
          id="online"
          label="Online"
          :is-checked="event.isOnline"
          :on-click="toggleIsOnline"
        />
      </b-col>
    </b-row>
    <KeyValue
      v-show="event.isOnline"
      label="Online Link"
      :is-editable="true"
      placeholder="Optional"
      :value="event.onlineLink"
      @change="onOnlineLinkChange"
    />

    <b-row
      v-show="!event.isOnline"
      class="row"
    >
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

    <key-multi-value
      label="Technologies"
      :is-editable="true"
      :auto-select="skillsLookup"
      :values="event.relatedSkills"
      @change="onSkillsChange"
    />

    <KeyValue
      label="Website"
      :is-editable="true"
      placeholder="Optional"
      :value="event.website"
      @change="onWebsiteChange"
    />
    <KeyValue
      label="Twitter"
      :is-editable="true"
      placeholder="Optional"
      :value="event.twitter"
      @change="onTwitterChange"
    />
    <KeyValue
      label="Youtube"
      :is-editable="true"
      placeholder="Optional"
      :value="event.youtube"
      @change="onYoutubeChange"
    />
    <KeyValue
      label="Facebook"
      :is-editable="true"
      placeholder="Optional"
      :value="event.facebook"
      @change="onFacebookChange"
    />
    <KeyValue
      label="Instagram"
      :is-editable="true"
      placeholder="Optional"
      :value="event.instagram"
      @change="onInstagramChange"
    />
    <KeyValue
      label="LinkedIn"
      :is-editable="true"
      placeholder="Optional"
      :value="event.linkedin"
      @change="onLinkedinChange"
    />
    <KeyValue
      label="Schedule"
      :is-editable="true"
      placeholder="Optional"
      :value="event.schedule"
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
import moment from "moment";
import KeyValue from "@/components/common/KeyValue";
import KeyMultiValue from "@/components/common/KeyMultiValue";
import EditCity from "@/components/City/EditCity";
import Checkbox from "@/components/Checkbox/Checkbox";

import eventService from "@/services/event.service";
import skillService from "@/services/skill.service";
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// TODO: Rename thie component to EventForm
export default {
  name: "AddEvent",
  components: {
    KeyValue,
    KeyMultiValue,
    EditCity,
    Checkbox
  },
  props: {
    eventDetails: {
      type: Object,
      optional: true,
      default: () => null
    }
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
        dateTo: null,
        relatedSkills: [""],
        website: "",
        twitter: "",
        youtube: "",
        facebook: "",
        instagram: "",
        linkedin: "",
        schedule: "",
        isOnline: false,
        onlineLink: ""
      },
      skillsLookup: [],
      editor: ClassicEditor,
      editorConfig: {}
    };
  },
  async created() {
    if (this.eventDetails) {
      this.intializeEvents();
    }
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
      const value = e.currentTarget.valueAsDate;
      this.event.dateFrom = value ? this.getFormattedDate(value) : null;
    },
    onEndDateChange(e) {
      const value = e.currentTarget.valueAsDate;
      this.event.dateTo = value ? this.getFormattedDate(value) : null;
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
    onOnlineLinkChange(e) {
      this.event.onlineLink = e.value;
    },
    toggleIsOnline() {
      this.event.isOnline = !this.event.isOnline;
    },
    close: function(val) {
      this.$emit("close", {});
    },
    intializeEvents() {
      this.event = {
        title: this.eventDetails.title || "",
        description: this.eventDetails.description || "",
        type: this.eventDetails.type || "c",
        city: this.eventDetails.city || null,
        country: this.eventDetails.country || null,
        dateFrom: this.eventDetails.dateFrom
          ? this.getFormattedDate(this.eventDetails.dateFrom)
          : null,
        dateTo: this.eventDetails.dateTo
          ? this.getFormattedDate(this.eventDetails.dateTo)
          : null,
        relatedSkills: this.eventDetails.relatedSkills
          ? [...this.eventDetails.relatedSkills]
          : [""],
        website: this.eventDetails.website || "",
        twitter: this.eventDetails.twitter || "",
        youtube: this.eventDetails.youtube || "",
        facebook: this.eventDetails.facebook || "",
        instagram: this.eventDetails.instagram || "",
        linkedin: this.eventDetails.linkedin || "",
        schedule: this.eventDetails.schedule || "",
        isOnline: this.eventDetails.isOnline || false,
        onlineLink: this.eventDetails.onlineLink || ""
      };
    },
    getFormattedDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    save() {
      if (!this.event.title.length) {
        alert("Please specify event title");
        return;
      } else if (!this.event.dateFrom) {
        alert("Please specify start date of the event");
        return;
      } else if (
        !this.event.isOnline &&
        (!this.event.city || !this.event.country)
      ) {
        alert("Please specify city and country");
        return;
      }

      if (this.eventDetails) {
        eventService
          .updateEvent(this.eventDetails._id, this.event)
          .then(() => {
            eventBus.$emit("show-toast", {
              body: messages.events.eventsUpdateSuccess,
              title: messages.generic.success
            });
            this.close();
          })
          .catch(e => {
            eventBus.$emit("show-toast", {
              body: e.message,
              title: messages.generic.error,
              type: ToastType.ERROR
            });
          });
      } else {
        eventService
          .addEvent(this.event)
          .then(() => {
            eventBus.$emit("show-toast", {
              body: messages.events.eventsAddSuccess,
              title: messages.generic.success
            });
            this.close();
          })
          .catch(e => {
            eventBus.$emit("show-toast", {
              body: e.message,
              title: messages.generic.error,
              type: ToastType.ERROR
            });
          });
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
  border-bottom: dotted 1px #114273;
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
  color: #114273;
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
