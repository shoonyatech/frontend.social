<template>
  <div>
    <table>
      <td>
        <div>
          <UserAvatar :user="profileData" />
        </div>
      </td>
      <td class="td">
        <div class="tip">
          <Tweet
            :id="tweetId"
            class="tip-wrapper"
          >
            <div class="spinner">
              loading...
            </div>
          </Tweet>
          <div class="tool-tip-tags">
            {{ tags }}
          </div>
        </div>
      </td>
    </table>
  </div>
</template>
<script>
import tipsService from '@/services/user.service';
import UserAvatar from '@/components/common/UserAvatar';
import { Tweet } from 'vue-tweet-embed';
export default {
	name: 'UserTipsActivity',
	components: {
		Tweet,
		UserAvatar,
	},
	props: {
		tip: {
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
			id: '',
		};
	},
	computed: {
		tweetId() {
			return this.tip.twitterLink.split('/status/')[1];
		},
		tags() {
			return this.tip.tags.map((tip) => `#${tip}`).join(' ');
		},
	},
	created() {
		tipsService
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
.tip {
	border-bottom: dotted 1px #114273;
	padding: 10px;
	position: relative;
	min-width: 50%;
}

@media screen and (max-width: 700px) {
	.tip {
		min-width: 300px;
	}
}
.tool-tip-tags {
	color: rgb(27, 149, 224);
}

.tip-wrapper {
	min-height: 200px;
}
</style>
