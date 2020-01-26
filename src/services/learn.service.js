import httpClient from "./http-client";

export default {
  getLatestArticles: skill => {
    return skill
      ? httpClient.get("article?count=10&skill=" + skill)
      : httpClient.get("article?count=10");
  },
  addArticle: article => {
    return httpClient.post("article", article);
  }
};
