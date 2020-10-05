<template>
  <div>
    <table>
      <td class="td">
        <router-link
          :to="'../submission/' + submission._id + '/' + submission.title"
        >
          {{ submission.submission }} for
          {{ submission.challengeId }}
        </router-link>
      </td>
      <td>
        <a
          :href="`/user/${profileData.username}`"
          :title="profileData.username"
        >
          <img
            :src="profileData.profilePic"
            class="profile-photo"
            alt="Profile Pic"
          ></a>
      </td>
    </table>
  </div>
</template>
<script>
import userService from '@/services/user.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
export default {
	name: 'UserSubmissionActivity',
	props: {
		submission: {
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
