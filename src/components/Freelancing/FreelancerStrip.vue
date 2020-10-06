<template>
  <div class="layout">
    <div class="freelancer-strip">
      <b-row>
        <b-col>
          <router-link :to="'../job/freelancer/' + freelancer._id">
            {{ profileData.name }}
          </router-link>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="8">
          <SkillTags
            v-if="skills"
            :skills="skills"
          />
        </b-col>
        <b-col sm="4">
          <div class="links icon-links">
            <div>
              <UserAvatar :user="profileData" />
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12">
          <div
            ref="description"
            class="freelancer-description"
            v-html="freelancer.aboutMe"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import userService from '@/services/user.service';
import SkillTags from '@/components/Skills/SkillTags';
import UserAvatar from '@/components/common/UserAvatar';

export default {
	components: {
		UserAvatar,
		SkillTags,
	},
	props: {
		freelancer: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			profileData: {},
			skills: [],
		};
	},
	created() {
		userService
			.getUserProfile(this.freelancer.username)
			.then((user) => {
				this.profileData = user;
				this.skills = this.profileData.skills.map((s) => s.name);
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

<style scoped lang="scss">
.layout {
	display: flex;
	flex-direction: columns;
	border-bottom: dotted 1px #114273;
}

.freelancer-strip {
	flex: 0 1 auto;
	font-size: 0.9rem;
	margin: 10px;
	width: 95%;
	position: relative;
	padding-bottom: 10px;
	margin-right: 20px;
}

.freelancer-line {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.freelancer-type {
	font-size: 0.65rem;
	float: right;
}

.freelancer-skills {
	font-size: 0.65rem;
	color: #2c3e50;
}

.freelancer-date {
	font-size: 0.65rem;
	color: #2c3e50;
}

.icon-links {
	display: flex;
	flex-direction: row-reverse;
}

.freelancer-author {
	font-size: 0.65rem;
}

.freelancer-description {
	font-size: 0.8rem;
	text-align: start;
	max-height: 100px;
	overflow: hidden;
}

.collapsed {
	-webkit-mask-image: -webkit-gradient(
		linear,
		left top,
		left bottom,
		from(rgba(0, 0, 0, 1)),
		to(rgba(0, 0, 0, 0))
	);
}

.courtesy,
.tags {
	font-size: 0.65rem;
}
</style>
