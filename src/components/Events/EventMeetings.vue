<template>
  <div>
    <div>
      <input
        v-model="meetingTitle"
        type="text"
        placeholder="Create Group Topics"
      >
      <button
        :disabled="!meetingTitle"
        @click="createMeetings"
      >
        Create New Topic
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
      eventService.createMeeting(this.eventId, this.meetingTitle)
      .then(res => {
        this.joinMeeting(res.meetingId, 1);
      }).catch(() => {
        // TODO: Add error handling
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