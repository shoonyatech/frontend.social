<template>
  <!-- div for searching city -->
  <div class="city-container">
    <Loader v-show="loading" />
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
                class="section"
              />
            </b-col>
            <b-col md="12">
              <h1>Users</h1>

              <city-users
                v-if="selectedCity"
                :city="selectedCity.name"
                user-group="Developers"
                :users="developersFromCity"
              />
            </b-col>
            <b-col
              md="12"
              class="section"
            >
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
      pastEvents: [],
      loading: true,
    };
  },
  created() {
    const cityName = this.$route.params.cityName;
    const countryCode = this.$route.params.countryCode;
    this.loading = true;
    cityService
      .getCityDetails(cityName, countryCode)
      .then(city => {
        this.selectedCity = city
        this.loading = false;
      });

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
      ).sort((e1, e2) => new Date(e2.dateFrom) - new Date(e1.dateFrom));
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
  border: 3px solid #114273;
  display: inline-block;
  margin: 0 auto;
  width: 25%;
}
::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #114273;
}

.city-basic-info {
  text-align: center;
}

.section {
  margin-bottom: 50px;
}
</style>
