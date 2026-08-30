"use client";

import React, { useState } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { 
  Sprout, 
  Plus, 
  Droplets, 
  Bug, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign 
} from "lucide-react";

// --- Types Definition ---
interface Crop {
  id: string;
  name: string;
  nameBn: string;
  category: string;
  categoryBn: string;
  area: string;
  areaBn: string;
  plantedDate: string;
  harvestDate: string;
  stage: "Germination" | "Vegetative" | "Flowering" | "Maturity";
  stageBn: string;
  healthStatus: "Excellent" | "Good" | "Needs Attention";
  healthStatusBn: string;
  progressPercentage: number;
}

// --- Translations Definition ---
const translations = {
  en: {
    title: "Crop Management",
    subtitle: "Monitor and manage the overall condition of your crops in the field.",
    addNewCrop: "Add New Crop",
    totalLand: "Total Cultivated Land",
    totalLandValue: "4.5 Acres",
    activeCrops: "Active Crops",
    activeCropsValue: "3 Crops",
    irrigationAlert: "Today's Irrigation Alert",
    irrigationAlertValue: "1 Field",
    estimatedCost: "Est. Cost This Month",
    estimatedCostValue: "$320",
    alertTitle: "Agricultural Alert: Late Blight Prevention in Potato Field",
    alertDesc: "Due to high humidity, applying fungicide to your potato field is recommended.",
    currentCrops: "Current Crops",
    tabAll: "All",
    tabAttention: "Needs Attention",
    landArea: "Land Area",
    currentStage: "Current Stage",
    plantingDate: "Planting Date",
    harvestDate: "Est. Harvest Date",
    cropProgress: "Crop Growth Progress",
    waterCrop: "Irrigate",
    reportPest: "Report Disease",
    schedule: "Schedule",
  },
  bn: {
    title: "ফসল ব্যবস্থাপনা",
    subtitle: "আপনার ক্ষেতের ফসলের সার্বিক অবস্থা পর্যবেক্ষণ ও পরিচালনা করুন।",
    addNewCrop: "নতুন ফসল যোগ করুন",
    totalLand: "মোট চাষাবাদকৃত জমি",
    totalLandValue: "৪.৫ একর",
    activeCrops: "সক্রিয় ফসল",
    activeCropsValue: "৩ টি",
    irrigationAlert: "আজকের সেচ অ্যালার্ট",
    irrigationAlertValue: "১ টি ক্ষেত",
    estimatedCost: "চলতি মাসের আনুমানিক খরচ",
    estimatedCostValue: "৳ ৩৫,০০০",
    alertTitle: "কৃষি সতর্কতা: আলু ক্ষেতে লেট ব্লাইট রোগ প্রতিরোধ",
    alertDesc: "আবহাওয়ার আর্দ্রতা বেশি থাকায় আপনার আলু ক্ষেতে ছত্রাকনাশক স্প্রে করার পরামর্শ দেওয়া হচ্ছে।",
    currentCrops: "বর্তমান ফসলসমূহ",
    tabAll: "সবগুলো",
    tabAttention: "নজরদারি প্রয়োজন",
    landArea: "জমির পরিমাণ",
    currentStage: "বর্তমান ধাপ",
    plantingDate: "রোপণের তারিখ",
    harvestDate: "সম্ভাব্য কাটার তারিখ",
    cropProgress: "ফসল বৃদ্ধির অগ্রগতি",
    waterCrop: "সেচ দিন",
    reportPest: "রোগ রিপোর্ট",
    schedule: "সময়সূচী",
  }
};

