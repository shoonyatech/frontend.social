<template>
  <div>
    <table>
      <td class="td">
        <router-link :to="'../blog/' + blog._id + '/' + blog.title">
          {{ blog.title }} by {{ blog.author }}
        </router-link>
      </td>
      <td>
        <div>
          <UserAvatar :user="profileData" />
        </div>
      </td>
    </table>
  </div>
</template>
<script>
import userService from '@/services/user.service';
import UserAvatar from '@/components/common/UserAvatar';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
export default {
	name: 'UserBlogActivity',
	components: {
		UserAvatar,
	},
	props: {
		blog: {
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
