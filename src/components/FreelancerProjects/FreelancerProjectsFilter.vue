<template>
  <div
    class="filters"
    :class="{ closed: !showFilters }"
  >
    <div
      class="expand-button d-block d-md-none"
      @click="toggleFilterViewVisibilityInMobile"
    >
      {{ `${showFilters ? 'Hide' : 'Show'} Filters` }}
    </div>
    <div class="filter-panel">
      <div class="skills-filter-wrapper">
        <div class="skills-filter">
          <div class="filter-label">
            Skills
          </div>
          <Facet
            v-for="skill in skills"
            :id="skill.id"
            :key="skill.id"
            :type="filterTypes.CHECKBOX"
            :value="skill.name"
            :label="skill.name"
            :is-selected="skill.selected"
            :on-click="handleSkillSelection"
          />
        </div>
        <br>
        <div class="skills-filter">
          <div class="filter-label">
            Job Types
          </div>
          <RadioFacet
            v-for="skill in JobTypes"
            :id="skill.id"
            :key="skill.id"
            :type="filterTypes.RADIO"
            :value="skill.name"
            :label="skill.name"
            :is-selected="skill.selected"
            :on-click="handleJobTypeSelection"
          />
        </div>
        <br>
        <div class="skills-filter">
          <div class="filter-label">
            Budget
          </div>
          <RadioFacet
            v-for="skill in Budgets"
            :id="skill.id"
            :key="skill.id"
            :type="filterTypes.RADIO"
            :value="skill.name"
            :label="skill.name"
            :is-selected="skill.selected"
            :on-click="handleBudgetSelection"
          />
        </div>
        <br>

        <div class="skills-filter">
          <div class="filter-label">
            Work Duration
          </div>
          <RadioFacet
            v-for="skill in Work"
            :id="skill.id"
            :key="skill.id"
            :type="filterTypes.RADIO"
            :value="skill.name"
            :label="skill.name"
            :is-selected="skill.selected"
            :on-click="handleDurationSelection"
          />
        </div>
        <br>
        <div class="skills-filter">
          <div class="filter-label">
            Payment
          </div>
          <RadioFacet
            v-for="skill in Payment"
            :id="skill.id"
            :key="skill.id"
            :type="filterTypes.RADIO"
            :value="skill.name"
            :label="skill.name"
            :is-selected="skill.selected"
            :on-click="handleBudgetBasisSelection"
          />
        </div>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import userService from '@/services/user.service';
