// /src/types/harvests.ts
export interface Harvest {
  id: string;
  apiaryId: string;
  apiaryName: string;
  date: string;
  hivesCount: number;
  totalYield: number;
  averageYield: number;
  honeyType: HoneyType;
  quality: number; // 1-5 scale
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type HoneyType = 
  | 'wildflower' 
  | 'clover' 
  | 'orange_blossom' 
  | 'lavender' 
  | 'acacia' 
  | 'manuka' 
  | 'other';

export interface HarvestFormData {
  apiaryId: string;
  date: string;
  hivesCount: number;
  totalYield: number;
  honeyType: HoneyType;
  quality: number;
  notes?: string;
}

export interface HarvestStats {
  totalHarvests: number;
  totalYield: number;
  averageYield: number;
  bestHarvest: number;
  seasonalTrends: SeasonalTrend[];
}

export interface SeasonalTrend {
  season: string;
  averageYield: number;
  harvestCount: number;
}