"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getAuthUserClient } from "../../../lib/auth";
import { ArrowLeft, Calendar, Info, Wheat, Sun, CloudRain } from "lucide-react";

const translations = {
  en: {
    backToDashboard: "Back to Dashboard",
    cropCalendar: "Crop Calendar",
    seasonsTitle: "Agricultural Seasons in Bangladesh",
    activeMapping: "Your Crop Harvest Timeline",
    sowing: "Sowing / Planting",
    harvest: "Harvesting",
    bestCrops: "Recommended Crops",
    rabiName: "Rabi Season (Winter)",
    rabiMonths: "November - February",
    rabiDesc: "Cool, dry weather. Ideal for winter crops, tubers, and oilseeds.",
    rabiCrops: "Wheat, Potato, Mustard, Lentils, Onion, Winter Vegetables",
    kharif1Name: "Kharif-1 Season (Summer)",
    kharif1Months: "March - June",
    kharif1Desc: "Hot, humid weather with occasional thunderstorms (Nor'westers).",
    kharif1Crops: "Aus Rice, Jute, Maize, Mungbean, Summer Vegetables",
    kharif2Name: "Kharif-2 Season (Monsoon)",
    kharif2Months: "July - October",
    kharif2Desc: "Wet monsoon season with heavy rainfall. Susceptible to floods.",
    kharif2Crops: "Aman Rice, Eggplant, Okra, Gourd, Turmeric",
    noActiveCrops: "No active crops to map. Add crops in Crop Management to track them here!",
    harvestAlert: (name: string, month: string) => `Your ${name} crop is expected to harvest around ${month}.`,
    harvestAlertBn: (name: string, month: string) => `আপনার ${name} ফসলটি ${month} এর দিকে কাটার সময় হতে পারে।`,
  },
  bn: {
    backToDashboard: "ড্যাশবোর্ডে ফিরে যান",
    cropCalendar: "ফসল ক্যালেন্ডার",
    seasonsTitle: "বাংলাদেশের কৃষি মৌসুমসমূহ",
    activeMapping: "আপনার ফসলের ফসল কাটার সময়রেখা",
    sowing: "বপন / রোপণ",
    harvest: "ফসল সংগ্রহ",
    bestCrops: "উপযুক্ত ফসলসমূহ",
    rabiName: "রবি মৌসুম (শীতকাল)",
    rabiMonths: "নভেম্বর - ফেব্রুয়ারি",
    rabiDesc: "ঠান্ডা ও শুষ্ক আবহাওয়া। শীতকালীন ফসল, কন্দ এবং তৈলবীজের জন্য আদর্শ।",
    rabiCrops: "গম, আলু, সরিষা, মসুর ডাল, পেঁয়াজ, শীতকালীন শাকসবজি",
    kharif1Name: "খরিপ-১ মৌসুম (গ্রীষ্মকাল)",
    kharif1Months: "মার্চ - জুন",
    kharif1Desc: "গরম ও আর্দ্র আবহাওয়া এবং মাঝে মাঝে কালবৈশাখী ঝড় সহ বৃষ্টিপাত।",
    kharif1Crops: "আউশ ধান, পাট, ভুট্টা, মুগ ডাল, গ্রীষ্মকালীন শাকসবজি",
    kharif2Name: "খরিপ-২ মৌসুম (বর্ষাকাল)",
    kharif2Months: "জুলাই - অক্টোবর",
    kharif2Desc: "ভারী বর্ষণ সহ বর্ষা মৌসুম। বন্যা বা জলাবদ্ধতা হতে পারে।",
    kharif2Crops: "আমন ধান, বেগুন, ঢ্যাঁড়শ, লাউ, হলুদ",
    noActiveCrops: "কোনো সক্রিয় ফসল নেই। আপনার ফসল দেখতে শস্য ব্যবস্থাপনায় ফসল যোগ করুন!",
    harvestAlert: (name: string, month: string) => `Your ${name} crop is expected to harvest around ${month}.`,
    harvestAlertBn: (name: string, month: string) => `আপনার ${name} ফসলটি ${month} এর দিকে কাটার সময় হতে পারে।`,
  }
};

