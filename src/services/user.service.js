import httpClient from "./http-client";

export default {
  fbSignin: accessToken => {
    return httpClient.post(`fb-signin`, { accessToken: accessToken });
  },

  getLoggedInUserProfile: () => {
    return httpClient.get("me");
  },

  getUserProfile: username => {
    return httpClient.get("user/" + username);
  },

  updateUserProfile: profile => {
    return httpClient.put("me", profile);
  },

  signout: () => {
    localStorage.removeItem("authToken");
  },

  getActivities: () => {
    return httpClient.get("useractivity");
  },

  udpateUserPreferences: userPreferences => {
    return httpClient.put("user/preferences", userPreferences);
  },
};
