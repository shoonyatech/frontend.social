<template>
  <div class="jobs-container">
    <div
      v-if="!showAddJobDialog"
      class="jobs-and-filters"
    >
      <div class="jobs">
        <div class="title">
          <div class="heading">
            Frontend Jobs
          </div>
          <div class="btn-add-job">
            <button @click="showAddJobDialog = !showAddJobDialog">
              + Add Job
            </button>
          </div>
        </div>
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
      totalPages: 1,
      skills: [],
      jobTypes: [],
      pageNo: 1,
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
    this.searchJobsWithSearchTerm(searchText);
    this.scroll(this.jobs);
  },
  methods: {
    refreshPage() {
      this.showAddJobDialog = false;
      searchJobsWithSearchTerm();
    },
    mapJobResponse(jobs = {}, override = false) {
      const { results = [], meta = {} } = jobs;
      if (!override) {
        this.jobs = [...this.jobs, ...results];
      } else {
        this.jobs = results;
      }
      const { pagination: paginationInfo, filters } = meta;
      if (paginationInfo) {
        const { currentPage, totalPages } = paginationInfo;
        this.pageNo = currentPage;
        this.totalPages = totalPages;
      }
      if (filters) {
        const { jobTypes, skills } = filters;
        this.jobTypes = jobTypes;
        this.skills = skills;
      }
    },
    searchJobsWithSearchTerm(searchText = "") {
      searchText.replace(/^\s+/, "").replace(/\s+$/, "");
      jobService.getJobs(searchText).then(jobs => {
        this.mapJobResponse(jobs);
      });
    },
    onSearchParamsChange(param = "", key, value) {
      this.currentQuery = param;
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set(key, value);
      jobService.getJobsOnSearchParamsChange(param).then(jobs => {
        this.mapJobResponse(jobs, true);
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
            .fetchDataForNextPage(
              this.currentQuery,
              this.totalPages,
              this.currentPage
            )
            .then(jobs => {
              this.mapJobResponse(jobs);
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

.jobs-and-filters {
  display: flex;
  .title {
    display: flex;
    padding: 5px 10px;
    width: 100%;
    border-bottom: dotted 1px #aada20;
    justify-content: space-between;
    .heading {
      font-size: 1.2rem;
    }
  }
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
