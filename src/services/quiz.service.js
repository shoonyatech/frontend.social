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
	getQuizRun: (runId) => {
		return httpClient.get(`quiz-run/${runId}`);
	},
	getQuizResult: (runId, questionIndex) => {
		return httpClient.get(`quiz-run/${runId}/${questionIndex}`);
	},
	setQuizQuestionIndex: (runId, questionIndex) => {
		return httpClient.put('quiz-run', { runId, questionIndex });
		c;
	},
	getQuestionResult: (runId, questionIndex, quizId) => {
		return httpClient.get(
			`/quiz-run/result/${quizId}/${runId}/${questionIndex}`
		);
	},
	QuestionrunId: null,
	setRunId(runId) {
		this.QuestionrunId = runId;
	},
	getRunId() {
		return this.QuestionrunId;
	},
};
