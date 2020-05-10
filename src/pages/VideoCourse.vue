<template>
  <div class="host">
    <b-container>
      <b-breadcrumb :items="items" />
      <b-row>
        <b-col
          md="6"
          sm="12"
        />
        <b-col
          md="6"
          sm="12"
        >
          <Checkbox
            id="isautoSync"
            label="Auto sync code with video"
            :is-checked="isAutoSync"
            :on-click="toggleIsAutoSync"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col
          md="6"
          sm="12"
        >
          <youtube
            ref="youtube"
            :video-id="topic.videoUrl"
            width="100%"
            height="400"
          />
          <!-- <button @click="getCurrentTime">Get Current Time</button> -->
        </b-col>
        <b-col
          md="6"
          sm="12"
        >
          <CodeEditor :url="codeEditorURL" />
        </b-col>
      </b-row>
      <b-row
        v-if="!hideComments"
        class="comment-section"
      >
        <b-col md="1" />
        <b-col md="10">
          <h1>Questions and Answers</h1>
          <add-comment
            ref="addcomment"
            :comment-id="commentId"
            :on-save="saveComment"
            :on-cancel="cancelComment"
            :show-rating="showRating"
            :parent-id="topic._id"
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
import CodeEditor from "@/components/common/CodeEditor";
import Checkbox from "@/components/Checkbox/Checkbox";
import Comment from "@/components/Comment/Comment";
import AddComment from "@/components/Comment/AddComment";
import commentService from "@/services/comment.service";
import courseService from "@/services/course.service";
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";
export default {
  name: "VideoCourse",
  components: {
    CodeEditor,
    Checkbox,
    Comment,
    AddComment
  },
  props: {},
  data() {
    return {
      courseId: "",
      codeEditorURL: "",
      isAutoSync: true,
      timer: "",
      videoSRTData: [
        {
          time: "00:04:05",
          file:
            "https://codesandbox.io/s/zen-rain-sw407?fontsize=14&hidenavigation=1&module=%2Fpackage.json&theme=dark",
          line: "3"
        },
        {
          time: "00:04:06",
          file:
            "https://codesandbox.io/s/zen-rain-sw407?fontsize=14&hidenavigation=1&module=%2Fpackage.json&theme=dark",
          line: "3"
        },
        {
          time: "00:04:07",
          file:
            "https://codesandbox.io/s/zen-rain-sw407?fontsize=14&hidenavigation=1&module=%2Fpackage.json&theme=dark",
          line: "3"
        },
        {
          time: "00:04:10",
          file:
            "https://codesandbox.io/s/zen-rain-sw407?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fassets%2Flogo.png&theme=dark",
          line: "3"
        },
        {
          time: "00:04:33",
          file:
            "https://codesandbox.io/s/zen-rain-sw407?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FHelloWorld.vue&theme=dark",
          line: "3"
        },
        {
          time: "00:04:35",
          file:
            "https://codesandbox.io/s/zen-rain-sw407?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FHelloWorld.vue&theme=dark",
          line: "3"
        },
        {
          time: "00:04:37",
          file:
            "https://codesandbox.io/s/zen-rain-sw407?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FHelloWorld.vue&theme=dark",
          line: "3"
        }
      ],
      hideComments: false,
      showRating: false,
      allowReply: true,
      commentId: "",
      comments: [],
      course: {},
      topic: {}
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
          to: "/learn/course/" + this.course._id
        },
        {
          text: this.topic.title,
          active: true
        }
      ];
    }
  },
  mounted() {
    this.loadTopic(this.$route.params.chapterno, this.$route.params.topicid);
  },
  created() {
    this.setTimer();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getCurrentTime() {
      var that = this;
      this.$refs.youtube.player.getCurrentTime().then(function(value) {
        that.setCodeEditorURL(value);
      });
    },
    toggleIsAutoSync() {
      this.isAutoSync = !this.isAutoSync;
      this.setTimer();
    },
    setTimer() {
      if (this.isAutoSync) {
        //Triggering function every 15 seconds
        this.timer = setInterval(this.getCurrentTime.bind(this), 5000);
      } else clearInterval(this.timer);
    },
    convertTimeInSeconds(time) {
      var a = time.split(":"); // split it at the colons

      // minutes are worth 60 seconds. Hours are worth 60 minutes.
      var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
    },
    convertSecondToTimeFormat(timeInSeconds) {
      //HH:mm:ss
      return new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
    },
    setCodeEditorURL(videoTimeInSeconds) {
      var time = this.convertSecondToTimeFormat(videoTimeInSeconds);

      const result = this.topic.codeSubtitles
        .filter(x => x.time == time)
        .map(y => y.file);

      if (result.length > 0) this.codeEditorURL = result[0];
    },
    getComments() {
      commentService
        .getComment(this.topic._id)
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
    cancelComment() {},
    loadTopic(chapterNo, topicId) {
      courseService.getByTopicId(topicId).then(res => {
        this.course = res;

        this.topic = res.chapters
          .find(x => x.chapterNo == chapterNo)
          .topics.find(x => x._id === topicId);
        this.codeEditorURL = this.topic.codeLink;
        this.getComments();
      });
    }
  }
};
</script>

<style scoped lang="scss">
.host {
  width: 100%;
  margin-bottom: 0.8rem;
}
.comment-section {
  margin-top: 20px;
}
</style>