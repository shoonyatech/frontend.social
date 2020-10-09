export const messages = {
	generic: {
		success: 'Success!',
		error: 'Error!',
	},
	job: {
		jobAddSuccess: 'Job added successfully!',
		jobAddFailure:
			'Error adding new job, Please fill all fields and try again.',
		jobUpdateSuccess: 'Job updated successfully!',
	},
	challenge: {
		challengeAddSuccess: 'Challenge added successfully!',
		challengeAddFailure: 'Error adding new Challenge',
		challengeUpdateSuccess: 'Challenge updated successfully!',
		challengeUpdateFailure: 'Error updating Challenge',
		challengeSubmissionSuccess:
			'Your answer submitted successfully! Please check back after end date for results',
		challengeSubmissionFailure:
			'Error submitting your answer! Please try again',
	},
	vLog: {
		addSuccess: 'VLog added successfully!',
		addFailure: 'Error adding new VLog',
		updateSuccess: 'VLog updated successfully!',
		updateFailure: 'Error updating VLog',
	},
	user: {
		addSuccess: 'User added successfully!',
		addFailure: 'Error adding new User',
		updateSuccess: 'User updated successfully!',
		updateFailure: 'Error updating User',
	},
	blog: {
		addSuccess: 'blog added successfully!',
		addFailure: 'Error adding new blog',
		updateSuccess: 'blog updated successfully!',
		updateFailure: 'Error updating blog',
	},
	tip: {
		addSuccess: 'Tip added successfully!',
		addFailure: 'Error adding new Tip',
		updateSuccess: 'Tip updated successfully!',
		updateFailure: 'Error updating Tip',
	},
	city: {
		cityAddSuccess: 'City added successfully!',
		cityAddFailure:
			'Error adding new city, Please fill all fields and try again.',
	},
	cities: {
		userErrorTitle: '',
		userErrorBody: 'There are no developers in your area',
	},
	events: {
		eventsAddSuccess: 'Event added successfully!',
		eventsUpdateSuccess: 'Event updated successfully!',
		eventDeletedSuccess: 'Event deleted successfully!',
		eventsAddFailure: '',
	},
	freelancer: {
		freelancersAddSuccess: 'Freelancer added successfully!',
		freelancersUpdateSuccess: 'Freelancer updated successfully!',
		freelancerDeletedSuccess: 'Freelancer deleted successfully!',
		freelancersAddFailure: '',
	},
	freelancerProjects: {
		freelancerProjectsAddSuccess: 'Freelancer Projects added successfully!',
		freelancerProjectsUpdateSuccess:
			'Freelancer Projects updated successfully!',
		freelancerProjectsDeletedSuccess:
			'Freelancer Projects deleted successfully!',
		freelancerProjectsAddFailure: '',
	},
	subscribe: {
		subscribeSuccess: 'Subscribe successfully!',
		subscribeFailure: 'Error while subsceibe, Please try again.',
	},
	article: {
		articleAddSuccess: 'Article added successfully!',
		articleAddFailure: '',
	},
	comment: {
		commentAddSuccess: 'Comment added successfully!',
		commentDeleteSuccess: 'Comment deleted successfully!',
	},
	tool: {
		toolAddSuccess: 'Tool added successfully!',
		toolUpdateSuccess: 'Tool updated successfully!',
		toolDeleteSuccess: 'Tool deleted successfully!',
	},
	rate: {
		rateAddSuccess: 'Rate added successfully!',
		rateDeleteSuccess: 'Rate deleted successfully!',
		rateAlreadyAdded: 'You already rated this tool.',
	},
	rewardPoints: {
		success: 'Request has been submitted',
		error: 'Failed to Redeem points',
		invalidAmount: 'Invalid amount to redeem',
		lessAmount: 'You can Redeem only if reward points more than 1000',
	},
	feedback: {
		success: 'Feedback has been submitted',
		error: 'Failed to submit Feedback',
	},
};

export const ToastType = {
	ERROR: 'danger',
	SUCCESS: 'success',
};

export const EventType = {
	c: 'conference',
	m: 'meetup',
	w: 'workshop',
	i: 'interview',
};

export const EventPageLimit = 20;
export const TipPageLimit = 5;

export const INTERVALS = {
	TwentySeconds: 20000,
	ThirtySeconds: 30000,
};

export const VLogType = {
	CATCHUP: 'CATCHUP',
	FREELANCING: 'FREELANCING',
};
