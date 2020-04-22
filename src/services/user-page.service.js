import httpClient from "./http-client";

export default {
    getOnlineUsers: () => {
        return httpClient.get(`userpage/online`);
    },

    addOnlineUser: (user) => {
        return httpClient.post(`userpage`, user);
    },

    deleteUserPage: () => {
        return httpClient.delete("userpage");
    },
};