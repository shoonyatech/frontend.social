<template>
  <div class="host">
    <b-container>
      <b-row
        class="description"
        md="12"
      >
        <b-col>
          <UserAvatar :user="profileData" />
          <h1>{{ profileData.name }}</h1>
          <span>{{ profileData.city }},{{ profileData.country }}</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <SkillTags
            v-if="skills"
            :skills="skills"
          />
        </b-col>
        <b-col md="12">
          <div v-html="freelancer.aboutMe" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import userService from '@/services/user.service';
import Comment from '@/components/Comment/Comment';
import freelancerService from '@/services/freelancer.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
import SkillTags from '@/components/Skills/SkillTags';
import UserAvatar from '@/components/common/UserAvatar';
export default {
	name: 'FreelancerDetails',
	components: {
		UserAvatar,
		SkillTags,
	},
	props: {},
	data() {
		return {
			freelancer: {},
			freelancerData: '',
			profileData: {},
			skills: [],
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
	},
	mounted() {
		this.loadFreelancer(this.$route.params.id);
	},
	created() {},

	methods: {
		loadFreelancer(freelancerId) {
			freelancerService
				.getFreelancerById(freelancerId)
				.then((res) => {
					this.freelancer = res;
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

<style scoped lang="scss"></style>
