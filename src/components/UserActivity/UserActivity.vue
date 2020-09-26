<template>
  <div class="learn">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col
          md="12"
          class="text"
        >
          <b-card>
            {{ createdAt | moment('DD MMM YYYY') }}
            <hr>
            Users Joined : {{ users.length }}
            <br>
            <UserActivityStrip
              v-for="(user, index) in users"
              :key="index"
              :user="user"
            />
            <br>
            <LearnActivity :date-created="createdAt" />
            <br>
            <JobActivity :date-created="createdAt" />
            <br>
            <BlogActivity :date-created="createdAt" />
            <br>
            <EventsActivity :date-created="createdAt" />
            <br>
            <SubmissionActivity :date-created="createdAt" />
            <br>
            <TipsActivity :date-created="createdAt" />
          </b-card>
          <br><br>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UserActivityStrip from '@/components/UserActivity/UserActivityStrip';
import LearnActivity from '@/components/UserActivity/LearnActivity';
import JobActivity from '@/components/UserActivity/JobActivity';
import BlogActivity from '@/components/UserActivity/BlogActivity';
import EventsActivity from '@/components/UserActivity/EventsActivity';
import SubmissionActivity from '@/components/UserActivity/SubmissionActivity';
import TipsActivity from '@/components/UserActivity/TipsActivity';
import userService from '@/services/user.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
export default {
	name: 'UserActivity',
	components: {
		UserActivityStrip,
		LearnActivity,
		JobActivity,
		BlogActivity,
		EventsActivity,
		TipsActivity,
		SubmissionActivity,
	},
	props: {
		createdAt: {
			type: String,
			default: () => {},
		},
	},
	data() {
		return {
			users: [],
			loading: false,
		};
	},
	created() {
		userService
			.getUsersAddedOnDate(this.createdAt)
			.then((user) => {
				this.users = user;
				this.publicProfile = `https://www.frontend.social/user/${this.users.createdAt}`;
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
