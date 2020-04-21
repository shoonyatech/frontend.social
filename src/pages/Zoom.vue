  
<template>
  <b-container>
    <b-breadcrumb :items="items" />
    <div class="zoom-container">
      <iframe
        v-if="zoomUrl"
        :src="zoomUrl"
      />
    </div>
    <b-row
      style="margin-top: 20px;"
    >
      <h1>Group Topics (Click to Join call)</h1>
    </b-row>
    <b-row>
      <b-col md="12">
        <EventMeetings
          :event-id="eventId"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import eventService from "@/services/event.service";
import EventMeetings from '@/components/Events/EventMeetings.vue';
export default {
  components: {
    EventMeetings
  },
  data() {
    return {
      eventTitle: '',
      eventId: '',
      groupTopic: '',
    }
  },
  computed: {
    zoomUrl() {
      return this.signedInUser ? `/jitsi.html?id=${this.$route.params.id}&name=${this.signedInUser.username}` : '';
    },
    signedInUser() {
      return this.$store.state.signedInUser;
    },
    items() {
      return  [
          {
            text: 'Events',
            to: '/events'
          },
          {
            text: this.eventTitle,
            to: `/event/${this.eventId}`,
          },
          {
            text: this.groupTopic,
            active: true
          }
        ]
    }
  },
  created() {
     const urlParams = new URLSearchParams(window.location.search);
     this.groupTopic = urlParams.get("title");
     this.eventId = urlParams.get("eventId");
     eventService.getEventById(this.eventId)
    .then((event) => {
      this.eventTitle = event.title;
    })
  },
  mounted() {
    setTimeout(() => {
      if (this.signedInUser == null) {
        this.$router.push("/signin");
        return;
      }
    }, 1000)
  }
}
</script>
<style lang="scss" scoped>
.zoom-container {
  width: 80%;
  margin: 0 10%;
  height: 100%;
  iframe {
    height: 600px;
    width: 100%;
  }
}
</style>