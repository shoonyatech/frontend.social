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
      <a @click="joinMeeting(meeting.meetingId, 0)">{{ meeting.title }}</a>
      {{ meeting.createdBy ? `(${meeting.createdBy.username})` : '' }}
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
        this.joinMeeting(res.meetingId, 1);
      }).catch((e) => {
        eventBus.$emit('show-toast', {body: e.message, title: messages.generic.error, type: ToastType.ERROR});
      });
    },
    joinMeeting(meetingId, role) {
      if (this.signedInUser == null) {
        this.$router.push("/signin");
        return;
      }
      this.$router.push(`/join-meeting?id=${meetingId}&name=${this.signedInUser.username}&role=${role}`);
    }
  }
}
</script>
<style lang="scss" scoped>

</style>