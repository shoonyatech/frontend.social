import httpClient from './http-client';

export default {
	addFreelancerProjects: (freelancer) => {
		return httpClient.post('freelance-project', freelancer);
	},
	getFreelancerProjects: (query, limit = 100, page = 1) => {
		const pagination = 'limit=' + limit + '&page=' + page;
		query = query || '';
		return httpClient.get('freelance-project?' + pagination + query);
	},
	getFreelancerProjectsByUsername: (username) => {
		return httpClient.get(`freelance-projects/${username}`);
	},
	getFreelancerProjectsById: (id) => {
		return httpClient.get(`freelance-project/${id}`);
	},
	deleteFreelancerProjects: (id) => {
		return httpClient.delete(`freelance-project/${id}`);
	},
	updateFreelancerProjects: (id, freelancer) => {
		return httpClient.put(`freelance-project/${id}`, freelancer);
	},

	getSkills() {
		return httpClient.get('freelances-project/skills');
	},
	getJobType() {
		return httpClient.get('freelances-project/jobType');
	},
	getBudgetBasis() {
		return httpClient.get('freelances-project/budgetBasis');
	},
	getBudget() {
		return httpClient.get('freelances-project/budget');
	},
	getWorkDuration() {
		return httpClient.get('freelances-project/workDuration');
	},
};
