<template>
  <div class="learn">
    <b-container>
      <b-row>
        <b-col md="12">
          <LatestFreelancers />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LatestFreelancers from '@/components/Freelancing/LatestFreelancers';

export default {
	name: 'Freelancer',
	components: { LatestFreelancers },
	data() {
		return {
			freelancers: [],
			loading: false,
		};
	},
	created() {},
	methods: {},
};
</script>

<style scoped lang="scss"></style>
