<template>
  <div class="add-project-wrapper">
    <Loader v-if="loading" />
    <div
      v-else
      class="form-container"
    >
      <form
        id="addprojectForm"
        @submit.prevent="processForm"
      >
        <div class="job-title form-field">
          <div class="form-label">
            What do you want help with ?
          </div>
          <input
            v-model="title"
            type="text"
            required
          >
        </div>
        <div class="description form-field">
          <div class="form-label">
            Description of work
          </div>
          <ckeditor
            v-model="description"
            :editor="editor"
            :config="editorConfig"
            class="editor"
          />
        </div>

        <div class="jobType form-field">
          <div class="form-label">
            Job Type
          </div>
          <div class="multiple-selection">
            <RadioButton
              id="Full Time"
              value="FullTime"
              name="jobType"
              label="Full Time"
              :is-checked="jobType === 'FullTime'"
              :on-click="setjobType"
            />
            <RadioButton
              id="Part Time"
              value="PartTime"
              name="jobType"
              label="Part Time"
              :on-click="setjobType"
              :is-checked="jobType === 'PartTime'"
            />
          </div>
        </div>
        <div class="budgetBasis form-field">
          <div class="form-label">
            Payment Type
          </div>
          <div class="multiple-selection">
            <RadioButton
              id="Fixed Bugdet"
              value="FixedBudget"
              name="budgetBasis"
              label="Fixed Bugdet"
              :on-click="setBudgetBasis"
              :is-checked="budgetBasis === 'FixedBudget'"
            />
            <RadioButton
              id="Hourly"
              value="Hourly"
              name="budgetBasis"
              label="Hourly"
              :on-click="setBudgetBasis"
              :is-checked="budgetBasis === 'Hourly'"
            />
          </div>
        </div>
        <div class="workDuration form-field">
          <div class="form-label">
            Duration of work?
          </div>
          <div class="multiple-selection">
            <RadioButton
              id="Ongoing"
              value="Ongoing"
              name="workDuration"
              label="Ongoing"
              :on-click="setWorkDuration"
              :is-checked="workDuration === 'Ongoing'"
            />
            <RadioButton
              id="Monthly"
              value="Monthly"
              name="workDuration"
              label="Monthly"
              :on-click="setWorkDuration"
              :is-checked="workDuration === 'Monthly'"
            />
            <RadioButton
              id="OneTime"
              value="OneTime"
              name="workDuration"
              label="OneTime"
              :is-checked="workDuration === 'OneTime'"
              :on-click="setWorkDuration"
            />
          </div>
        </div>
        <div class="budget form-field">
          <div class="form-label">
            Budget
          </div>
          <div class="multiple-selection">
            <RadioButton
              id="$"
              value="$"
              name="budget"
              label="$"
              :is-checked="budget === '$'"
              :on-click="setBudget"
            />
            <RadioButton
              id="$$"
              value="$$"
              name="budget"
              label="$$"
              :on-click="setBudget"
              :is-checked="budget === '$$'"
            />
            <RadioButton
              id="$$$"
              value="$$$"
              name="budget"
              label="$$$"
              :is-checked="budget === '$$$'"
              :on-click="setBudget"
            />
          </div>
        </div>
        <div class="relatedSkills form-field">
          <div class="form-label">
            Skills needed to work on the project?
          </div>
          <input
            v-model="relatedSkills"
            type="text"
          >
        </div>
        <div class="action-links">
          <button
            type="submit"
            class="btn-add-job"
          >
            Save
          </button>
          <button @click.prevent.stop="close()">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import freelancerProjectService from '@/services/freelancerProjects.service';
