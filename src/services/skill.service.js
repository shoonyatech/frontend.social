import httpClient from './http-client';

export default {
	fetchSkills: () => {
		return httpClient.get('skill');
	},

	topFrameworks: () => {
		return httpClient.get('skill/frameworks');
	},

	addSkill: (skill) => {
		return httpClient.post('skill', skill);
	},
};
