import httpClient from "./http-client";

export default {
  getComment: (parentId) => {
    return httpClient.get(`comment/${parentId}`);
  },

  addComment: (comment) => {
    return httpClient.post(`comment`, comment);
  },

  editComment: (commentId, comment) => {
    return httpClient.put(`comment/${commentId}`, comment);
  },

  deleteComment: (commentId) => {
    return httpClient.delete(`comment/${commentId}`);
  }
};
