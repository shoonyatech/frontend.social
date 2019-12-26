import httpClient from "./http-client";

export default {
  getUpcomingEvents: () => {
    return httpClient.get("event/upcoming");
  },

  getEventWithIds: ids => {
    return httpClient.get("event/withIds?ids=" + ids.join(","));
  },

  searchEvents: searchText => {
    return httpClient.get("event?searchText=" + searchText);
  },

  searchEventsBy: query => {
    return httpClient.get("event?" + query);
  }
};
