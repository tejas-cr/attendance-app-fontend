import { UserRole } from "./attendance";

export interface UserByIdResponse {
    success: boolean;
    data: {
        _id: string;
        employeeId: string;
        name: string;
        email: string;
        role: UserRole;
        teamId?: string;
        shiftStart?: string;
        shiftEnd?: string;
        createdAt: string;
        updatedAt: string;
    }
}

export type UserUpdateInput = {
  name?: string;
  role?: UserRole;
  teamId?: string;
  officeLat?: number;
  officeLng?: number;
  shiftStart?: string;
  shiftEnd?: string;
  fcmToken?: string;
};

export type UserUpdateResponse = {
    success: boolean;
    message: string;
    data: {
        _id: string;
        employeeId: string;
        name: string;
        email: string;
        role: UserRole;
        teamId?: string;
        shiftStart?: string;
        shiftEnd?: string;
        createdAt: string;
        updatedAt: string;
    }
}

