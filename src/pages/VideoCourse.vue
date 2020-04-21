<template>
  <div class="host">
    <b-container>
      <b-row>
        <b-col
          md="12"
          sm="12"
        >
          <span class="course-heading">{{ course }} > {{ courseName }}</span>
          <h1>
            <span>{{ courseTopic }}</span>
          </h1>
        </b-col>
      </b-row>
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
            :video-id="videoId"
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
      <b-row v-if="!hideComments">
        <b-col md="2" />
        <b-col md="8">
          <add-comment
            ref="addcomment"
            :comment-id="commentId"
            :on-save="saveComment"
            :show-rating="showRating"
            :parent-id="courseId"
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
import eventBus from "@/utilities/eventBus";
export default {
  name: "VideoCourse",
  components: {
    CodeEditor,
    Checkbox,
    Comment,
    AddComment
  },
  props: {
    course: {
      type: String,
      default: "Angular"
    },
    courseName: {
      type: String,
      default: "Basic Angular"
    },
    courseTopic: {
      type: String,
      default: "Data Binding"
    }
  },
  data() {
    return {
      courseId: "5e9d7d650018553a2cc5366a",
      videoId: "7iUqMA2Y6xA",
      codeEditorURL:
        "https://codesandbox.io/embed/xenodochial-browser-5hhd3?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FHelloWorld.vue&theme=dark",
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
      comments: []
    };
  },
  created() {
    this.setTimer();
    this.getComments();
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

      const result = this.videoSRTData
        .filter(x => x.time == time)
        .map(y => y.file);

      if (result.length > 0) this.codeEditorURL = result[0];
    },
    getComments() {
      commentService
        .getComment(this.courseId)
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
    }
  }
};
</script>

<style scoped lang="scss">
.host {
  width: 100%;
  margin-bottom: 0.8rem;
}
.course-heading {
  color: #23b4ad;
  font-size: 17px;
}
h1 {
  font-size: 0.9rem;
}
</style>