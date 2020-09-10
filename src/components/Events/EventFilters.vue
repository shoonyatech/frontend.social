<template>
  <div
    class="filters"
    :class="{ closed: !showFilters }"
  >
    <div
      class="expand-button  d-block d-md-none"
      @click="toggleFilterViewVisibilityInMobile"
    >
      {{ `${showFilters ? 'Hide' : 'Show'} Filters` }}
    </div>
    <div class="filter-panel">
      <input
        placeholder="Search keyword"
        class="filter-input"
        @input="handleInputChange"
      >
      <edit-city
        :edit-mode="true"
        :city="profile.city"
        :country="profile.country"
        @change="onCityChange"
      />
      <div class="skills-filter-wrapper">
        <div class="skills-filter">
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
      </div>
    </div>
  </div>
</template>

<script>
import userService from '@/services/user.service';

import Facet from '../Filter/Filter';
import { filtersSet } from './FiltersConfig';
import EditCity from '@/components/City/EditCity';

export default {
	name: 'EventFilters',
	components: {
		Facet,
		EditCity
	},
	props: {
		onSearchInputChange: {
			type: Function,
			default: () => {}
		},
		onSearchParamsChange: {
			type: Function,
			default: () => {}
		},
		setInitialQuery: {
			type: Function,
			default: () => {}
		}
	},
	data: function() {
		const { react, angular, vue, webComponents, graphQL } = filtersSet;
		return {
			profile: {},
			filterTypes: {
				CHECKBOX: 'checkbox',
				RADIO: 'radio'
			},
			skills: [react, angular, vue, webComponents, graphQL],
			skillsSelected: [],
			selectedLevel: 0,
			showFilters: true
		};
	},
	mounted() {
		const initialQuery = this.getAppliedFacetsQuery();
		this.setInitialQuery(initialQuery);

		userService.getLoggedInUserProfile().then(user => {
			this.profile = user;
		});
	},
	methods: {
		handleInputChange(e) {
			const searchText = e.target.value || '';
			const searchTextQuery = searchText.length
				? `&searchText=${searchText}`
				: '';
			const searchQuery = `${searchTextQuery}${this.getAppliedFacetsQuery()}`;
			this.onSearchParamsChange(searchQuery);
		},
		toggleFilterViewVisibilityInMobile() {
			this.showFilters = !this.showFilters;
		},
		handleSkillSelection(id) {
			filtersSet[id].selected = !filtersSet[id].selected;
			const searchQuery = this.getAppliedFacetsQuery();
			this.onSearchParamsChange(searchQuery);
		},
		getAppliedFacetsQuery: function() {
			let selectedSkills = [];
			let queryString = '';
			if (this.searchText) {
				queryString += `&title=${this.searchText}`;
			}
			if (this.city) {
				queryString += `&city=${this.city}`;
			}
			if (this.country) {
				queryString += `&country=${this.country}`;
			}

			this.skills.forEach(item => {
				if (item.selected) {
					selectedSkills.push(item.query);
				}
			}) || [];
			if (selectedSkills.length) {
				queryString += `&relatedSkills=${selectedSkills.join(',')}`;
			}

			return queryString;
		},
		onCityChange: function(city) {
			this.city = city.name;
			this.country = city.country;
			const searchQuery = this.getAppliedFacetsQuery();
			this.onSearchParamsChange(searchQuery);
		}
	}
};
</script>

<style lang="scss" scoped>
.filter-input {
	width: 100%;
}
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
