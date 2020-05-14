import httpClient from "./http-client";

export default {
    getBlogs: (searchText = "", limit = 100, page = 1) => {
        var pagination = "&limit=" + limit + "&page=" + page;

        const blogQuery = `blog?${searchText}`;
        return httpClient.get(blogQuery + pagination);
    },
    getBlogById: (id) => {
        return httpClient.get(`blog/${id}`);
    }    
};
