import httpClient from "./http-client";

export default {
  getUpcomingEvents: () => {
    return httpClient.get("conference/upcoming");
  }
};
