<template>
  <div class="freelancersProjects">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col md="9">
          <h1>
            <span>Freelancing Projects</span>
            <button @click="hireFreelancer()">
              Post a Project
            </button>
          </h1>
          <div>
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
        <b-col md="3">
          <div class="filters-wrapper">
            <FreelancerProjectsFilter
              v-if="skills.length"
              :tags="skills"
              :budget="budget"
              :work-duration="workDuration"
              :budget-basis="budgetBasis"
              :job-type="jobType"
              :on-search-params-change="onSearchParamsChange"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import FreelancingProjectsStrip from '@/components/FreelancerProjects/FreelancingProjectsStrip';
import FreelancerProjectsFilter from '@/components/FreelancerProjects/FreelancerProjectsFilter';
import freelancerProjectService from '@/services/freelancerProjects.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages, EventPageLimit } from '@/constants/constants';
export default {
	name: 'LatestProjects',
	components: { FreelancingProjectsStrip, FreelancerProjectsFilter },
	props: {},
	data() {
		return {
			freelancersProjects: [],
			skills: [],
			budget: [],
			workDuration: [],
			budgetBasis: [],
			jobType: [],
			loading: true,
			page: 1,
			limit: 25,
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
	},
	async mounted() {
		this.loading = true;
		await this.getFreelancersBudgetBasis();
		await this.getFreelancersJobType();
		await this.getFreelancersBudget();
		await this.getFreelancersWorkingDuration();
		await this.getFreelancersSkills();
		this.loading = false;
	},
	created() {
		if (!this.infiniteScroll) {
			this.loadFreelancersProjects();
		}
	},
	methods: {
		onSearchParamsChange(param = '') {
			this.loading = true;
			this.loadFreelancersProjects(param, true);
		},
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
		getFreelancersJobType() {
			return freelancerProjectService.getJobType().then((resp) => {
				this.jobType = resp.sort();
			});
		},
		getFreelancersBudgetBasis() {
			return freelancerProjectService.getBudgetBasis().then((resp) => {
				this.budgetBasis = resp.sort();
			});
		},
		getFreelancersWorkingDuration() {
			return freelancerProjectService.getWorkDuration().then((resp) => {
				this.workDuration = resp.sort();
			});
		},
		getFreelancersBudget() {
			return freelancerProjectService.getBudget().then((resp) => {
				this.budget = resp.sort();
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
			this.limit = this.limit || 25;
			this.page = filter ? 1 : this.page || 1;

			freelancerProjectService
				.getFreelancerProjects(param, this.limit, this.page)
				.then((freelancer) => {
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
