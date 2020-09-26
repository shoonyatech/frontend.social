import httpClient from './http-client';

export default {
	getVLogs: (type) => {
		return httpClient.get(`vlog?type=${type}`);
	},
	getVLogById: (id) => {
		return httpClient.get(`vlog/${id}`);
	},
	getVLogByUniqueId(id) {
		return httpClient.get(`/vlog/catchup/${id}`);
	},
	addVLog(payload) {
		return httpClient.post('vlog', payload);
	},
	deleteVLog(id) {
		return httpClient.delete(`vlog/${id}`);
	},
	updateVLog(id, payload) {
		return httpClient.put(`vlog/${id}`, payload);
	},
};
