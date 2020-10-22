import httpClient from './http-client';

export default {
	addFreelancer: (freelancer) => {
		return httpClient.post('freelance', freelancer);
	},
	getFreelancers: (query, limit = 100, page = 1) => {
		const pagination = 'limit=' + limit + '&page=' + page;
		query = query || '';
		return httpClient.get('freelance?' + pagination + query);
	},

	getFreelancerByUsername: (username) => {
		return httpClient.get(`freelance/${username}`);
	},
	deletefreelancer: (username) => {
		return httpClient.delete(`freelance/${username}`);
	},
	updateFreelancer: (username, freelancer) => {
		return httpClient.put(`freelance/${username}`, freelancer);
	},
	getSkills() {
		return httpClient.get('freelancer/skills');
	},
	getCategory() {
		return httpClient.get('freelancers/category');
	},
};
