<template>
	<div class="jobs-container">
		<Loader v-show="loading" />
		<b-container>
			<b-row>
				<b-col md="12">
					<div class="job">
						<div class="role-and-expertise">
							<h1>
								{{ jobs.title }}
								<a class="btn-apply" :href="jobs.link" target="_blank">
									<button @click="applyforjob()">Apply for this work</button>
								</a>
							</h1>
						</div>
						<div class="skills-required">
							<SkillTags :skills="jobs.relatedSkills" />

							<div class="expertise capsule remote">
								{{ jobs.jobType }}
							</div>
							<div class="expertise capsule">
								{{ jobs.budgetBasis }}
							</div>
							<div class="expertise capsule duration">
								{{ jobs.budget }}
							</div>
							<div class="expertise capsule price">
								{{ jobs.workDuration }}
							</div>
						</div>
						<br />
						<div
							ref="description"
							class="job-description"
							v-html="jobs.description"
						/>
					</div>
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<div v-if="canModify()">
						<h1>List of Applied Freelancers</h1>
						<JobApplyStrip
							v-for="(freelancer, index) in freelancers"
							:key="index"
							:freelancer="freelancer"
						/>
					</div>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import freelancerProjectService from '@/services/freelancerProjects.service';
import freelancerJobApplyService from '@/services/freelancerJobApply.service';
import JobApplyStrip from '@/components/FreelancerProjects/JobApplyStrip';
import SkillTags from '@/components/Skills/SkillTags';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages, EventPageLimit } from '@/constants/constants';

export default {
	name: 'Jobs',
	components: {
		SkillTags,
		JobApplyStrip,
	},
	data() {
		return {
			jobs: {},
			freelancers: {},
			loading: false,
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
		this.loadFreelancer(this.$route.params.id);
		this.loadJobApplyFreelancers(this.$route.params.id);
	},
	methods: {
		canModify() {
			if (!this.signedInUser) return false;

			if (this.$store.getters.isAdmin) return true;

			const username = this.signedInUser.username.toLowerCase();
			const admins = this.jobs.adminUsers || [];
			return (
				(this.jobs.createdBy &&
					this.jobs.createdBy.username.toLowerCase() === username) ||
				admins.some((x) => x.username.toLowerCase() === username)
			);
		},
		applyforjob() {
			const payload = {
				jobId: this.$route.params.id,
				freelancerId: this.$store.state.signedInUser._id,
				type: 'apply',
			};
			freelancerJobApplyService.applyFreelancerJob(payload).then((res) => {
				eventBus.$emit('show-toast', {
					body: messages.freelancerJobApply.jobApplyAddSuccess,
					title: messages.generic.success,
				});
			});
		},
		loadFreelancer(id) {
			freelancerProjectService
				.getFreelancerProjectsById(id)
				.then((res) => {
					this.jobs = res;
				})
				.catch((e) => {
					eventBus.$emit('show-toast', {
						body: e.message,
						title: messages.generic.error,
						type: ToastType.ERROR,
					});
				});
		},
		loadJobApplyFreelancers(id) {
			freelancerJobApplyService.getFreelancerByProjectId(id).then((res) => {
				this.freelancers = res;
			});
		},
	},
};
</script>

<style scoped lang="scss">
.job {
	width: 90%;
	padding: 10px;
	position: relative;
}
.job .role-and-expertise {
	display: flex;
	justify-content: space-between;
	padding: 5px 0;
}
.expertise {
	font-size: 0.65rem;
}
.remote {
	background: #c50606;
	color: white;
}
.duration {
	background: #114273;
	color: white;
}
.price {
	background: rgb(3, 179, 3);
	color: white;
}
.job .skills-required {
	text-align: left;
	padding: 5px 0;
	font-size: 0.65rem;
}
.job .skills-required {
	text-align: left;
	padding: 5px 0;
	font-size: 0.65rem;
}
.job-description {
	font-size: 0.8rem;
}
.location-description {
	font-size: 0.8rem;
}
.btn-apply {
	right: 0;
	position: absolute;
	z-index: 8;
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

.expanded {
	max-height: unset;
}

.arrow-container {
	display: flex;
	justify-content: center;
	align-content: center;
}
@media screen and (max-width: 759px) {
	.job {
		width: 98%;
	}
}
</style>
