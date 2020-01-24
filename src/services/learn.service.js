import httpClient from "./http-client";

export default {
  getLatestArticles: skill => {
    return skill
      ? httpClient.get("article?skill=" + skill)
      : httpClient.get("article");
  }
};
