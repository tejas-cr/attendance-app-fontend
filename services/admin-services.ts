import { AttendanceResponse, UserAttendanceById, UserAttendanceData, UserRole } from '@/app/types/attendance';
import api from '../lib/axios';
import { User } from './auth-service';
import { CreateTaskRequest, CreateTaskResponse, Task, TaskResponse, UpdateTaskInput, UpdateTaskResponse } from '@/app/types/task';
import { TeamStatusResponse, UserByIdResponse, UserUpdateInput, UserUpdateResponse } from '@/app/types/user';

interface PaginatedUsersResponse {
  success: boolean;
  data: {
    users: User[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface CreateUserRequest {
  employeeId: string,
  name: string,
  email: string,
  phone: string,
  role: UserRole,
  teamId: string,
  password: string,
  shiftStart: string,
  shiftEnd: string
}

export interface CreateUserResponse {
  success: boolean,
  message: string,
  data: {
    success: boolean,
    user: {
      employeeId: string,
      name: string,
      email: string,
      role: UserRole,
      teamId: string,
      shiftStart: string,
      shiftEnd: string,
      _id: string,
      createdAt: string,
      updatedAt: string,
      __v: number
    },
    tempPassword: string
  }
}


export const adminService = {
  async createUser(data: CreateUserRequest) {
    const response = await api.post<CreateUserResponse>(
      '/admin/users',
      data
    );
    return response.data;
  },

  async getAllUsers() {
    const response = await api.get<PaginatedUsersResponse>("/admin/users");
    console.log("this is response", response)
    return response.data.data;
  },

  async getUserById(id: string) {
    const response = await api.get<UserByIdResponse>(`/admin/users/${id}`);
    return response.data;
  },

  async updateUser(id: string, data: UserUpdateInput) {
    const response = await api.patch<UserUpdateResponse>(
      `/admin/users/${id}/updateUser`,
      data
    )
    return response.data
  },

  async updateUserPassword(id: string, data: { password: string }) {
    const response = await api.patch<{ success: boolean, message: string }>(
      `/admin/users/${id}/password`,
      data,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    return response.data
  },

  async getAttendance() {
    const response = await api.get<AttendanceResponse>(
      "/users/team/status",
    );
    return response.data.data;
  },

  async getUserAttendance() {
    const response = await api.get<{ success: boolean, data: UserAttendanceData }>("/attendance/users");
    return response.data.data;
  },

  async getUserAttendanceById(id: string) {
    const response = await api.get<UserAttendanceById>(`/attendance/user/${id}`);
    console.log("this is response", response)
    return response.data;
  },

  async createTask(data: CreateTaskRequest) {
    const response = await api.post<CreateTaskResponse>(
      '/tasks',
      data
    );
    return response.data;
  },

  async getTasks() {
    const response = await api.get<TaskResponse>(
      "/tasks",
    );
    return response.data.data;
  },

  async getTaskById(id: string) {
    const response = await api.get<{ sucess: boolean, data: Task }>(`/tasks/${id}`);
    return response.data.data;
  },

  async updateTask(id: string, data: UpdateTaskInput) {
    const response = await api.patch<UpdateTaskResponse>(
      `/tasks/${id}`,
      data
    );
    return response.data;
  },

  async deleteTask(id: string) {
    const response = await api.delete(`/tasks/${id}`);
    return response;
  },

  async getTeams() {
    const response = await api.get<TeamStatusResponse>(
      "/users/team/status",
    );
    return response.data.data;
  },



};
