export type CropStatus = "Growing" | "Ready to Harvest" | "Needs Attention" | "Harvested";
export type GrowthStage =
  | "Seed"
  | "Seedling"
  | "Vegetative Growth"
  | "Flowering/Fruiting"
  | "Mature"
  | "Harvest";

export interface CropSummary {
  totalCrops: number;
  growingCrops: number;
  readyToHarvest: number;
  attentionRequired: number;
}

export interface Crop {
  id: number;
  crop_name: string;
  variety: string;
  land_area: number;
  land_unit: string;
  planting_date: string;
  expected_harvest_date: string;
  seed_type: string;
  irrigation_type: string;
  fertilizer: string;
  notes: string;
  growth_stage: GrowthStage;
  growth_percentage: number;
  status: CropStatus;
}

export interface CropPayload {
  crop_name: string;
  variety: string;
  land_area: number;
  land_unit: string;
  planting_date: string;
  expected_harvest_date: string;
  seed_type: string;
  irrigation_type: string;
  fertilizer: string;
  notes: string;
  growth_stage?: GrowthStage;
  growth_percentage?: number;
  status?: CropStatus;
}

export interface CropActivity {
  id: number;
  crop_id: number;
  activity_type: string;
  activity_date: string;
  description: string;
  quantity: string;
  notes: string;
}

export interface CropActivityPayload {
  activity_type: string;
  activity_date: string;
  description: string;
  quantity: string;
  notes: string;
}

export interface CropGrowthUpdatePayload {
  growth_stage: GrowthStage;
  growth_percentage: number;
  status: CropStatus;
  notes: string;
}
