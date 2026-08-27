"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { getAuthUserClient } from "../../../../lib/auth";
import {
  ArrowLeft,
  Sprout,
  Calendar,
  Droplets,
  Award,
  Layers,
  CheckCircle,
  PlayCircle,
  HelpCircle,
} from "lucide-react";

const translations = {
  en: {
    backToCrops: "Back to Crops",
    cropDetails: "Crop Details & Tracking",
    variety: "Variety",
    plantedDate: "Planted Date",
    fieldSize: "Field Size",
    acres: "acres",
    growthStage: "Current Growth Stage",
    progress: "Growth Progress",
    daysToHarvest: "Estimated Days to Harvest",
    daysLeft: "days",
    waterStatus: "Watering Status",
    optimal: "Optimal (Watered)",
    needsWater: "Needs Water",
    waterCrop: "Log Irrigation / Water Crop",
    advanceStage: "Advance Growth Stage",
    harvestCrop: "Harvest Crop",
    stageUpdated: "Growth stage updated!",
    cropWatered: "Crop watered successfully!",
    timeline: "Crop Growth Timeline",
    loading: "Loading crop details...",
    
    // Stages
    Seedling: "Seedling",
    Vegetative: "Vegetative",
    Flowering: "Flowering",
    Fruiting: "Fruiting / Tuber",
    Harvesting: "Harvesting",
    Harvested: "Harvested",

    SeedlingDesc: "Seeds germinated and early root structure forming.",
    VegetativeDesc: "Rapid leaf and stem growth. Requires high nitrogen.",
    FloweringDesc: "Flowers blooming. Pollination begins.",
    FruitingDesc: "Fruit or tuber development. Keep soil moist.",
    HarvestingDesc: "Crop mature and ready for harvesting.",
    HarvestedDesc: "Crop harvested successfully.",
  },
  bn: {
    backToCrops: "ফসলের তালিকায় ফিরে যান",
    cropDetails: "ফসলের বিবরণ ও ট্র্যাকিং",
    variety: "জাত",
    plantedDate: "রোপণের তারিখ",
    fieldSize: "জমির পরিমাণ",
    acres: "একর",
    growthStage: "বর্তমান বৃদ্ধির ধাপ",
    progress: "বৃদ্ধির অগ্রগতি",
    daysToHarvest: "কাটার আনুমানিক দিন",
    daysLeft: "দিন",
    waterStatus: "সেচ পরিস্থিতি",
    optimal: "পর্যাপ্ত (সেচ সম্পন্ন)",
    needsWater: "সেচ প্রয়োজন",
    waterCrop: "সেচ দিন / পানি দিন",
    advanceStage: "পরবর্তী ধাপে যান",
    harvestCrop: "ফসল কাটুন",
    stageUpdated: "বৃদ্ধির ধাপ পরিবর্তন করা হয়েছে!",
    cropWatered: "সফলভাবে সেচ দেওয়া হয়েছে!",
    timeline: "বৃদ্ধির ধাপের সময়রেখা",
    loading: "ফসলের বিবরণ লোড হচ্ছে...",

    // Stages
    Seedling: "চারা পর্যায়",
    Vegetative: "বাড়ন্ত পর্যায়",
    Flowering: "ফুল ফোটার পর্যায়",
    Fruiting: "ফল ধরা / আলু গঠন",
    Harvesting: "ফসল তোলার পর্যায়",
    Harvested: "ফসল কাটা সম্পন্ন",

    SeedlingDesc: "বীজ অঙ্কুরিত হয়েছে এবং প্রাথমিক মূল তৈরি হচ্ছে।",
    VegetativeDesc: "দ্রুত পাতা ও কাণ্ড বৃদ্ধি পাচ্ছে। নাইট্রোজেন প্রয়োজন।",
    FloweringDesc: "ফুল ফুটছে। পরাগায়ন শুরু হয়েছে।",
    FruitingDesc: "ফল বা কন্দ গঠন বৃদ্ধি। মাটি ভেজা রাখুন।",
    HarvestingDesc: "ফসল পরিপক্ব এবং তোলার জন্য তৈরি।",
    HarvestedDesc: "ফসল সফলভাবে সংগ্রহ করা হয়েছে।",
  }
};

