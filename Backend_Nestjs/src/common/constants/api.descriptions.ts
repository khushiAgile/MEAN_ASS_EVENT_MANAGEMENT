export const EVENT_DESCRIPTION = {
  CREATE_EVENTS: {
    summary: "create new event",
    description: `
            This API will be used for creating new event using the admin account.
            `,
  },
  LIST_EVENTS: {
    summary: "list all events",
    description: `
            This API will be used for listing all events for all users.
            `,
  },
  DETAIL_EVENT: {
    summary: "get event detail",
    description: `
            This API will be used for getting event detail for all users.
            `,
  },
  UPDATE_EVENTS: {
    summary: "update event",
    description: `
            This API will be used for updating event using the admin account.
            `,
  },
  DELETE_EVENTS: {
    summary: "delete event",
    description: `
            This API will be used for deleting event using the admin account.
            `,
  },
};

export const USER_DESCRIPTION = {
  LIST_USER: {
    summary: "List all users",
    description: `
            This API will be used for listing all users for admin account.
            `,
  },
  DELETE_USER: {
    summary: "Delete user",
    description: `
            This API will be used for deleting user using the admin account.
            `,
  },
  USER_STATUS: {
    summary: "Change user status",
    description: `
            This API will be used for changing user status using the admin account.
            `,
  },
  USER_DETAIL: {
    summary: "Get user detail",
    description: `
            This API will be used for getting user detail usings admin account.
            `,
  },
};

export const AUTH_DESCRIPTION = {
  LOGIN: {
    summary: "Login user",
    description: `
            This API will be used for login user.
            `,
  },
  REGISTER: {
    summary: "Register user",
    description: `
            This API will be used for register user.
            `,
  },

  FORGOT_PASSWORD: {
    summary: "Forgot password",
    description: `
            This API will be used for forgot password for user.
            `,
  },

  RESET_PASSWORD: {
    summary: "Reset password",
    description: `
            This API will be used for reset password for user.
            `,
  },
};

export const RSVP_DESCRIPTION = {
  CREATE_RSVP: {
    summary: "Create new rsvp",
    description: `
            This API will be used for creating new rsvp using user account.
            `,
  },

  LIST_RSVP: {
    summary: "List all rsvp of user",
    description: `
            This API will be used for listing all rsvp for user get event list attended by user.
            `,
  },

  EVENT_RSVP: {
    summary: "List all rsvp of event",
    description: `
            This API will be used for listing all rsvp for get user list attended the event.
            `,
  },
};
