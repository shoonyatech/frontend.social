<template>
  <div class="host">
    <h1>Latest Frontend jobs from {{ city }}</h1>
    <div class="jobs">
      <div v-if="jobs.results && jobs.results.length">
        <job-strip
          v-for="(job, index) in jobs.results"
          :id="job.id"
          :key="index"
          :job="job"
          :role="job.title"
          :job-description="job.description"
          :expertise="job.level"
          :required-skills="job.skills"
          :link="job.link"
          :location="job.city + ', ' + job.country"
          :company="job.company"
        />
      </div>
      <div v-else>
        No jobs found!
      </div>
    </div>
  </div>
</template>

<script>
import JobStrip from "@/components/Job/JobStrip";
import jobService from "@/services/job.service";

export default {
  name: "LatestJobsFromCity",
  components: { JobStrip },
  props: {
    city: {
      type: String,
      default: null,
      required: true
    },
    country: {
      type: String,
      default: null,
      required: true
    }
  },
  data() {
    return {
      jobs: []
    };
  },
  created() {
    const query = `city=${this.city}&country=${this.country}`;
    jobService.getJobsOnSearchParamsChange(query).then(jobs => {
      this.jobs = jobs;
    });
  }
};
</script>

<style scoped lang="scss">
.host {
  width: 100%;
  margin-bottom: 2.5rem;
}

.jobs {
  margin: 20px 10px;
  text-align: left;
  width: 100%;
}

.job {
  margin-bottom: 40px;
}

.courtesy {
  font-size: 0.75rem;
  text-align: right;
}
</style>
