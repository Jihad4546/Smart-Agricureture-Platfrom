"use client";

import React, { useState } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { 
  HeartPulse, 
  Search, 
  Plus, 
  Syringe, 
  Activity, 
  Calendar, 
  ShieldAlert, 
  Filter,
  CheckCircle2,
  Clock,
  ChevronRight,
  Info
} from "lucide-react";

// --- Types Definition ---
interface LivestockItem {
  id: string;
  tagId: string;
  category: "Cattle" | "Goat" | "Poultry" | "Sheep";
  categoryBn: string;
  breed: string;
  breedBn: string;
  age: string;
  ageBn: string;
  healthStatus: "Healthy" | "Treatment Required" | "Vaccinated";
  healthStatusBn: string;
  lastVaccine: string;
  lastVaccineBn: string;
  nextVaccine: string;
  nextVaccineBn: string;
  yieldInfo: string;
  yieldInfoBn: string;
}

// --- Translations Definition ---
const translations = {
  en: {
    title: "Livestock & Poultry Management",
    subtitle: "Track animal health, vaccination schedules, feed history, and yield records.",
    searchPlaceholder: "Search by Tag ID or Breed (e.g. L-102, Friesian)...",
    totalAnimals: "Total Livestock",
    totalAnimalsVal: "48 Animals",
    healthyCount: "Healthy Status",
    healthyCountVal: "42 Healthy",
    vaccinePending: "Upcoming Vaccination",
    vaccinePendingVal: "6 Scheduled",
    dailyYield: "Daily Milk / Egg Yield",
    dailyYieldVal: "85 Ltr / 120 Pcs",
    tabAll: "All Animals",
    tabCattle: "Cattle / Cows",
    tabGoat: "Goats & Sheep",
    tabPoultry: "Poultry",
    addAnimal: "Add New Animal",
    tagId: "Tag ID",
    category: "Category",
    breed: "Breed / Variety",
    age: "Age",
    status: "Health Status",
    lastVaccine: "Last Vaccine",
    nextVaccine: "Next Scheduled Vaccine",
    yield: "Current Yield",
    viewHistory: "Health Log",
    noResults: "No livestock records found matching your search.",
  },
  bn: {
    title: "গবাদিপশু ও হাঁস-মুরগি ব্যবস্থাপনা",
    subtitle: "পশু-পাখির স্বাস্থ্য পর্যবেক্ষণ, টিকাদানের সময়সূচি, খাদ্য তালিকা এবং উৎপাদন ট্র্যাকিং।",
    searchPlaceholder: "ট্যাগ আইডেন্টিটি বা জাত দিয়ে খুঁজুন (যেমন: L-১০২, ফ্রিজিয়ান)...",
    totalAnimals: "মোট পশু-পাখি",
    totalAnimalsVal: "৪৮ টি",
    healthyCount: "সুস্থ অবস্থা",
    healthyCountVal: "৪২ টি সুস্থ",
    vaccinePending: "আসন্ন টিকাদান",
    vaccinePendingVal: "৬ টি নির্ধারিত",
    dailyYield: "দৈনিক দুধ / ডিম উৎপাদন",
    dailyYieldVal: "৮৫ লিটার / ১২০ টি",
    tabAll: "সকল তালিকা",
    tabCattle: "গরু / বাছুর",
    tabGoat: "ছাগল ও ভেড়া",
    tabPoultry: "হাঁস-মুরগি",
    addAnimal: "নতুন সংযোজন",
    tagId: "ট্যাগ আইডি",
    category: "শ্রেণী",
    breed: "জাত / নছল",
    age: "বয়স",
    status: "স্বাস্থ্য অবস্থা",
    lastVaccine: "সর্বশেষ টিকা",
    nextVaccine: "পরবর্তী টিকার তারিখ",
    yield: "বর্তমান উৎপাদন",
    viewHistory: "স্বাস্থ্য লগ",
    noResults: "আপনার অনুসন্ধানের সাথে মেলে এমন কোনো তথ্য পাওয়া যায়নি।",
  }
};

