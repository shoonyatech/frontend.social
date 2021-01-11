<template>
  <div>
    <div class="card1">
      <div v-b-toggle="'collapse-' + chapter.chapterNo">
        {{ chapter.chapterNo }} {{ chapter.title }}
      </div>

      <div>
        <b-collapse
          :id="'collapse-' + chapter.chapterNo"
          :visible="
            currentChapter === getUrlFriendlyTitle(chapter.title || '')
              ? true
              : false
          "
          class="mt-2"
        >
          <div
            v-for="(topic, index) in chapter.topics"
            :key="index"
            @click="
              changeRoute(
                courseId,
                getUrlFriendlyTitle(chapter.title || ''),
                getUrlFriendlyTitle(topic.title || '')
              )
            "
          >
            <div
              v-if="
                (selectedTopic && selectedTopic.title != topic.title) ||
                  route == null
              "
              class="topic-container"
            >
              {{ topic.title }}
            </div>
            <div
              v-else
              class="topic-containers"
            >
              {{ topic.title }}
            </div>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { getUrlFriendlyTitle } from '@/utilities/utils';

export default {
  name: 'ChapterStrip',
  components: {},
  props: {
    chapter: {
      type: Object,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    selectedTopic: {
      type: Object,
      default: () => {},
    },
    currentChapter: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showSections: false,
      route: '',
    };
  },
  created() {
    this.route = this.$route.params.chapterno;
  },
  methods: {
    changeRoute(courseId, title, topicTitle) {
      window.history.replaceState(
        {},
        '',
        `/learn/courses/${courseId}/${title}/${topicTitle}`
      );
      this.$emit('changeRoute', courseId, title, topicTitle);
    },
    toggleShowSections() {
      this.showSections = !this.showSections;
    },
    getUrlFriendlyTitle: getUrlFriendlyTitle,
  },
};
</script>

<style scoped lang="scss">
/* style for course thumbnail */
.card1 {
  border: 1px solid lightgray;
  padding: 10px;
}
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
  margin-bottom: 1px;
  padding-left: 10%;
  font-size: 0.8rem;
}
.topic-container:hover {
  margin-bottom: 1px;
  padding-left: 10%;
  cursor: pointer;
  background-color: #4cbeee;
  color: white;
}
.topic-containers {
  background-color: #4cbeee;
  color: white;
  padding-left: 10%;
  margin-bottom: 1px;
}
</style>
