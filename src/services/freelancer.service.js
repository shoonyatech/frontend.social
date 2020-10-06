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

	getFreelancerById: (id) => {
		return httpClient.get(`freelance/${id}`);
	},
};
