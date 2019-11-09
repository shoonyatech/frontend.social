import httpClient from "./http-client";

export default {
  getCities: searchText => {
    // return httpClient.get(
    //   "city?searchText=" + searchText + "&pageNo=0&itemsPerPage=20"
    // );
    return [
      {
        name: "name",
        description: "description",
        photo: "photo",
        country: "country",
        lat: 10,
        lng: 12
      },
      {
        name: "name",
        description: "description",
        photo: "photo",
        country: "country",
        lat: 10,
        lng: 12
      },
      {
        name: "name",
        description: "description",
        photo: "photo",
        country: "country",
        lat: 10,
        lng: 12
      }
    ];
  },
  getCityDetails: (cityName, countryCode) => {
    // return httpClient.get(`city/${cityName}/${countryCode}`);
    return {
      name: "Bangalore",
      description: "Some description about city",
      photo: "photo",
      country: "IN",
      lat: 10,
      lng: 12
    };
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
          username: "souvikbasu",
          photo: "reactfoo.com"
        }
      ],
      designers: [
        {
          username: "souvikbasu",
          photo: "reactfoo.com"
        },
        {
          username: "souvikbasu",
          photo: "reactfoo.com"
        }
      ]
    };
  }
};
