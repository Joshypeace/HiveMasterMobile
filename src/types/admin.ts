import { SubscriptionPlan } from "./auth";

// /src/types/admin.ts
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  subscription: UserSubscription;
  lastLogin?: string;
  createdAt: string;
  apiaryCount: number;
  hiveCount: number;
  status: 'active' | 'inactive' | 'suspended';
}

export type UserRole = 'farmer' | 'admin' | 'viewer';

export interface UserSubscription {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  maxHives: number;
  maxApiaries: number;
  features: string[];
}

export type SubscriptionStatus = 'active' | 'inactive' | 'expired' | 'pending' | 'cancelled';

export interface Device {
  id: string;
  deviceId: string;
  type: DeviceType;
  status: DeviceStatus;
  assignedTo?: string;
  hiveName?: string;
  lastSeen: string;
  battery: number;
  firmware: string;
  createdAt: string;
}

export type DeviceType = 'hive_sensor' | 'weather_station' | 'gateway';
export type DeviceStatus = 'online' | 'offline' | 'maintenance' | 'retired';

export interface DeviceAssignment {
  deviceId: string;
  hiveId: string;
  assignedAt: string;
  assignedBy: string;
}

export interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalApiaries: number;
  totalHives: number;
  activeDevices: number;
  storageUsage: StorageUsage;
  revenue: RevenueStats;
}

export interface StorageUsage {
  used: number;
  total: number;
  percentage: number;
}

export interface RevenueStats {
  monthly: number;
  yearly: number;
  growth: number;
}