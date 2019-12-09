import httpClient from "./http-client";

export default {
  fbSignin: accessToken => {
    return httpClient.post(`fb-signin`, { accessToken: accessToken });
  },

  getLoggedInUserProfile: () => {
    return httpClient.get("me").then(response => response.data);
  },

  updateUserProfile: profile => {
    return httpClient.put("me", profile);
  },

  signout: () => {
    localStorage.removeItem("authToken");
  }
};
