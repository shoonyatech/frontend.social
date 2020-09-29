<template>
	<div class="tip">
		<p v-if="username == null || username === ''">Username Unavailable !!</p>
		<section v-else>
			<Timeline
				:id="username"
				:options="{ tweetLimit: '10', width: '600', height: '500' }"
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
	},
};
</script>
<style scoped></style>
