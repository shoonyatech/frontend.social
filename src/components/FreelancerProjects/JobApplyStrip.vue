<template>
  <div class="layout">
    <div class="freelancer-strip">
      <b-row>
        <b-col md="12">
          <a>
            <span
              class="freelancer-title"
            ><router-link :to="'../job/freelancer/' + username">
              {{ profileData.name }}
            </router-link></span>
            <span class="freelancer-type capsule">{{
              profileData.category == 'dev' ? 'Developer' : 'Designer'
            }}</span>
            <span class="freelancer-type capsule">{{ freelancer.type }}</span>
          </a>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <a>{{ profileData.city }},{{ profileData.country }}</a>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="8">
          <SkillTags
            v-if="skills"
            :skills="skills"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="10">
          <div
            ref="description"
            class="freelancer-description"
            v-html="profileData.aboutMe"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import userService from '@/services/user.service';
import SkillTags from '@/components/Skills/SkillTags';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
export default {
	name: 'JobApplyStrip',
	components: {
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
			username: '',
		};
	},
	created() {
		this.loadUserData(this.freelancer.freelancerId);
	},
	methods: {
		loadUserData(id) {
			userService
				.getUserByUserId(id)
				.then((user) => {
					this.profileData = user[0];
					this.username = this.profileData.username;
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
	},
};
</script>
<style>
.freelancer-action {
	float: right;
}
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

.freelancer-type {
	font-size: 0.65rem;
	float: right;
}
.icon-links {
	display: flex;
	flex-direction: row-reverse;
}

.freelancer-description {
	font-size: 0.8rem;
	text-align: start;
	max-height: 100px;
	overflow: hidden;
}

.freelancer-title {
	cursor: pointer;
}
</style>