import Facet from '../Filter/Filter';
import RadioFacet from '../Filter/RadioFilter';
export default {
	name: 'FreelancerProjectsFilter',
	components: {
		Facet,
		RadioFacet,
	},
	props: {
		onSearchParamsChange: {
			type: Function,
			default: () => {},
		},
		setInitialQuery: {
			type: Function,
			default: () => {},
		},
		tags: {
			type: Array,
			default: () => [],
		},
		budget: {
			type: Array,
			default: () => [],
		},
		workDuration: {
			type: Array,
			default: () => [],
		},
		budgetBasis: {
			type: Array,
			default: () => [],
		},
		jobType: {
			type: Array,
			default: () => [],
		},
	},
	data: function () {
		return {
			profile: {},
			filterTypes: {
				CHECKBOX: 'checkbox',
				RADIO: 'radio',
			},
			skills: this.tags.map((tag) => ({
				name: tag,
				id: tag,
				type: 'MULTISELECT',
				selected: false,
				query: tag,
			})),
			Budgets: this.budget.map((pay) => ({
				name: pay,
				id: pay,
				type: 'MULTISELECT',
				selected: false,
				query: pay,
			})),
			Work: this.workDuration.map((workduration) => ({
				name: workduration,
				id: workduration,
				type: 'MULTISELECT',
				selected: false,
				query: workduration,
			})),
			Payment: this.budgetBasis.map((pay) => ({
				name: pay,
				id: pay,
				type: 'MULTISELECT',
				selected: false,
				query: pay,
			})),
			JobTypes: this.jobType.map((jobtype) => ({
				name: jobtype,
				id: jobtype,
				type: 'MULTISELECT',
				selected: false,
				query: jobtype,
			})),
			skillsSelected: [],
			selectedLevel: 0,
			showFilters: true,
		};
	},
	mounted() {
		const initialQuery = this.getAppliedFacetsQuery();
		this.setInitialQuery(initialQuery);
		userService.getLoggedInUserProfile().then((user) => {
			this.profile = user;
		});
	},
	methods: {
		toggleFilterViewVisibilityInMobile() {
			this.showFilters = !this.showFilters;
		},
		handleSkillSelection(id) {
			this.skills = this.skills.map((skill) =>
				skill.id === id ? { ...skill, selected: !skill.selected } : skill
			);
			const searchQuery = this.getAppliedFacetsQuery();
			this.onSearchParamsChange(searchQuery);
		},
		handleDurationSelection(id) {
			this.Work = this.Work.map((skill) =>
				skill.id === id ? { ...skill, selected: !skill.selected } : skill
			);
			const searchQuery = this.getAppliedFacetsQuery();
			this.onSearchParamsChange(searchQuery);
		},
		handleBudgetBasisSelection(id) {
			this.Payment = this.Payment.map((skill) =>
				skill.id === id ? { ...skill, selected: !skill.selected } : skill
			);
			const searchQuery = this.getAppliedFacetsQuery();
			this.onSearchParamsChange(searchQuery);
		},
		handleJobTypeSelection(id) {
			this.JobTypes = this.JobTypes.map((skill) =>
				skill.id === id ? { ...skill, selected: !skill.selected } : skill
			);
			const searchQuery = this.getAppliedFacetsQuery();
			this.onSearchParamsChange(searchQuery);
		},
		handleBudgetSelection(id) {
			this.Budgets = this.Budgets.map((skill) =>
				skill.id === id ? { ...skill, selected: !skill.selected } : skill
			);
			const searchQuery = this.getAppliedFacetsQuery();
			this.onSearchParamsChange(searchQuery);
		},

		getAppliedFacetsQuery: function () {
			let selectedSkills = [];
			let selectedJobType = [];
			let selectedWorkDuration = [];
			let selectedBudget = [];
			let selectedPayment = [];
			let queryString = '';

			this.JobTypes.forEach((item) => {
				if (item.selected) {
					selectedJobType.push(item.query);
				}
			}) || [];
			if (selectedJobType.length) {
				queryString += `&jobType=${selectedJobType.join(',')}`;
			}

			this.Work.forEach((item) => {
				if (item.selected) {
					selectedWorkDuration.push(item.query);
				}
			}) || [];
			if (selectedWorkDuration.length) {
				queryString += `&Duration=${selectedWorkDuration.join(',')}`;
			}

			this.Payment.forEach((item) => {
				if (item.selected) {
					selectedPayment.push(item.query);
				}
			}) || [];
			if (selectedPayment.length) {
				queryString += `&Payment=${selectedPayment.join(',')}`;
			}

			this.Budgets.forEach((item) => {
				if (item.selected) {
					selectedBudget.push(item.query);
				}
			}) || [];
			if (selectedBudget.length) {
				queryString += `&Budget=${selectedBudget.join(',')}`;
			}

			this.skills.forEach((item) => {
				if (item.selected) {
					selectedSkills.push(item.query);
				}
			}) || [];
			if (selectedSkills.length) {
				queryString += `&relatedSkills=${selectedSkills.join(',')}`;
			}
			return queryString;
		},
	},
};
</script>

<style lang="scss" scoped>
.filter-panel {
	padding: 20px;
}

.filter-search-box {
	margin: 5px;
	border: 2px solid #114273;

	input {
		width: 100%;
		padding: 10px;
		cursor: pointer;
		border: none;

		&:focus {
			outline: none;
		}
	}
}

.filter-label {
	font-weight: bold;
}
.show-hide-button {
	display: none;
}

.expand-button {
	height: 1.5rem;
	background-color: #114273;
	color: white;
	text-align: center;
}

@media screen and (max-width: 768px) {
	.filters {
		background-color: white;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 100;

		overflow-y: hidden;
		max-height: 20rem;

		transition-property: max-height;
		transition-duration: 0.25s;
		transition-timing-function: ease-out;

		&.closed {
			max-height: 1.5rem;
		}
	}
}
</style>
