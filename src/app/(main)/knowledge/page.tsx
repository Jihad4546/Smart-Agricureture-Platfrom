"use client";

import React, { useState } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { 
  BookOpen, 
  Search, 
  Bug, 
  ShieldCheck, 
  AlertCircle, 
  ChevronRight, 
  Sprout, 
  Droplets, 
  Info,
  Filter
} from "lucide-react";

// --- Types Definition ---
interface Disease {
  id: string;
  name: string;
  nameBn: string;
  crop: string;
  cropBn: string;
  category: "Fungal" | "Bacterial" | "Viral" | "Pest";
  categoryBn: string;
  symptoms: string;
  symptomsBn: string;
  treatment: string;
  treatmentBn: string;
  severity: "High" | "Medium" | "Low";
  severityBn: string;
}

// --- Translations Definition ---
const translations = {
  en: {
    title: "Crop Disease Library",
    subtitle: "Identify plant diseases, symptoms, and find expert recommended organic and chemical solutions.",
    searchPlaceholder: "Search disease or crop name (e.g. Potato, Blight)...",
    allCategories: "All Categories",
    fungal: "Fungal",
    bacterial: "Bacterial",
    viral: "Viral",
    pest: "Pest Attack",
    totalDiseases: "Cataloged Diseases",
    totalDiseasesVal: "120+ Issues",
    threatAlerts: "Active Season Threats",
    threatAlertsVal: "4 Common",
    organicSolutions: "Organic Remedies",
    organicSolutionsVal: "Available",
    expertSupport: "Agronomist Advice",
    expertSupportVal: "24/7 Active",
    crop: "Affected Crop",
    category: "Type",
    severity: "Severity Level",
    symptoms: "Key Symptoms",
    treatment: "Recommended Treatment",
    viewDetails: "View Full Guide",
    noResults: "No diseases found matching your search query.",
  },
  bn: {
    title: "ফসল রোগ লাইব্রেরি",
    subtitle: "ফসলের রোগ, লক্ষণ শনাক্ত করুন এবং বিশেষজ্ঞ সমর্থিত জৈব ও রাসায়নিক প্রতিকার পান।",
    searchPlaceholder: "রোগ বা ফসলের নাম দিয়ে খুঁজুন (যেমন: আলু, ব্লাইট)...",
    allCategories: "সব ধরন",
    fungal: "ছত্রাকজনিত",
    bacterial: "ব্যাকটেরিয়াজনিত",
    viral: "ভাইরাসজনিত",
    pest: "পোকার আক্রমণ",
    totalDiseases: "তালিকাভুক্ত রোগ",
    totalDiseasesVal: "১২০+ টি",
    threatAlerts: "চলতি মৌসুমের ঝুঁকি",
    threatAlertsVal: "৪ টি সাধারণ",
    organicSolutions: "জৈব প্রতিকার",
    organicSolutionsVal: "উপলব্ধ",
    expertSupport: "কৃষিবিদ সহায়তা",
    expertSupportVal: "২৪/৭ সক্রিয়",
    crop: "আক্রান্ত ফসল",
    category: "রোগের ধরন",
    severity: "ঝুঁকির মাত্রা",
    symptoms: "প্রধান লক্ষণসমূহ",
    treatment: "প্রস্তাবিত প্রতিকার",
    viewDetails: "বিস্তারিত গাইড দেখুন",
    noResults: "আপনার অনুসন্ধানের সাথে মেলে এমন কোনো রোগের তথ্য পাওয়া যায়নি।",
  }
};

// --- Mock Data ---
const initialDiseases: Disease[] = [
  {
    id: "1",
    name: "Late Blight of Potato",
    nameBn: "আলুর লেট ব্লাইট (মড়ক রোগ)",
    crop: "Potato",
    cropBn: "আলু",
    category: "Fungal",
    categoryBn: "ছত্রাকজনিত",
    symptoms: "Water-soaked dark spots on leaves, white fungal growth under humid conditions, rapid wilting.",
    symptomsBn: "পাতায় পানি ভেজা কালচে দাগ, স্যাঁতসেঁতে আবহাওয়ায় পাতার নিচে সাদা ছত্রাক এবং দ্রুত গাছ শুকিয়ে যাওয়া।",
    treatment: "Apply Mancozeb or Ridomil Gold fungicide preventively every 7-10 days.",
    treatmentBn: "ম্যাঙ্কোজেব বা রিডোমিল গোল্ড জাতীয় ছত্রাকনাশক প্রতি ৭-১০ দিন পর পর স্প্রে করুন।",
    severity: "High",
    severityBn: "উচ্চ ঝুঁকি",
  },
  {
    id: "2",
    name: "Bacterial Leaf Blight of Rice",
    nameBn: "ধানের ব্যাকটেরিয়াজনিত পাতা পোড়া রোগ",
    crop: "Rice / Paddy",
    cropBn: "ধান",
    category: "Bacterial",
    categoryBn: "ব্যাকটেরিয়াজনিত",
    symptoms: "Yellow-orange stripes starting from leaf tips, leaves dry up with a burnt appearance.",
    symptomsBn: "পাতার ডগা থেকে শুরু করে হলুদ-কমলা রঙের দাগ এবং পরবর্তীতে পাতা পুড়ে যাওয়ার মতো শুকিয়ে যাওয়া।",
    treatment: "Avoid excess Nitrogen. Apply Potash fertilizer and Spray Copper Oxychloride.",
    treatmentBn: "অতিরিক্ত ইউরিয়া ব্যবহার বন্ধ রাখুন। পটাশ সার প্রয়োগ করুন এবং কপার অক্সিক্লোরাইড স্প্রে করুন।",
  },
  {
    id: "3",
    name: "Tomato Leaf Curl Virus",
    nameBn: "টমেটোর পাতা কোঁকড়ানো রোগ",
    crop: "Tomato",
    cropBn: "টমেটো",
    category: "Viral",
    categoryBn: "ভাইরাসজনিত",
    symptoms: "Upward curling and yellowing of leaves, stunted plant growth, low fruit yield.",
    symptomsBn: "পাতা উপরের দিকে কুকড়ে যাওয়া ও হলুদ হওয়া, গাছের বৃদ্ধি থমকে যাওয়া এবং ফল কম ধরা।",
    treatment: "Control Whiteflies (vector) using Imidacloprid and remove infected plants.",
    treatmentBn: "সাদা মাছি (রোগ বাহক) দমনে ইমিডাক্লোপ্রিড ব্যবহার করুন এবং আক্রান্ত গাছ তুলে ধ্বংস করুন।",
    severity: "Medium",
    severityBn: "মাঝারি ঝুঁকি",
  },
  {
    id: "4",
    name: "Brown Planthopper (BPH)",
    nameBn: "ধানের কারেন্ট পোকা (বাদামী গাছফড়িং)",
    crop: "Rice / Paddy",
    cropBn: "ধান",
    category: "Pest",
    categoryBn: "পোকার আক্রমণ",
    symptoms: "Sucking sap from base, causing 'hopper burn' where circular patches of crop dry up quickly.",
    symptomsBn: "গাছের গোড়া থেকে রস চুষে খাওয়া, যার ফলে ক্ষেতে গোলাকার আকারে গাছ শুকিয়ে মরে যায় (হপার বার্ন)।",
    treatment: "Keep field dry for 3-4 days. Apply Pymetrozine or Dinotefuran at the base.",
    treatmentBn: "ক্ষেতের পানি ৩-৪ দিন বের করে রাখুন। গাছের গোড়ায় পাইমেট্রোজিন বা ডিনোটফিউরান স্প্রে করুন।",
    severity: "High",
    severityBn: "উচ্চ ঝুঁকি",
  },
];

