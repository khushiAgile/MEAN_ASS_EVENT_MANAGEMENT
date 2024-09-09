export const API_END_POINTS = {
  auth: {
    login: 'auth/login',
    signup: 'auth/register',
    forgotPsw: 'auth/forgot-password',
    resetPsw: 'auth/reset-password',
  },
  events: {
    list: 'events/list',
    event: 'events',
  },
  users: {
    list: 'users/list',
    user: 'users',
    userStatus: 'users/status',
  },
  rsvp: {
    eventList: 'rsvp/events',
    userList: 'rsvp/users',
    rsvp: 'rsvp',
  },
};
