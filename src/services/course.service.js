import httpClient from "./http-client";

export default {
    getCourses: (searchText = "", limit = 100, page = 1) => {
        var pagination = "&limit=" + limit + "&page=" + page;

        const searchQuery = searchText.length ? `searchText=${searchText}` : "";
        const courseQuery = `course?${searchQuery}`;
        return httpClient.get(courseQuery + pagination);
    },

    addCourse: payload => {
        return httpClient.post("course", payload);
    }
};
