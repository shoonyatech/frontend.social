import httpClient from "./http-client";

export default {
  getUpcomingEvents: () => {
    return httpClient.get("event/upcoming");
  },

  getEventWithIds: ids => {
    return httpClient.get("event/withIds?ids=" + ids.join(","));
  },

  searchEvents: ids => {
    return httpClient.get("event/withIds?ids=" + ids.join(","));
  }
};
