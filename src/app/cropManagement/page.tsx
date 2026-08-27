"use client";

import React, { useState } from "react";
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
  category: string;
  area: string;
  plantedDate: string;
  harvestDate: string;
  stage: "Germination" | "Vegetative" | "Flowering" | "Maturity";
  healthStatus: "Excellent" | "Good" | "Needs Attention";
  progressPercentage: number;
}

// --- Mock Data ---
const initialCrops: Crop[] = [
  {
    id: "1",
    name: "বিআর-২৮ ধান (BRRI Dhan 28)",
    category: "Cereal",
    area: "২.৫ একর",
    plantedDate: "15 Jan 2026",
    harvestDate: "20 Apr 2026",
    stage: "Vegetative",
    healthStatus: "Excellent",
    progressPercentage: 45,
  },
  {
    id: "2",
    name: "আলু (Cardinal Potato)",
    category: "Vegetable",
    area: "১.২ একর",
    plantedDate: "01 Dec 2025",
    harvestDate: "10 Mar 2026",
    stage: "Flowering",
    healthStatus: "Needs Attention",
    progressPercentage: 75,
  },
  {
    id: "3",
    name: "টমেটো (Bari Tomato 14)",
    category: "Vegetable",
    area: "০.৮ একর",
    plantedDate: "10 Feb 2026",
    harvestDate: "25 May 2026",
    stage: "Germination",
    healthStatus: "Good",
    progressPercentage: 15,
  },
];

export default function CropManagementPage() {
  const [crops] = useState<Crop[]>(initialCrops);
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Sprout className="h-7 w-7 text-emerald-600" /> Crop Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            আপনার ক্ষেতের ফসলের সার্বিক অবস্থা পর্যবেক্ষণ ও পরিচালনা করুন।
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition">
          <Plus className="h-4 w-4" /> নতুন ফসল যোগ করুন
        </button>
      </div>

      {/* Overview Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">মোট চাষাবাদকৃত জমি</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">৪.৫ একর</p>
          </div>
          <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
            <Sprout className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">সক্রিয় ফসল</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">৩ টি</p>
          </div>
          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">আজকের সেচ অ্যালার্ট</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">১ টি ক্ষেত</p>
          </div>
          <div className="h-10 w-10 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">
            <Droplets className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">চলতি মাসের আনুমানিক খরচ</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">৳ ৩৫,০০০</p>
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
          <h4 className="text-sm font-semibold text-amber-900">কৃষি সতর্কতা: আলু ক্ষেতে লেট ব্লাইট রোগ প্রতিরোধ</h4>
          <p className="text-xs text-amber-700 mt-0.5">
            আবহাওয়ার আর্দ্রতা বেশি থাকায় আপনার আলু ক্ষেতে ছত্রাকনাশক স্প্রে করার পরামর্শ দেওয়া হচ্ছে।
          </p>
        </div>
      </div>

      {/* Crop List Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">বর্তমান ফসলসমূহ</h2>
          <div className="flex gap-2 bg-slate-200/60 p-1 rounded-lg text-xs font-medium">
            <button 
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-md transition ${activeTab === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}
            >
              সবগুলো
            </button>
            <button 
              onClick={() => setActiveTab("attention")}
              className={`px-3 py-1.5 rounded-md transition ${activeTab === "attention" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}
            >
              নজরদারি প্রয়োজন
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
                      {crop.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mt-1">{crop.name}</h3>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 shrink-0 ${
                    crop.healthStatus === "Excellent" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                    crop.healthStatus === "Good" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                    "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>
                    {crop.healthStatus === "Excellent" && <CheckCircle2 className="w-3 h-3" />}
                    {crop.healthStatus === "Needs Attention" && <AlertTriangle className="w-3 h-3" />}
                    {crop.healthStatus}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>জমির পরিমাণ:</span>
                    <span className="font-semibold text-slate-800">{crop.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>বর্তমান ধাপ:</span>
                    <span className="font-semibold text-slate-800">{crop.stage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>রোপণের তারিখ:</span>
                    <span className="font-medium text-slate-700">{crop.plantedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>সম্ভাব্য কাটার তারিখ:</span>
                    <span className="font-medium text-slate-700">{crop.harvestDate}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-slate-500">ফসল বৃদ্ধির অগ্রগতি</span>
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
                  <Droplets className="w-3.5 h-3.5" /> সেচ দিন
                </button>
                <button className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-amber-600 font-medium transition">
                  <Bug className="w-3.5 h-3.5" /> রোগ রিপোর্ট
                </button>
                <button className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 font-medium transition">
                  <Calendar className="w-3.5 h-3.5" /> সময়সূচী
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}