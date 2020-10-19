import httpClient from './http-client';

export default {
	getLatestQuiz: (skill, limit = 100, page = 1) => {
		var pagination = '&limit=' + limit + '&page=' + page;

		return skill
			? httpClient.get('quiz?skill=' + skill + pagination)
			: httpClient.get('quiz?' + pagination);
	},
	getQuizById: (id) => {
		return httpClient.get(`quiz/${id}`);
	},
	getQuizByIdPlay: (id) => {
		return httpClient.get(`quizPlay/${id}`);
	},
	runQuiz: (quizId) => {
		return httpClient.post('quiz-run', { quizId: quizId });
	},
	getQuizResult: (runId, questionIndex) => {
		return httpClient.get(`quiz-run/${runId}/${questionIndex}`);
	},
	updateQuizRun: (quizId, runId, questionIndex) => {
		return httpClient.put(`/quiz-run/${quizId}/${runId}/${questionIndex}`);
	},
	getQuestionResult: (runId, questionIndex, quizId) => {
		return httpClient.get(
			`/quiz-run/result/${quizId}/${runId}/${questionIndex}`
		);
	},
	getCurrentRunId: (quizId) => {
		return httpClient.get(`/quiz-run/${quizId}`);
	},
	addSubmission: (payload) => {
		return httpClient.post(`quiz-run/play`, payload);
	},

	getUserResult: (quizId, runId, username) => {
		return httpClient.get(`/quiz-run/results/${quizId}/${runId}/${username}`);
	},
	getFinalQuizResults: (quizId, runId) => {
		return httpClient.get(`/quiz-run/results/${quizId}/${runId}`);
	},
	getAnswer: (quizId, questionNo) => {
		return httpClient.get(`/quiz-run/answer/${quizId}/${questionNo}`);
	},
};
