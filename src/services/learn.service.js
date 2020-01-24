import httpClient from "./http-client";

export default {
  getLatestArticles: () => {
    return skill
      ? httpClient.get("article?skill=" + skill)
      : httpClient.get("article");
  }
};
