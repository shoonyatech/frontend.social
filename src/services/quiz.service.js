import httpClient from './http-client';

export default {
	getLatestQuiz: (skill, limit = 100, page = 1) => {
		var pagination = '&limit=' + limit + '&page=' + page;

		return skill
			? httpClient.get('quiz?skill=' + skill + pagination)
			: httpClient.get('quiz?' + pagination);
	},
	addQuiz: (blog) => {
		return httpClient.post('quiz', blog);
	},
	getQuizById: (id) => {
		return httpClient.get(`quiz/${id}`);
	},
};
