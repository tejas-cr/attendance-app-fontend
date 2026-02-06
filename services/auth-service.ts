import { UserRole } from '@/app/types/attendance';
import api from '../lib/axios';

export interface User {
  _id: string;
  employeeId: string;
  name: string;
  email: string
  role: UserRole
  teamId?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    access_token: string;
    refresh_token: string;
  };
}

export const authService = {
  async login(credentials: { email: string; password: string }) {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  async register(data: { name: string; email: string; password: string }) {
    const response = await api.post<LoginResponse>('/auth/register', data);
    return response.data;
  },

  async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  async getProfile() {
    const response = await api.get<{ success: boolean; data: User }>('/auth/me');
    return response.data;
  },

  async refresh() {
    const response = await api.post('/auth/refresh');
    return response.data;
  }
};
