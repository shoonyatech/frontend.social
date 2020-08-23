import httpClient from "./http-client";

export default {
  getLatestBlogs: (skill, limit = 100, page = 1) => {
    var pagination = "&limit=" + limit + "&page=" + page;

    return skill
      ? httpClient.get("blog?skill=" + skill + pagination)
      : httpClient.get("blog?" + pagination);
  },
  addBlog: (blog) => {
    return httpClient.post("blog", blog);
  },
  getBlogById: (id) => {
    return httpClient.get(`blog/${id}`);
  },
};
