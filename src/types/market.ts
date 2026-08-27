export type CropCategory = "সব ফসল" | "শস্য" | "সবজি";
export type MarketLocation = "সব বাজার" | "ঢাকা" | "গাজীপুর" | "রাজশাহী" | "রংপুর";
export type TrendTimeframe = "7 দিন" | "৩০ দিন" | "৩ মাস";

export interface CropPrice {
  id: number;
  nameBn: string;
  nameEn: string;
  category: "শস্য" | "সবজি";
  market: "ঢাকা" | "গাজীপুর" | "রাজশাহী" | "রংপুর";
  price: number;
  previousPrice: number;
  unit: string;
}

export interface PriceTrendPoint {
  label: string;
  price: number;
}

export interface CropTrendData {
  cropId: number;
  cropBn: string;
  cropEn: string;
  timeframes: Record<TrendTimeframe, PriceTrendPoint[]>;
}

export interface MarketComparisonRow {
  market: string;
  rice: number;
  potato: number;
  tomato: number;
}

export interface MarketSummaryData {
  todayCropBn: string;
  todayPrice: number;
  todayUnit: string;
  topIncreaseCropBn: string;
  topIncreaseCropEn: string;
  topDecreaseCropBn: string;
  topDecreaseCropEn: string;
  trackedCount: number;
}
