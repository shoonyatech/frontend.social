<template>
  <div>
    <table>
      <td class="td">
        <a :href="job.link">{{ job.title }} by {{ job.author }}</a>
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
				alert('User ' + this.profile.username + ' not found');
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
