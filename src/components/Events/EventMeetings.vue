<template>
  <div>
    <div v-if="isEditable">
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
      class="meeting-row"
    >
      <div>
        <a
          @click="validateAndJoinMeeting(meeting)"
        >{{ meeting.title }}
          <span class="user-count">({{ meeting.userCount }})</span></a>
        <img
          v-if="meeting.isPrivate"
          src="/images/lock.svg"
          alt="private"
          class="icon-button"
        >
        <span class="created-by">
          {{ meeting.createdBy ? `by ${meeting.createdBy.username}` : "" }}
        </span>
      </div>
      <div
        v-if="canModify(meeting) && isEditable"
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
import meetingService from "@/services/meeting.service";
import userPageService from "@/services/user-page.service";
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";
import { uniqBy } from "lodash";

export default {
  name: "EventMeetings",
  components: {MeetingSettings},
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
    },
    isEditable: {
      type: Boolean,
      default: true
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
    },
    eventId() {
      return this.type === 'EVENT' ? this.id : null;
    },
    userId() {
      return this.type === 'USER' ? this.id : null;
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
      const promise = this.type === 'EVENT' ? meetingService.getMeetingsByEventId(this.id) 
        : meetingService.getMeetingsByUserId(this.id);

      promise.then(meetings => {
        let userCount = 0;
        this.meetings = meetings.map(m => ({
          ...m
        }));
        this.meetings.map(m => {
          const url = encodeURI(
            `https://www.frontend.social/join-meeting/${m.meetingId}?${this.constructQueryParams(m.title)}`
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
      meetingService
        .createMeeting({eventId: this.eventId, userId: this.userId, title: this.meetingTitle, isPrivate: false})
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
    validateAndJoinMeeting(meeting) {
      let canJoinMeeting = false;
      if (!meeting.isPrivate || this.canModify(meeting)) {
        canJoinMeeting = true;
      } else {
        const allowedUsers = meeting.allowedUsers || [];
        canJoinMeeting = allowedUsers.some(x => x.username = this.signedInUser.username);
      }

      if (canJoinMeeting) {
        this.joinMeeting(meeting.meetingId, meeting.title);
      }
    },
    joinMeeting(meetingId, title) {
      if (this.signedInUser == null) {
        this.$router.push("/signin");
        return;
      }
      this.$router.push(
        `/join-meeting/${meetingId}?${this.constructQueryParams(title)}`
      );
    },
    onSettingsClick(meeting) {
      this.meetingToEdit = meeting;
      this.showSettingsDialog = true;
      console.log(meeting);
    },
    onDeleteClick(meeting) {
       meetingService
        .deleteMeeting(meeting._id)
        .then(() => {
          this.getMeetings();
        })
    },
    onUpdateMeeting(meeting) {
       meetingService
        .updateMeeting(this.meetingToEdit._id, {...meeting, eventId: this.eventId, userId: this.userId})
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
    constructQueryParams(title) {
      return `eventId=${this.eventId || ''}&userId=${this.userId || ''}&title=${title}`
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

.meeting-row {
  display: flex;
  justify-content: space-between;
}
</style>