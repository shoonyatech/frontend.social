<template>
  <div
    class="filters"
    :class="{ closed: !showFilters }"
  >
    <div
      class="expand-button  d-block d-md-none"
      @click="toggleFilterViewVisibilityInMobile"
    >
      {{ `${showFilters ? "Hide" : "Show"} Filters` }}
    </div>
    <div class="filter-panel">
      <input
        placeholder="Search keyword"
        class="filter-input"
        @input="handleInputChange"
      >
      <EditCity
        :edit-mode="true"
        :city="city"
        :country="country"
        @change="onCityChange"
      />
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
      <div class="job-type-time">
        <div class="filter-label">
          Job Type
        </div>
        <Facet
          v-for="jobType in jobTypes"
          :id="jobType.id"
          :key="jobType.id"
          :type="filterTypes.CHECKBOX"
          :value="jobType.name"
          :is-selected="jobType.selected"
          :label="jobType.name"
          :on-click="handleJobSelection"
        />
      </div>
      <div class="expertise-level-filters">
        <div class="filter-label">
          Experience Level
        </div>
        <Facet
          v-for="level in expertiseLevel"
          :id="level.id"
          :key="level.id"
          :type="filterTypes.RADIO"
          :value="level.name"
          :label="level.name"
          name="expertise-level"
          :is-selected="selectedLevel === level.level"
          :on-click="handleLevelSelection"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Facet from "../Filter/Filter";
import { filtersSet } from "./FiltersConfig";
import EditCity from "../City/EditCity";
const getSelectedFilters = (filters = []) => {
  let selectedSkills = [];
  filters.forEach(item => {
    if (item.selected) {
      selectedSkills.push(item.id);
    }
  });
  return selectedSkills;
};

const resetFilters = (queryString = "") => {
  const filters = ["skills", "level", "jobTypes"];
  let queryParams = queryString.split("&");
  const queryParamWithoutFilters = queryParams.filter(item => {
    const [key] = item.split("=");
    return queryParams.includes(key);
  });
  return queryParamWithoutFilters.join("&");
};
export default {
  name: "Filters",
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
    },
    skills: {
      type: Array,
      required: true
    },
    jobTypes: {
      type: Array,
      required: true
    }
  },
  data: function() {
    const { beginner, expert, intermediate } = filtersSet;
    let selectedLevel;
    return {
      filterTypes: {
        CHECKBOX: "checkbox",
        RADIO: "radio"
      },
      expertiseLevel: [beginner, intermediate, expert],
      showFilters: true,
      selectedLevel,
      city: null,
      country: null
    };
  },
  mounted() {
    const initialQuery = this.getAppliedFacetsQuery();
    this.setInitialQuery(initialQuery);
  },
  methods: {
    handleInputChange(e) {
      const searchText = e.target.value || "";
      const searchTextQuery = searchText.length
        ? `searchText=${searchText}`
        : "";
      const searchQuery = `${searchTextQuery}${this.getAppliedFacetsQuery()}`;
      this.onSearchParamsChange(searchQuery);
    },
    toggleFilterViewVisibilityInMobile() {
      this.showFilters = !this.showFilters;
    },
    handleSkillSelection(id) {
      let currentSkill = this.skills.find(item => item.id === id);
      currentSkill.selected = !currentSkill.selected;
      const searchQuery = this.getAppliedFacetsQuery();
      this.onSearchParamsChange(searchQuery);
    },
    handleJobSelection(id) {
      let currentJob = this.jobTypes.find(item => item.id === id);
      currentJob.selected = !currentJob.selected;
      const searchQuery = this.getAppliedFacetsQuery();
      this.onSearchParamsChange(searchQuery);
    },
    handleLevelSelection(id) {
      if (this.selectedLevel !== filtersSet[id].level) {
        this.selectedLevel = filtersSet[id].level;
      }
      const searchQuery = this.getAppliedFacetsQuery();
      this.onSearchParamsChange(searchQuery, "level", this.selectedLevel);
    },
    getAppliedFacetsQuery: function() {
      let [, currentQuery = ""] = window.location.search.split("?");

      let queryString = resetFilters(currentQuery);
      const selectedSkills = getSelectedFilters(this.skills);
      if (selectedSkills.length) {
        queryString += `&skills=${selectedSkills.join(",")}`;
      }
      const selectedJobTypes = getSelectedFilters(this.jobTypes);
      if (selectedJobTypes.length) {
        queryString += `&jobTypes=${selectedJobTypes.join(",")}`;
      }

      const selectedlevel =
        this.expertiseLevel.find(item => item.level === this.selectedLevel) ||
        {};
      if (selectedlevel.query) {
        queryString += selectedlevel.query;
      }
      if (this.city) {
        queryString += `&city=${this.city}`;
      }
      if (this.country) {
        queryString += `&country=${this.country}`;
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
.filter-panel {
  padding: 20px;
  overflow-y: auto;
}

.filter-input {
  width: 100%;
}

.filter-search-box {
  margin: 5px;
  border: 2px solid #aada18;

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

.expand-button {
  height: 1.5rem;
  background-color: #aada18;
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

    transition-property: max-height;
    transition-duration: 0.25s;
    transition-timing-function: ease-out;

    &.closed {
      max-height: 1.5rem;
    }
  }

  .filter-panel {
    height: 20rem;
  }
}
</style>