import RadioButton from '@/components/FreelancerProjects//Radio';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import userService from '@/services/user.service';
export default {
	name: 'AddProjects',
	components: {
		RadioButton,
	},
	data() {
		return {
			loading: false,
			title: '',
			description: '',
			company: '',
			relatedSkills: '',
			jobType: '',
			budgetBasis: '',
			budget: '',
			workDuration: '',
			editor: ClassicEditor,
			editorData: '<p>Content of the editor.</p>',
			editorConfig: {
				// The configuration of the editor.
			},
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
	},
	async created() {
		const freelancerId = this.$route.params.id;
		if (freelancerId && freelancerId !== 'new') {
			this.loading = true;
			const freelancerDetail = await freelancerProjectService.getFreelancerProjectsById(
				freelancerId
			);
			this.intializeJobDetail(freelancerDetail);
			if (!this.canModify(freelancerDetail)) {
				this.$router.push('/');
			}
			this.loading = false;
		}
	},
	mounted() {
		setTimeout(() => {
			if (this.signedInUser == null) {
				this.$router.push('/signin');
				return;
			}
		}, 1000);
	},
	methods: {
		intializeJobDetail(projectDetails) {
			this.title = projectDetails.title || '';
			this.description = projectDetails.description || '';
			this.relatedSkills = (projectDetails.relatedSkills || []).join(', ');
			this.jobType = projectDetails.jobType || 0;
			this.budgetBasis = projectDetails.budgetBasis || 0;
			this.budget = projectDetails.budget || 0;
			this.workDuration = projectDetails.workDuration || 0;
		},
		canModify(projectDetails) {
			if (!this.signedInUser) return false;

			if (this.$store.getters.isAdmin) return true;

			const username = this.signedInUser.username.toLowerCase();
			return (
				projectDetails.createdBy &&
				projectDetails.createdBy.username.toLowerCase() === username
			);
		},
		close(id) {
			if (id) {
				this.$router.push(`/freelancerProjects`);
			} else {
				this.$router.back();
			}
		},

		processForm(event) {
			const payload = {
				title: this.title,
				description: this.description,
				jobType: this.jobType,
				budgetBasis: this.budgetBasis,
				budget: this.budget,
				workDuration: this.workDuration,
				relatedSkills: this.getrelatedSkills(),
			};
			if (!payload.description) {
				alert('Please specify the description');
				return;
			}
			if (payload.jobType === '') {
				alert('Please specify the job type');
				return;
			}
			if (payload.budgetBasis === '') {
				alert('Please specify the budget basis');
				return;
			}
			if (payload.budget === '') {
				alert('Please specify the budget ');
				return;
			}
			if (payload.workDuration === '') {
				alert('Please specify the workDuration ');
				return;
			}
			if (!payload.relatedSkills) {
				alert('Please specify the Skills Required ');
				return;
			}
			const projectId = this.$route.params.id;
			if (projectId !== 'new') {
				freelancerProjectService
					.updateFreelancerProjects(projectId, payload)
					.then((resp) => {
						eventBus.$emit('show-toast', {
							body: messages.freelancer.freelancersUpdateSuccess,
							title: messages.generic.success,
						});
						this.close(resp._id);
					})
					.catch((e) => {
						eventBus.$emit('show-toast', {
							body: e.message,
							title: messages.generic.error,
							type: ToastType.ERROR,
						});
					});
			} else {
				freelancerProjectService
					.addFreelancerProjects(payload)
					.then((response) => {
						this.close(response._id);
					})
					.catch((error) => {
						eventBus.$emit('show-toast', {
							body: messages.job.jobAddFailure,
							title: messages.generic.error,
							type: ToastType.ERROR,
						});
					});
			}
		},
		setjobType(jobType) {
			this.jobType = jobType;
		},
		setBudgetBasis(jobType) {
			this.budgetBasis = jobType;
		},
		setWorkDuration(jobType) {
			this.workDuration = jobType;
		},
		setBudget(jobType) {
			this.budget = jobType;
		},
		getrelatedSkills() {
			const relatedSkills = this.relatedSkills.split(',').map((x) => x.trim());
			return relatedSkills ? relatedSkills : [];
		},
	},
};
</script>

<style lang="scss" scoped>
.form-container {
	h1 span {
		padding-left: 10px;
	}
	display: flex;
	justify-content: center;
	#addprojectForm {
		width: 83%;
		@media screen and (max-width: 1024px) {
			width: 100%;
			padding: 10px;
		}
		.form-field {
			display: flex;
			margin-bottom: 10px;
			.city-selection {
				flex: 1;
			}
			textarea,
			input[type='text'] {
				flex: 1;
				border: 3px solid #114273;
			}

			.multiple-selection {
				width: 100%;
				display: flex;
				align-items: center;
				padding-left: 20px;
				flex-wrap: wrap;
				input {
					flex: 0;
				}
				div {
					margin-right: 20px;
				}
			}
		}
		.link-and-submit-btn {
			display: flex;
			margin-bottom: 20px;
			.link.form-field {
				flex: 1;
				margin-bottom: 0;
				input {
					font-size: 1.2rem;
				}
			}
		}
		.btn-add-job,
		.btn-cancel {
			margin-right: 10px;
			min-width: 100px;
		}
		.action-links {
			justify-content: flex-end;
			padding: 5px;
			display: flex;
		}
		.form-label {
			width: 300px;
			color: #114273;
			min-width: 7rem;
		}
	}
}

@media screen and (min-width: 320px) and (max-width: 760px) {
	.form-field {
		flex-direction: column;
		.form-label {
			color: #114273;
			min-width: 7rem;
		}
	}
	.multiple-selection {
		justify-content: space-between;
	}
}

.ck-editor__editable p {
	margin: 0 !important;
}
</style>
<style lang="scss">
.add-project-wrapper {
	.ck-editor,
	.editor {
		width: 100%;
	}
}
</style>
