import axios from "axios";

const httpClient = () => {
  return axios.create({
    baseURL: `http://localhost:3333/`
  });
};

export default {
  get(page) {
    return httpClient().get(page);
  },
  post(page, data, auth) {
    return httpClient().post(page, data, auth);
  },
  update(page, data, auth) {
    return httpClient().put(page, data, auth);
  },
  delete(page, data, auth) {
    return httpClient().put(page, data, auth);
  }
};
