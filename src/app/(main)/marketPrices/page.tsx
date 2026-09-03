"use client";

import React, { useState } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Store, 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus, 
  MapPin, 
  Calendar, 
  Info,
  RefreshCw
} from "lucide-react";

// --- Types Definition ---
interface MarketItem {
  id: string;
  cropName: string;
  cropNameBn: string;
  category: "Cereal" | "Vegetable" | "Spice" | "Fruit";
  categoryBn: string;
  location: string;
  locationBn: string;
  wholesalePrice: string;
  wholesalePriceBn: string;
  retailPrice: string;
  retailPriceBn: string;
  unit: string;
  unitBn: string;
  trend: "up" | "down" | "stable";
  changePercentage: string;
  changePercentageBn: string;
  lastUpdated: string;
  lastUpdatedBn: string;
}

// --- Translations Definition ---
const translations = {
  en: {
    title: "Market Prices & Trends",
    subtitle: "Real-time wholesale and retail prices across major agricultural markets in Bangladesh.",
    searchPlaceholder: "Search crop or market location (e.g. Potato, Karwan Bazar)...",
    allDivisions: "All Divisions",
    dhaka: "Dhaka",
    chattogram: "Chattogram",
    rajshahi: "Rajshahi",
    rangpur: "Rangpur",
    highestRise: "Highest Price Rise",
    highestRiseVal: "Green Chili (+15%)",
    marketStability: "Market Trend",
    marketStabilityVal: "Mostly Stable",
    updatedToday: "Data Freshness",
    updatedTodayVal: "Live Updates",
    trackedItems: "Monitored Crops",
    trackedItemsVal: "65+ Commodities",
    crop: "Crop Name",
    location: "Market Location",
    wholesale: "Wholesale Price",
    retail: "Retail Price",
    trend: "Trend (24h)",
    lastUpdated: "Updated",
    noResults: "No market prices found matching your search.",
  },
  bn: {
    title: "কৃষি পণ্যের বাজার দর",
    subtitle: "দেশের প্রধান বাজারগুলোর দৈনিক পাইকারি ও খুচরা মূল্যের নির্ভরযোগ্য তথ্য ও পরিবর্তনের তালিকা।",
    searchPlaceholder: "ফসল বা বাজারের নাম দিয়ে খুঁজুন (যেমন: আলু, কারওয়ান বাজার)...",
    allDivisions: "সব বিভাগ",
    dhaka: "ঢাকা",
    chattogram: "চট্টগ্রাম",
    rajshahi: "রাজশাহী",
    rangpur: "রংপুর",
    highestRise: "সর্বোচ্চ দাম বৃদ্ধি",
    highestRiseVal: "কাঁচা মরিচ (+১৫%)",
    marketStability: "বাজারের গতিপ্রকৃতি",
    marketStabilityVal: "বেশিরভাগ স্থিতিশীল",
    updatedToday: "তথ্য আপডেট",
    updatedTodayVal: "লাইভ আপডেট",
    trackedItems: "পর্যবেক্ষণকৃত ফসল",
    trackedItemsVal: "৬৫+ টি পণ্য",
    crop: "পণ্যের নাম",
    location: "বাজারের স্থান",
    wholesale: "পাইকারি দাম",
    retail: "খুচরা দাম",
    trend: "পরিবর্তন (২৪ ঘণ্টা)",
    lastUpdated: "আপডেট সময়",
    noResults: "আপনার অনুসন্ধানের সাথে মেলে এমন কোনো বাজার দর পাওয়া যায়নি।",
  }
};

