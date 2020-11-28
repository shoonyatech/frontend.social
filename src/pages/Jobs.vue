<template>
  <div class="jobs-container">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <!-- <b-col
          md="12"
          sm="1"
        >
          <span>Are you looking for freelance work? </span>
          <button @click="registerFreelancer()">
            Register as a Freelancer
          </button>
          OR
          <button @click="hireFreelancer()">
            Post a Project
          </button>
        </b-col> -->
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
        <b-col md="9">
          <div class="jobs-image">
            <img src="/images/jobs.jpg">
            <div class="centered">
              <h1><b>FIND YOUR DREAM JOB HERE</b></h1>
              <p>Several positions for developers and designeres are here.</p>
              <p>Find job which is matched with your dream and skill.</p>
            </div>
            <div class="bottom-filter d-none d-sm-block">
              <JobsFilter
                :on-search-input-change="searchJobsWithSearchTerm"
                :on-search-params-change="onSearchParamsChange"
                :set-initial-query="setInitialQuery"
                :skills="skills"
                :job-types="jobTypes"
              />
            </div>
          </div>
          <!-- <h1 >
            <button v-if="!showAddJobDialog" @click="showDialog()">
              + Add Job
            </button>
          </h1> -->
          <div
            v-if="!showAddJobDialog"
            class="jobs"
          >
            <div
              v-infinite-scroll="searchJobsWithSearchTerm"
              infinite-scroll-disabled="isDisableInfiniteScroll"
              infinite-scroll-distance="limit"
              class="jobs"
            >
              <div v-if="jobs.length">
                <JobStrip
                  v-for="job in jobs"
                  :id="job._id"
                  :key="job.id"
                  :role="job.title"
                  :job-description="job.description"
                  :expertise="job.level"
                  :required-skills="job.skills"
                  :link="job.link"
                  :city="job.city"
                  :country="job.country"
                  :company="job.company"
                  :is-remote="job.isRemote"
                  :can-modify="canModify(job)"
                  @delete="onDelete($event)"
                />
              </div>
            </div>
          </div>
          <div>
            <span>Page <span class="page">{{ page }}</span></span>
            <span
              v-if="!infiniteScroll"
              class="navigation-button"
            >
              <button
                :disabled="page === 1"
                @click="searchJobsWithSearchTerm('previous')"
              >
                &#8249;
              </button>
              <button
                :disabled="jobs.length === 0"
                @click="searchJobsWithSearchTerm('next')"
              >
                &#8250;
              </button>
            </span>
          </div>
          <div class="jobs-image">
            <img src="/images/Handshake.jpg">
            <div class="centered">
              <h1><b>Looking for Employee?</b></h1>
              <p>Add job vacancy and find your ideal developer and designer.</p>
              <button
                class="mt-4"
                @click="showDialog()"
              >
                + Add Job
              </button>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import JobsFilter from '@/components/Job/JobsFilter';
import JobStrip from '@/components/Job/JobStrip';
import Filters from '@/components/Filters/Filters';
import jobService from '@/services/job.service';
import freelancerService from '@/services/freelancer.service';
export default {
  name: 'Jobs',
  components: {
    JobStrip,
    Filters,
    JobsFilter,
  },
  props: {
    skill: {
      type: String,
      default: null,
      required: false,
    },
    infiniteScroll: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      jobs: [],
      appliedFilters: [],
      currentQuery: '',
      totalPages: 1,
      skills: [],
      jobTypes: [],
      pageNo: 1,
      showAddJobDialog: false,
      loading: false,
      page: 1,
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
    isDisableInfiniteScroll() {
      return !this.infiniteScroll || this.busy;
    },
  },
  created() {
    if (!this.infiniteScroll) {
      this.searchJobsWithSearchTerm();
    }
  },
  mounted() {
    const searchQuery = window.location.search.split('?');
    let searchText = '';
    if (searchQuery[1]) {
      const searchTextQuery = searchQuery[1]
        .split('&')
        .find((item) => item.startsWith('q='));
      if (searchTextQuery) {
        searchText = searchTextQuery.split('q=')[1];
      }
    }
    this.searchJobsWithSearchTerm(searchText);
    this.scroll(this.jobs);
  },
  methods: {
    refreshPage() {
      this.showAddJobDialog = false;
      this.searchJobsWithSearchTerm();
    },
    mapJobResponse(jobs = {}, override = false) {
      const { results = [], meta = {} } = jobs;
      if (!override) {
        this.jobs = [...results];
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
    onDelete(id) {
      this.jobs = this.jobs.filter((x) => x._id !== id);
    },
    canModify(jobDetails) {
      if (!this.signedInUser) return false;

      if (this.$store.getters.isAdmin) return true;
      if (this.signedInUser.username != null) {
        const username = this.signedInUser.username.toLowerCase();
        return (
          jobDetails.createdBy &&
          jobDetails.createdBy.username.toLowerCase() === username
        );
      }
    },
    searchJobsWithSearchTerm(action) {
      const searchText = '';
      switch (action) {
        case 'previous':
          action = -1;
          break;
        case 'next':
          action = 1;
          break;
        default:
          action = 0;
          break;
      }

      this.busy = false;
      this.limit = this.limit || 10;
      this.page = action + this.page || 1;

      this.loading = true;
      searchText.replace(/^\s+/, '').replace(/\s+$/, '');
      jobService.getJobs(searchText, this.limit, this.page).then((jobs) => {
        this.mapJobResponse(jobs);
        this.loading = false;
      });
    },
    onSearchParamsChange(param = '', key, value) {
      this.loading = true;
      this.currentQuery = param;
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set(key, value);
      jobService.getJobsOnSearchParamsChange(param).then((jobs) => {
        this.mapJobResponse(jobs, true);
        this.loading = false;
      });
    },
    setInitialQuery(initialQuery) {
      this.currentQuery = initialQuery;
    },
    showDialog() {
      if (this.signedInUser == null) {
        this.$router.push('/signin');
      } else {
        this.$router.push('/job/form/new');
      }
    },
    hireFreelancer() {
      if (this.signedInUser == null) {
        this.$router.push('/signin');
      } else {
        this.$router.push('/freelancerProjects/hire/new');
      }
    },
    registerFreelancer() {
      if (this.signedInUser == null) {
        this.$router.push('/signin');
      } else {
        freelancerService
          .getFreelancerByUsername(this.$store.state.signedInUser.username)
          .then((freelancers) => {
            this.$router.push(
              `/job/freelancer/register/${freelancers.username}`
            );
          })
          .catch((err) => {
            this.$router.push('/job/freelancer/register/new');
          });
      }
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
            .then((jobs) => {
              this.mapJobResponse(jobs);
            });
        }
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.jobs-container {
  width: 100%;
}
.jobs {
  width: 100%;
}

.filters-wrapper {
  height: 100%;
  flex-direction: column;
  display: flex;
  text-align: start;
  cursor: pointer;
}
.jobs-image {
  position: relative;
  text-align: center;
  color: white;
  img {
    width: 100%;
    height: 300px;
    border-radius: 20px;
    margin-bottom: 20px;
  }
}

.navigation-button {
  float: right;
  margin-bottom: 10px;
}
.centered {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  h1 {
    font-size: 25px;
    font-weight: bolder;
  }
  p {
    font-size: 15px;
  }
  button {
    width: 250px;
    padding: 10px;
  }
}
.bottom-filter {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: fit-content;
  border-radius: 10px;
  background-color: #114273;
  color: white;
}
.page {
  background-color: white;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid lightgray;
}
</style>
