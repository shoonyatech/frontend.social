import axios from "axios";

const httpClient = () => {
  return axios.create({
    baseURL: process.env.API_URL || `http://localhost:3333/`
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
