<template>
  <div>
    <table>
      <td class="td">
        <router-link :to="'../jobs/' + job._id">
          {{ job.title }} in {{ job.city }}|{{ job.country }}
        </router-link>
      </td>
      <td>
        <img
          :src="profileData.profilePic"
          class="profile-photo"
          alt="Profile Pic"
        >
      </td>
    </table>
  </div>
</template>
<script>
import userService from '@/services/user.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
export default {
	name: 'UserJobStrip',
	props: {
		job: {
			type: Object,
			default: () => {},
		},
		profile: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			profileData: {},
		};
	},
	created() {
		userService
			.getUserProfile(this.profile.username)
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
<style>
.td {
	width: 1000px;
}

.profile-photo {
	height: 50px;
	width: 50px;
	background-color: #114273;
	text-align: left;
	padding: 2px;
	border-radius: 999px;
}
</style>
