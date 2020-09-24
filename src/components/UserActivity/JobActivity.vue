<template>
  <div class="learn">
    <b-container>
      <b-row>
        <b-col
          md="12"
          class="text"
        >
          Job Page : {{ Jobs.length }}
          <br>
          <UserJobActivityStrip
            v-for="(job, index2) in Jobs"
            :key="index2"
            :job="job"
            :profile="job.createdBy"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UserJobActivityStrip from '@/components/Job/UserJobActivityStrip';
import jobService from '@/services/job.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
export default {
	name: 'UserActivity',
	components: { UserJobActivityStrip },
	props: {
		dateCreated: {
			type: String,
			default: () => {},
		},
	},
	data() {
		return {
			Jobs: [],
		};
	},
	created() {
		jobService
			.getJobsAddedOnDate(this.dateCreated)
			.then((job) => {
				this.Jobs = job;
			})
			.catch((e) => {
				eventBus.$emit('show-toast', {
					body: e.message,
					title: messages.generic.error,
					type: ToastType.ERROR,
				});
			});
	},
};
</script>

<style scoped lang="scss">
.text {
	color: rgb(48, 190, 238);
}
</style>
