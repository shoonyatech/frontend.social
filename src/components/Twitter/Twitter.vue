<template>
  <div class="tip">
    <p v-if="username == null || username === ''">
      Username Unavailable !!
    </p>
    <section v-else>
      <Timeline
        :id="username"
        :options="{ tweetLimit: `${limit}`, width: '600', height: '500' }"
        source-type="profile"
      />
    </section>
  </div>
</template>
<script>
import { Timeline } from 'vue-tweet-embed';
export default {
	name: 'Twitter',
	components: {
		Timeline,
	},
	props: {
		username: {
			type: String,
			default: () => {},
		},
		limit: {
			type: Number,
			default: 10,
		},
	},
};
</script>
<style scoped></style>
