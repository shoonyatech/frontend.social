<template>
  <!-- div for searching city -->
  <div class="city-container">
    <b-container class="bv-example-row">
      <b-row>
        <b-col md="6">
          <b-row>
            <b-col md="12">
              <city-basic-info
                v-if="this.selectedCity"
                :city="this.selectedCity"
                class="city-card"
              />
            </b-col>
            <b-col md="12">
              Conf
            </b-col>
            <b-col md="12">
              Meetups
            </b-col>
          </b-row>
        </b-col>
        <b-col md="6">
          <b-row>
            <b-col md="12">
              Developers
            </b-col>
            <b-col md="12">
              Designers
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
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
