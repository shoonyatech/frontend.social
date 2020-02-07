<template>
  <div class="jobs-container">
    <b-container>
      <b-row>
        <b-col md="9">
          <h1>
            <span>Frontend Jobs</span><button
              v-if="!showAddJobDialog"
              @click="showDialog()"
            >
              + Add Job
            </button>
          </h1>
          <div
            v-if="!showAddJobDialog"
            class="jobs"
          >
            <Job
              v-for="job in jobs"
              :id="job.id"
              :key="job.id"
              :role="job.title"
              :job-description="job.description"
              :expertise="job.level"
              :required-skills="job.skills"
              :link="job.link"
            />
            <div class="center-content">
              <button
                class="mt-4"
                @click="showDialog()"
              >
                + Add Job
              </button>
            </div>
          </div>
          <AddJob
            v-else
            @close="refreshPage()"
          />
        </b-col>
        <b-col md="3">
          <div
            v-if="!showAddJobDialog"
            class="filters-wrapper"
          >
            <Filters
              :on-search-input-change="searchJobsWithSearchTerm"
              :on-search-params-change="onSearchParamsChange"
              :set-initial-query="setInitialQuery"
              :skills="skills"
              :job-types="jobTypes"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
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
.host {
  width: 100%;
}

.jobs {
  margin: 20px 10px;
  text-align: left;
  width: 100%;
}

.filters-wrapper {
  height: 100%;
  border-left: 1px solid #aada18;
  flex-direction: column;
  display: flex;
  text-align: start;
  padding: 10px;
  cursor: pointer;
}
</style>
