export const messages = {
  generic: {
    success: 'Success!',
    error: 'Error!',
  },
  job: {
    jobAddSuccess: 'Job added successfully!',
    jobAddFailure: 'Error adding new job, Please fill all fields and try again.',
  },
  events: {
    eventsAddSuccess: 'Event added successfully!',
    eventsUpdateSuccess: 'Event updated successfully!',
    eventDeletedSuccess: 'Event deleted successfully!',
    eventsAddFailure: '',
  },
  article: {
    articleAddSuccess: 'Article added successfully!',
    articleAddFailure: '',
  },
  comment: {
    commentAddSuccess: 'Comment added successfully!'
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