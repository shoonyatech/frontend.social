<template>
  <!-- div for searching city -->
  <div class="city-container">
    <city-basic-info
      v-if="this.selectedCity"
      :city="this.selectedCity"
      class="city-card"
    />

    <div class="scroll">
      <div class="mt-4 row devcountPdiv">
        <div class="col-md-8 devcount">
          <div class="row">
            <div class />
          </div>
          <div class="row mt-4">
            <div class="devcol col-md-7" />
          </div>
        </div>
        <!-- get developers and desiners details -->
        <div class="col-md-4 devdisp" />
      </div>
    </div>
  </div>
</template>

<script>
import CityBasicInfo from "@/components/City/CityBasicInfo";
import cityService from "@/services/city.service";

export default {
  components: {
    CityBasicInfo
  },
  data() {
    return {
      selectedCity: null
    };
  },
  created() {
    const cityName = this.$route.params.cityName;
    const countryCode = this.$route.params.countryCode;
    cityService.getCityDetails(cityName, countryCode).then(response => {
      this.selectedCity = response.data;
    });
  },

  methods: {}
};
</script>

<style scoped>
/* style for city search page */
.city-container {
  text-align: left;
}

.city-card {
  margin: 2rem;
  display: inline-block;
}

.inputCityDiv {
  border: 3px solid #aada20;
  display: inline-block;
  margin: 0 auto;
  width: 25%;
}
::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #aada18;
}
</style>
