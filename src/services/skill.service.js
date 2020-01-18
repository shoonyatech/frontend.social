import httpClient from "./http-client";

export default {
  fetchSkills: () => {
    return httpClient.get("skill");
  },

  addSkill: skill => {
    return httpClient.post("skill", skill);
  }
};
