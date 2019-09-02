import httpClient from "./http-client";

export default {
  getCities: searchText => {
    return httpClient.get(
      "city?searchText=" + searchText + "&pageNo=0&itemsPerPage=20"
    );
  },
  getCityDetails: (cityName, countryCode) => {
    return httpClient.get(`city/${cityName}/${countryCode}`);
  }
};
