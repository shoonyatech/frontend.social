import httpClient from "./http-client";

export default {
  fbSignin: accessToken => {
    return httpClient.post(`fb-signin`, { accessToken: accessToken });
  },
  getUserProfile: () => {
    const profile = localStorage.getItem("profile");
    if (profile) {
      return JSON.parse(profile);
    }
    window.location.href = "/signin";
  }
};
