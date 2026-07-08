import { api } from '../utils/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  token: string;
}

const TOKEN_KEY = 'userToken';

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await api.auth.login(credentials);
    if (response.token) {
      localStorage.setItem(TOKEN_KEY, response.token);
    }
    return response;
  },

  async register(data: RegisterData): Promise<User> {
    const response = await api.auth.register(data);
    if (response.token) {
      localStorage.setItem(TOKEN_KEY, response.token);
    }
    return response;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}; 