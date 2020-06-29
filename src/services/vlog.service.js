import httpClient from "./http-client";

export default {
    getVLogs: () => {
        return httpClient.get('vlog');
    },
    getVLogById: (id) => {
        return httpClient.get(`vlog/${id}`);
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