// --- Mock Data ---
const initialMarketPrices: MarketItem[] = [
  {
    id: "1",
    cropName: "BR-28 Rice",
    cropNameBn: "বিআর-২৮ ধান/চাল",
    category: "Cereal",
    categoryBn: "দানাদার ফসল",
    location: "Karwan Bazar, Dhaka",
    locationBn: "কারওয়ান বাজার, ঢাকা",
    wholesalePrice: "৳ ৫২ - ৳ ৫৪",
    wholesalePriceBn: "৳ ৫২ - ৳ ৫৪",
    retailPrice: "৳ ৫৮ - ৳ ৬০",
    retailPriceBn: "৳ ৫৮ - ৳ ৬০",
    unit: "KG",
    unitBn: "কেজি",
    trend: "stable",
    changePercentage: "0%",
    changePercentageBn: "০%",
    lastUpdated: "Today, 08:30 AM",
    lastUpdatedBn: "আজ, সকাল ০৮:৩০",
  },
  {
    id: "2",
    cropName: "Green Chili",
    cropNameBn: "কাঁচা মরিচ",
    category: "Spice",
    categoryBn: "মসলা",
    location: "Khatunganj, Chattogram",
    locationBn: "খাতুনগঞ্জ, চট্টগ্রাম",
    wholesalePrice: "৳ ১২০ - ৳ ১৩০",
    wholesalePriceBn: "৳ ১২০ - ৳ ১৩০",
    retailPrice: "৳ ১৫০ - ৳ ১৬০",
    retailPriceBn: "৳ ১৫০ - ৳ ১৬০",
    unit: "KG",
    unitBn: "কেজি",
    trend: "up",
    changePercentage: "+15%",
    changePercentageBn: "+১৫%",
    lastUpdated: "Today, 09:00 AM",
    lastUpdatedBn: "আজ, সকাল ০৯:০০",
  },
  {
    id: "3",
    cropName: "Diamond Potato",
    cropNameBn: "ডায়মন্ড আলু",
    category: "Vegetable",
    categoryBn: "সবজি",
    location: "Nawabganj, Rajshahi",
    locationBn: "নবাবগঞ্জ, রাজশাহী",
    wholesalePrice: "৳ ২২ - ৳ ২৫",
    wholesalePriceBn: "৳ ২২ - ৳ ২৫",
    retailPrice: "৳ ২৮ - ৳ ৩০",
    retailPriceBn: "৳ ২৮ - ৳ ৩০",
    unit: "KG",
    unitBn: "কেজি",
    trend: "down",
    changePercentage: "-5%",
    changePercentageBn: "-৫%",
    lastUpdated: "Today, 07:45 AM",
    lastUpdatedBn: "আজ, সকাল ০৭:৪৫",
  },
  {
    id: "4",
    cropName: "Red Onion (Local)",
    cropNameBn: "দেশি পেঁয়াজ",
    category: "Spice",
    categoryBn: "মসলা",
    location: "Pabna Sadar, Pabna",
    locationBn: "পাবনা সদর, পাবনা",
    wholesalePrice: "৳ ৬৫ - ৳ ৬৮",
    wholesalePriceBn: "৳ ৬৫ - ৳ ৬৮",
    retailPrice: "৳ ৭৫ - ৳ ৮০",
    retailPriceBn: "৳ ৭৫ - ৳ ৮০",
    unit: "KG",
    unitBn: "কেজি",
    trend: "up",
    changePercentage: "+3%",
    changePercentageBn: "+৩%",
    lastUpdated: "Today, 08:15 AM",
    lastUpdatedBn: "আজ, সকাল ০৮:১৫",
  },
];

