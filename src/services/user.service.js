import httpClient from "./http-client";
import store from "@/vuex/store";

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
    this.$store.commit("signInUser", null);
  }
};
