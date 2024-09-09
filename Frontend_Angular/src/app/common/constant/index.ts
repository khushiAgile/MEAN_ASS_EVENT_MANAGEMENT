import { environment } from 'src/environments/environments';

export const PAGE_ROUTES = {
  auth: {
    login: 'login',
    signup: 'register',
    forgotPsw: 'forgot-password',
    resetPsw: 'reset-password',
  },
  product: {
    list: 'products',
    create: 'product/create',
    edit: 'product/edit',
    detail: 'products/:productId',
  },
  user: {
    list: 'users',
    create: 'users/create',
    edit: 'users/edit/:userId',
    detail: 'users/:userId',
  },
  events: {
    list: 'events',
    create: 'events/create',
    edit: 'events/edit/:eventId',
    detail: 'events/:eventId',
  },
};

export const TOKEN_STORAGE_KEY = environment.appName + '_token'; // store token
export const USER_INFO_STORAGE_KEY = environment.appName + '_user_info'; // store user
