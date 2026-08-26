"use client";

import React, { useState } from "react";
import { 
  Calendar as CalendarIcon,  
  Sun, 
  CloudRain, 
  Snowflake,
} from "lucide-react";

// --- Types Definition ---
interface CalendarEvent {
  id: string;
  cropName: string;
  category: "Cereal" | "Vegetable" | "Spice" | "Fruit";
  season: "Rabi" | "Kharif-1" | "Kharif-2";
  plantMonth: string; // e.g., "Jan"
  harvestMonth: string; // e.g., "Apr"
  status: "Planted" | "Upcoming" | "Harvesting";
  durationDays: number;
}

// --- Mock Data ---
const cropCalendarData: CalendarEvent[] = [
  {
    id: "1",
    cropName: "বোরো ধান (Boro Rice)",
    category: "Cereal",
    season: "Rabi",
    plantMonth: "Jan",
    harvestMonth: "Apr",
    status: "Planted",
    durationDays: 120,
  },
  {
    id: "2",
    cropName: "আলু (Potato)",
    category: "Vegetable",
    season: "Rabi",
    plantMonth: "Nov",
    harvestMonth: "Feb",
    status: "Harvesting",
    durationDays: 90,
  },
  {
    id: "3",
    cropName: "আউশ ধান (Aus Rice)",
    category: "Cereal",
    season: "Kharif-1",
    plantMonth: "Apr",
    harvestMonth: "Jul",
    status: "Upcoming",
    durationDays: 105,
  },
  {
    id: "4",
    cropName: "গ্রীষ্মকালীন টমেটো",
    category: "Vegetable",
    season: "Kharif-1",
    plantMonth: "May",
    harvestMonth: "Aug",
    status: "Upcoming",
    durationDays: 90,
  },
  {
    id: "5",
    cropName: "আমোন ধান (Aman Rice)",
    category: "Cereal",
    season: "Kharif-2",
    plantMonth: "Jul",
    harvestMonth: "Nov",
    status: "Upcoming",
    durationDays: 130,
  },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function CropCalendarPage() {
  const [selectedSeason, setSelectedSeason] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCrops = cropCalendarData.filter((crop) => {
    const matchesSeason = selectedSeason === "All" || crop.season === selectedSeason;
    const matchesSearch = crop.cropName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeason && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <CalendarIcon className="h-7 w-7 text-emerald-600" /> Crop Calendar (ফসল ক্যালেন্ডার)
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              ঋতুভিত্তিক বীজ রোপণ ও ফসল কাটার সঠিক সময়সূচি পর্যবেক্ষণ করুন।
            </p>
          </div>
          
          {/* Season Cards Quick Filter */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm text-xs font-semibold">
            <button
              onClick={() => setSelectedSeason("All")}
              className={`px-3 py-2 rounded-lg transition ${selectedSeason === "All" ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              সব ঋতু
            </button>
            <button
              onClick={() => setSelectedSeason("Rabi")}
              className={`px-3 py-2 rounded-lg flex items-center gap-1 transition ${selectedSeason === "Rabi" ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <Snowflake className="w-3.5 h-3.5 text-blue-400" /> রবি (শীতকাল)
            </button>
            <button
              onClick={() => setSelectedSeason("Kharif-1")}
              className={`px-3 py-2 rounded-lg flex items-center gap-1 transition ${selectedSeason === "Kharif-1" ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" /> খরিফ-১ (গ্রীষ্ম)
            </button>
            <button
              onClick={() => setSelectedSeason("Kharif-2")}
              className={`px-3 py-2 rounded-lg flex items-center gap-1 transition ${selectedSeason === "Kharif-2" ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <CloudRain className="w-3.5 h-3.5 text-cyan-500" /> খরিফ-২ (বর্ষা)
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="ফসল অনুসন্ধান করুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-72 px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> রোপণ সময়
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> কর্তন/কাটার সময়
            </span>
          </div>
        </div>

        {/* Interactive Timeline Calendar Grid */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
          <div className="min-w-[800px]">
            
            {/* Months Header Bar */}
            <div className="grid grid-cols-13 bg-slate-100 border-b border-slate-200 text-center font-bold text-xs text-slate-700 py-3">
              <div className="col-span-3 text-left px-4">ফসলের নাম ও ঋতু</div>
              {months.map((month) => (
                <div key={month} className="col-span-1 border-l border-slate-200">
                  {month}
                </div>
              ))}
            </div>

            {/* Calendar Rows */}
            <div className="divide-y divide-slate-100">
              {filteredCrops.map((crop) => {
                const startIdx = months.indexOf(crop.plantMonth);
                const endIdx = months.indexOf(crop.harvestMonth);

                return (
                  <div key={crop.id} className="grid grid-cols-13 items-center py-4 text-xs hover:bg-slate-50 transition">
                    {/* Crop Info Side Column */}
                    <div className="col-span-3 px-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900">{crop.cropName}</h4>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          crop.status === "Planted" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                          crop.status === "Harvesting" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                          "bg-slate-100 text-slate-600"
                        }`}>
                          {crop.status === "Planted" ? "রোপণকৃত" : crop.status === "Harvesting" ? "কর্তন চলছে" : "আসন্ন"}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        মেয়াদ: {crop.durationDays} দিন • ঋতু: {crop.season}
                      </p>
                    </div>

                    {/* Timeline Grid (12 Months) */}
                    <div className="col-span-10 grid grid-cols-12 relative h-8 items-center border-l border-slate-200">
                      {months.map((m, idx) => {
                        const isPlantMonth = idx === startIdx;
                        const isHarvestMonth = idx === endIdx;
                        const isInRange = startIdx <= endIdx 
                          ? idx >= startIdx && idx <= endIdx
                          : idx >= startIdx || idx <= endIdx; // Handles wrapping over year end

                        return (
                          <div key={m} className="h-full border-r border-slate-100 relative flex items-center justify-center">
                            {isInRange && (
                              <div className={`h-5 w-full ${
                                isPlantMonth ? "bg-emerald-500 rounded-l-md" :
                                isHarvestMonth ? "bg-amber-500 rounded-r-md" :
                                "bg-emerald-200"
                              } opacity-85 transition-all`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Season Information Advisory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2">
              <Snowflake className="w-4 h-4 text-blue-500" /> রবি মৌসুম (কার্তিক - ফাল্গুন)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              প্রধান ফসল: বোরো ধান, গম, আলু, সরিষা, ও বিভিন্ন শীতকালীন শাকসবজি। সেচ নির্ভর চাষাবাদের সময়।
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2">
              <Sun className="w-4 h-4 text-amber-500" /> খরিফ-১ মৌসুম (চৈত্র - জ্যৈষ্ঠ)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              প্রধান ফসল: আউশ ধান, পাট, তিল, ও গ্রীষ্মকালীন সবজি। তাপমাত্রা বেশি থাকে এবং হালকা বৃষ্টিপাত হয়।
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2">
              <CloudRain className="w-4 h-4 text-cyan-500" /> খরিফ-২ মৌসুম (আষাঢ় - আশ্বিন)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              প্রধান ফসল: আমন ধান ও বর্ষাকালীন সবজি। বৃষ্টিপাত নির্ভর চাষাবাদ এবং বন্যা মোকাবিলার সময়।
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}