// --- Mock Data ---
const initialCrops: Crop[] = [
  {
    id: "1",
    name: "BRRI Dhan 28",
    nameBn: "বিআর-২৮ ধান (BRRI Dhan 28)",
    category: "Cereal",
    categoryBn: "দানাদার",
    area: "2.5 Acres",
    areaBn: "২.৫ একর",
    plantedDate: "15 Jan 2026",
    harvestDate: "20 Apr 2026",
    stage: "Vegetative",
    stageBn: "বাড়ন্ত পর্যায়",
    healthStatus: "Excellent",
    healthStatusBn: "চমৎকার",
    progressPercentage: 45,
  },
  {
    id: "2",
    name: "Cardinal Potato",
    nameBn: "আলু (Cardinal Potato)",
    category: "Vegetable",
    categoryBn: "সবজি",
    area: "1.2 Acres",
    areaBn: "১.২ একর",
    plantedDate: "01 Dec 2025",
    harvestDate: "10 Mar 2026",
    stage: "Flowering",
    stageBn: "ফুল ফোটার পর্যায়",
    healthStatus: "Needs Attention",
    healthStatusBn: "নজরদারি প্রয়োজন",
    progressPercentage: 75,
  },
  {
    id: "3",
    name: "Bari Tomato 14",
    nameBn: "টমেটো (Bari Tomato 14)",
    category: "Vegetable",
    categoryBn: "সবজি",
    area: "0.8 Acres",
    areaBn: "০.৮ একর",
    plantedDate: "10 Feb 2026",
    harvestDate: "25 May 2026",
    stage: "Germination",
    stageBn: "অঙ্কুরোদ্গম",
    healthStatus: "Good",
    healthStatusBn: "ভালো",
    progressPercentage: 15,
  },
];

export default function CropManagementPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [crops] = useState<Crop[]>(initialCrops);
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Sprout className="h-7 w-7 text-emerald-600" /> {t.title}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {t.subtitle}
          </p>
        </div>
<button className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] px-5 text-sm font-semibold text-white transition hover:bg-[#2F5943] shadow-md shadow-green-950/15">
          <Plus className="h-4 w-4" /> {t.addNewCrop}
        </button>
      </div>

      {/* Overview Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.totalLand}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{t.totalLandValue}</p>
          </div>
          <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
            <Sprout className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.activeCrops}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{t.activeCropsValue}</p>
          </div>
          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.irrigationAlert}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{t.irrigationAlertValue}</p>
          </div>
          <div className="h-10 w-10 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">
            <Droplets className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.estimatedCost}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{t.estimatedCostValue}</p>
          </div>
          <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
            <DollarSign className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Advisory Alert Banner */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-amber-900">{t.alertTitle}</h4>
          <p className="text-xs text-amber-700 mt-0.5">
            {t.alertDesc}
          </p>
        </div>
      </div>

      {/* Crop List Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">{t.currentCrops}</h2>
          <div className="flex gap-2 bg-slate-200/60 p-1 rounded-lg text-xs font-medium">
            <button 
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-md transition ${activeTab === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}
            >
              {t.tabAll}
            </button>
            <button 
              onClick={() => setActiveTab("attention")}
              className={`px-3 py-1.5 rounded-md transition ${activeTab === "attention" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}
            >
              {t.tabAttention}
            </button>
          </div>
        </div>

        {/* Crops Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops.map((crop) => (
            <div key={crop.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {lang === "bn" ? crop.categoryBn : crop.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mt-1">
                      {lang === "bn" ? crop.nameBn : crop.name}
                    </h3>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 shrink-0 ${
                    crop.healthStatus === "Excellent" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                    crop.healthStatus === "Good" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                    "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>
                    {crop.healthStatus === "Excellent" && <CheckCircle2 className="w-3 h-3" />}
                    {crop.healthStatus === "Needs Attention" && <AlertTriangle className="w-3 h-3" />}
                    {lang === "bn" ? crop.healthStatusBn : crop.healthStatus}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>{t.landArea}:</span>
                    <span className="font-semibold text-slate-800">{lang === "bn" ? crop.areaBn : crop.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.currentStage}:</span>
                    <span className="font-semibold text-slate-800">{lang === "bn" ? crop.stageBn : crop.stage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.plantingDate}:</span>
                    <span className="font-medium text-slate-700">{crop.plantedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.harvestDate}:</span>
                    <span className="font-medium text-slate-700">{crop.harvestDate}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-slate-500">{t.cropProgress}</span>
                    <span className="text-emerald-700">{crop.progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${crop.progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-between gap-2">
                <button className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-emerald-600 font-medium transition">
                  <Droplets className="w-3.5 h-3.5" /> {t.waterCrop}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-amber-600 font-medium transition">
                  <Bug className="w-3.5 h-3.5" /> {t.reportPest}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 font-medium transition">
                  <Calendar className="w-3.5 h-3.5" /> {t.schedule}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}