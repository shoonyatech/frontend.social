<template>
  <div>
    <div v-if="editMode">
      <div class="input-group">
        <input
          v-model="editedCity"
          :class="{ 'left-input-width': addCity, 'left-input': !addCity }"
          placeholder="City"
          @input="onSearchCityChange"
        ><span
          v-show="addCity"
          class="input-group-addon"
        >
          <button
            v-b-modal.add-city-modal
            class="mt-0"
            type="button"
          >
            Add
          </button>
        </span>
      </div>
      <AddCity />
      <div>
        <div
          v-for="(searchedCity, index) in options"
          :key="index"
          class="city-option"
          @click="selectCity(searchedCity)"
        >
          {{ cityDisplayName(searchedCity) }}
        </div>
      </div>
      <country-select
        v-model="editedCountry"
        :country="editedCountry"
        class="left-input"
        @input="onSearchCityChange"
      />
    </div>
    <div v-else>
      <div v-if="city">
        <a
          name="city"
          :href="`/city/${city}/${country}`"
        >
          <span class="user-city">{{ city }}</span>,
          <span class="user-country">
            {{ country }}
          </span>
        </a>
      </div>
      <div
        v-else
        class="error"
      >
        [Add your city]
      </div>
    </div>
  </div>
</template>

<script>
import { CountrySelect } from "vue-country-region-select";
import cityService from "@/services/city.service";
import AddCity from "./AddCity";

export default {
  name: "EditCity",
  components: {
    CountrySelect,
    AddCity,
  },
  props: {
    editMode: {
      type: Boolean,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    addCity: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editedCity: this.city,
      editedCountry: this.country,
      options: [],
    };
  },
  methods: {
    cityDisplayName(searchedCity) {
      return searchedCity.oldName
        ? `${searchedCity.name} (${searchedCity.oldName}), ${searchedCity.country}`
        : `${searchedCity.name}, ${searchedCity.country}`;
    },
    onSearchCityChange: function(e) {
      cityService
        .getCities(this.editedCity, this.editedCountry)
        .then((cities) => {
          this.options = cities;
        });
      this.$emit("change", {
        name: this.editedCity,
        country: this.editedCountry,
      });
    },
    selectCity: function(searchedCity) {
      this.options = [];
      this.editedCity = searchedCity.name;
      this.editedCountry = searchedCity.country;
      this.$emit("change", searchedCity);
    },
  },
};
</script>

<style scoped lang="scss">
.left-input {
  width: 100%;
}

.left-input-width {
  width: 86%;
  margin-right: 10px;
}

.city-option {
  border-bottom: dotted 1px #114273;
  cursor: pointer;

  &:hover {
    background-color: #1142736c;
  }
}

.error {
  color: rgb(212, 68, 68);
  background-color: #38628c;
  font-weight: bold;
}

.display-none {
  display: none;
}
</style>
