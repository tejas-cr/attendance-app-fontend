export type UserRole = "ADMIN" | "SENIOR" | "JUNIOR";
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY'  | null

export interface AttendanceMember {
  _id: string;
  employeeId: string;
  name: string;
  email: string;
  role: UserRole;

  teamId?: string;

  officeLat?: number;
  officeLng?: number;

  shiftStart?: string; // "09:00"
  shiftEnd?: string;   // "18:00"

  createdAt: string;   // ISO date
  updatedAt: string;

  isClockedIn: boolean;
  isInOffice: boolean;

  attendanceStatus: AttendanceStatus;
  clockInTime: number | null; // epoch ms
  totalWorkMinutes: number;

  __v?: number;
}

export interface AttendanceData {
  teamId: string;        // "ALL" | "TEAM_1" | ...
  members: AttendanceMember[];
  totalMembers: number;
}

export interface AttendanceResponse {
  success: boolean;
  data: AttendanceData;
}

export interface UserAttendance {
  id: string,
  name: string,
  email: string,
  role: UserRole,
  today: {
    date: string,
    clockedIn: boolean,
    clockedOut: boolean,
    clockInTime: string | null,
    clockInImageUrl: string | null,
    clockOutTime: string | null,
    clockOutImageUrl: string | null,
    status: AttendanceStatus,
    totalWorkMinutes: number
  },
  weeklyTotal: number
}

export interface UserAttendanceData {
  users: UserAttendance[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface DailyAttendance {
  date: string;
  clockedIn: boolean;
  clockedOut: boolean;
  clockInTime: string | null;
  clockInImageUrl: string | null;
  clockOutTime: string | null;
  clockOutImageUrl: string | null;
  status: AttendanceStatus;
  totalWorkMinutes: number;
}

export interface DailyLog {
  date: string;
  dayOfWeek: string;
  clockInTime: string | null;
  clockInImageUrl: string | null;
  clockOutTime: string | null;
  clockOutImageUrl: string | null;
  totalWorkMinutes: number;
  status: AttendanceStatus;
}

export interface WeeklyAttendance {
  weekRange: string;
  totalHoursThisWeek: number;
  averageClockInTime: string;
  counts: {
    presentDays: number;
    absentDays: number;
  },
  dailyLogs: DailyLog[] | [];
}

export interface MonthlyAttendance {
  month: string;
  startDate: string;
  endDate: string;
  totalHoursThisMonth: number;
  averageClockInTime: string;
  totalWorkingDays: number;
  presentDays: number;
  absentDays: number;
  dailyLogs: DailyLog[] | [];
}

export interface UserAttendanceById {
  success: boolean;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
      shiftStart: string;
    };
    attendance: {
      today: DailyAttendance;
      weekly: WeeklyAttendance;
      monthly: MonthlyAttendance;
      customRange: null;
    };
  };
}