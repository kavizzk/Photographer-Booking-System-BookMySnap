export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/users/login',
      REGISTER: '/users/register',
    },
    BOOKINGS: {
      LIST: '/bookings',
      CREATE: '/bookings',
      USER_BOOKINGS: (userId: string) => `/bookings/user/${userId}`,
      UPDATE: (id: string) => `/bookings/${id}`,
    },
    CONTACT: {
      SUBMIT: '/contact',
      LIST: '/contact',
      UPDATE: (id: string) => `/contact/${id}`,
    },
  },
}; 