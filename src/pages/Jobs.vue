<template>
  <div class="jobs-and-filters">
    <div class="jobs">
      <Job
        v-for="job in jobs"
        :id="job.id"
        :key="job.id"
        :role="job.title"
        :job-description="job.description"
        :expertise="job.level"
        :required-skills="job.skills"
      />
    </div>
    <div class="filters-wrapper">
      <Filters
        :on-search-input-change="searchJobsWithSearchTerm"
        :on-search-params-change="onSearchParamsChange"
        :set-initial-query="setInitialQuery"
        :skills="skills"
        :job-types="jobTypes"
      />
    </div>
  </div>
</template>

<script>
import Job from "@/components/Job/Job";
import Filters from "@/components/Filters/Filters";
import jobService from "@/services/job.service";

export default {
  name: "Jobs",
  components: {
    Job,
    Filters
  },
  data() {
    return {
      jobs: [],
      appliedFilters: [],
      currentQuery: "",
      totalPages: 5,
      skills: [],
      jobTypes: []
    };
  },
  mounted() {
    jobService.getJobs("").then(jobs => {
      this.jobs = jobs;
    });
    this.jobTypes = [
      {
        name: "Full Time",
        id: "fullTime",
        selected: false,
        group: "jobType",
        groupName: "Job Type",
        type: "MULTISELECT"
      },
      {
        name: "Part Time",
        id: "partTime",
        selected: false,
        type: "MULTISELECT",
        group: "jobType",
        groupName: "Job Type"
      },
      {
        name: "Contract",
        id: "contract",
        selected: false,
        type: "MULTISELECT",
        group: "jobType",
        groupName: "Job Type"
      },
      {
        name: "Permanent",
        id: "permanent",
        selected: false,
        type: "MULTISELECT",
        group: "jobType",
        groupName: "Job Type"
      }
    ];
    this.skills = [
      {
        name: "React",
        id: "react",
        type: "MULTISELECT",
        selected: false
      },
      {
        name: "Angular",
        id: "angular",
        type: "MULTISELECT",
        selected: false
      },
      {
        name: "Vue",
        id: "vue",
        type: "MULTISELECT",
        selected: false
      },
      {
        name: "Web Components",
        id: "webComponents",
        type: "MULTISELECT",
        selected: false
      }
    ];
    this.scroll(this.jobs);
  },
  methods: {
    searchJobsWithSearchTerm(searchText = "") {
      searchText.replace(/^\s+/, "").replace(/\s+$/, "");
      jobService.getJobs(searchText).then(jobs => {
        this.jobs = jobs;
      });
    },
    onSearchParamsChange(param = "", key, value) {
      this.currentQuery = param;
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set(key, value);
      jobService.getJobsOnSearchParamsChange(param).then(jobs => {
        this.jobs = jobs;
      });
    },
    setInitialQuery(initialQuery) {
      this.currentQuery = initialQuery;
    },
    scroll(jobs) {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          jobService
            .fetchDataForNextPage(this.currentQuery, this.totalPages)
            .then(jobs => {
              this.jobs.push(jobs);
            });
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.jobs-and-filters {
  display: flex;
  .jobs {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.filters-wrapper {
  height: 100%;
  border-left: 2px solid #aada18;
  border-bottom: 2px solid #aada18;
  flex-direction: column;
  display: flex;
  text-align: start;
  padding: 10px;
  cursor: pointer;
}

@media screen and (max-width: 759px) {
  .jobs-and-filters {
    flex-direction: column-reverse;
  }

  .filters-wrapper {
    height: auto;
    width: 100%;
    border-left: none;
  }
}

@media screen and (min-width: 760px) and (max-width: 1024px) {
  .jobs {
    width: 75%;
  }
  .filters-wrapper {
    width: 25%;
  }
}

@media screen and (min-width: 1024px) {
  .jobs {
    width: 80%;
  }
  .filters-wrapper {
    width: 20%;
  }
}
</style>
