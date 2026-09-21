"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, Lightbulb, Search, Sprout, Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Crop Type Definition
interface Crop {
  id: string;
  name: { bn: string; en: string };
  category: { bn: string; en: string };
  sowing_months: { bn: string; en: string };
  harvesting_months: { bn: string; en: string };
  duration_days: string;
  tips: { bn: string; en: string };
  icon: string;
}

export default function CalendarPage() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter & Search States
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const { lang } = useLanguage();

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/crop-calendar`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch crop data");
        }
        
        const result = await response.json();
        if (result.success) {
          setCrops(result.data);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  // Unique Categories extraction
  const categories = [
    "All",
    ...Array.from(new Set(crops.map((c) => c.category[lang as "bn" | "en"]))),
  ];

  // Filtered Crops Logic
  const filteredCrops = crops.filter((crop) => {
    const currentLang = lang as "bn" | "en";
    const nameMatch = crop.name[currentLang]
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch =
      selectedCategory === "All" || crop.category[currentLang] === selectedCategory;

    return nameMatch && categoryMatch;
  });

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#2F5943] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-red-500">
        <p className="text-lg font-semibold">
          {lang === "bn" ? "ডেটা লোড করতে সমস্যা হয়েছে!" : "Failed to load data!"}
        </p>
        <p className="text-sm text-slate-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1F3D2B] flex items-center justify-center sm:justify-start gap-2">
          <Calendar className="text-[#2F5943]" />
          {lang === "bn" ? "ফসল পঞ্জিকা ও রোপণ সূচি" : "Crop Calendar & Planting Schedule"}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          {lang === "bn"
            ? "সঠিক সময়ে ফসল বপন ও কাটার সঠিক নির্দেশনা দেখুন।"
            : "Find the right time for sowing and harvesting your crops."}
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder={lang === "bn" ? "ফসল দিয়ে খুঁজুন..." : "Search crops..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-[#2F5943] text-slate-800"
          />
        </div>

        {/* Category Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <Filter size={16} className="text-slate-400 shrink-0 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-[#2F5943] text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat === "All" ? (lang === "bn" ? "সবগুলো" : "All") : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      {filteredCrops.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <p className="text-base font-medium">
            {lang === "bn" ? "কোনো ফসল পাওয়া যায়নি!" : "No crops found!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <div
              key={crop.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Icon, Name & Category */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-slate-100 rounded-xl">
                      {crop.icon}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">
                        {crop.name[lang as "bn" | "en"]}
                      </h3>
                      <span className="inline-block text-xs font-semibold text-[#2F5943] bg-[#2F5943]/10 px-2.5 py-0.5 rounded-full mt-1">
                        {crop.category[lang as "bn" | "en"]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timing Details */}
                <div className="space-y-3 border-t border-b border-slate-100 py-3 my-3 text-sm">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Sprout size={15} className="text-emerald-600" />
                      {lang === "bn" ? "বপনের সময়:" : "Sowing Time:"}
                    </span>
                    <span className="font-semibold text-slate-700 text-right">
                      {crop.sowing_months[lang as "bn" | "en"]}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar size={15} className="text-amber-600" />
                      {lang === "bn" ? "কাটার সময়:" : "Harvesting Time:"}
                    </span>
                    <span className="font-semibold text-slate-700 text-right">
                      {crop.harvesting_months[lang as "bn" | "en"]}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock size={15} className="text-blue-600" />
                      {lang === "bn" ? "সময়কাল:" : "Duration:"}
                    </span>
                    <span className="font-semibold text-slate-700">
                      {crop.duration_days} {lang === "bn" ? "দিন" : "Days"}
                    </span>
                  </div>
                </div>

                {/* Advice / Tips */}
                <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-3 mt-2">
                  <div className="flex items-center gap-1.5 text-amber-800 font-semibold text-xs mb-1">
                    <Lightbulb size={14} />
                    <span>{lang === "bn" ? "পরামর্শ:" : "Tips:"}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {crop.tips[lang as "bn" | "en"]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}