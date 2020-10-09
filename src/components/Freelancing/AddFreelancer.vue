<template>
  <b-container class="article-form">
    <Loader v-if="loading" />
    <div v-else>
      <b-row>
        <h1>Register as a freelancer</h1>
      </b-row>
      <KeyValue
        v-model="freelancer.aboutMe"
        label="About me"
        :is-editable="true"
        :multiline="true"
        @change="onAboutMeChange"
      />
      <div class="action-buttons">
        <button
          class="save-button"
          @click="save"
        >
          Save
        </button>
        <button @click="cancel">
          Cancel
        </button>
      </div>
    </div>
  </b-container>
</template>

<script>
import KeyValue from '@/components/common/KeyValue';
import skillService from '@/services/skill.service';
import freelancerService from '@/services/freelancer.service';
import userService from '@/services/user.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';

export default {
	name: 'AddFreelancer',
	components: {
		KeyValue,
	},
	data() {
		return {
			freelancer: {
				aboutMe: '',
				name: '',
				city: '',
				country: '',
				relatedSkills: [],
				category: '',
			},
			profileData: [],
			loading: true,
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
	},
	async created() {
		userService
			.getUserProfile(this.$store.state.signedInUser.username)
			.then((user) => {
				this.profileData = user;
				this.freelancer.category = this.profileData.category;
				this.freelancer.name = this.profileData.name;
				this.freelancer.city = this.profileData.city;
				this.freelancer.country = this.profileData.country;
				this.freelancer.relatedSkills = this.profileData.skills.map(
					(s) => s.name
				);
			})
			.catch((e) => {
				eventBus.$emit('show-toast', {
					body: e.message,
					title: messages.generic.error,
					type: ToastType.ERROR,
				});
			});
		const freelancerId = this.$route.params.id;
		if (freelancerId && freelancerId !== 'new') {
			this.loading = true;
			const freelancerDetail = await freelancerService.getFreelancerByUsername(
				freelancerId
			);
			this.intializeFreelancer(freelancerDetail);
			if (!this.canModify(freelancerDetail)) {
				this.$router.push('/');
			}
		} else if (this.signedInUser) {
			this.admins = [this.signedInUser];
		}
		this.loading = false;
	},
	methods: {
		onAboutMeChange(e) {
			this.freelancer.aboutMe = e.value;
		},
		close: function (id) {
			if (id) {
				this.$router.push(`/job/freelancer`);
			} else {
				this.$router.back();
			}
		},
		canModify(freelancer) {
			if (!this.signedInUser) return false;

			if (this.$store.getters.isAdmin) return true;

			const username = this.signedInUser.username.toLowerCase();
			const admins = freelancer.adminUsers || [];
			return (
				(freelancer.createdBy &&
					freelancer.createdBy.username.toLowerCase() === username) ||
				admins.some((x) => x.username.toLowerCase() === username)
			);
		},
		intializeFreelancer(freelancerDetail) {
			this.freelancer = {
				aboutMe: freelancerDetail.aboutMe || '',
				category: freelancerDetail.category || '',
				name: freelancerDetail.name || '',
				city: freelancerDetail.city || '',
				country: freelancerDetail.country || '',
				relatedSkills: freelancerDetail.relatedSkills
					? [...freelancerDetail.relatedSkills]
					: [''],
			};
		},
		save() {
			if (!this.freelancer.aboutMe) {
				alert('Please specify few lines about you');
				return;
			}
			const freelancerId = this.$route.params.id;
			if (freelancerId !== 'new') {
				freelancerService
					.updateFreelancer(freelancerId, this.freelancer)
					.then((resp) => {
						eventBus.$emit('show-toast', {
							body: messages.freelancer.freelancersUpdateSuccess,
							title: messages.generic.success,
						});
						this.close(resp.username);
					})
					.catch((e) => {
						eventBus.$emit('show-toast', {
							body: e.message,
							title: messages.generic.error,
							type: ToastType.ERROR,
						});
					});
			} else {
				freelancerService
					.addFreelancer(this.freelancer)
					.then((resp) => {
						eventBus.$emit('show-toast', {
							body: messages.freelancer.freelancersAddSuccess,
							title: messages.generic.success,
						});
						this.close(resp.username);
					})
					.catch((e) => {
						eventBus.$emit('show-toast', {
							body: e.message,
							title: messages.generic.error,
							type: ToastType.ERROR,
						});
					});
			}
		},
		cancel() {
			this.close();
		},
	},
};
</script>

<style scoped lang="scss">
.article-form {
	padding: 20px 10px;
}
.article-strip {
	flex: 0 1 auto;
	font-size: 0.9rem;
	margin: 10px;
	width: 95%;
	height: 80px;
	position: relative;
	border-bottom: dotted 1px #114273;
	padding-bottom: 10px;
	margin-right: 20px;
}

.article-line {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.article-skills {
	font-size: 0.65rem;
	color: #2c3e50;
}

.article-date {
	font-size: 0.65rem;
	color: var(--fs-primary-color);
}

.links {
	position: absolute;
	right: 10px;
	top: 20px;
}

.icon-links {
	display: flex;
	flex-direction: row;
}

.article-row {
	display: flex;
	width: 100%;
	padding-left: 10px;
	text-align: left;
}

.label {
	color: #114273;
	width: 7rem;
	min-width: 7rem;
}

.radio {
	margin-right: 1rem;
}

.end-date {
	margin-right: 1.5rem;
	display: inline-block;
}

.action-buttons {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	margin-top: 1rem;

	button {
		margin-left: 0.5rem;
	}
}

.row {
	margin-bottom: 15px;
}
.articleLink {
	font-weight: bold;
}

.user-info {
	display: flex;
	width: 100%;
	align-items: center;
}

.admin-heading {
	margin-top: 25px;
}
</style>
