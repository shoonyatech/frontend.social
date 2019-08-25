<template>
  <!-- div for searching city -->
  <div class="page">
    <div class="mt-4 row">
      <input
        class="inputCityDiv"
        placeholder="  City.."
        @input="citySearch"
      >
    </div>
    <div class="thumbnail-container">
      <city-thumbnail
        v-for="city in cities"
        :key="'city-id-' + city._id"
        :city="city"
        class="city-card"
      />
      <span
        v-if="cities == null || cities.length === 0"
        class="noResult"
      >No result found!! Please try with different filter.</span>
    </div>
  </div>
</template>

<script>
import CityThumbnail from "@/components/City/CityThumbnail";
import cityService from "@/services/city.service";

export default {
  components: {
    CityThumbnail
  },
  data() {
    return {
      cities: null
    };
  },
  methods: {
    citySearch(e) {
      // city SEARCH
      const citySearchText = e.target.value
        .replace(/^\s+/, "")
        .replace(/\s+$/, "");
      cityService.getCities(citySearchText).then(response => {
        this.cities = response.data;
      });
    }
  }
};
</script>

<style scoped>
.thumbnail-container {
  display: flex;
  flex-wrap: wrap;
  flex-grow: unset;
  flex-shrink: unset;
  flex-direction: row;
}

.city-card {
  margin: 2rem;
  display: inline-block;
}
.inputCityDiv {
  border: 3px solid #aada20;
  display: inline-block;
  margin: 20px auto;
  width: 15rem;
  font-size: inherit;
  line-height: inherit;
  height: 1.5rem;
}
::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #aada18;
}

.noResult {
  width: 100%;
}
</style>