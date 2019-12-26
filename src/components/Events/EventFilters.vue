<template>
  <div class="filters">
    <edit-city
      :edit-mode="true"
      :city="profile.city"
      :country="profile.country"
      @change="onCityChange"
    />
    <div
      class="skills-filter-wrapper"
      :class="{ active: showFilters }"
    >
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
    <div
      class="show-hide-button"
      @click="toggleFilterViewVisibilityInMobile"
    >
      {{ `${showFilters ? "Hide" : "Show"} filters` }}
    </div>
  </div>
</template>

<script>
import userService from "@/services/user.service";

import Facet from "../Filter/Filter";
import { filtersSet } from "./FiltersConfig";
import EditCity from "@/components/City/EditCity";

export default {
  name: "EventFilters",
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
        CHECKBOX: "checkbox",
        RADIO: "radio"
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
      let queryString = "";

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
        queryString += `&relatedSkills=${selectedSkills.join(",")}`;
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
@media screen and (min-width: 760px) {
  .skills-filter-wrapper {
    height: auto;
    overflow: auto;
  }
}
</style>