export default function MarketPricesPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  // Filter Logic
  const filteredPrices = initialMarketPrices.filter((item) => {
    const matchesSearch = 
      item.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cropNameBn.includes(searchQuery) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.locationBn.includes(searchQuery);

    const matchesLocation = 
      selectedLocation === "all" || item.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
      {/* Top Header */}
      <div className="pb-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Store className="h-7 w-7 text-emerald-600" /> {t.title}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {t.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded-lg shadow-sm self-start md:self-auto">
          <RefreshCw className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
          <span>{lang === "bn" ? "লাইভ তথ্য আপডেট করা হয়েছে" : "Live prices updated"}</span>
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.highestRise}</p>
            <p className="text-xl font-bold text-red-600 mt-1">{t.highestRiseVal}</p>
          </div>
          <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.marketStability}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{t.marketStabilityVal}</p>
          </div>
          <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.updatedToday}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{t.updatedTodayVal}</p>
          </div>
          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            <Calendar className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.trackedItems}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{t.trackedItemsVal}</p>
          </div>
          <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
            <Store className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Search and Location Filter Section */}
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

        {/* Region Pills */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 text-xs font-medium">
          <button
            onClick={() => setSelectedLocation("all")}
            className={`px-3.5 py-2 rounded-lg transition whitespace-nowrap border ${
              selectedLocation === "all" 
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" 
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            {t.allDivisions}
          </button>
          <button
            onClick={() => setSelectedLocation("Dhaka")}
            className={`px-3.5 py-2 rounded-lg transition whitespace-nowrap border ${
              selectedLocation === "Dhaka" 
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" 
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            {t.dhaka}
          </button>
          <button
            onClick={() => setSelectedLocation("Chattogram")}
            className={`px-3.5 py-2 rounded-lg transition whitespace-nowrap border ${
              selectedLocation === "Chattogram" 
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" 
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            {t.chattogram}
          </button>
          <button
            onClick={() => setSelectedLocation("Rajshahi")}
            className={`px-3.5 py-2 rounded-lg transition whitespace-nowrap border ${
              selectedLocation === "Rajshahi" 
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" 
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            {t.rajshahi}
          </button>
        </div>
      </div>

      {/* Market Prices Table View */}
      <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredPrices.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Info className="h-10 w-10 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-medium">{t.noResults}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
                  <th className="py-3.5 px-5">{t.crop}</th>
                  <th className="py-3.5 px-5">{t.location}</th>
                  <th className="py-3.5 px-5">{t.wholesale}</th>
                  <th className="py-3.5 px-5">{t.retail}</th>
                  <th className="py-3.5 px-5">{t.trend}</th>
                  <th className="py-3.5 px-5 text-right">{t.lastUpdated}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPrices.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    {/* Crop Name & Category */}
                    <td className="py-4 px-5">
                      <div className="font-bold text-slate-900">
                        {lang === "bn" ? item.cropNameBn : item.cropName}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded mt-1 inline-block">
                        {lang === "bn" ? item.categoryBn : item.category}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {lang === "bn" ? item.locationBn : item.location}
                      </div>
                    </td>

                    {/* Wholesale Price */}
                    <td className="py-4 px-5">
                      <span className="font-semibold text-slate-800">
                        {lang === "bn" ? item.wholesalePriceBn : item.wholesalePrice}
                      </span>
                      <span className="text-xs text-slate-400 font-normal"> / {lang === "bn" ? item.unitBn : item.unit}</span>
                    </td>

                    {/* Retail Price */}
                    <td className="py-4 px-5">
                      <span className="font-bold text-emerald-700">
                        {lang === "bn" ? item.retailPriceBn : item.retailPrice}
                      </span>
                      <span className="text-xs text-slate-400 font-normal"> / {lang === "bn" ? item.unitBn : item.unit}</span>
                    </td>

                    {/* Trend */}
                    <td className="py-4 px-5">
                      {item.trend === "up" && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-1 rounded-full">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          {lang === "bn" ? item.changePercentageBn : item.changePercentage}
                        </span>
                      )}
                      {item.trend === "down" && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full">
                          <ArrowDownRight className="w-3.5 h-3.5" />
                          {lang === "bn" ? item.changePercentageBn : item.changePercentage}
                        </span>
                      )}
                      {item.trend === "stable" && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                          <Minus className="w-3.5 h-3.5" />
                          {lang === "bn" ? item.changePercentageBn : item.changePercentage}
                        </span>
                      )}
                    </td>

                    {/* Last Updated */}
                    <td className="py-4 px-5 text-right text-xs text-slate-500">
                      {lang === "bn" ? item.lastUpdatedBn : item.lastUpdated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}