// --- Mock Data ---
const initialLivestock: LivestockItem[] = [
  {
    id: "1",
    tagId: "L-101",
    category: "Cattle",
    categoryBn: "গরু",
    breed: "Holstein Friesian",
    breedBn: "হলস্টেইন ফ্রিজিয়ান",
    age: "2.5 Years",
    ageBn: "২.৫ বছর",
    healthStatus: "Healthy",
    healthStatusBn: "সম্পূর্ণ সুস্থ",
    lastVaccine: "FMD (10 Jan 2026)",
    lastVaccineBn: "এফএমডি/খুরারোগ (১০ জানুয়ারি ২০২৬)",
    nextVaccine: "Anthrax (15 Sep 2026)",
    nextVaccineBn: "অ্যানথ্রাক্স (১৫ সেপ্টেম্বর ২০২৬)",
    yieldInfo: "18 Liters / Day",
    yieldInfoBn: "১৮ লিটার / দিন",
  },
  {
    id: "2",
    tagId: "G-204",
    category: "Goat",
    categoryBn: "ছাগল",
    breed: "Black Bengal",
    breedBn: "ব্ল্যাক বেঙ্গল",
    age: "1.2 Years",
    ageBn: "১.২ বছর",
    healthStatus: "Vaccinated",
    healthStatusBn: "টিকা দেওয়া সম্পূর্ণ",
    lastVaccine: "PPR (05 Feb 2026)",
    lastVaccineBn: "পিপিআর (০৫ ফেব্রুয়ারি ২০২৬)",
    nextVaccine: "Goat Pox (10 Nov 2026)",
    nextVaccineBn: "গোট পক্স (১০ নভেম্বর ২০২৬)",
    yieldInfo: "1.5 Liters / Day",
    yieldInfoBn: "১.৫ লিটার / দিন",
  },
  {
    id: "3",
    tagId: "C-108",
    category: "Cattle",
    categoryBn: "গরু",
    breed: "Sahiwal",
    breedBn: "শাহিওয়াল",
    age: "3.0 Years",
    ageBn: "৩.০ বছর",
    healthStatus: "Treatment Required",
    healthStatusBn: "চিকিৎসা প্রয়োজন",
    lastVaccine: "Anthrax (12 Dec 2025)",
    lastVaccineBn: "অ্যানথ্রাক্স (১২ ডিসেম্বর ২০২৫)",
    nextVaccine: "FMD (Immediate)",
    nextVaccineBn: "এফএমডি (জরুরি)",
    yieldInfo: "12 Liters / Day",
    yieldInfoBn: "১২ লিটার / দিন",
  },
  {
    id: "4",
    tagId: "P-501",
    category: "Poultry",
    categoryBn: "হাঁস-মুরগি",
    breed: "Sonali Layer (Batch A)",
    breedBn: "সোনালী লেয়ার (ব্যাচ এ)",
    age: "22 Weeks",
    ageBn: "২২ সপ্তাহ",
    healthStatus: "Healthy",
    healthStatusBn: "সম্পূর্ণ সুস্থ",
    lastVaccine: "Ranikhet (01 May 2026)",
    lastVaccineBn: "রানীক্ষেত (০১ মে ২০২৬)",
    nextVaccine: "Gumboro Booster (20 Oct 2026)",
    nextVaccineBn: " গামবোরো বুস্টার (২০ অক্টোবর ২০২৬)",
    yieldInfo: "115 Eggs / Day",
    yieldInfoBn: "১১৫ টি ডিম / দিন",
  },
];

export default function LivestockPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter Logic
  const filteredLivestock = initialLivestock.filter((item) => {
    const matchesSearch = 
      item.tagId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.breedBn.includes(searchQuery);

    const matchesCategory = 
      selectedCategory === "all" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
      {/* Top Header & Actions */}
      <div className="pb-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <HeartPulse className="h-7 w-7 text-emerald-600" /> {t.title}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {t.subtitle}
          </p>
        </div>
<button className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] px-5 text-sm font-semibold text-white transition hover:bg-[#2F5943] shadow-md shadow-green-950/15">
          <Plus className="h-4 w-4" /> {t.addAnimal}
        </button>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.totalAnimals}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{t.totalAnimalsVal}</p>
          </div>
          <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
            <Activity className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.healthyCount}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{t.healthyCountVal}</p>
          </div>
          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.vaccinePending}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{t.vaccinePendingVal}</p>
          </div>
          <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
            <Syringe className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.dailyYield}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{t.dailyYieldVal}</p>
          </div>
          <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
            <Calendar className="h-5 w-5" />
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
            {t.tabAll}
          </button>
          <button
            onClick={() => setSelectedCategory("Cattle")}
            className={`px-3.5 py-2 rounded-lg transition whitespace-nowrap border ${
              selectedCategory === "Cattle" 
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" 
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            {t.tabCattle}
          </button>
          <button
            onClick={() => setSelectedCategory("Goat")}
            className={`px-3.5 py-2 rounded-lg transition whitespace-nowrap border ${
              selectedCategory === "Goat" 
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" 
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            {t.tabGoat}
          </button>
          <button
            onClick={() => setSelectedCategory("Poultry")}
            className={`px-3.5 py-2 rounded-lg transition whitespace-nowrap border ${
              selectedCategory === "Poultry" 
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" 
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            {t.tabPoultry}
          </button>
        </div>
      </div>

      {/* Livestock Grid */}
      <div className="mt-6">
        {filteredLivestock.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            <Info className="h-10 w-10 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-medium">{t.noResults}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredLivestock.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col justify-between hover:border-slate-300 transition">
                <div className="p-5">
                  {/* Top Header Info */}
                  <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                          {item.tagId}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                          {lang === "bn" ? item.categoryBn : item.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg mt-2">
                        {lang === "bn" ? item.breedBn : item.breed}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {t.age}: <strong>{lang === "bn" ? item.ageBn : item.age}</strong>
                      </p>
                    </div>

                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 flex items-center gap-1 ${
                      item.healthStatus === "Healthy" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                      item.healthStatus === "Vaccinated" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                      "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {item.healthStatus === "Treatment Required" && <ShieldAlert className="w-3.5 h-3.5" />}
                      {lang === "bn" ? item.healthStatusBn : item.healthStatus}
                    </span>
                  </div>

                  {/* Vaccination Status */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="text-slate-500 block mb-0.5 flex items-center gap-1">
                        <Syringe className="w-3.5 h-3.5 text-slate-400" /> {t.lastVaccine}:
                      </span>
                      <span className="font-semibold text-slate-800">
                        {lang === "bn" ? item.lastVaccineBn : item.lastVaccine}
                      </span>
                    </div>

                    <div className="bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
                      <span className="text-amber-700 block mb-0.5 flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-amber-600" /> {t.nextVaccine}:
                      </span>
                      <span className="font-semibold text-amber-900">
                        {lang === "bn" ? item.nextVaccineBn : item.nextVaccine}
                      </span>
                    </div>
                  </div>

                  {/* Yield Info */}
                  <div className="mt-3 bg-emerald-50/60 p-3 rounded-lg border border-emerald-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-900">{t.yield}:</span>
                    <span className="font-bold text-emerald-700 text-sm">
                      {lang === "bn" ? item.yieldInfoBn : item.yieldInfo}
                    </span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium">ID: #{item.id}</span>
                  <button className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-semibold transition">
                    {t.viewHistory} <ChevronRight className="w-4 h-4" />
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