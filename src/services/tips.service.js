import httpClient from "./http-client";

export default {
    getTips: (params) => {
        return httpClient.get('tip?' + params);
    },
    getTags() {
        return httpClient.get('tips/tags');
    },
    getTipById: (id) => {
        return httpClient.get(`tip/${id}`);
    },
    addTip(payload) {
        return httpClient.post('tip', payload);
    },
    deleteTip(id) {
        return httpClient.delete(`tip/${id}`);
    },
    updateTip(id, payload) {
        return httpClient.put(`tip/${id}`, payload);
    },
};
