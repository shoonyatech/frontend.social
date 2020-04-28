import httpClient from "./http-client";

export default {
  getCities: (citySearchText, country, limit = 100, page = 1) => {
    let queryParam = "?";
    if (citySearchText) {
      queryParam += "citySearchText=" + citySearchText;
    }
    if (country) {
      queryParam += "&country=" + country;
    }
    var pagination = "&limit=" + limit + "&page=" + page;
    return httpClient.get("city" + queryParam + pagination);
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
