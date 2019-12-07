import axios from "axios";
import config from "../config/config";

const httpClient = () => {
  return axios.create({
    baseURL: config.api
  });
};

export default {
  get(url) {
    let options = getOptions();
    return httpClient().get(url, options);
  },

  post(url, data) {
    let options = getOptions();
    return httpClient().post(url, data, options);
  },

  put(url, data) {
    let options = getOptions();
    return httpClient().put(url, data, options);
  },

  delete(url, data) {
    let options = getOptions();
    return httpClient().delete(url, data, options);
  }
};

function getOptions() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  let options = {};
  if (profile && profile.authToken) {
    options.headers = {
      Authorization: `Bearer ${profile.authToken}`
    };
  }
  return options;
}
