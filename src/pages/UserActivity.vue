<template>
  <div class="learn">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col
          v-if="$store.getters.isAdmin"
          md="11"
          class="text"
        >
          <div>
            <span>Total users: {{ total }} <br>Github users:
              {{ users.github.length }} <br>Google users:
              {{ users.google.length }}<br>Facebook users:
              {{ users.facebook.length }}<br>Twitter users:{{
                users.twitter.length
              }}<br><br>
            </span>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          v-if="$store.getters.isAdmin"
          md="12"
        >
          <UserActivity
            v-for="(day, index) in days"
            :key="index"
            :created-at="day"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UserActivity from '@/components/UserActivity/UserActivity';
import moment from 'moment';
import userService from '@/services/user.service';

export default {
	name: 'Activity',
	components: { UserActivity },
	data() {
		return {
			articles: [],
			loading: false,
			createdAt: '',
			days: [],
			users: {
				github: [],
				google: [],
				twitter: [],
				facebook: [],
			},
			total: 0,
		};
	},
	created() {
		userService
			.getUsers()
			.then((user) => {
				this.total = user.length;
				user.map((re) => {
					if (re.provider === 'github') {
						this.users.github.push(re);
					}
					if (re.provider === 'facebook') {
						this.users.facebook.push(re);
					}
					if (re.provider === 'twitter') {
						this.users.twitter.push(re);
					}
					if (re.provider === 'google') {
						this.users.google.push(re);
					}
				});
			})
			.catch((e) => {
				eventBus.$emit('show-toast', {
					body: e.message,
					title: messages.generic.error,
					type: ToastType.ERROR,
				});
			});
		for (let i = 0; i < 30; i++) {
			var today = new Date();
			var dates = today.setDate(today.getDate() - i);
			var data = moment(dates);
			var date = data._d;
			this.createdAt =
				date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
			this.days.push(this.createdAt);
		}
	},
	methods: {},
};
</script>

<style scoped lang="scss"></style>
