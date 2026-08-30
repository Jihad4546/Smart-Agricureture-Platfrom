"use client";

import React, { useState } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { 
  FlaskConical, 
  Plus, 
  TestTube, 
  Thermometer, 
  Droplet, 
  Activity, 
  ShieldAlert, 
  FileText, 
  CheckCircle2, 
  AlertTriangle 
} from "lucide-react";

// --- Types Definition ---
interface SoilReport {
  id: string;
  fieldLocation: string;
  fieldLocationBn: string;
  sampleDate: string;
  phLevel: number;
  nitrogen: string;
  nitrogenBn: string;
  phosphorus: string;
  phosphorusBn: string;
  potassium: string;
  potassiumBn: string;
  moisture: string;
  moistureBn: string;
  healthStatus: "Optimal" | "Moderate" | "Needs Attention";
  healthStatusBn: string;
  recommendation: string;
  recommendationBn: string;
}

// --- Translations Definition ---
const translations = {
  en: {
    title: "Soil Analysis & Health",
    subtitle: "Monitor soil pH, NPK levels, moisture, and get customized fertilizer recommendations.",
    newTestBtn: "New Soil Test",
    avgPh: "Average Soil pH",
    phStatus: "Slightly Acidic (Ideal: 6.0 - 7.0)",
    organicMatter: "Organic Matter",
    organicStatus: "Good Condition",
    moistureLevel: "Soil Moisture",
    moistureStatus: "Sufficient Water Content",
    pendingTests: "Pending Reports",
    pendingStatus: "1 Sample in Lab Analysis",
    recommendationTitle: "Soil Advisory: Lime Treatment Recommended",
    recommendationDesc: "Field B (Potato Plot) shows slightly higher acidity. Applying agricultural lime is suggested before next planting.",
    recentReports: "Recent Soil Test Reports",
    tabAll: "All Fields",
    tabAttention: "Needs Attention",
    fieldLocation: "Field Location",
    sampleDate: "Sample Date",
    phLevel: "pH Level",
    npkStatus: "NPK Balance (N-P-K)",
    moisture: "Moisture",
    healthStatus: "Soil Condition",
    recommendation: "Recommendation",
    downloadReport: "Download PDF",
    viewDetails: "View Analysis",
  },
  bn: {
    title: "মাটি বিশ্লেষণ ও স্বাস্থ্য",
    subtitle: "মাটির পিএইচ (pH), এনপিকে (NPK) মাত্রা, আর্দ্রতা পর্যবেক্ষণ করুন এবং সার ব্যবহারে সঠিক পরামর্শ পান।",
    newTestBtn: "নতুন মাটি পরীক্ষা",
    avgPh: "গড় পিএইচ (pH) মাত্রা",
    phStatus: "সামান্য এসিডিক (আদর্শ: ৬.০ - ৭.০)",
    organicMatter: "জৈব পদার্থের পরিমাণ",
    organicStatus: "উত্তম পর্যায়ে আছে",
    moistureLevel: "মাটির আর্দ্রতা",
    moistureStatus: "পর্যাপ্ত পানি বিদ্যমান",
    pendingTests: "পেন্ডিং রিপোর্ট",
    pendingStatus: "১ টি নমুনা ল্যাবে রয়েছে",
    recommendationTitle: "মাটি বিষয়ক পরামর্শ: চুন প্রয়োগের তাগিদ",
    recommendationDesc: "ব্লক-বি (আলু ক্ষেত) এর মাটিতে এসিডের মাত্রা একটু বেশি। আগামী রোপণের আগে নির্দিষ্ট মাত্রায় কৃষি চুন ব্যবহারের পরামর্শ দেওয়া হচ্ছে।",
    recentReports: "সাম্প্রতিক মাটি পরীক্ষার রিপোর্টসমূহ",
    tabAll: "সবগুলো ক্ষেত",
    tabAttention: "নজরদারি প্রয়োজন",
    fieldLocation: "ক্ষেতের অবস্থান",
    sampleDate: "পরীক্ষার তারিখ",
    phLevel: "পিএইচ (pH) মাত্রা",
    npkStatus: "এনপিকে (N-P-K) ভারসাম্য",
    moisture: "আর্দ্রতা",
    healthStatus: "মাটির অবস্থা",
    recommendation: "পরামর্শ",
    downloadReport: "পিডিএফ ডাউনলোড",
    viewDetails: "বিস্তারিত দেখুন",
  }
};

