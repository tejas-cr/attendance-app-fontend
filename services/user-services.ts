import { AttendanceResponse } from '@/app/types/attendance';
import api from '../lib/axios';
import { User } from './auth-service';

export interface PaginatedUsersResponse {
  success: boolean;
  data: {
    users: User[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'senior' | 'junior';
  employeeId: string;
  teamId?: string;
}


export const adminService = {
  async getAllUsers() {
    const response = await api.get<PaginatedUsersResponse>("/admin/users");
    return response.data.data;
  },

  async createUser(data: CreateUserRequest) {
    const response = await api.post<{ success: boolean; data: User }>(
        '/admin/users',
        data
    );
    return response.data;
  },

  async getAttendance(teamId?: string) {
    const response = await api.get<AttendanceResponse>(
      "/attendance",
      {
        params: teamId ? { teamId } : undefined,
      }
    );

    return response.data.data; // 👈 return only useful payload
  },
};
