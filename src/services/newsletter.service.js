import httpClient from './http-client';

export default {
	subscribe: (payload) => {
		return httpClient.post('/newsletter/subscribe', payload);
	},
};
