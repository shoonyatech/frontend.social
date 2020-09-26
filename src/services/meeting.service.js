import httpClient from './http-client';

export default {
	createMeeting(meeting) {
		return httpClient.post(`meeting`, meeting);
	},

	updateMeeting(meetingId, meeting) {
		return httpClient.put(`meeting/${meetingId}`, meeting);
	},

	deleteMeeting(meetingId) {
		return httpClient.delete(`meeting/${meetingId}`);
	},

	getMeetingsByEventId(id) {
		return httpClient.get(`meetings?eventId=${id}`);
	},

	getMeetingsByUserId(id) {
		return httpClient.get(`meetings?userId=${id}`);
	},
};
