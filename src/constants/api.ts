export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://api.nobroker-clone.com/v1';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  // User
  GET_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile',
  UPLOAD_AVATAR: '/user/avatar',

  // Properties
  GET_PROPERTIES: '/properties',
  GET_PROPERTY: '/properties/:id',
  CREATE_PROPERTY: '/properties',
  UPDATE_PROPERTY: '/properties/:id',
  DELETE_PROPERTY: '/properties/:id',
  SEARCH_PROPERTIES: '/properties/search',
  FEATURED_PROPERTIES: '/properties/featured',
  NEARBY_PROPERTIES: '/properties/nearby',

  // Favorites
  GET_FAVORITES: '/favorites',
  ADD_FAVORITE: '/favorites/:id',
  REMOVE_FAVORITE: '/favorites/:id',

  // Bookings
  GET_BOOKINGS: '/bookings',
  CREATE_BOOKING: '/bookings',
  GET_BOOKING: '/bookings/:id',
  UPDATE_BOOKING: '/bookings/:id',
  CANCEL_BOOKING: '/bookings/:id/cancel',

  // Chat
  GET_CONVERSATIONS: '/chat/conversations',
  GET_MESSAGES: '/chat/conversations/:id/messages',
  SEND_MESSAGE: '/chat/conversations/:id/messages',
} as const;

export const REQUEST_TIMEOUT = 15000;
