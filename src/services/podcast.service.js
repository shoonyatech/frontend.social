import httpClient from './http-client';

export default {
	getPodcasts: (searchText = '', limit = 100, page = 1) => {
		var pagination = '&limit=' + limit + '&page=' + page;

		const podcastQuery = `podcasts?${searchText}`;
		return httpClient.get(podcastQuery + pagination);
	},
	getPodcastById: (id) => {
		return httpClient.get(`podcasts/${id}`);
	},

	addPodcast: (payload) => {
		return httpClient.post('podcasts', payload);
	},
};
