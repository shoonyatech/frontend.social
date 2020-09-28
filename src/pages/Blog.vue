<template>
  <div class="learn">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col md="12">
          <LatestBlog />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LatestBlog from '@/components/Blogs/LatestBlog';

export default {
	name: 'Learn',
	components: { LatestBlog },
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
