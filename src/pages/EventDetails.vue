<template>
  <b-container
    v-if="!failedToFindEvent"
    class="bv-example-row"
  >
    <b-row>
      <b-col
        md="12"
        class="event-title"
      >
        <span>{{ event.title }}</span>
        <div>
          <span class="event-type capsule">
            {{ getEventTypeName(event.type) }}
          </span>
          <span
            v-if="event.isOnline"
            class="event-type capsule online"
          >
            online
          </span>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="11">
        <div class="event-date">
          <span>
            {{ event.dateFrom | moment("timezone", "Europe/London", "DD MMM YYYY") }}
          </span>
          <span v-if="event.dateTo"> - </span>
          <span v-if="event.dateTo">
            {{ event.dateTo | moment("timezone", "Europe/London", "DD MMM YYYY") }}
          </span>
          in
          <a :href="'/city/' + event.city + '/' + event.country">
            <span class="city">{{ event.city }}, {{ event.country }}</span>
          </a>
        </div>
        <SkillTags
          v-if="event.relatedSkills"
          :skills="event.relatedSkills"
        />
      </b-col>
      <b-col md="1">
        <div class="links icon-links">
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
        <div>
          {{ event.description }}
        </div>
      </b-col>
    </b-row>
    <b-row v-if="youtubeVideoId">
      <b-col md="12">
        <youtube
          :video-id="youtubeVideoId"
          width="100%"
          height="600"
        />
      </b-col>
    </b-row>
    <b-row
      v-if="signedInUser"
      style="margin-top: 20px;"
    >
      <h1>Group Topics (Click to Join Zoom call)</h1>
    </b-row>
    <b-row>
      <b-col md="12">
        <EventMeetings
          v-if="signedInUser"
          :event-id="eventId"
        />
      </b-col>
    </b-row>
    <b-row
      v-if="!hideComments"
      style="margin-top: 20px;"
    >
      <h1>Comments</h1>
    </b-row>
    <b-row v-if="!hideComments && signedInUser">
      <b-col md="12">
        <add-comment :on-save="saveComment" />
      </b-col>
    </b-row>
    <b-row v-if="!hideComments">
      <b-col md="12">
        <Comment
          v-for="comment in comments"
          :key="comment._id"
          :comment="comment"
        />
      </b-col>
    </b-row>
  </b-container>
  <h1
    v-else
    class="fail-message"
  >
    Opps! Failed to find Event details
  </h1>
</template>
<script>
import Comment from '@/components/Comment/Comment.vue';
import AddComment from '@/components/Comment/AddComment.vue';
import IconLink from "@/components/common/IconLink";
import SkillTags from "@/components/Skills/SkillTags";
import EventMeetings from '@/components/Events/EventMeetings.vue';

import eventService from "@/services/event.service";
import { getEventTypeName } from '@/utilities/utils';

export default {
  name: 'EventDetails',
  components: {Comment, AddComment, SkillTags, IconLink, EventMeetings},
  data() {
    return {
      hideComments: true,
      failedToFindEvent: false,
      eventId: null,
      event: {},
      nickName: '',
      meetingId: '',
      meetingPassword: '',
      comments: [
        {
          _id: 1,
          comment: 'Lorem ipsum',
          rating: 4,
          username: 'Mayank',
          timestamp: '2020-04-10 14:32+530'
        }, {
          _id: 2,
          comment: 'Lorem ipsum',
          rating: 2,
          username: 'Mayank',
          timestamp: '2020-04-10 14:32+530'
        }, {
          _id: 3,
          comment: 'Lorem ipsum',
          rating: 4,
          username: 'Mayank',
          timestamp: '2020-04-10 14:32+530'
        }
      ]
    }
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
    youtubeVideoId() {
      return this.event.youtube ? this.parseYoutubeVideoId(this.event.youtube): null;
    }
  },
  async created() {
    this.eventId = this.$route.params.id;
    if (!this.eventId) {
      this.failedToFindEvent = true;
      return;
    }

    eventService.getEventById(this.eventId)
    .then((event) => {
      this.event = event;
    })
    .catch(() => {
      this.failedToFindEvent = true;
    })
    this.loadComments();
  },
  methods: {
    saveComment(comment) {
      // TODO: Replace this with the API call
      return Promise.resolve();
    },
    loadComments() {
      // TODO: Add api call
    },
    getEventTypeName: getEventTypeName,
    parseYoutubeVideoId(link) {
      try {
        const url = new URL(link)
        const urlParams = new URLSearchParams(url.search);
        return urlParams.get("v") || null;
      } catch(e) {
        return null;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.event-title {
  display: flex;
  justify-content: space-between;
}

.event-type {
  font-size: 0.65rem;
  color: #2c3e50;
  float: right;

  &.online {
    background: #d44444;
    color: white;
  }
}

.fail-message {
  text-align: center;
}
</style>
