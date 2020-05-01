<template>
  <b-container
    v-if="!failedToFindEvent"
    class="bv-example-row"
  >
    <Loader v-show="loading" />
    <b-row class="event-details-container">
      <b-col md="9">
        <b-row>
          <b-col
            md="12"
            class="event-title"
          >
            <span>{{ event.title }}</span>
            <div>
              <span class="event-type capsule">{{
                getEventTypeName(event.type)
              }}</span>
              <span
                v-if="event.isOnline"
                class="event-type capsule online"
              >online</span>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="11">
            <div class="event-date">
              <span>{{
                event.dateFrom
                  | moment("timezone", "Europe/London", "DD MMM YYYY")
              }}</span>
              <span v-if="event.dateTo">-</span>
              <span v-if="event.dateTo">{{
                event.dateTo
                  | moment("timezone", "Europe/London", "DD MMM YYYY")
              }}</span>
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
            <div v-html="event.description" />
          </b-col>
        </b-row>
        <b-row
          v-if="youtubeVideoId"
          class="youtube-container"
        >
          <b-col md="12">
            <youtube
              :video-id="youtubeVideoId"
              width="100%"
              height="600"
            />
          </b-col>
        </b-row>
        <b-row style="margin-top: 20px;">
          <h1>Video Rooms (Click to join call)</h1>
        </b-row>
        <b-row>
          <b-col md="12">
            <EventMeetings :event-id="eventId" />
          </b-col>
        </b-row>
        <!-- <b-row style="margin-top: 20px;">
          <h1>Private Video Rooms (Click to Join call)</h1>
        </b-row>
        <b-row>
          <b-col md="12">
            <EventMeetings :event-id="eventId" :is-private="true" />
          </b-col>
        </b-row> -->
        <b-row
          v-if="!hideComments"
          style="margin-top: 20px;"
        >
          <h1>Comments</h1>
        </b-row>
        <b-row v-if="!hideComments && signedInUser">
          <b-col md="12">
            <add-comment
              ref="addcomment"
              :comment-id="commentId"
              :on-save="saveComment"
              :on-cancel="cancelComment"
              :show-rating="showRating"
              :parent-id="eventId"
              class="mt-1"
            />
          </b-col>
        </b-row>
        <b-row v-if="!hideComments">
          <b-col md="12">
            <Comment
              v-for="(comment, index) in comments"
              :key="comment._id"
              :index="index"
              :comment-id="comment._id"
              :comment="comment"
              :show-rating="showRating"
              :allow-reply="allowReply"
              :on-delete="deleteComment"
              :on-edit="editComment"
              :on-save="saveComment"
            />
          </b-col>
        </b-row>
      </b-col>
      <b-col md="3">
        <OnlineUsers />
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
import Comment from "@/components/Comment/Comment.vue";
import AddComment from "@/components/Comment/AddComment.vue";
import IconLink from "@/components/common/IconLink";
import SkillTags from "@/components/Skills/SkillTags";
import EventMeetings from "@/components/Events/EventMeetings.vue";
import OnlineUsers from "@/components/OnlineUsers/OnlineUsers.vue";

import commentService from "@/services/comment.service";
import eventService from "@/services/event.service";
import { getEventTypeName } from "@/utilities/utils";

export default {
  name: "EventDetails",
  components: {
    Comment,
    AddComment,
    SkillTags,
    IconLink,
    EventMeetings,
    OnlineUsers
  },
  data() {
    return {
      hideComments: false,
      failedToFindEvent: false,
      eventId: null,
      event: {},
      nickName: "",
      meetingId: "",
      meetingPassword: "",
      comments: [],
      loading: true,
      showRating: false,
      allowReply: false,
      commentId: ""
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
    youtubeVideoId() {
      return this.event.youtube
        ? this.parseYoutubeVideoId(this.event.youtube)
        : null;
    }
  },
  async created() {
    this.loading = true;
    this.eventId = this.$route.params.id;
    if (!this.eventId) {
      this.failedToFindEvent = true;
      return;
    }

    eventService
      .getEventById(this.eventId)
      .then(event => {
        this.event = event;
        this.loading = false;
      })
      .catch(() => {
        this.failedToFindEvent = true;
        this.loading = false;
      });

    this.getComments();
  },
  mounted() {
    setTimeout(() => {
      if (this.signedInUser == null) {
        this.$router.push("/signin");
        return;
      }
    }, 1000);
  },
  methods: {
    getEventTypeName: getEventTypeName,
    parseYoutubeVideoId(link) {
      try {
        const url = new URL(link);
        const urlParams = new URLSearchParams(url.search);
        return urlParams.get("v") || null;
      } catch (e) {
        return null;
      }
    },
    getComments() {
      commentService
        .getComment(this.eventId)
        .then(response => {
          this.comments = response; //.push(...response);
        })
        .catch(() => {
          eventBus.$emit("show-toast", {
            body: e.message,
            title: messages.generic.error,
            type: ToastType.ERROR
          });
        });
    },
    saveComment(response, index) {
      if (this.commentId != "") {
        this.comments.splice(index, 1, response);
        this.commentId = "";
      } else {
        this.comments.push(response);
      }

      eventBus.$emit("show-toast", {
        body: messages.comment.commentAddSuccess,
        title: messages.generic.success
      });
    },
    deleteComment(index) {
      console.log(index);
      this.comments.splice(index, 1);
    },
    editComment(commentId) {
      this.commentId = commentId;
    },
    cancelComment() {}
  }
};
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
    background: #c50606;
    color: white;
  }
}

.fail-message {
  text-align: center;
}

.youtube-container {
  padding: 10px 0;
}
</style>
