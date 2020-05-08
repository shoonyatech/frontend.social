import httpClient from "./http-client";

export default {
    getCourses: (searchText = "", limit = 100, page = 1) => {
        var pagination = "&limit=" + limit + "&page=" + page;

        const courseQuery = `course?${searchText}`;
        return httpClient.get(courseQuery + pagination);
    },

    addCourse: payload => {
        return httpClient.post("course", payload);
    }
};
