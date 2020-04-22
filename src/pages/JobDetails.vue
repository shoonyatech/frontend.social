<template>
  <div class="jobs-container">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col md="12">
          <div class="job">
            <div class="role-and-expertise">
              <h1>
                {{ jobs.title }}
                <a
                  class="btn-apply"
                  :href="jobs.link"
                >
                  <Button label="Apply" />
                </a>
              </h1>
            </div>
            <div class="skills-required">
              <SkillTags
                :skills="jobs.skills"
              />
              <div class="expertise capsule">
                {{ getExperienceLevel(jobs.level) }}
              </div>
            </div>
            

            <div
              ref="description"
              class="location-description mb-2"
            >
              {{ jobs.company }} | {{ jobs.city + ' ' + jobs.country }}
            </div>

            <div
              ref="type"
              class="location-description mb-2"
            >
              <span v-if="jobs.isFullTime === true">Full Time</span>
              <span v-if="jobs.isPartTime === true"> | Part Time</span>
              <span v-if="jobs.isPermanent === true"> | Permanent</span>
              <span v-if="jobs.isContract === true"> | Contract</span>
            </div>

            <div
              ref="description"
              class="job-description"
              v-html="jobs.description"
            />
          </div>
          <div class="job">
            <h6>Contact detail</h6>
            <div
              ref="username"
              class="location-description mb-2"
            >
              {{ jobs.createdBy.username }}
            </div>
            <div
              ref="email"
              class="location-description mb-2"
            >
              {{ jobs.createdBy.email }}
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Button from "@/components/Buttons/Button";
import jobService from "@/services/job.service";
import SkillTags from "@/components/Skills/SkillTags";

export default {
  name: "Jobs",
  components: {
    SkillTags,
    Button
  },
  data() {
    return {
      jobs: '',
      appliedFilters: [],
      currentQuery: "",
      totalPages: 1,
      skills: [],
      jobTypes: [],
      pageNo: 1,
      showAddJobDialog: false,
      experienceLevel: '',
      loading: false
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    }
  },
  mounted() {
    this.getJobDetails(this.$route.params.jobId);
  },
  methods: {
    refreshPage() {
      this.showAddJobDialog = false;
      this.getJobDetails(this.$route.params.jobId);
    },
    mapJobResponse(jobs = {}, override = false) {
      const { results = [], meta = {} } = jobs;
      if (!override) {
        this.jobs = jobs;
      } else {
        this.jobs = results;
      }
    },
    getJobDetails(searchText = "") {
      this.loading = true;
      jobService.getJobFindOne(searchText).then(jobs => {
        this.mapJobResponse(jobs);
        this.loading = false;
      });
    },
    getExperienceLevel (level) {
      switch (level) {
        case 0:
          return "Beginner";
        case 1:
          return "Intermediate";
        case 2:
          return "Expert";
        default:
          "Beginner";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.job {
  width: 90%;
  border-bottom: dotted 1px #aada20;
  padding: 10px;
  position: relative;
}
.job .role-and-expertise {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}
.expertise {
  font-size: 0.65rem;
}
.job .skills-required {
  text-align: left;
  padding: 5px 0;
  font-size: 0.65rem;
}
.job-description {
  font-size: 0.8rem;
}
.location-description {
  font-size: 0.8rem;
}
.btn-apply {
  right: 0;
  position: absolute;
  z-index: 8;
}
.collapsed {
  -webkit-mask-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 1)),
    to(rgba(0, 0, 0, 0))
  );
}

.expanded {
  max-height: unset;
}

.arrow-container {
  display: flex;
  justify-content: center;
  align-content: center;
}
@media screen and (max-width: 759px) {
  .job {
    width: 98%;
  }
}
</style>
