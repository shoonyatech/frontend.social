import httpClient from "./http-client";

export default {
    getChallenges: () => {
        return httpClient.get('challenge');
    },
    addChallenge(payload) {
        return httpClient.post('challenge', payload)
    }
};
