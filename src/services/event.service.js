import httpClient from "./http-client";

export default {
  getUpcomingEvents: skill => {
    return skill
      ? httpClient.get("event/upcoming?count=15&skill=" + skill)
      : httpClient.get("event/upcoming?count=15");
  },

  getEventWithIds: ids => {
    return httpClient.get("event/withIds?ids=" + ids.join(","));
  },

  searchEvents: searchText => {
    return httpClient.get("event?searchText=" + searchText);
  },

  searchEventsBy: query => {
    query = query || "";
    return httpClient.get("event?" + query);
  },

  addEvent: event => {
    return httpClient.post("event", event);
  },

  updateEvent: (id, event) => {
    return httpClient.put(`event/${id}`, event);
  },

  deleteEvent: (id) => {
    return httpClient.delete(`event/${id}`);
  },

  getEventById: (id) => {
    return httpClient.get(`event/${id}`);
  }
};
