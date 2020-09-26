import httpClient from './http-client';

export default {
	sendFeedback(payload) {
		return httpClient.post('feedback', payload);
	},
};
