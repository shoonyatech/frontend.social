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
        <div class="categorys-filter">
          <div class="filter-label">
            Category
          </div>
          <Facet
            v-for="categor in categories"
            :id="categor.id"
            :key="categor.id"
            :type="filterTypes.CHECKBOX"
            :value="categor.name"
            :label="categor.name"
            :is-selected="categor.selected"
            :on-click="handleCategorySelection"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userService from '@/services/user.service';
import Facet from '../Filter/Filter';

export default {
	name: 'FreelancingFilter',
	components: {
		Facet,
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
		category: {
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
			categories: this.category.map((tag) => ({
				name: tag,
				id: tag,
				type: 'MULTISELECT',
				selected: false,
				query: tag,
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
		handleCategorySelection(id) {
			this.categories = this.categories.map((category) =>
				category.id === id
					? { ...category, selected: !category.selected }
					: category
			);
			const searchQuery = this.getAppliedFacetsQuery();
			this.onSearchParamsChange(searchQuery);
		},
		getAppliedFacetsQuery: function () {
			let selectedSkills = [];
			let selectedCategory = [];
			let queryString = '';

			this.categories.forEach((item) => {
				if (item.selected) {
					selectedCategory.push(item.query);
				}
			}) || [];
			if (selectedCategory.length) {
				queryString += `&category=${selectedCategory.join(',')}`;
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
