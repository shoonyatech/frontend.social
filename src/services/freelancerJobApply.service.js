import httpClient from './http-client';

export default {
	applyFreelancerJob: (freelancer) => {
		return httpClient.post('freelanceJobApply', freelancer);
	},
	getFreelancersJobApply: (query, limit = 100, page = 1) => {
		const pagination = 'limit=' + limit + '&page=' + page;
		query = query || '';
		return httpClient.get('freelanceJobApply?' + pagination + query);
	},

	getFreelancerByProjectId: (id) => {
		return httpClient.get(`freelanceJobApply/${id}`);
	},
};
