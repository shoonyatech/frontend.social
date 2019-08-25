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
        v-if="cities == null"
        class="noResult"
      >No result found!! Please try with different filter.</span>
    </div>
  </div>
</template>

<script>
import CityThumbnail from "@/components/CityThumbnail";
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
      if (citySearchText !== "") {
        cityService.getCities(citySearchText).then(response => {
          this.cities = response.data;
        });
      }
    }
  }
};
</script>
