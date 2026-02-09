export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'REVIEW';
export type TaskPriority = 'HIGH' | 'LOW';

export interface TaskUser {
    name: string,
    email: string,
    employeeId: string
}

export interface Task {
    id: string,
    title: string,
    description: string,
    assignedToId: string,
    assignedTo: TaskUser,
    assignedById: string,
    assignedBy: TaskUser,
    priority: TaskPriority,
    status: TaskStatus,
    deadline: string,
    subTasks: [],
    createdAt: string,
    updatedAt: string,
}

export interface TaskData {
    tasks: Task[],
}

export interface TaskResponse {
    success: boolean;
    data: Task[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }
}

export interface CreateTaskRequest {
    title: string,
    description: string,
    priority: TaskPriority,
    deadline: string,
    assignedToId: string,
}

export interface CreateTaskResponse {
    success: boolean,
    message: string,
    data: {
        _id: string,
        title: string,
        description: string,
        assignedToId: string,
        assignedTo: TaskUser,
        assignedById: string,
        assignedBy: TaskUser,
        priority: TaskPriority,
        status: TaskStatus,
        deadline: string,
        subTasks: [],
        createdAt: string,
        updatedAt: string
    }
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  deadline?: string;
  assignedToId?: string;
  subTaskId?: string;
  isCompleted?: boolean;
}

export interface UpdateTaskResponse {
    success: boolean;
    message: string;
    data: Task;
}