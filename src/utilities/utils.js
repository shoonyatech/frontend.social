import { EventType } from '../constants/constants';

export const getEventTypeName = (type) => EventType[type];

export const getUrlFriendlyTitle = (title) =>
	title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s]/gi, '')
		.replace(/ /g, '-');
