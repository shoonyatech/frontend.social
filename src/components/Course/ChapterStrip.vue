<template>
  <div>
    <b-card>
      <div v-b-toggle="'collapse-' +chapter._id">
        Chapter {{ chapter.chapterNo }}:{{ chapter.title }}
      </div>
      <b-collapse
        :id="'collapse-'+chapter._id"
        class="mt-2"
      >
        <div
          v-for="(topic, index) in chapter.topics"
          :key="index"
        >
          <router-link :to="'/learn/course/'+courseId+'/'+chapter.chapterNo+'/'+ topic._id ">
            <div class="topic-container">
              {{ topic.title }}
            </div>
          </router-link>
        </div>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ChapterStrip",
  components: {},
  props: {
    chapter: {
      type: Object,
      required: true
    },
    courseId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showSections: false
    };
  },
  methods: {
    toggleShowSections() {
      this.showSections = !this.showSections;
    }
  }
};
</script>

<style scoped lang="scss">
/* style for course thumbnail */
.thumbnail {
  border: solid #114273 2px;
  height: 12rem;
  width: 12rem;
  min-width: 12rem;
  color: #2c3e50;
  text-decoration: none;
}

.details {
  padding: 0.5rem;
  margin-top: -0.75rem;
  text-align: left;
}

.half-width {
  width: 50%;
}

.pr-2 {
  padding-right: 10px;
}

.course-title {
  font-weight: bold;
  text-align: center;
  padding-top: 0.8rem;
  overflow: hidden;
  white-space: nowrap;
}
.course-technology {
  font-size: 0.6rem;
  font-weight: bold;
  text-align: center;
}

.course-description {
  font-size: 0.6rem;
  block-size: 6.5rem;
  overflow: hidden;
}

.button {
  text-align: center;
  position: inherit;
  padding: 0.5rem;
}

.topic-container {
  border-style: solid;
  padding: 10px;
  border-color: #dfdfdf;
  border-width: 1px;
  margin-bottom: 1px;
}
</style>
