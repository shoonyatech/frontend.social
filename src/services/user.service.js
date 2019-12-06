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

  updateUserProfile: profile => {
    httpClient.put("me", profile);
  },

  signout: () => {
    localStorage.removeItem("profile");
  }
};
