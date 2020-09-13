import httpClient from './http-client';

export default {
	getChallenges: () => {
		return httpClient.get('challenge');
	},
	getChallengeById: (id) => {
		return httpClient.get(`challenge/${id}`);
	},
	getChallengeByUniqueId: (id) => {
		return httpClient.get(`challenge/byUniqueId/${id}`);
	},
	addChallenge(payload) {
		return httpClient.post('challenge', payload);
	},
	deleteChallenge(id) {
		return httpClient.delete(`challenge/${id}`);
	},
	updateChallenge(id, payload) {
		return httpClient.put(`challenge/${id}`, payload);
	},
	postSubmission(payload) {
		return httpClient.post('submission', payload);
	},
	getSubmissions(id) {
		return httpClient.get(`submissions/${id}`);
	},
	upVote(id) {
		return httpClient.put(`submission/upVote/${id}`);
	},
	downVote(id) {
		return httpClient.put(`submission/downVote/${id}`);
	},
	addSubmissionComment(id, comment) {
		return httpClient.post(`submissions/${id}/comment`, { comment });
	},
	deleteSubmissionComment(id, commentId) {
		return httpClient.delete(`submissions/${id}/comment/${commentId}`);
	},
	updateSubmissionComment(id, commentId, comment) {
		return httpClient.put(`submissions/${id}/comment/${commentId}`, {
			comment,
		});
	},
	deleteSubmission(id) {
		return httpClient.delete(`submission/${id}`);
	},
};
