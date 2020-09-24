<template>
  <div class="learn">
    <b-container>
      <b-row>
        <b-col
          md="12"
          class="text"
        >
          Submission Page : {{ submissions.length }}
          <br>
          <UserSubmissionActivity
            v-for="(submission, index1) in submissions"
            :key="index1"
            :submission="submission"
            :profile="submission.submittedBy"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UserSubmissionActivity from '@/components/Challenge/UserSubmissionActivity';
import challengeService from '@/services/challenges.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
export default {
	name: 'SubmissionActivity',
	components: { UserSubmissionActivity },
	props: {
		dateCreated: {
			type: String,
			default: () => {},
		},
	},
	data() {
		return {
			submissions: [],
		};
	},
	created() {
		challengeService
			.getSubmissionsAddedOnDate(this.dateCreated)
			.then((submission) => {
				this.submissions = submission;
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
