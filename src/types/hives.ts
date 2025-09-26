import { Task } from "react-native";
import { Coordinates } from "./apiaries";

// /src/types/hives.ts
export interface Hive {
  id: string;
  name: string;
  apiaryId: string;
  apiaryName: string;
  deviceId?: string;
  status: HiveStatus;
  breed?: string;
  installationDate: string;
  lastInspection?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type HiveStatus = 'healthy' | 'needs_attention' | 'swarming' | 'inactive';

export interface HiveDetail extends Hive {
  currentReadings: HiveReadings;
  historicalData: HistoricalReading[];
  alerts: HiveAlert[];
  tasks: Task[];
  notes: Note[];
}

export interface HiveReadings {
  temperature: number;
  humidity: number;
  weight: number;
  soundLevel: number;
  battery: number;
  lastUpdated: string;
  gps: Coordinates;
}

export interface HistoricalReading {
  timestamp: string;
  temperature: number;
  humidity: number;
  weight: number;
  soundLevel: number;
}

export interface HiveAlert {
  id: string;
  hiveId: string;
  type: AlertType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  resolved: boolean;
  resolvedAt?: string;
}

export type AlertType = 
  | 'temperature_high' 
  | 'temperature_low' 
  | 'humidity_high' 
  | 'humidity_low' 
  | 'weight_change' 
  | 'swarming_risk' 
  | 'battery_low' 
  | 'device_offline';

export interface HiveFormData {
  name: string;
  apiaryId: string;
  breed?: string;
  installationDate: string;
  deviceId?: string;
}