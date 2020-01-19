import httpClient from "./http-client";

const getQueryForNextPage = (currentQuery, totalPages) => {
  const paramsString = new URLSearchParams(currentQuery);
  const searchParams = new URLSearchParams(paramsString);
  const pageNo = searchParams.get("pageNo");
  let searchQuery;
  if (pageNo && pageNo < totalPages) {
    searchParams.set("pageNo", pageNo + 1);
    searchQuery = searchParams.toString();
  }
  return searchQuery;
};

export default {
  getJobs: (searchText = "") => {
    const searchQuery = searchText.length ? `searchText=${searchText}` : "";
    const jobQuery = `job?${searchQuery}&pageNo=1&itemsPerPage=20&level=0`;
    return httpClient.get(jobQuery);
  },
  getJobsOnSearchParamsChange: query => {
    const jobQuery = `job?${query}&pageNo=1&itemsPerPage=20`;
    return httpClient.get(jobQuery);
  },
  fetchDataForNextPage: (currentQuery, totalPages = 1) => {
    const query = getQueryForNextPage(currentQuery, totalPages);
    if (query) {
      const nextPageQuery = `job?${query}&itemsPerPage=20`;
      return httpClient.get(nextPageQuery);
    }
  },
  addJob: payload => {
    httpClient
      .post("job", payload)
      .then(response => {
        if (response.status === 200) {
          alert("job added successfully!");
        }
      })
      .catch(error => {
        if (error.response.status === 500) {
          alert("Error adding new job, Please fill all fields and try again.");
        }
      });
  }
};
