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
        v-for="city in this.allCities"
        :key="'city-id-' + city._id"
        :city="city"
        class="city-card"
      />
      <span
        v-if="this.$store.state.noResultshow"
        class="noResult"
      >No result found!! Please try with different filter.</span>
    </div>
  </div>
</template>

<script>
import CityThumbnail from "@/components/CityThumbnail";
export default {
  components: {
    CityThumbnail
  },
  methods: {
    citySearch(e) {
      // city SEARCH
      const citySearchText = e.target.value
        .replace(/^\s+/, "")
        .replace(/\s+$/, "");
      if (citySearchText !== "") {
        this.$store.dispatch("GET_CITIES", citySearchText);
      }
    }
  }
};
</script>
