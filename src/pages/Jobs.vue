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
        :required-skills="job.skils"
      />
    </div>
    <div class="filters-wrapper">
      <Filters
        :on-search-input-change="searchJobsWithSearchTerm"
        :on-search-params-change="onSearchParamsChange"
        :set-initial-query="setInitialQuery"
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
      totalPages: 5
    };
  },
  mounted() {
    jobService.getJobs("").then(response => {
      this.jobs = response.data;
    });
    this.scroll(this.jobs);
  },
  methods: {
    searchJobsWithSearchTerm(searchText = "") {
      searchText.replace(/^\s+/, "").replace(/\s+$/, "");
      jobService.getJobs(searchText).then(response => {
        this.jobs = response.data;
      });
    },
    onSearchParamsChange(param = "", key, value) {
      this.currentQuery = param;
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set(key, value);
      jobService.getJobsOnSearchParamsChange(param).then(response => {
        this.jobs = response.data;
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
            .then(response => {
              this.jobs.push(response.data);
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
