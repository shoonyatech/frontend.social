<template>
  <div class="host">
    <b-container>
      <b-breadcrumb :items="items" />
      <b-row>
        <b-col
          md="6"
          sm="12"
        >
          <ChapterStrip
            v-for="(chapter, index) in course.chapters"
            :key="index"
            :chapter="chapter"
          />
        </b-col>
        <b-col
          md="6"
          sm="12"
        >
          <b-row>
            <b-col>
              <youtube
                ref="youtube"
                :video-id="course.introductoryVideoId"
                width="100%"
                height="400"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div
                ref="description"
                class="course-description"
                v-html="course.description"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row v-if="!hideComments">
        <b-col md="2" />
        <b-col md="8">
          <add-comment
            ref="addcomment"
            :comment-id="commentId"
            :on-save="saveComment"
            :on-cancel="cancelComment"
            :show-rating="showRating"
            :parent-id="course._id"
            class="mt-1"
          />
          <Comment
            v-for="(comment,index) in comments"
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
        <b-col md="2" />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Comment from "@/components/Comment/Comment";
import AddComment from "@/components/Comment/AddComment";
import ChapterStrip from "@/components/Course/ChapterStrip";
import commentService from "@/services/comment.service";
import courseService from "@/services/course.service";
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";
export default {
  name: "CourseDetails",
  components: {
    Comment,
    AddComment,
    ChapterStrip
  },
  props: {},
  data() {
    return {
      course: {},
      videoId: "7iUqMA2Y6xA",
      hideComments: false,
      showRating: false,
      allowReply: true,
      commentId: "",
      comments: []
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
    items() {
      return [
        {
          text: "Courses",
          to: "/learn/course"
        },
        {
          text: this.course.title,
          active: true
        }
      ];
    }
  },
  mounted() {
    this.loadCourse(this.$route.params.id);
  },
  created() {},
  beforeDestroy() {
    clearInterval(this.timer);
  },

  methods: {
    loadCourse(courseId) {
      courseService.getCoursesById(courseId).then(res => {
        this.course = res;
        this.getComments();
      });
    },
    getComments() {
      commentService
        .getComment(this.course._id)
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

<style scoped lang="scss">
.host {
  width: 100%;
  margin-bottom: 0.8rem;
}
.course-heading {
  color: #23bdee;
  font-size: 17px;
}
h1 {
  font-size: 0.9rem;
}
.course-description {
  font-size: 0.8rem;
}
</style>