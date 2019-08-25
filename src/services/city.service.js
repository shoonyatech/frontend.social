import httpClient from "./http-client";

export default {
  getCities: searchText => {
    return httpClient.get(
      "city?searchText=" + searchText + "&pageNo=0&itemsPerPage=20"
    );
  }
};
