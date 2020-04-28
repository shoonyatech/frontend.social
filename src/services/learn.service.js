import httpClient from "./http-client";

export default {
  getLatestArticles: (skill, limit = 100, page = 1) => {
    var pagination = "&limit=" + limit + "&page=" + page;

    return skill
      ? httpClient.get("article?skill=" + skill + pagination)
      : httpClient.get("article?" + pagination);
  },
  addArticle: article => {
    return httpClient.post("article", article);
  }
};
