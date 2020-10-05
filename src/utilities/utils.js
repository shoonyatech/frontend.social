import { EventType } from '../constants/constants';

export const getEventTypeName = (type) => EventType[type];

export const getUrlFriendlyTitle = (title) =>
	title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s]/gi, '')
		.replace(/ /g, '-');

export const groupBy = (array, key) => {
	return array.reduce((rv, x) => {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};
