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
      <img
        v-if="meeting.isPrivate"
        src="/images/lock.svg"
        alt="private"
        class="icon-button"
      >
      <span class="created-by">{{
        isPrivate
          ? "by You"
          : meeting.createdBy
            ? `by ${meeting.createdBy.username}`
            : ""
      }}</span>
      <div
        v-if="canModify(meeting)"
        class="float-right"
      >
        <img
          src="/images/settings.svg"
          alt="settings"
          class="icon-button"
          @click="onSettingsClick(meeting)"
        >
        <img
          src="/images/delete.svg"
          alt="delete"
          class="icon-button"
          @click="onDeleteClick(meeting)"
        >
      </div>
    </div>

    <MeetingSettings
      v-if="meetingToEdit"
      :meeting="meetingToEdit"
      @ok="onUpdateMeeting"
      @cancel="onUpdateCancel"
    />
  </div>
</template>
<script>
import MeetingSettings from './MeetingSettings.vue';
import eventService from "@/services/event.service";
import userPageService from "@/services/user-page.service";
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";
import { uniqBy } from "lodash";

export default {
  name: "EventMeetings",
  components: {MeetingSettings},
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
      showSettingsDialog: false,
      interval: null,
      meetingToEdit: null,
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
    },
    onSettingsClick(meeting) {
      this.meetingToEdit = meeting;
      this.showSettingsDialog = true;
      console.log(meeting);
    },
    onDeleteClick(meeting) {
       eventService
        .deleteMeeting(this.eventId, meeting._id)
        .then(() => {
          this.getMeetings();
        })
    },
    onUpdateMeeting(meeting) {
       eventService
        .updateMeeting(this.eventId, this.meetingToEdit._id, meeting)
        .then(() => {
          this.meetingToEdit = null;
          this.getMeetings();
        })
    }, 
    onUpdateCancel() {
      this.meetingToEdit = null;
    },
    canModify(meeting) {
      return (
        this.signedInUser &&
        meeting.createdBy &&
        meeting.createdBy.username === this.signedInUser.username
      );
    },
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