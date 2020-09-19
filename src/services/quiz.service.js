import httpClient from './http-client';

export default {
	getLatestQuiz: (skill, limit = 100, page = 1) => {
		var pagination = '&limit=' + limit + '&page=' + page;

		return skill
			? httpClient.get('quiz?skill=' + skill + pagination)
			: httpClient.get('quiz?' + pagination);
	},
	addQuiz: (quiz) => {
		return httpClient.post('quiz', quiz);
	},
	getQuizById: (id) => {
		return httpClient.get(`quiz/${id}`);
	},
	updateQuiz: (id, quiz) => {
		return httpClient.put(`quiz/${id}`, quiz);
	},
	runQuiz: (quizId) => {
		return httpClient.post('quiz-run', { quizId: quizId });
	},
	getQuizResult: (runId, questionIndex) => {
		return httpClient.get(`quiz-run/${runId}/${questionIndex}`);
	},
};
