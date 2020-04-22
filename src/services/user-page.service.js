import httpClient from "./http-client";

export default {
  getOnlineUsers: () => {
    return httpClient.get(`userpage/online`);
  },

  getOnlineUsersCount: (url) => {
    return httpClient.post(`userpage/online/count`, { url });
  },

  addOnlineUser: (user) => {
    return httpClient.post(`userpage`, user);
  },

  deleteUserPage: () => {
    return httpClient.delete("userpage");
  },
};
