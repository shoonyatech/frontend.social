<template>
  <!-- div for searching city -->
  <div class="city-container">
    <b-container class="bv-example-row">
      <b-row>
        <b-col md="4">
          <b-row>
            <b-col
              md="12"
              class="city-basic-info"
            >
              <city-basic-info
                v-if="selectedCity"
                :city="selectedCity"
                class="city-card"
              />
            </b-col>
          </b-row>
        </b-col>
        <b-col md="8">
          <b-row>
            <b-col md="12">
              <city-events
                :upcoming-events="upcomingEvents"
                :past-events="pastEvents"
              />
            </b-col>
            <b-col md="12">
              <city-users
                v-if="selectedCity"
                :city="selectedCity.name"
                user-group="Developers"
                :users="developersFromCity"
              />
            </b-col>
            <b-col md="12">
              <city-users
                v-if="selectedCity"
                :city="selectedCity.name"
                user-group="Designers"
                :users="designersFromCity"
              />
            </b-col>
            <b-col md="12">
              <LatestJobsFromCity
                v-if="selectedCity"
                :city="selectedCity.name"
                :country="selectedCity.country"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LatestJobsFromCity from "@/components/Job/LatestJobsFromCity";
import CityBasicInfo from "@/components/City/CityBasicInfo";
import CityEvents from "@/components/City/CityEvents";
import CityUsers from "@/components/City/CityUsers";
import cityService from "@/services/city.service";

export default {
  components: {
    CityBasicInfo,
    CityEvents,
    CityUsers,
    LatestJobsFromCity
  },
  data() {
    return {
      selectedCity: null,
      developersFromCity: [],
      designersFromCity: [],
      upcomingEvents: [],
      pastEvents: []
    };
  },
  created() {
    const cityName = this.$route.params.cityName;
    const countryCode = this.$route.params.countryCode;

    cityService
      .getCityDetails(cityName, countryCode)
      .then(city => (this.selectedCity = city));

    cityService.getUsersFromCity(cityName, countryCode).then(users => {
      this.developersFromCity = users.filter(u => u.category === "dev");
      this.designersFromCity = users.filter(u => u.category === "designer");
    });

    cityService.getEventsInCity(cityName, countryCode).then(cityEvents => {
      this.upcomingEvents = cityEvents.filter(
        e => new Date(e.dateFrom) > new Date()
      );
      this.pastEvents = cityEvents.filter(
        e => new Date(e.dateFrom) < new Date()
      );
    });
  },

  methods: {}
};
</script>

<style scoped lang="scss">
/* style for city search page */
.city-container {
  text-align: left;
}

.city-card {
  margin: 0.5rem 0 1rem 0;
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

.city-basic-info {
  text-align: center;
}
</style>
