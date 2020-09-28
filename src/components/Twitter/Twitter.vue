<template>
  <div class="tip">
    <span
      v-for="(link, index) in social"
      :key="index"
    >
      <section v-if="index === 1">
        <Timeline
          v-if="link.value != ''"
          :id="link.value"
          :options="{ tweetLimit: '10', width: '600', height: '500' }"
          source-type="profile"
        ><div class="spinner">loading...</div>
        </Timeline>
        <p v-if="link.value === ''">Username Not Available !!</p>
      </section>
    </span>
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
		social: {
			type: Array,
			default: () => {},
		},
	},
};
</script>
<style scoped></style>
