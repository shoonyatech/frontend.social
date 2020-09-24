<template>
  <div class="learn">
    <Loader v-show="loading" />
    <b-container>
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

export default {
	name: 'Activity',
	components: { UserActivity },
	data() {
		return {
			articles: [],
			loading: false,
			createdAt: '',
			days: [],
		};
	},
	created() {
		for (let i = 0; i < 3; i++) {
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
