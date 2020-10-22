<template>
  <div class="learn">
    <b-container>
      <b-row>
        <b-col md="12">
          <LatestProjects />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LatestProjects from '@/components/FreelancerProjects/LatestProjects';

export default {
	name: 'Freelancer',
	components: { LatestProjects },
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
