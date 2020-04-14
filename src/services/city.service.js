import httpClient from "./http-client";

export default {
  getCities: (citySearchText, country) => {
    let queryParam = "?";
    if (citySearchText) {
      queryParam += "citySearchText=" + citySearchText;
    }
    if (country) {
      queryParam += "&country=" + country;
    }

    return httpClient.get("city" + queryParam);
  },

  getCityDetails: (cityName, countryCode) => {
    return httpClient.get(`city/${cityName}/${countryCode}`);
  },

  getEventsInCity: (cityName, countryCode) => {
    return httpClient.get(`event/city/${cityName}/${countryCode}`);
  },

  getUsersFromCity: (cityName, countryCode) => {
    return httpClient.get(`user/from/${cityName}/${countryCode}`);
  },

  addCity: payload => {
    return httpClient.post("city", payload);
  }
};
