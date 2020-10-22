<template>
  <div>
    <b-card>
      <h2>
        {{ index + 1 }}
        <UserAvatar
          :user="profileData"
          :show-name="true"
        />
        with {{ result.points }} points
      </h2>
    </b-card>
  </div>
</template>
<script>
import userService from '@/services/user.service';
import UserAvatar from '@/components/common/UserAvatar';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
export default {
	name: 'ResultStrip',
	components: {
		UserAvatar,
	},
	props: {
		result: {
			type: Object,
			default: () => {},
		},
		index: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			profileData: {},
		};
	},
	created() {
		userService
			.getUserProfile(this.result.username)
			.then((user) => {
				this.profileData = user;
			})
			.catch((e) => {
				eventBus.$emit('show-toast', {
					body: e.message,
					title: messages.generic.error,
					type: ToastType.ERROR,
				});
			});
	},
};
</script>
<style></style>
