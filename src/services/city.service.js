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
    // return httpClient.get(`city/${cityName}/${countryCode}`);
    return {
      upcoming: [
        {
          name: "ReactFoo",
          url: "reactfoo.com"
        },
        {
          name: "ng India",
          url: "reactfoo.com"
        }
      ],
      past: [
        {
          name: "GIDS",
          url: "reactfoo.com"
        },
        {
          name: "ng India",
          url: "reactfoo.com"
        }
      ]
    };
  },

  getUsersFromCity: (cityName, countryCode) => {
    // return httpClient.get(`city/${cityName}/${countryCode}`);
    return {
      developers: [
        {
          username: "souvikbasu",
          photo: "reactfoo.com"
        },
        {
          username: "souvikbasu2",
          photo: "reactfoo.com"
        }
      ],
      designers: [
        {
          username: "souvikbasu1",
          photo: "reactfoo.com"
        },
        {
          username: "souvikbasu3",
          photo: "reactfoo.com"
        }
      ]
    };
  }
};
