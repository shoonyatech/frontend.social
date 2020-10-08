<template>
	<div class="layout">
		<div class="freelancer-strip">
			<b-row>
				<b-col md="12">
					<span
						v-if="canModify"
						class="freelancer-action"
						@click.prevent="editFreelancer(freelancer)"
					>
						<img :src="`/images/edit.svg`" class="icon-button" alt="edit" />
					</span>
					<span
						v-if="canModify"
						class="freelancer-action"
						@click.prevent="deleteFreelancer(freelancer)"
					>
						<a target="_blank">
							<button v-if="canModify">Delete</button>
						</a>
					</span>

					<a>
						<span class="freelancer-title"
							><router-link :to="'../job/freelancer/' + freelancer.username">
								{{ freelancer.name }}
							</router-link></span
						>
						<span class="freelancer-type capsule">{{
							freelancer.category == 'dev' ? 'Developer' : 'Designer'
						}}</span>
					</a>
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<a>{{ freelancer.city }},{{ freelancer.country }}</a>
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="8">
					<SkillTags
						v-if="freelancer.relatedSkills"
						:skills="freelancer.relatedSkills"
					/>
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="10">
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
import freelancerProjectService from '@/services/freelancerProjects.service';
import freelancerJobApplyService from '@/services/freelancerJobApply.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';

export default {
	components: {
		SkillTags,
	},
	props: {
		freelancer: {
			type: Object,
			default: () => {},
		},
		canModify: {
			type: Boolean,
			default: false,
		},
		creator: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			jobs: [],
			jobId: '',
			freelancerId: '',
			type: '',
		};
	},
	created() {
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
		deleteFreelancer(freelancer) {
			if (confirm('Do you really want to delete?')) {
				this.$emit('delete', freelancer);
			}
		},
		editFreelancer(freelancer) {
			this.$emit('edit', freelancer);
		},
	},
	methods: {
		deleteFreelancer(freelancer) {
			if (confirm('Do you really want to delete?')) {
				this.$emit('delete', freelancer);
			}
		},
		editFreelancer(freelancer) {
			this.$emit('edit', freelancer);
		},
	},
};
</script>

<style scoped lang="scss">
.freelancer-action {
	float: right;
}
.invite {
	float: right;
	flex-direction: columns;
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
button {
	margin: 5px;
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
