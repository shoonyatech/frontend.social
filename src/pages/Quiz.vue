<template>
  <div class="quiz">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col md="12">
          <LatestQuiz />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LatestQuiz from '@/components/Quiz/LatestQuiz';

export default {
	name: 'Quiz',
	components: { LatestQuiz },
	data() {
		return {
			quizs: [],
			loading: false,
		};
	},
	created() {},
	methods: {},
};
</script>

<style scoped lang="scss"></style>
