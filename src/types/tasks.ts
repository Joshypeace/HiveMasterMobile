import { RelatedEntity } from "./finances";

// /src/types/tasks.ts
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
  assignedTo?: string;
  relatedEntity?: RelatedEntity;
  createdAt: string;
  updatedAt: string;
}

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface TaskFormData {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate: string;
  assignedTo?: string;
  relatedEntity?: RelatedEntity;
}

export interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  completionRate: number;
  priorityBreakdown: PriorityBreakdown;
}

export interface PriorityBreakdown {
  low: number;
  medium: number;
  high: number;
}