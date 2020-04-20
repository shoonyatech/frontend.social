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
    }
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    }
  },
  mounted() {
    this.getMeetings();
  },
  methods: {
    getMeetings() {
      eventService.getMeetings(this.eventId).then(meetings => {
        this.meetings = meetings;
      });
    },
    createMeetings() {
      eventService.createMeeting(this.eventId, this.meetingTitle , 'jitsi')
      .then(res => {
        this.joinMeeting(res.meetingId, 1);
      }).catch((e) => {
        eventBus.$emit('show-toast', {body: e.message, title: messages.generic.error, type: ToastType.ERROR});
      });
    },
    joinMeeting(meetingId, role) {
      this.$router.push(`/join-meeting?id=${meetingId}&name=${this.signedInUser.username}&role=${role}`);
    }
  }
}
</script>
<style lang="scss" scoped>

</style>