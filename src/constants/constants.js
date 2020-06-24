export const messages = {
  generic: {
    success: 'Success!',
    error: 'Error!',
  },
  job: {
    jobAddSuccess: 'Job added successfully!',
    jobAddFailure: 'Error adding new job, Please fill all fields and try again.',
  },
  challenge: {
    challengeAddSuccess: 'Challenge added successfully!',
    challengeAddFailure: 'Error adding new Challenge',
    challengeUpdateSuccess: 'Challenge updated successfully!',
    challengeUpdateFailure: 'Error updating Challenge',
  },

  city: {
    cityAddSuccess: 'City added successfully!',
    cityAddFailure: 'Error adding new city, Please fill all fields and try again.',
  },
  events: {
    eventsAddSuccess: 'Event added successfully!',
    eventsUpdateSuccess: 'Event updated successfully!',
    eventDeletedSuccess: 'Event deleted successfully!',
    eventsAddFailure: '',
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
    commentDeleteSuccess: 'Comment deleted successfully!'
  },
  tool: {
    toolAddSuccess: 'Tool added successfully!',
    toolUpdateSuccess: 'Tool updated successfully!',
    toolDeleteSuccess: 'Tool deleted successfully!'
  },
  rate: {
    rateAddSuccess: 'Rate added successfully!',
    rateDeleteSuccess: 'Rate deleted successfully!',
    rateAlreadyAdded: 'You already rated this tool.'
  },
  rewardPoints: {
    success: 'Request has been submitted',
    error: 'Failed to Redeem points',
    invalidAmount: 'Invalid amount to redeem',
    lessAmount: 'You can Redeem only if reward points more than 1000'
  }
}

export const ToastType = {
  ERROR: 'danger',
  SUCCESS: 'success',
};

export const EventType = {
  c: 'conference',
  m: 'meetup',
  w: 'workshop',
  i: 'interview',
}

export const EventPageLimit = 20;

export const INTERVALS = {
  TwentySeconds: 20000,
  ThirtySeconds: 30000,
}
