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
      <a @click="joinMeeting(meeting.meetingId, meeting.title)">{{ meeting.title }}</a>
      <span class="created-by">{{ meeting.createdBy ? `by ${meeting.createdBy.username}` : '' }}</span>
    </div>
  </div>
</template>
<script>
import eventService from "@/services/event.service";
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";

export default {
  name: 'EventMeetings',
  props: {
    eventId: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      meetingTitle: '',
      meetings: [],
      interval: null,
    }
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
    }, 5000);
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  methods: {
    getMeetings() {
      eventService.getMeetings(this.eventId).then(meetings => {
        this.meetings = meetings;
      });
    },
    createMeetings() {
      if (this.signedInUser == null) {
        this.$router.push("/signin");
        return;
      }
      eventService.createMeeting(this.eventId, this.meetingTitle , 'jitsi')
      .then(res => {
        this.joinMeeting(res.meetingId, this.meetingTitle);
      }).catch((e) => {
        eventBus.$emit('show-toast', {body: e.message, title: messages.generic.error, type: ToastType.ERROR});
      });
    },
    joinMeeting(meetingId, title) {
      if (this.signedInUser == null) {
        this.$router.push("/signin");
        return;
      }
      this.$router.push(`/join-meeting/${meetingId}?eventId=${this.eventId}&title=${title}`);
    }
  }
}
</script>
<style lang="scss" scoped>
.created-by {
  color: #8f8f8f;
  font-size: 15px;
  padding-left: 10px;
}
</style>