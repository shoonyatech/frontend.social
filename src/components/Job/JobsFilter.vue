<template>
  <div class="filter-panel">
    <EditCity
      v-show="!hideCity"
      :edit-mode="true"
      :city="city"
      :country="country"
      @change="onCityChange"
    />
    <input
      placeholder="Enter keyword"
      class="filter-input"
      @input="handleInputChange"
    >
  </div>
</template>

<script>
import { filtersSet } from '@/components/Filters/FiltersConfig';
import EditCity from '@/components/City/EditCity';
const getSelectedFilters = (filters = []) => {
  let selectedSkills = [];
  filters.forEach((item) => {
    if (item.selected) {
      selectedSkills.push(item.id);
    }
  });
  return selectedSkills;
};

const resetFilters = (queryString = '') => {
  const filters = ['skills', 'level', 'jobTypes'];
  let queryParams = queryString.split('&');
  const queryParamWithoutFilters = queryParams.filter((item) => {
    const [key] = item.split('=');
    return queryParams.includes(key);
  });
  return queryParamWithoutFilters.join('&');
};
export default {
  name: 'Filters',
  components: {
    EditCity,
  },
  props: {
    onSearchInputChange: {
      type: Function,
      default: () => {},
    },
    onSearchParamsChange: {
      type: Function,
      default: () => {},
    },
    setInitialQuery: {
      type: Function,
      default: () => {},
    },
    skills: {
      type: Array,
      required: true,
    },
    jobTypes: {
      type: Array,
      required: true,
    },
    expertiseLevel: {
      type: Array,
      required: false,
      default: function () {
        const { beginner, expert, intermediate } = filtersSet;
        return [beginner, intermediate, expert];
      },
    },
    hideCity: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    let selectedLevel;
    return {
      filterTypes: {
        CHECKBOX: 'checkbox',
        RADIO: 'radio',
      },
      showFilters: true,
      selectedLevel,
      city: null,
      country: null,
    };
  },
  mounted() {
    const initialQuery = this.getAppliedFacetsQuery();
    this.setInitialQuery(initialQuery);
  },
  methods: {
    handleInputChange(e) {
      const searchText = e.target.value || '';
      const searchTextQuery = searchText.length
        ? `searchText=${searchText}`
        : '';
      const searchQuery = `${searchTextQuery}${this.getAppliedFacetsQuery()}`;
      this.onSearchParamsChange(searchQuery);
    },
    toggleFilterViewVisibilityInMobile() {
      this.showFilters = !this.showFilters;
    },

    getAppliedFacetsQuery: function () {
      let [, currentQuery = ''] = window.location.search.split('?');
      let queryString = resetFilters(currentQuery);

      if (this.city) {
        queryString += `&city=${this.city}`;
      }
      if (this.country) {
        queryString += `&country=${this.country}`;
      }
      return queryString;
    },
    onCityChange: function (city) {
      this.city = city.name;
      this.country = city.country;
      const searchQuery = this.getAppliedFacetsQuery();
      this.onSearchParamsChange(searchQuery);
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-panel {
  padding: 20px;
  display: flex;
  height: 100%;
}

.filter-input {
  width: 100%;
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
