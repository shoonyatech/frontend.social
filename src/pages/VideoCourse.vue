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
          <CodeEditor />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CodeEditor from "@/components/common/CodeEditor";
export default {
  name: "VideoCourse",
  components: {
    CodeEditor
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
    return { videoId: "7iUqMA2Y6xA" };
  },
  methods: {
    getCurrentTime() {
      this.$refs.youtube.player.getCurrentTime().then(function(value) {
        alert("Current Time (in seconds): " + value);
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
.course-heading {
  color: #4ccccc;
  font-size: 17px;
}
h1 {
  font-size: 0.9rem;
}
</style>
