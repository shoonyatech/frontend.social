import axios from "axios";
import config from "../config/config";

const httpClient = () => {
  return axios.create({
    baseURL: config.api
  });
};

export default {
  get(url) {
    return httpClient().get(url);
  },
  post(url, data) {
    return httpClient().post(url, data);
  },
  update(url, data) {
    return httpClient().put(url, data);
  },
  delete(url, data) {
    return httpClient().put(url, data);
  }
};
