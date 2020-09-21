import httpClient from './http-client';

export default {
	getLatestArticles: (query, limit = 100, page = 1) => {
		const pagination = 'limit=' + limit + '&page=' + page;
		query = query || '';
		return httpClient.get('article?' + pagination + query);
	},

	addArticle: (article) => {
		return httpClient.post('article', article);
	},
	getArticlesAddedOnDate: (createdAt) => {
		return httpClient.get('article/analytics/' + createdAt);
	},
};
