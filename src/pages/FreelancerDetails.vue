<template>
	<div class="host">
		<b-container>
			<b-row>
				<b-col md="3" sm="12" class="photo-col">
					<img
						:src="profileData.profilePic"
						class="profile-photo"
						alt="profile"
					/>
					<Section title="About me" class="about-me" :is-editable="false">
						<div class="user-name">
							{{ profileData.name }}
						</div>
						<div>
							<div class="user-username">@{{ profileData.username }}</div>
						</div>
						<div>
							<div class="user-name">
								<span class="light-text">I am a</span>
								<span>
									{{ profileData.category == 'dev' ? 'Developer' : 'Designer' }}
								</span>
							</div>
						</div>
					</Section>
					<Section
						title="Public Profile"
						class="public-profile"
						:is-editable="false"
					>
						<div>
							<a
								name="publicprofile"
								class="user-public-profile"
								:href="publicProfile"
								target="_blank"
								rel="noopener"
								>{{ publicProfile }}</a
							>
						</div>
					</Section>
				</b-col>
				<b-col md="9" sm="12">
					<section v-if="invite" class="invite">
						<span v-for="(job, index) in jobs" :key="index">
							<button @click="inviteFreelancer(job._id, freelancer.username)">
								Invite for {{ job.title }}
							</button>
						</span>
					</section>
					<section
						ref="portfolio"
						title="About Me"
						class="portfolio"
						:is-editable="false"
					>
						<div class="user-username">
							{{ freelancer.aboutMe }}
						</div>
					</section>
					<br />
					<Section
						ref="portfolio"
						title="Portfolio and Social links"
						class="portfolio"
						:is-editable="false"
					>
						<KeyValue
							v-for="item in profileData.social"
							:key="item.label"
							:label="item.label"
							:value="item.value"
						/>
					</Section>
					<Section
						ref="mySkills"
						title="My skills"
						class="my-skills"
						:is-editable="false"
					>
						<div class="skill-list">
							<div class="skill-header">
								<span class="skill-name" />
								<span class="skill-years">yrs</span>
								<span class="skill-rating">expertise</span>
							</div>

							<span
								v-for="(skill, index) in profileData.skills"
								:key="skill.name"
								class="skill-control"
							>
								<SkillLevel
									:name="skill.name"
									:no-of-years="skill.noOfYears"
									:rating="skill.rating"
									:max="4"
									:is-editable="editModeSkills"
									:index="index"
									@change="onSkillChange"
								/>
							</span>
						</div>
					</Section>
					<br />
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import userService from '@/services/user.service';
import Comment from '@/components/Comment/Comment';
import freelancerService from '@/services/freelancer.service';
import freelancerJobApplyService from '@/services/freelancerJobApply.service';
import freelancerProjectService from '@/services/freelancerProjects.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
import SkillLevel from '@/components/Profile/SkillLevel';
import KeyValue from '@/components/common/KeyValue';
import Section from '@/components/common/Section';
export default {
	name: 'FreelancerDetails',
	components: {
		KeyValue,
		SkillLevel,
		Section,
	},
	props: {},
	data() {
		return {
			freelancer: {},
			jobs: [],
			freelancerData: '',
			profileData: {},
			publicProfile: null,
			editModeSkills: false,
			invite: false,
			jobId: '',
			freelancerId: '',
			type: '',
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
	},
	mounted() {
		this.loadFreelancer(this.$route.params.username);
	},
	created() {
		if (this.signedInUser != null) {
			const freelancerId = this.$store.state.signedInUser.username;
			this.loading = true;
			freelancerProjectService
				.getFreelancerProjectsByUsername(freelancerId)
				.then((re) => {
					this.invite = true;
				})
				.catch((err) => {
					this.invite = false;
				});
			this.loading = false;
		}

		const freelancerId = this.$store.state.signedInUser.username;
		this.loading = true;
		freelancerProjectService
			.getFreelancerProjectsByUsername(freelancerId)
			.then((re) => {
				this.jobs = re;
			});
	},

	methods: {
		inviteFreelancer(id, user) {
			userService.getUserProfile(user).then((user) => {
				let userId = user._id;
				const payload = {
					jobId: id,
					freelancerId: userId,
					type: 'invite',
				};
				freelancerJobApplyService.applyFreelancerJob(payload).then(() => {
					eventBus.$emit('show-toast', {
						body: messages.freelancerJobApply.jobInviteAddSuccess,
						title: messages.generic.success,
					});
				});
			});
		},
		loadFreelancer(username) {
			freelancerService
				.getFreelancerByUsername(username)
				.then((res) => {
					this.freelancer = res;
					userService
						.getUserProfile(this.freelancer.username)
						.then((user) => {
							this.profileData = user;
							this.publicProfile = `https://www.frontend.social/user/${this.profileData.username}`;
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

		onSkillChange: function ({ index, skill }) {
			if (index < this.profile.skills.length) {
				this.profile.skills[index] = skill;
			} else {
				this.profile.skills.push(skill);
			}
		},
	},
};
</script>

<style scoped lang="scss">
.invite {
	float: right;
	flex-direction: columns;
}
.profile-photo {
	max-width: 100%;
	background-color: #114273;
	text-align: left;
	padding: 5px;
}
button {
	margin: 5px;
}
.user-name {
	font-weight: 700;
}

.row {
	margin-top: 20px;
}

.skills-label {
	width: 7rem;
	text-align: left;
}

.skill-header {
	display: flex;
	width: 100%;
	text-align: left;
}

.skill-name {
	flex: 0 0 auto;
	width: 6rem;
	margin-right: 0.5rem;
}

.skill-years {
	flex: 0 0 auto;
	width: 2rem;
	margin-right: 0.5rem;
}

.skill-rating {
	flex: 1 1 auto;
	margin: 2px auto;
	width: 100%;
	text-align: center;
}

.skill-rating-icon {
	flex: 1 1 auto;
	width: 20%;
	display: inline-block;
	text-align: center;
}

.skills-actions {
	width: 100%;
	text-align: right;
	padding-top: 20px;
}

.skills-delete {
	flex: 0 0 auto;
	margin-left: 10px;
	padding: 0;
	background-color: transparent;
}

.skills-delete-placeholder {
	flex: 0 0 auto;
	display: inline-block;
	margin-left: 10px;
	width: 30px;
}

.skills {
	display: flex;
}

.skill-list {
	flex: 1 1 auto;
}

.skill-control {
	display: flex;
}

.buttons {
	margin-bottom: 10px;
}

.save-button {
	margin-right: 10px;
}

.left-input {
	width: 100%;
}

.photo-col {
	margin-bottom: 40px;
}

.about-me,
.public-profile,
.my-skills {
	margin-top: 20px;
}

.user-public-profile,
.user-referral-link {
	word-wrap: break-word;
}

.user-referrals {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}

.small-text {
	font-size: 15px;
}

.portfolio {
	word-break: break-all;
}
</style>