export default function DiseaseLibraryPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter Logic
  const filteredDiseases = initialDiseases.filter((disease) => {
    const matchesSearch = 
      disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.nameBn.includes(searchQuery) ||
      disease.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.cropBn.includes(searchQuery);

    const matchesCategory = 
      selectedCategory === "all" || disease.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
      {/* Top Header */}
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="h-7 w-7 text-emerald-600" /> {t.title}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {t.subtitle}
        </p>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.totalDiseases}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{t.totalDiseasesVal}</p>
          </div>
          <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
            <Bug className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.threatAlerts}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{t.threatAlertsVal}</p>
          </div>
          <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
            <AlertCircle className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.organicSolutions}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{t.organicSolutionsVal}</p>
          </div>
          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.expertSupport}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{t.expertSupportVal}</p>
          </div>
          <div className="h-10 w-10 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">
            <Sprout className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Search and Category Filter Section */}
      <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition shadow-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 text-xs font-medium">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-2 rounded-lg transition whitespace-nowrap border ${
              selectedCategory === "all" 
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" 
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            {t.allCategories}
          </button>
          <button
            onClick={() => setSelectedCategory("Fungal")}
            className={`px-3.5 py-2 rounded-lg transition whitespace-nowrap border ${
              selectedCategory === "Fungal" 
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" 
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            {t.fungal}
          </button>
          <button
            onClick={() => setSelectedCategory("Bacterial")}
            className={`px-3.5 py-2 rounded-lg transition whitespace-nowrap border ${
              selectedCategory === "Bacterial" 
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" 
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            {t.bacterial}
          </button>
          <button
            onClick={() => setSelectedCategory("Viral")}
            className={`px-3.5 py-2 rounded-lg transition whitespace-nowrap border ${
              selectedCategory === "Viral" 
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" 
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            {t.viral}
          </button>
          <button
            onClick={() => setSelectedCategory("Pest")}
            className={`px-3.5 py-2 rounded-lg transition whitespace-nowrap border ${
              selectedCategory === "Pest" 
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" 
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            {t.pest}
          </button>
        </div>
      </div>

      {/* Disease Cards Grid */}
      <div className="mt-6">
        {filteredDiseases.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            <Info className="h-10 w-10 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-medium">{t.noResults}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredDiseases.map((disease) => (
              <div key={disease.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col justify-between hover:border-slate-300 transition">
                <div className="p-5">
                  {/* Header Row */}
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <div className="flex gap-2 items-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                          {t.crop}: {lang === "bn" ? disease.cropBn : disease.crop}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {lang === "bn" ? disease.categoryBn : disease.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg mt-2">
                        {lang === "bn" ? disease.nameBn : disease.name}
                      </h3>
                    </div>

                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 ${
                      disease.severity === "High" ? "bg-red-50 text-red-700 border border-red-200" :
                      "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {lang === "bn" ? disease.severityBn : disease.severity}
                    </span>
                  </div>

                  {/* Symptoms Section */}
                  <div className="mt-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-xs font-semibold text-slate-700 block mb-1 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> {t.symptoms}:
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === "bn" ? disease.symptomsBn : disease.symptoms}
                    </p>
                  </div>

                  {/* Treatment Section */}
                  <div className="mt-3 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                    <span className="text-xs font-semibold text-emerald-900 block mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {t.treatment}:
                    </span>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      {lang === "bn" ? disease.treatmentBn : disease.treatment}
                    </p>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium">ID: #{disease.id}</span>
                  <button className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-semibold transition">
                    {t.viewDetails} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}