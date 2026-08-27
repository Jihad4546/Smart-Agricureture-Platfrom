"use client";

import React, { useState } from "react";
import {
  Sprout,
  ArrowLeft,
  Droplets,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Plus,
} from "lucide-react";
import Link from "next/link";

// --- Types Definition ---
interface ActivityLog {
  id: string;
  date: string;
  type: "Irrigation" | "Fertilizer" | "Pesticide" | "Inspection";
  title: string;
  notes: string;
  cost?: number;
}

interface CropDetails {
  id: string;
  name: string;
  variety: string;
  category: string;
  fieldLocation: string;
  areaSize: string;
  soilType: string;
  plantingDate: string;
  expectedHarvestDate: string;
  currentStage: string;
  progressPercentage: number;
  healthStatus: "Excellent" | "Good" | "Needs Attention";
  estimatedYield: string;
  totalSpent: number;
  activities: ActivityLog[];
}

// --- Mock Data ---
const mockCropData: CropDetails = {
  id: "crop-101",
  name: "বিআর-২৮ ধান",
  variety: "BRRI Dhan 28",
  category: "দানাদার শস্য (Cereal)",
  fieldLocation: "উত্তর মাঠ (প্লট বি-২)",
  areaSize: "২.৫ একর",
  soilType: "দোআঁশ মাটি (Loam)",
  plantingDate: "15 Jan 2026",
  expectedHarvestDate: "20 Apr 2026",
  currentStage: "Vegetative (অঙ্গজ বৃদ্ধি)",
  progressPercentage: 45,
  healthStatus: "Excellent",
  estimatedYield: "৪০-৪৫ মন",
  totalSpent: 18500,
  activities: [
    {
      id: "act-1",
      date: "10 Feb 2026",
      type: "Fertilizer",
      title: "ইউরিয়া ও ড্যাপ সার প্রয়োগ",
      notes: "প্রতি শতকে ৫০০ গ্রাম ইউরিয়া এবং ২৫০ গ্রাম ড্যাপ দেওয়া হয়েছে।",
      cost: 3200,
    },
    {
      id: "act-2",
      date: "02 Feb 2026",
      type: "Irrigation",
      title: "দ্বিতীয় দফা সেচ দান",
      notes: "পাম্পের মাধ্যমে ২ ইঞ্চি পরিমাণ পানি সেচ প্রদান করা হয়েছে।",
      cost: 1500,
    },
    {
      id: "act-3",
      date: "15 Jan 2026",
      type: "Inspection",
      title: "চারা রোপণ সম্পন্ন",
      notes: "সঠিক দূরত্ব বজায় রেখে সুস্থ চারা রোপণ করা হয়েছে।",
      cost: 13800,
    },
  ],
};

export default function CropDetailsPage() {
  const [crop] = useState<CropDetails>(mockCropData);
  const [activeTab, setActiveTab] = useState<"overview" | "activities" | "pests">("overview");

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Back Link & Page Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/crop-management"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600 transition"
          >
            <ArrowLeft className="w-4 h-4" /> ক্রপ তালিকায় ফিরে যান
          </Link>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition shadow-sm">
              <Plus className="w-4 h-4" /> নতুন অ্যাক্টিভিটি যোগ করুন
            </button>
          </div>
        </div>

        {/* Header Hero Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-bold uppercase bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200">
                  {crop.category}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${
                  crop.healthStatus === "Excellent" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                  crop.healthStatus === "Good" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                  "bg-amber-50 text-amber-700 border border-amber-200"
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> স্বাস্থ্য: {crop.healthStatus}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mt-2">{crop.name}</h1>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-4">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {crop.fieldLocation}</span>
                <span>•</span>
                <span>জাত: {crop.variety}</span>
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="text-center px-3 border-r border-slate-200">
                <p className="text-[11px] font-semibold text-slate-500">মোট জমি</p>
                <p className="text-base font-bold text-slate-800">{crop.areaSize}</p>
              </div>
              <div className="text-center px-3 border-r border-slate-200">
                <p className="text-[11px] font-semibold text-slate-500">মোট খরচ</p>
                <p className="text-base font-bold text-slate-800">৳ {crop.totalSpent.toLocaleString()}</p>
              </div>
              <div className="text-center px-3">
                <p className="text-[11px] font-semibold text-slate-500">সম্ভাব্য ফলন</p>
                <p className="text-base font-bold text-emerald-700">{crop.estimatedYield}</p>
              </div>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="mt-6">
            <div className="flex justify-between items-center text-xs font-medium mb-2">
              <span className="text-slate-600">বর্তমান ধাপ: <strong className="text-slate-900">{crop.currentStage}</strong></span>
              <span className="text-emerald-700 font-bold">{crop.progressPercentage}% সম্পন্ন</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div
                className="bg-emerald-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${crop.progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 mt-2">
              <span>রোপণ: {crop.plantingDate}</span>
              <span>আনুমানিক কর্তন: {crop.expectedHarvestDate}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 text-sm font-medium">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-3 px-4 border-b-2 transition ${
              activeTab === "overview"
                ? "border-emerald-600 text-emerald-600 font-semibold"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            সারসংক্ষেপ ও বৈশিষ্ট্য
          </button>
          <button
            onClick={() => setActiveTab("activities")}
            className={`pb-3 px-4 border-b-2 transition ${
              activeTab === "activities"
                ? "border-emerald-600 text-emerald-600 font-semibold"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            সেচ ও সার প্রয়োগের ইতিহাস ({crop.activities.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Field Details */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-600" /> ক্ষেত ও মাটির তথ্য
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">প্লটের অবস্থান</span>
                  <span className="font-medium text-slate-800">{crop.fieldLocation}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">জমির পরিমাণ</span>
                  <span className="font-medium text-slate-800">{crop.areaSize}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">মাটির ধরণ</span>
                  <span className="font-medium text-slate-800">{crop.soilType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">বীজের জাত</span>
                  <span className="font-medium text-slate-800">{crop.variety}</span>
                </div>
              </div>
            </div>

            {/* Smart Advisory */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> স্মার্ট কৃষি পরামর্শ
              </h3>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs space-y-2">
                <p className="font-semibold text-amber-900">তৃতীয় সেচ প্রদানের উপযুক্ত সময়</p>
                <p className="text-amber-800">
                  আগামী ৩ দিনের মধ্যে ক্ষেতে ২-৩ ইঞ্চি পানি বজায় রাখা প্রয়োজন। ইউরিয়া সার প্রয়োগের পর হালকা সেচ দিন।
                </p>
              </div>
            </div>

            {/* Weather & Soil Summary */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" /> পরিবেশগত অবস্থা
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">আদ্রতা (Humidity)</span>
                  <span className="font-medium text-slate-800">৬৮%</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">মাটির পিএইচ (pH)</span>
                  <span className="font-medium text-slate-800">৬.৫ (আদর্শ)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">তাপমাত্রা</span>
                  <span className="font-medium text-slate-800">২৮° সেলসিয়াস</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "activities" && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-base">সাম্প্রতিক কর্মকাণ্ডসমূহ</h3>
            </div>
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {crop.activities.map((act) => (
                <div key={act.id} className="relative group">
                  <div className="absolute -left-[19px] top-1.5 w-3 h-3 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-100" />
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase">{act.type}</span>
                        <h4 className="font-bold text-slate-800 text-sm mt-0.5">{act.title}</h4>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">{act.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">{act.notes}</p>
                    {act.cost && (
                      <p className="text-xs font-semibold text-emerald-700 mt-2">
                        খরচ: ৳ {act.cost.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}