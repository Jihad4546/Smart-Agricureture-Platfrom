export type SoilType = "দোআঁশ" | "এঁটেল" | "বেলে" | "পলি";
export type SoilHealthStatus = "Excellent" | "Good" | "Moderate" | "Poor";
export type NPKStatus = "Low" | "Normal" | "High";

export interface SoilTest {
  id: number;
  fieldName: string;
  soilType: SoilType;
  landArea: number;
  landUnit: "একর" | "কাঠা" | "বিঘা" | "শতাংশ";
  testDate: string;
  ph: number;
  moisture: number;
  temperature: number;
  organicMatter: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  healthScore: number;
  notes: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SoilOverviewData {
  soilType: SoilType;
  ph: number;
  moisture: number;
  temperature: number;
  organicMatter: number;
  healthScore: number;
}

export interface NPKAnalysisData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export interface SoilAlert {
  id: string;
  type: "warning" | "success" | "info";
  message: string;
  parameter: string;
}

export interface SoilRecommendation {
  id: string;
  type: "success" | "warning";
  text: string;
}

export interface SoilTestPayload {
  fieldName: string;
  soilType: SoilType;
  landArea: number;
  landUnit: "একর" | "কাঠা" | "বিঘা" | "শতাংশ";
  testDate: string;
  ph: number;
  moisture: number;
  temperature: number;
  organicMatter: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  notes: string;
}

export interface SoilTrendData {
  date: string;
  ph?: number;
  moisture?: number;
  healthScore?: number;
}