// --- Mock Data ---
const initialReports: SoilReport[] = [
  {
    id: "1",
    fieldLocation: "Block A - Rice Field",
    fieldLocationBn: "ব্লক এ - ধান ক্ষেত",
    sampleDate: "10 Feb 2026",
    phLevel: 6.5,
    nitrogen: "Optimal",
    nitrogenBn: "পর্যাপ্ত",
    phosphorus: "High",
    phosphorusBn: "বেশি",
    potassium: "Optimal",
    potassiumBn: "পর্যাপ্ত",
    moisture: "42%",
    moistureBn: "৪২%",
    healthStatus: "Optimal",
    healthStatusBn: "সর্বোত্তম",
    recommendation: "Maintain current organic fertilizer intake.",
    recommendationBn: "বর্তমান জৈব সার ব্যবহারের মাত্রা বজায় রাখুন।",
  },
  {
    id: "2",
    fieldLocation: "Block B - Potato Plot",
    fieldLocationBn: "ব্লক বি - আলু ক্ষেত",
    sampleDate: "02 Feb 2026",
    phLevel: 5.4,
    nitrogen: "Low",
    nitrogenBn: "কম",
    phosphorus: "Optimal",
    phosphorusBn: "পর্যাপ্ত",
    potassium: "Low",
    potassiumBn: "কম",
    moisture: "28%",
    moistureBn: "২৮%",
    healthStatus: "Needs Attention",
    healthStatusBn: "নজরদারি প্রয়োজন",
    recommendation: "Add agricultural lime and Nitrogen rich fertilizer.",
    recommendationBn: "কৃষি চুন এবং নাইট্রোজেন সমৃদ্ধ সার প্রয়োগ করুন।",
  },
  {
    id: "3",
    fieldLocation: "Block C - Tomato Garden",
    fieldLocationBn: "ব্লক সি - টমেটো বাগান",
    sampleDate: "20 Jan 2026",
    phLevel: 6.8,
    nitrogen: "Optimal",
    nitrogenBn: "পর্যাপ্ত",
    phosphorus: "Optimal",
    phosphorusBn: "পর্যাপ্ত",
    potassium: "Optimal",
    potassiumBn: "পর্যাপ্ত",
    moisture: "35%",
    moistureBn: "৩৫%",
    healthStatus: "Optimal",
    healthStatusBn: "সর্বোত্তম",
    recommendation: "Soil structure is ideal for vegetables.",
    recommendationBn: "মাটির উপাদান সবজি চাষের জন্য চমৎকার।",
  },
];

export default function SoilAnalysisPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [reports] = useState<SoilReport[]>(initialReports);
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FlaskConical className="h-7 w-7 text-emerald-600" /> {t.title}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {t.subtitle}
          </p>
        </div>
<button className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] px-5 text-sm font-semibold text-white transition hover:bg-[#2F5943] shadow-md shadow-green-950/15">
          <Plus className="h-4 w-4" /> {t.newTestBtn}
        </button>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.avgPh}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">6.2 pH</p>
            <p className="text-[11px] text-emerald-600 mt-0.5">{t.phStatus}</p>
          </div>
          <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
            <TestTube className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.organicMatter}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{lang === "bn" ? "৩.৮%" : "3.8%"}</p>
            <p className="text-[11px] text-emerald-600 mt-0.5">{t.organicStatus}</p>
          </div>
          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            <Activity className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.moistureLevel}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{lang === "bn" ? "৩৫%" : "35%"}</p>
            <p className="text-[11px] text-cyan-600 mt-0.5">{t.moistureStatus}</p>
          </div>
          <div className="h-10 w-10 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">
            <Droplet className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.pendingTests}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{lang === "bn" ? "১ টি" : "1 Field"}</p>
            <p className="text-[11px] text-amber-600 mt-0.5">{t.pendingStatus}</p>
          </div>
          <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
            <Thermometer className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Soil Advisory Banner */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-amber-900">{t.recommendationTitle}</h4>
          <p className="text-xs text-amber-700 mt-0.5">
            {t.recommendationDesc}
          </p>
        </div>
      </div>

      {/* Reports Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">{t.recentReports}</h2>
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

        {/* Soil Test Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {t.sampleDate}: {report.sampleDate}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mt-1">
                      {lang === "bn" ? report.fieldLocationBn : report.fieldLocation}
                    </h3>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 shrink-0 ${
                    report.healthStatus === "Optimal" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                    "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>
                    {report.healthStatus === "Optimal" ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                    {lang === "bn" ? report.healthStatusBn : report.healthStatus}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span>{t.phLevel}:</span>
                    <span className={`font-bold ${report.phLevel < 6.0 ? "text-amber-600" : "text-emerald-600"}`}>
                      {report.phLevel} pH
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span>{t.npkStatus}:</span>
                    <span className="font-semibold text-slate-800">
                      N: {lang === "bn" ? report.nitrogenBn : report.nitrogen} | P: {lang === "bn" ? report.phosphorusBn : report.phosphorus} | K: {lang === "bn" ? report.potassiumBn : report.potassium}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span>{t.moisture}:</span>
                    <span className="font-semibold text-slate-800">{lang === "bn" ? report.moistureBn : report.moisture}</span>
                  </div>
                </div>

                {/* Recommendation Box */}
                <div className="mt-4 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs">
                  <span className="font-semibold text-slate-700 block mb-1">{t.recommendation}:</span>
                  <p className="text-slate-600">
                    {lang === "bn" ? report.recommendationBn : report.recommendation}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-between gap-2">
                <button className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-emerald-600 font-medium transition">
                  <FileText className="w-3.5 h-3.5" /> {t.downloadReport}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 font-medium transition">
                  <FlaskConical className="w-3.5 h-3.5" /> {t.viewDetails}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}