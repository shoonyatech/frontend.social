import httpClient from './http-client';

export default {
	fbSignin: (accessToken) => {
		return httpClient.post(`fb-signin`, { accessToken: accessToken });
	},

	getLoggedInUserProfile: () => {
		return httpClient.get('me');
	},

	getUserProfile: (username) => {
		return httpClient.get('user/' + username);
	},

	getUsersAddedOnDate: (createdAt) => {
		return httpClient.get('users/analytics/' + createdAt);
	},

	updateUserProfile: (profile) => {
		return httpClient.put('me', profile);
	},

	signout: () => {
		localStorage.removeItem('authToken');
	},

	getActivities: (profile) => {
		return httpClient.get('useractivity/' + profile);
	},

	addActivities(username) {
		return httpClient.post('useractivity', username);
	},

	udpateUserPreferences: (userPreferences) => {
		return httpClient.put('profile/preferences', userPreferences);
	},

	getReferrals: () => {
		return httpClient.get('profile/referrals');
	},

	getAllUsers(searchText) {
		return httpClient.get(`users?searchText=${searchText}`);
	},
	getUsers() {
		return httpClient.get(`users`);
	},
	getUserByUserId(userId) {
		return httpClient.get(`users?userId=${userId}`);
	},

	getRewardPoints() {
		return httpClient.get('reward-points');
	},

	redeemRewardPoints(redeemAmount) {
		return httpClient.post('redeem', { redeemAmount });
	},
};