export default function CropCalendarPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = translations[lang];
  const [crops, setCrops] = useState<any[]>([]);

  useEffect(() => {
    const user = getAuthUserClient();
    if (!user) {
      router.push("/auth/login?redirect=/planner");
      return;
    }

    try {
      const stored = localStorage.getItem("farmer_crops");
      if (stored) {
        setCrops(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, [router]);

  // Map planting date + days to harvest to a month name
  const getHarvestMonth = (plantedDateStr: string, daysToHarvest: number) => {
    if (!plantedDateStr) return "";
    const date = new Date(plantedDateStr);
    date.setDate(date.getDate() + daysToHarvest);
    const options: Intl.DateTimeFormatOptions = { month: "long" };
    return date.toLocaleDateString(lang === "bn" ? "bn-BD" : "en-US", options);
  };

  const seasons = [
    {
      name: t.rabiName,
      months: t.rabiMonths,
      desc: t.rabiDesc,
      crops: t.rabiCrops,
      icon: Wheat,
      color: "bg-[#EAF0E8] text-[#1F3D2B]",
      border: "border-[#1F3D2B]/30",
    },
    {
      name: t.kharif1Name,
      months: t.kharif1Months,
      desc: t.kharif1Desc,
      crops: t.kharif1Crops,
      icon: Sun,
      color: "bg-amber-50 text-amber-700",
      border: "border-amber-200",
    },
    {
      name: t.kharif2Name,
      months: t.kharif2Months,
      desc: t.kharif2Desc,
      crops: t.kharif2Crops,
      icon: CloudRain,
      color: "bg-blue-50 text-blue-700",
      border: "border-blue-200",
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Navigation Link */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#1F3D2B] transition hover:text-[#2F5943]"
        >
          <ArrowLeft size={16} />
          {t.backToDashboard}
        </button>

        {/* Page Title */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF0E8] text-[#1F3D2B]">
            <Calendar size={24} />
          </div>
          <h1 className="text-3xl font-bold text-[#16241C]">{t.cropCalendar}</h1>
        </div>

        {/* Dynamic User Crops Mapping */}
        <div className="mb-8 rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#16241C] mb-4 flex items-center gap-2">
            <Info size={18} className="text-[#1F3D2B]" />
            {t.activeMapping}
          </h2>

          {crops.length === 0 ? (
            <p className="text-sm text-[#6B7A6E] italic">{t.noActiveCrops}</p>
          ) : (
            <div className="space-y-3">
              {crops.map((crop) => {
                const month = getHarvestMonth(crop.plantedDate, crop.daysToHarvest);
                const name = lang === "bn" ? crop.nameBn || crop.name : crop.name;
                return (
                  <div key={crop.id} className="flex items-center gap-3 rounded-xl bg-[#FAF8F3] p-4 text-sm border border-[#E4DFD1]/50">
                    <Wheat size={18} className="text-[#1F3D2B]" />
                    <p className="font-medium text-[#16241C]">
                      {lang === "bn" ? t.harvestAlertBn(name, month) : t.harvestAlert(name, month)}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Agricultural Seasons Details */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-[#16241C]">{t.seasonsTitle}</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {seasons.map((season, idx) => {
              const Icon = season.icon;
              return (
                <div key={idx} className={`rounded-3xl border ${season.border} bg-white p-6 shadow-sm flex flex-col justify-between`}>
                  <div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${season.color} mb-4`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-[#16241C]">{season.name}</h3>
                    <p className="text-xs text-[#C6863A] font-semibold mt-1">{season.months}</p>
                    <p className="text-xs text-[#6B7A6E] mt-3 leading-relaxed">{season.desc}</p>
                  </div>

                  <div className="mt-6 border-t border-[#FAF8F3] pt-4">
                    <p className="text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-2">
                      {t.bestCrops}
                    </p>
                    <p className="text-xs text-[#6B7A6E] leading-relaxed">
                      {season.crops}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
