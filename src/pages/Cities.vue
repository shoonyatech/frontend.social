<template>
  <!-- div for searching city -->
  <div class="learn">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col md="12">
          <div class="search-box-container">
            <input
              class="search-box"
              placeholder="City.."
              @input="citySearch"
            >
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <div
            v-if="cities == null || cities.length === 0"
            class="no-result"
          >
            No city found. Please try again..
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          v-for="(city, index) in cities"
          :key="index"
          md="3"
        >
          <div class="city-card-container">
            <city-thumbnail
              :city="city"
              class="city-card"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
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
      cities: [],
      loading: true,
    };
  },
  created() {
    this.loading = true;
    cityService.getCities().then(cities => {
      this.cities = cities
      this.loading = false;
    });
  },
  methods: {
    citySearch(e) {
      // city SEARCH
      const citySearchText = e.target.value
        .replace(/^\s+/, "")
        .replace(/\s+$/, "");
      cityService
        .getCities(citySearchText)
        .then(cities => (this.cities = cities));
    }
  }
};
</script>

<style scoped lang="scss">
.thumbnail-container {
  display: flex;
  flex-wrap: wrap;
  flex-grow: unset;
  flex-shrink: unset;
  flex-direction: row;
}

.city-card {
  margin-bottom: 1rem;
  display: inline-block;
}

.city-card-container {
  width: 100%;
  text-align: center;
}

.search-box-container {
  width: 100%;
  text-align: center;
}

.search-box {
  border: 3px solid #114273;
  display: inline-block;
  margin: 20px auto;
  width: 15rem;
  font-size: inherit;
  line-height: inherit;
  height: 1.5rem;
}
::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #114273;
}

.no-result {
  text-align: center;
  width: 100%;
}
</style>
