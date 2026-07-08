import { API_CONFIG } from '../config/api.config';

interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

export const api = {
  async request(endpoint: string, options: RequestOptions = {}) {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        method: options.method || 'GET',
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Auth endpoints
  auth: {
    register: (userData: { name: string; email: string; password: string; phone: string }) =>
      api.request('/users/register', {
        method: 'POST',
        body: userData,
      }),

    login: (credentials: { email: string; password: string }) =>
      api.request('/users/login', {
        method: 'POST',
        body: credentials,
      }),

    getProfile: (token: string) =>
      api.request('/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  },

  // Booking endpoints
  bookings: {
    create: (bookingData: any, token: string) =>
      api.request('/bookings', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: bookingData,
      }),

    getMyBookings: (token: string) =>
      api.request('/bookings/my-bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    updateStatus: (bookingId: string, status: string, token: string) =>
      api.request(`/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { status },
      }),
  },

  // Contact endpoints
  contact: {
    submit: (contactData: any) =>
      api.request('/contact', {
        method: 'POST',
        body: contactData,
      }),

    getAll: (token: string) =>
      api.request('/contact', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  },
}; 