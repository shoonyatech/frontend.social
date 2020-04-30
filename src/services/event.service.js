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

  createMeeting(id, title, type, isPrivate) {
    return httpClient.post(`event/${id}/create-meeting`, { title, type, isPrivate });
  },

  getMeetings(id) {
    return httpClient.get(`event/${id}/meetings`);
  },

  getPrivateMeetings(id) {
    return httpClient.get(`event/${id}/privateMeetings`);
  },

  registerUser: (eventregistration) => {
    return httpClient.post("event/register", eventregistration);
  },
};
