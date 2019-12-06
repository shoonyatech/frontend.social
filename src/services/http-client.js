import axios from "axios";
import config from "../config/config";

const httpClient = () => {
  return axios.create({
    baseURL: config.api
  });
};

export default {
  get(url) {
    const profile = JSON.parse(localStorage.getItem("profile"));
    let options = {};
    if (profile && profile.authToken) {
      options.headers = {
        Authorization: `Bearer ${profile.authToken}`
      };
    }

    return httpClient().get(url, {
      headers: {
        Authorization: `Bearer ${profile.authToken}`
      }
    });
  },
  post(url, data) {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile && profile.authToken) {
      return httpClient().post(url, data, {
        headers: {
          Authorization: `Bearer ${profile.authToken}`
        }
      });
    }

    console.error("Auth Token not found");
  },
  put(url, data) {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile && profile.authToken) {
      return httpClient().put(url, data, {
        headers: {
          Authorization: `Bearer ${profile.authToken}`
        }
      });
    }

    console.error("Auth Token not found");
  },
  delete(url, data) {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile && profile.authToken) {
      return httpClient().delete(url, data, {
        headers: {
          Authorization: `Bearer ${profile.authToken}`
        }
      });
    }

    console.error("Auth Token not found");
  }
};
