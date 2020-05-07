<template>
  <div class="events">
    <Loader v-show="loading" />
    <b-container>
      <b-row
        v-infinite-scroll="loadCourses('')"
        infinite-scroll-disabled="isDisableInfiniteScroll"
        infinite-scroll-distance="limit"
      >
        <b-col md="9">
          <h1>Courses</h1>
          <div
            v-for="(course, index) in courses"
            :key="index"
          >
            <div class="course-card-container">
              <course-strip
                :course="course"
                class="course-card"
              />
            </div>
          </div>
        </b-col>

        <b-col md="3">
          <div class="filters-wrapper">
            <Filters
              :on-search-input-change="searchCoursesWithSearchTerm"
              :on-search-params-change="onSearchParamsChange"
              :skills="skills"
              :job-types="jobTypes"
              :expertise-level="expertiseLevel"
              :hide-city="true"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Filters from "@/components/Filters/Filters";
import CourseStrip from "@/components/Course/CourseStrip";
import courseService from "@/services/course.service";
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";

export default {
  name: "Course",
  components: {
    Filters,
    CourseStrip
  },
  props: {
    infiniteScroll: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      courses: [],
      skills: [
        { name: "React", id: "react", type: "MULTISELECT", selected: false },
        { name: "Angular", id: "angular", type: "MULTISELECT", selected: false }
      ],
      expertiseLevel: [],
      jobTypes: [],
      loading: false,
      page: 1
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
    isDisableInfiniteScroll() {
      return !this.infiniteScroll || this.busy;
    }
  },
  created() {
    setTimeout(() => {
      if (!this.infiniteScroll) {
        this.loadCourses("");
      }
    }, 500);
  },
  methods: {
    onSearchParamsChange(param = "") {
      this.loading = true;
      this.loadCourses(param);
    },
    loadCourses(param, action) {
      switch (action) {
        case "previous":
          action = -1;
          break;
        case "next":
          action = 1;
          break;
        default:
          action = 0;
          break;
      }
      let query = "";
      if (this.signedInUser) {
        query = "&username=" + this.signedInUser.username;
      }

      this.busy = false;
      this.limit = this.limit || 10;
      this.page = action + this.page || 1;

      courseService
        .getCourses(param + query, this.limit, this.page)
        .then(res => {
          var courses = res.results;
          if (!this.infiniteScroll) {
            this.courses = courses;
          } else {
            this.courses = this.courses.concat(courses);
            if (courses.length > 0) {
              ++this.page;
            }
          }
          this.busy = true;
          this.loading = false;
        });
    },
    searchCoursesWithSearchTerm(searchText = "") {
      this.loading = true;
      searchText.replace(/^\s+/, "").replace(/\s+$/, "");
      jobService.getJobs(searchText).then(jobs => {
        this.mapJobResponse(jobs);
        this.loading = false;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.host {
  width: 100%;
}

.events {
  margin: 20px 10px;
  text-align: left;
  width: 100%;
}

.courtesy {
  font-size: 0.75rem;
  text-align: right;
}

.filters-wrapper {
  height: 100%;
  border-left: 1px solid #114273;
  flex-direction: column;
  display: flex;
  text-align: start;
  padding: 10px;
  cursor: pointer;
}

.course-card {
  margin-bottom: 1rem;
  display: inline-block;
}

.course-card-container {
  width: 100%;
  text-align: center;
}
</style>
