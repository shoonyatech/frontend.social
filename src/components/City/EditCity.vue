<template>
  <div>
    <div v-if="editMode">
      <input
        v-model="editedCity"
        class="left-input"
        placeholder="City"
        @input="onSearchCityChange"
      >
      <div>
        <div
          v-for="(searchedCity, index) in options"
          :key="index"
          class="city-option"
        >
          {{ searchedCity.name }}, {{ searchedCity.country }}
        </div>
      </div>
      <country-select
        v-model="editedCountry"
        :country="editedCountry"
        class="left-input"
      />
    </div>
    <div v-else>
      <div v-if="city">
        <a :href="`/city/${city}/${country}`">
          <span class="user-city">{{ city }}</span>,
          <span class="user-country">
            {{ country }}
          </span>
        </a>
      </div>
      <div v-else>
        [Add your city]
      </div>
    </div>
  </div>
</template>

<script>
import { CountrySelect } from "vue-country-region-select";

import cityService from "@/services/city.service";

export default {
  name: "EditCity",
  components: { CountrySelect },
  props: {
    editMode: {
      type: Boolean
    },
    city: {
      type: String
    },
    country: {
      type: String
    }
  },
  data() {
    return {
      editedCity: this.city,
      editedCountry: this.country,
      options: []
    };
  },
  methods: {
    onSearchCityChange: function(e) {
      cityService.getCities(this.editedCity).then(cities => {
        this.options = cities;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.left-input {
  width: 100%;
}

.city-option {
  border-bottom: dotted 1px #aada18;
  cursor: pointer;

  &:hover {
    background-color: #aada186c;
  }
}
</style>
