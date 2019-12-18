import httpClient from "./http-client";

export default {
  getCities: searchText => {
    if (searchText) {
      return httpClient.get("city?searchText=" + searchText);
    } else {
      return httpClient.get("city");
    }
  },

  getCityDetails: (cityName, countryCode) => {
    return httpClient.get(`city/${cityName}/${countryCode}`);
  },

  getConferencesInCity: (cityName, countryCode) => {
    return httpClient.get(`conference/city/${cityName}/${countryCode}`);
  },

  getUsersFromCity: (cityName, countryCode) => {
    return httpClient.get(`user/from/${cityName}/${countryCode}`);
  }
};
