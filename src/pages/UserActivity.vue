<template>
  <div class="learn">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col md="12">
          <UserActivity />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UserActivity from '@/components/UserActivity/UserActivity';

export default {
	name: 'Activity',
	components: { UserActivity },
	data() {
		return {
			articles: [],
			loading: false,
		};
	},
	created() {},
	methods: {},
};
</script>

<style scoped lang="scss"></style>
