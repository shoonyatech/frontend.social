import httpClient from './http-client';

export default {
	getOnlineUsers: (data) => {
		return httpClient.post(`userpage/online`, data);
	},

	getOnlineUsersCount: (url) => {
		return httpClient.post(`userpage/online/count`, { url });
	},

	addOnlineUser: (user) => {
		return httpClient.post(`userpage`, user);
	},

	deleteUserPage: () => {
		return httpClient.delete('userpage');
	},
};
