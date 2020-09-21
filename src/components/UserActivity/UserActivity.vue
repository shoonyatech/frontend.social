<template>
  <div class="learn">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col
          v-if="!$store.getters.isAdmin"
          md="12"
          class="text"
        >
          {{ createdAt }}
          <hr>
          Users Joined : {{ users.length }}
          <br>
          <UserActivityStrip
            v-for="(user, index) in users"
            :key="index"
            :user="user"
          />
          <br>
          Learn Page : {{ articles.length }}
          <br>
          <UserArticlesStrip
            v-for="(article, index1) in articles"
            :key="index1"
            :article="article"
            :profile="article.createdBy"
          />
          <br>
          Job Page : {{ Jobs.length }}
          <br>
          <UserJobStrip
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
import UserActivityStrip from '@/components/UserActivity/UserActivityStrip';
import UserArticlesStrip from '@/components/UserActivity/UserArticlesStrip';
import UserJobStrip from '@/components/UserActivity/UserJobStrip';
import userService from '@/services/user.service';
import learnService from '@/services/learn.service';
import jobService from '@/services/job.service';
export default {
	name: 'UserActivity',
	components: { UserActivityStrip, UserArticlesStrip, UserJobStrip },
	data() {
		return {
			users: [],
			articles: [],
			Jobs: [],
			loading: false,
			createdAt: '2020-02-20 21:15:33.507Z',
			username: 'khushboothakur',
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
				alert('User ' + this.createdAt + ' not found');
			});

		learnService
			.getArticlesAddedOnDate(this.createdAt)
			.then((article) => {
				this.articles = article;
			})
			.catch((e) => {
				alert('article ' + this.createdAt + ' not found');
			});

		jobService
			.getJobsAddedOnDate(this.createdAt)
			.then((job) => {
				this.Jobs = job;
			})
			.catch((e) => {
				alert('jobs ' + this.createdAt + ' not found');
			});
	},
};
</script>

<style scoped lang="scss">
.text {
	color: rgb(48, 190, 238);
}
</style>
