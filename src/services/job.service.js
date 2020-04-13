import httpClient from "./http-client";

const getQueryForNextPage = (currentQuery, totalPages, currentPage = 1) => {
  const paramsString = new URLSearchParams(currentQuery);
  const searchParams = new URLSearchParams(paramsString);
  let searchQuery;
  if (currentPage < totalPages) {
    searchParams.set("pageNo", currentPage + 1);
    searchQuery = searchParams.toString();
  }
  return searchQuery;
};

export default {
  getJobs: (searchText = "") => {
    const searchQuery = searchText.length ? `searchText=${searchText}` : "";
    const jobQuery = `job?${searchQuery}`;
    return httpClient.get(jobQuery);
  },
  getJobsOnSearchParamsChange: query => {
    const jobQuery = `job?${query}`;
    return httpClient.get(jobQuery);
  },
  fetchDataForNextPage: (currentQuery, totalPages = 1, currentPage = 1) => {
    const query = getQueryForNextPage(currentQuery, totalPages, currentPage);
    if (query) {
      const nextPageQuery = `job?${query}`;
      return httpClient.get(nextPageQuery);
    }
  },
  addJob: payload => {
    return httpClient.post("job", payload);
  },
  getJobFindOne: (searchId = "") => {
    const jobQuery = `job/${searchId}`;
    return httpClient.get(jobQuery);
  },
};
