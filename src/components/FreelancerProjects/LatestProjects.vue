<template>
  <div class="freelancersProjects">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col md="9">
          <h1>
            <span>Freelancing Projects</span>
            <button @click="hireFreelancer()">
              + Hire a freelancer
            </button>
          </h1>
          <div
            v-infinite-scroll="loadFreelancersProjects"
            infinite-scroll-distance="limit"
            infinite-scroll-disabled="isDisableInfiniteScroll"
          >
            <div>
              <div
                v-if="freelancersProjects.length"
                class="jobs"
              >
                <FreelancingProjectsStrip
                  v-for="project in freelancersProjects"
                  :id="project._id"
                  :key="project.id"
                  :role="project.title"
                  :job-description="project.description"
                  :job-type="project.jobType"
                  :budget-basis="project.budgetBasis"
                  :budget="project.budget"
                  :work-duration="project.workDuration"
                  :required-skills="project.relatedSkills"
                  :can-modify="canModify(project)"
                  @delete="onDeleteFreelancerProject"
                  @edit="onEditFreelancerProject"
                />
              </div>
              <div v-else>
                No freelancersProjects found!
              </div>
            </div>
          </div>
        </b-col>
        <b-col
          md="3"
        >
          <div />
          {{ skills }}
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import FreelancingProjectsStrip from '@/components/FreelancerProjects/FreelancingProjectsStrip';
import freelancerProjectService from '@/services/freelancerProjects.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages, EventPageLimit } from '@/constants/constants';
export default {
	name: 'LatestProjects',
	components: { FreelancingProjectsStrip },
	props: {},
	data() {
		return {
			freelancersProjects: [],
			skills: [],
			loading: true,
			page: 1,
			limit: 20,
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
	},
	async mounted() {
		this.loading = true;
		await this.getFreelancersSkills();
		this.loading = false;
	},
	created() {
		if (!this.infiniteScroll) {
			this.loadFreelancersProjects();
		}
	},
	methods: {
		hireFreelancer() {
			if (this.signedInUser == null) {
				this.$router.push('/signin');
			} else {
				this.$router.push('/freelancerProjects/hire/new');
			}
		},
		getFreelancersSkills() {
			return freelancerProjectService.getSkills().then((resp) => {
				this.skills = resp.sort();
			});
		},
		canModify(project) {
			if (!this.signedInUser) return false;

			if (this.$store.getters.isAdmin) return true;

			const username = this.signedInUser.username.toLowerCase();
			const admins = project.adminUsers || [];
			return (
				(project.createdBy &&
					project.createdBy.username.toLowerCase() === username) ||
				admins.some((x) => x.username.toLowerCase() === username)
			);
		},
		onEditFreelancerProject(project) {
			this.$router.push(`/job/freelancer/register/${project}`);
		},
		onDeleteFreelancerProject(project) {
			this.loading = true;
			freelancerProjectService
				.deleteFreelancerProjects(project)
				.then(() => {
					eventBus.$emit('show-toast', {
						body: messages.freelancerProjects.freelancerProjectsDeletedSuccess,
						title: messages.generic.success,
					});
					this.freelancersProjects = this.freelancersProjects.filter(
						(e) => e.id !== project
					);
					this.loading = false;
				})
				.catch((e) => {
					eventBus.$emit('show-toast', {
						body: e.message,
						title: messages.generic.error,
						type: ToastType.ERROR,
					});
					this.loading = false;
				});
		},

		loadFreelancersProjects(param = '', filter = true) {
			let query = '';
			this.busy = false;
			this.limit = this.limit || 20;
			this.page = filter ? 1 : this.page || 1;

			freelancerProjectService
				.getFreelancerProjects(param, this.limit, this.page)
				.then((freelancer) => {
					console.log(freelancer);
					if (filter) {
						this.freelancersProjects = freelancer;
					} else
						this.freelancersProjects = this.freelancersProjects.concat(
							freelancer
						);
					if (freelancer.length > 0) {
						++this.page;
					}
					this.busy = true;
					this.loading = false;
				});
		},
	},
};
</script>

<style scoped lang="scss"></style>
