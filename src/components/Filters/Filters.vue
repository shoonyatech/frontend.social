<template>
  <div class="filters">
    <div class="filter-search-box">
      <input
        placeholder="Search ..."
        @input="handleInputChange"
      >
    </div>
    <div
      class="skills-filter-wrapper"
      :class="{ active:showFilters}"
    >
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
          :is-selected="selectedLevel===level.level"
          :on-click="handleLevelSelection"
        />
      </div>
    </div>
    <div
      class="show-hide-button"
      @click="toggleFilterViewVisibilityInMobile"
    >
      {{ `${showFilters?'Hide':'Show'} filters` }}
    </div>
  </div>
</template>

<script>
import Facet from "../Filter/Filter";
import { filtersSet } from "./FiltersConfig";

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
    Facet
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
      selectedLevel
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
      return queryString;
    }
  }
};
</script>

<style lang="scss" scoped>
.skills-filter-wrapper {
  height: 0;
  overflow: hidden;
  transform: scaleY(0);

  &.active {
    display: block;
    height: auto;
    transform: scaleY(1);
    transition: transform 0.5s ease;
  }
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
.show-hide-button {
  display: none;
}
@media screen and (min-width: 360px) and (max-width: 759px) {
  .skills-filter,
  .job-type-time {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 5px;
    border-bottom: 1px solid;
  }
  .expertise-level-filters {
    padding-bottom: 5px;
    border-bottom: none;
  }
  .filter-label {
    width: 100%;
  }
  .filter {
    width: 50%;
  }
  .show-hide-button {
    display: flex;
    border: 2px solid;
    height: 40px;
    width: 200px;
    justify-content: center;
    margin: 0 auto;
    border-radius: 20px;
    border: 2px solid #aada18;
  }
}
@media screen and (min-width: 768px) {
  .skills-filter-wrapper {
    height: auto;
    overflow: auto;
  }
}
</style>
