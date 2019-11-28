import httpClient from "./http-client";

export default {
  fbSignin: accessToken => {
    return httpClient.post(`fb-signin`, { accessToken: accessToken });
  },

  getLoggedInUserProfile: () => {
    const profile = localStorage.getItem("profile");
    if (profile) {
      return JSON.parse(profile);
    }
  },

  signout: () => {
    localStorage.removeItem("profile");
  }
};
