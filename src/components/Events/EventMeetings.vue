<template>
  <div>
    <div>
      <input
        v-model="meetingTitle"
        type="text"
        placeholder="Topic"
      >
      <button
        :disabled="!meetingTitle"
        @click="createMeetings"
      >
        Create video call
      </button>
    </div>
    <div
      v-for="meeting in meetings"
      :key="meeting._id"
    >
      <a
        @click="joinMeeting(meeting.meetingId, meeting.title)"
      >{{ meeting.title }}
        <span class="user-count">({{ meeting.userCount }})</span></a>
      <span class="created-by">{{
        isPrivate
          ? "by You"
          : meeting.createdBy
            ? `by ${meeting.createdBy.username}`
            : ""
      }}</span>
    </div>
  </div>
</template>
<script>
import eventService from "@/services/event.service";
import userPageService from "@/services/user-page.service";
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";
import { uniqBy } from "lodash";

export default {
  name: "EventMeetings",
  props: {
    eventId: {
      type: String,
      required: true
    },
    isPrivate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      meetingTitle: "",
      meetings: [],
      interval: null
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    }
  },
  mounted() {
    this.getMeetings();
    this.interval = setInterval(() => {
      this.getMeetings();
    }, 10000);
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  methods: {
    getMeetings() {
      const promise = this.isPrivate
        ? eventService.getPrivateMeetings(this.eventId)
        : eventService.getMeetings(this.eventId);
      promise.then(meetings => {
        let userCount = 0;
        this.meetings = meetings.map(m => ({
          ...m
        }));
        this.meetings.map(m => {
          const url = encodeURI(
            `https://www.frontend.social/join-meeting/${m.meetingId}?eventId=${this.eventId}&title=${m.title}`
          );
          userPageService.getOnlineUsersCount(url).then(res => {
            let meeting = this.meetings.find(mt => mt._id === m._id);
            if (meeting) {
              meeting.userCount = res.userCount;
              this.$forceUpdate();
            }
          });
        });
      });
    },
    createMeetings() {
      eventService
        .createMeeting(this.eventId, this.meetingTitle, "jitsi", this.isPrivate)
        .then(res => {
          this.joinMeeting(res.meetingId, this.meetingTitle);
        })
        .catch(e => {
          eventBus.$emit("show-toast", {
            body: e.message,
            title: messages.generic.error,
            type: ToastType.ERROR
          });
        });
    },
    joinMeeting(meetingId, title) {
      if (this.signedInUser == null) {
        this.$router.push("/signin");
        return;
      }
      this.$router.push(
        `/join-meeting/${meetingId}?eventId=${this.eventId}&title=${title}`
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.created-by {
  color: #8f8f8f;
  font-size: 15px;
  padding-left: 10px;
}

.user-count {
  color: #8f8f8f;
}
</style>