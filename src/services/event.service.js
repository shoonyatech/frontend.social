import httpClient from "./http-client";

export default {
  getUpcomingEvents: (skill, limit = 100, page = 1) => {
    var pagination = "&limit=" + limit + "&page=" + page;
    return skill
      ? httpClient.get("event/upcoming?&skill=" + skill + pagination)
      : httpClient.get("event/upcoming?" + pagination);
  },

  getEventWithIds: ids => {
    return httpClient.get("event/withIds?ids=" + ids.join(","));
  },

  searchEvents: (searchText, limit = 100, page = 1) => {
    var pagination = "&limit=" + limit + "&page=" + page;
    return httpClient.get("event?searchText=" + searchText + pagination);
  },

  searchEventsBy: (query, limit = 100, page = 1) => {
    var pagination = "&limit=" + limit + "&page=" + page;
    query = query || "";
    return httpClient.get("event?" + query + pagination);
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
  },
  registerUser: (eventregistration) => {
    return httpClient.post("event/register", eventregistration);
  },
  getMyEvents: (query, limit = 100, page = 1) => {
    var pagination = "&limit=" + limit + "&page=" + page;
    query = query || "";
    return httpClient.get("event/get/myevent?" + query + pagination);
  },
  getUpcomingOnlineEvents: (query, limit = 100, page = 1) => {
    var pagination = "&limit=" + limit + "&page=" + page;
    query = query || "";
    return httpClient.get("event/get/upcoming/online?" + query + pagination);
  },
  getUpcomingOfflineEvents: (query, limit = 100, page = 1) => {
    var pagination = "&limit=" + limit + "&page=" + page;
    query = query || "";
    return httpClient.get("event/get/upcoming/offline?" + query + pagination);
  },
  getPastEvents: (query, limit = 100, page = 1) => {
    var pagination = "&limit=" + limit + "&page=" + page;
    query = query || "";
    return httpClient.get("event/get/past?" + query + pagination);
  }
};
