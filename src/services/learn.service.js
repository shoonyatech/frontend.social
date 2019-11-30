import httpClient from "./http-client";

export default {
  getLatestArticles: () => {
    return httpClient.get("latestArticles");
  }
};
