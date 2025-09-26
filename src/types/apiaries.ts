// /src/types/apiaries.ts
export interface Apiary {
  id: string;
  name: string;
  location: string;
  coordinates: Coordinates;
  description?: string;
  hiveCount: number;
  lastInspection?: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface ApiaryFormData {
  name: string;
  location: string;
  coordinates: Coordinates;
  description?: string;
}

export interface ApiaryStats {
  totalHives: number;
  activeHives: number;
  alertsCount: number;
  lastHarvest?: string;
  averageYield: number;
}