<template>
  <div class="jobs-container">
    <div class="title">
      <span>Frontend Jobs</span>
      <button @click="showAddJobDialog = !showAddJobDialog">
        + Add Job
      </button>
    </div>
    <div
      v-if="!showAddJobDialog"
      class="jobs-and-filters"
    >
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
    <div v-else>
      <AddJob @close="refreshPage()" />
    </div>
  </div>
</template>

<script>
import Job from "@/components/Job/Job";
import AddJob from "@/components/Job/AddJob";
import Filters from "@/components/Filters/Filters";
import jobService from "@/services/job.service";

export default {
  name: "Jobs",
  components: {
    Job,
    Filters,
    AddJob
  },
  data() {
    return {
      jobs: [],
      appliedFilters: [],
      currentQuery: "",
      totalPages: 5,
      skills: [],
      jobTypes: [],
      showAddJobDialog: false
    };
  },
  mounted() {
    const searchQuery = window.location.search.split("?");
    let searchText = "";
    if (searchQuery[1]) {
      const searchTextQuery = searchQuery[1]
        .split("&")
        .find(item => item.startsWith("q="));
      if (searchTextQuery) {
        searchText = searchTextQuery.split("q=")[1];
      }
    }
    jobService.getJobs(searchText).then(jobs => {
      this.jobs = jobs;
    });
    //need to fetch this data from api
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
    refreshPage() {
      this.showAddJobDialog = false;
      searchJobsWithSearchTerm();
    },
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
.jobs-container {
  max-width: 1280px;
  margin: 0 auto;
}
.title {
  span {
    font-size: 1.4rem;
  }
  display: flex;
  padding: 5px 10px;
  justify-content: space-around;
  border-bottom: dotted 1px #aada20;
}
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
  height: 100vh;
  border-left: 2px solid #aada18;
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
