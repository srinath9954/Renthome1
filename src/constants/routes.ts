export const Routes = {
  // Auth
  SPLASH: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',

  // Tabs
  HOME: '/(tabs)/home',
  SEARCH: '/(tabs)/search',
  FAVORITES: '/(tabs)/favorites',
  CHAT: '/(tabs)/chat',
  PROFILE: '/(tabs)/profile',

  // Property
  PROPERTY_DETAILS: '/property/[id]',
  ADD_PROPERTY: '/property/add',
  EDIT_PROPERTY: '/property/edit/[id]',

  // Booking
  BOOKING: '/booking/[id]',

  // Settings
  SETTINGS: '/settings',
} as const;
