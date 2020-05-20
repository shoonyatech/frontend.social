<template>
  <div class="event-strip">
    <b-row>
      <!--TODO: Style this component using flexbox instead of floats-->
      <b-col md="12">
        <span
          v-if="canModify"
          class="event-action"
          @click.prevent="deleteEvent(event)"
        >
          <img
            :src="`/images/delete.svg`"
            class="icon-button"
            alt="delete"
          >
        </span>
        <span
          v-if="canModify"
          class="event-action"
          @click.prevent="editEvent(event)"
        >
          <img
            :src="`/images/edit.svg`"
            class="icon-button"
            alt="edit"
          >
        </span>

        <a v-if="!isReadOnly">
          <span @click.prevent="onTitleClick">{{ event.title }}</span>
          <span class="event-type capsule">{{ getEventTypeName(event.type) }}</span>
          <span
            v-if="event.isOnline"
            class="event-type capsule online"
          >online</span>

          <span
            v-if="event.isPrivate"
            class="event-type capsule private"
          >private</span>
        </a>
        <div v-else>
          <span @click.prevent="onTitleClick">{{ event.title }}</span>
          <span class="event-type capsule">{{ getEventTypeName(event.type) }}</span>
          <span
            v-if="event.isOnline"
            class="event-type capsule online"
          >online</span>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="8">
        <div class="event-date">
          <span>
            {{
              event.dateFrom | moment("DD MMM YYYY HH:MM")
            }}
          </span>
          <span v-if="event.dateTo">-</span>
          <span v-if="event.dateTo">
            {{
              event.dateTo | moment("DD MMM YYYY HH:MM")
            }}
          </span>
          <span event.timezone>
            {{ event.timezone }}
          </span>
          <span v-if="!event.isOnline">
            in
            <a :href="'/city/' + event.city + '/' + event.country">
              <span class="city">{{ event.city }}, {{ event.country }}</span>
            </a>
          </span>
        </div>
        <SkillTags
          v-if="event.relatedSkills"
          :skills="event.relatedSkills"
        />
      </b-col>
      <b-col md="4">
        <div
          v-if="!isReadOnly"
          class="links icon-links"
        >
          <icon-link
            v-if="event.youtube"
            icon="/images/youtube.svg"
            :url="event.youtube"
          />
          <icon-link
            v-if="event.twitter"
            icon="/images/twitter.svg"
            :url="event.twitter"
          />
          <icon-link
            v-if="event.website"
            icon="/images/web.svg"
            :url="event.website"
          />
          <icon-link
            v-if="event.onlineLink"
            icon="/images/play.svg"
            :url="event.onlineLink"
          />
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        Event Link:
        <span class="eventLink">{{ eventLink }}</span>
      </b-col>
    </b-row>
    <b-row v-if="event.isRequiresRegistration">
      <b-col md="10">
        <div class="registration">
          This is a close event that requires registration
        </div>
      </b-col>
      <b-col md="2">
        <button @click="eventRegistration()">
          Register
        </button>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <div
          ref="description"
          class="event-description"
          :class="{
            expanded: isExpanded,
            collapsed: isOverflow
          }"
        >
          <div v-html="event.description" />
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        v-if="showArrow"
        md="12"
        class="arrow-container"
      >
        <Arrow
          :is-expanded="isExpanded"
          :on-click="toggleArrow"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import IconLink from "@/components/common/IconLink";
import SkillTags from "@/components/Skills/SkillTags";
import Arrow from "../Arrow/Arrow";
import { getEventTypeName } from "@/utilities/utils";
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";
import eventService from "@/services/event.service";
const clipboardy = require("clipboardy");
export default {
  name: "EventStrip",
  components: {
    IconLink,
    SkillTags,
    Arrow
  },
  props: {
    event: {
      type: Object
    },
    isReadOnly: {
      type: Boolean
    },
    canModify: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isExpanded: false,
      isOverflow: false,
      showArrow: false
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
    eventLink() {
      return window.origin + "/event/" + this.event._id;
    }
  },
  mounted() {
    var element = this.$refs.description;
    if (element) {
      this.isOverflow =
        element.offsetHeight < element.scrollHeight ||
        element.offsetWidth < element.scrollWidth;
      this.showArrow = this.isOverflow;
    }
  },
  methods: {
    toggleArrow() {
      this.isExpanded = !this.isExpanded;
      this.isOverflow = !this.isOverflow;
    },
    deleteEvent(event) {
      this.$emit("delete", event);
    },
    editEvent(event) {
      this.$emit("edit", event);
    },
    onTitleClick() {
      this.$router.push(`/event/${this.event._id}`);
    },
    getEventTypeName: getEventTypeName,
    eventRegistration() {
      if (this.signedInUser == null) {
        eventBus.$emit("show-toast", {
          body: "Please login to register for the event.",
          title: messages.generic.error,
          type: ToastType.ERROR
        });
      } else {
        var payload = {
          eventId: this.event._id
        };
        eventService
          .registerUser(this.payload)
          .then(res => {
            eventBus.$emit("show-toast", {
              body: res.message,
              title: messages.generic.success
            });
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
    copyLink() {
      clipboardy.writeSync(this.eventLink);
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

.event-type {
  font-size: 0.65rem;
  color: #2c3e50;
  float: right;

  &.online {
    background: #c50606;
    color: white;
  }

  &.private {
    background: #d44444;
    color: white;
  }
}

.event-action {
  float: right;
}

.event-description {
  font-size: 0.8rem;
  text-align: start;
  max-height: 100px;
  overflow: hidden;
}

.collapsed {
  -webkit-mask-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 1)),
    to(rgba(0, 0, 0, 0))
  );
}

.expanded {
  max-height: unset;
}

.arrow-container {
  display: flex;
  justify-content: center;
  align-content: center;
}

.event-skills {
  font-size: 0.65rem;
  color: #2c3e50;
}

.event-date {
  font-size: 0.65rem;
  color: var(--fs-primary-color);;
}

.icon-links {
  display: flex;
  flex-direction: row-reverse;
}
.registration {
  color: #d44444;
}
.eventLink {
  font-weight: bold;
  word-break: break-all;
}
</style>