export default function CropDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { lang } = useLanguage();
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const t = translations[lang];

  const [crop, setCrop] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getAuthUserClient();
    if (!user) {
      router.push(`/auth/login?redirect=/crops/${id}`);
      return;
    }

    try {
      const stored = localStorage.getItem("farmer_crops");
      if (stored) {
        const cropsList = JSON.parse(stored);
        const found = cropsList.find((c: any) => c.id === id);
        if (found) {
          setCrop(found);
          setLoading(false);
          return;
        }
      }
      
      // If not found, use default matching ID
      const defaultCrops = [
        {
          id: "1",
          name: "Rice",
          nameBn: "ধান",
          variety: "BRRI dhan29",
          stage: "Vegetative",
          stageBn: "বাড়ন্ত পর্যায়",
          plantedDate: "2026-06-15",
          progress: 65,
          daysToHarvest: 45,
          status: "Optimal",
          statusBn: "পর্যাপ্ত",
          fieldSize: 1.2,
        },
        {
          id: "2",
          name: "Potato",
          nameBn: "আলু",
          variety: "Diamant",
          stage: "Tuber Initiation",
          stageBn: "আলু গঠন পর্যায়",
          plantedDate: "2026-07-10",
          progress: 45,
          daysToHarvest: 55,
          status: "Needs Water",
          statusBn: "সেচ প্রয়োজন",
          fieldSize: 0.8,
        },
        {
          id: "3",
          name: "Tomato",
          nameBn: "টমেটো",
          variety: "Roma",
          stage: "Flowering",
          stageBn: "ফুল ফোটার পর্যায়",
          plantedDate: "2026-07-25",
          progress: 30,
          daysToHarvest: 60,
          status: "Optimal",
          statusBn: "পর্যাপ্ত",
          fieldSize: 0.5,
        }
      ];
      
      const foundDefault = defaultCrops.find((c: any) => c.id === id);
      if (foundDefault) {
        setCrop(foundDefault);
      } else {
        router.push("/crops");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  const updateLocalStorage = (updatedCrop: any) => {
    try {
      const stored = localStorage.getItem("farmer_crops");
      if (stored) {
        const cropsList = JSON.parse(stored);
        const index = cropsList.findIndex((c: any) => c.id === id);
        if (index !== -1) {
          cropsList[index] = updatedCrop;
          localStorage.setItem("farmer_crops", JSON.stringify(cropsList));
        } else {
          localStorage.setItem("farmer_crops", JSON.stringify([...cropsList, updatedCrop]));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleWater = () => {
    if (!crop) return;
    const updated = {
      ...crop,
      status: "Optimal",
      statusBn: lang === "bn" ? "পর্যাপ্ত" : "Optimal",
    };
    setCrop(updated);
    updateLocalStorage(updated);
    alert(t.cropWatered);
  };

  const handleAdvance = () => {
    if (!crop) return;
    
    let nextStage = "Vegetative";
    let progress = 45;
    let days = crop.daysToHarvest;

    if (crop.stage === "Seedling") {
      nextStage = "Vegetative";
      progress = 45;
    } else if (crop.stage === "Vegetative" || crop.stage === "Tuber Initiation") {
      nextStage = "Flowering";
      progress = 70;
    } else if (crop.stage === "Flowering") {
      nextStage = "Fruiting";
      progress = 85;
    } else if (crop.stage === "Fruiting") {
      nextStage = "Harvesting";
      progress = 95;
    } else if (crop.stage === "Harvesting") {
      nextStage = "Harvested";
      progress = 100;
      days = 0;
    } else {
      return;
    }

    const stageBnMap: Record<string, string> = {
      Seedling: lang === "bn" ? "চারা পর্যায়" : "Seedling",
      Vegetative: lang === "bn" ? "বাড়ন্ত পর্যায়" : "Vegetative",
      Flowering: lang === "bn" ? "ফুল ফোটার পর্যায়" : "Flowering",
      Fruiting: lang === "bn" ? "ফল ধরা / আলু গঠন" : "Fruiting / Tuber",
      Harvesting: lang === "bn" ? "ফসল তোলার পর্যায়" : "Harvesting",
      Harvested: lang === "bn" ? "ফসল কাটা সম্পন্ন" : "Harvested",
    };

    const updated = {
      ...crop,
      stage: nextStage,
      stageBn: stageBnMap[nextStage],
      progress,
      daysToHarvest: days,
    };

    setCrop(updated);
    updateLocalStorage(updated);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F3]">
        <div className="text-center">
          <Sprout className="mx-auto h-12 w-12 animate-pulse text-[#1F3D2B]" />
          <p className="mt-4 text-sm font-medium text-[#6B7A6E]">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (!crop) return null;

  const stagesList = [
    { key: "Seedling", label: t.Seedling, desc: lang === "bn" ? t.SeedlingDesc : t.SeedlingDesc },
    { key: "Vegetative", label: t.Vegetative, desc: lang === "bn" ? t.VegetativeDesc : t.VegetativeDesc },
    { key: "Flowering", label: t.Flowering, desc: lang === "bn" ? t.FloweringDesc : t.FloweringDesc },
    { key: "Fruiting", label: t.Fruiting, desc: lang === "bn" ? t.FruitingDesc : t.FruitingDesc },
    { key: "Harvesting", label: t.Harvesting, desc: lang === "bn" ? t.HarvestingDesc : t.HarvestingDesc },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Navigation Link */}
        <button
          onClick={() => router.push("/crops")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#1F3D2B] transition hover:text-[#2F5943]"
        >
          <ArrowLeft size={16} />
          {t.backToCrops}
        </button>

        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF0E8] text-[#1F3D2B]">
              <Sprout size={32} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#C6863A]">
                {t.variety}: {crop.variety}
              </p>
              <h1 className="text-2xl font-bold text-[#16241C]">
                {lang === "bn" ? crop.nameBn || crop.name : crop.name}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleWater}
              className="flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 shadow-md shadow-blue-800/10"
            >
              <Droplets size={16} />
              {t.waterCrop}
            </button>
            
            {crop.stage !== "Harvested" && (
              <button
                onClick={handleAdvance}
                className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] px-4 text-sm font-semibold text-white transition hover:bg-[#2F5943] shadow-md shadow-green-950/15"
              >
                <Award size={16} />
                {crop.stage === "Harvesting" ? t.harvestCrop : t.advanceStage}
              </button>
            )}
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="rounded-2xl border border-[#E4DFD1] bg-white p-5 shadow-sm">
            <p className="text-xs text-[#6B7A6E] font-medium">{t.growthStage}</p>
            <p className="mt-2 text-lg font-bold text-[#1F3D2B]">
              {lang === "bn" ? crop.stageBn || crop.stage : crop.stage}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E4DFD1] bg-white p-5 shadow-sm">
            <p className="text-xs text-[#6B7A6E] font-medium">{t.progress}</p>
            <p className="mt-2 text-lg font-bold text-[#1F3D2B]">{crop.progress}%</p>
          </div>

          <div className="rounded-2xl border border-[#E4DFD1] bg-white p-5 shadow-sm">
            <p className="text-xs text-[#6B7A6E] font-medium">{t.daysToHarvest}</p>
            <p className="mt-2 text-lg font-bold text-[#16241C]">
              {crop.daysToHarvest} {t.daysLeft}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E4DFD1] bg-white p-5 shadow-sm">
            <p className="text-xs text-[#6B7A6E] font-medium">{t.waterStatus}</p>
            <p className={`mt-2 text-lg font-bold ${crop.status === "Optimal" || crop.status === "পর্যাপ্ত" ? "text-green-700" : "text-amber-700"}`}>
              {lang === "bn" ? crop.statusBn || crop.status : crop.status}
            </p>
          </div>
        </div>

        {/* Detail specs */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#16241C] mb-6 flex items-center gap-2">
              <Layers size={18} className="text-[#1F3D2B]" />
              {t.timeline}
            </h2>

            {/* Vertical Growth Timeline */}
            <div className="relative border-l-2 border-[#E4DFD1] pl-6 ml-4 space-y-8">
              {stagesList.map((stg) => {
                const isCompleted = crop.progress > (stg.key === "Seedling" ? 15 : stg.key === "Vegetative" ? 45 : stg.key === "Flowering" ? 70 : stg.key === "Fruiting" ? 85 : 95) || crop.stage === stg.key || crop.stage === "Harvested";
                const isCurrent = crop.stage === stg.key;

                return (
                  <div key={stg.key} className="relative">
                    {/* Circle Indicator */}
                    <span className={`absolute -left-[35px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${
                      isCurrent
                        ? "bg-[#1F3D2B] border-[#1F3D2B] text-white scale-110 shadow-lg shadow-green-900/20"
                        : isCompleted
                        ? "bg-[#EAF0E8] border-[#1F3D2B] text-[#1F3D2B]"
                        : "bg-white border-[#E4DFD1] text-[#6B7A6E]"
                    }`}>
                      {isCurrent ? (
                        <PlayCircle size={14} />
                      ) : isCompleted ? (
                        <CheckCircle size={14} />
                      ) : (
                        <HelpCircle size={14} />
                      )}
                    </span>

                    <div>
                      <h3 className={`font-bold text-sm ${isCurrent ? "text-[#1F3D2B]" : isCompleted ? "text-[#16241C]" : "text-[#6B7A6E]"}`}>
                        {stg.label}
                      </h3>
                      <p className="text-xs text-[#6B7A6E] mt-1">{stg.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm h-fit">
            <h2 className="text-lg font-bold text-[#16241C] mb-4">Specs</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b border-[#FAF8F3]">
                <span className="text-[#6B7A6E]">{t.variety}</span>
                <span className="font-semibold text-[#16241C]">{crop.variety}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#FAF8F3]">
                <span className="text-[#6B7A6E]">{t.plantedDate}</span>
                <span className="font-semibold text-[#16241C]">{crop.plantedDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#FAF8F3]">
                <span className="text-[#6B7A6E]">{t.fieldSize}</span>
                <span className="font-semibold text-[#16241C]">{crop.fieldSize || 1.0} {t.acres}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#FAF8F3]">
                <span className="text-[#6B7A6E]">Water status</span>
                <span className={`font-semibold ${crop.status === "Optimal" || crop.status === "পর্যাপ্ত" ? "text-green-700" : "text-amber-700"}`}>
                  {lang === "bn" ? crop.statusBn || crop.status : crop.status}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
