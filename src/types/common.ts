// /src/types/common.ts
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ListParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

export interface ChartData {
  labels: string[];
  values: number[];
  colors?: string[];
}

export interface KPI {
  title: string;
  value: number | string;
  change?: number;
  icon: string;
  color: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  action?: NotificationAction;
}

export type NotificationType = 
  | 'alert' 
  | 'task' 
  | 'harvest' 
  | 'system' 
  | 'weather' 
  | 'subscription';

export interface NotificationAction {
  type: 'navigate' | 'api_call' | 'dismiss';
  target: string;
  params?: Record<string, any>;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: NotificationSettings;
  offlineMode: boolean;
  dataSync: DataSyncSettings;
}

export interface NotificationSettings {
  enabled: boolean;
  alerts: boolean;
  tasks: boolean;
  harvests: boolean;
  weather: boolean;
  sound: boolean;
  vibration: boolean;
}

export interface DataSyncSettings {
  autoSync: boolean;
  syncInterval: number; // minutes
  wifiOnly: boolean;
  backgroundSync: boolean;
}