"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getAuthUserClient } from "../../../lib/auth";
import { Sprout, Plus, Calendar, ArrowLeft, Droplets, Trash2 } from "lucide-react";

const translations = {
  en: {
    backToDashboard: "Back to Dashboard",
    myCrops: "My Crops",
    addNewCrop: "Add New Crop",
    variety: "Variety",
    plantedOn: "Planted on",
    growthStage: "Growth Stage",
    daysToHarvest: "Days to harvest",
    daysLeft: "days",
    status: "Status",
    delete: "Remove",
    confirmDelete: "Are you sure you want to remove this crop?",
    noCrops: "No crops found. Add your first crop to start tracking!",
    loading: "Loading crops...",
  },
  bn: {
    backToDashboard: "ড্যাশবোর্ডে ফিরে যান",
    myCrops: "আমার ফসলসমূহ",
    addNewCrop: "নতুন ফসল যোগ করুন",
    variety: "জাত",
    plantedOn: "রোপণের তারিখ",
    growthStage: "বৃদ্ধির ধাপ",
    daysToHarvest: "কাটার বাকি দিন",
    daysLeft: "দিন",
    status: "অবস্থা",
    delete: "মুছে ফেলুন",
    confirmDelete: "আপনি কি নিশ্চিত যে আপনি এই ফসলটি মুছে ফেলতে চান?",
    noCrops: "কোনো ফসল পাওয়া যায়নি। ট্র্যাকিং শুরু করতে আপনার প্রথম ফসলটি যোগ করুন!",
    loading: "ফসলের তথ্য লোড হচ্ছে...",
  }
};

export default function CropsListPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const [crops, setCrops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const t = translations[lang];

  useEffect(() => {
    // Authenticate
    const user = getAuthUserClient();
    if (!user) {
      router.push("/auth/login?redirect=/crops");
      return;
    }

    try {
      const stored = localStorage.getItem("farmer_crops");
      if (stored) {
        setCrops(JSON.parse(stored));
      } else {
        // Fallback to default crops
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
          }
        ];
        localStorage.setItem("farmer_crops", JSON.stringify(defaultCrops));
        setCrops(defaultCrops);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(t.confirmDelete)) return;
    const updated = crops.filter(c => c.id !== id);
    setCrops(updated);
    localStorage.setItem("farmer_crops", JSON.stringify(updated));
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

        {/* Page Title & Add Button */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#16241C]">{t.myCrops}</h1>
          </div>
          <button
            onClick={() => router.push("/crops/add")}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] px-5 text-sm font-semibold text-white transition hover:bg-[#2F5943] shadow-md shadow-green-950/15"
          >
            <Plus size={18} />
            {t.addNewCrop}
          </button>
        </div>

        {/* Crops Grid */}
        {crops.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#E4DFD1] bg-white p-12 text-center">
            <Sprout className="mx-auto h-16 w-16 text-[#6B7A6E]/50 mb-4" />
            <p className="text-[#6B7A6E] font-medium">{t.noCrops}</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {crops.map((crop) => (
              <div
                key={crop.id}
                onClick={() => router.push(`/crops/${crop.id}`)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm transition hover:border-[#1F3D2B] hover:shadow-md"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF0E8] text-[#1F3D2B] group-hover:scale-105 transition">
                      <Sprout size={22} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[#16241C] group-hover:text-[#1F3D2B]">
                        {lang === "bn" ? crop.nameBn || crop.name : crop.name}
                      </h2>
                      <p className="text-xs text-[#6B7A6E]">
                        {t.variety}: {crop.variety}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleDelete(crop.id, e)}
                    className="h-8 w-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition"
                    title={t.delete}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-[#6B7A6E] mb-1.5">
                    <span>
                      {t.growthStage}: <strong className="text-[#16241C]">{lang === "bn" ? crop.stageBn || crop.stage : crop.stage}</strong>
                    </span>
                    <span className="font-bold text-[#1F3D2B]">{crop.progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#E4DFD1]">
                    <div
                      className="h-full rounded-full bg-[#1F3D2B] transition-all duration-500"
                      style={{ width: `${crop.progress}%` }}
                    />
                  </div>
                </div>

                {/* Crop details footer */}
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#FAF8F3] pt-4 text-xs text-[#6B7A6E]">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={15} className="text-[#C6863A]" />
                    <div>
                      <p className="opacity-80 text-[10px] uppercase font-semibold">{t.plantedOn}</p>
                      <p className="font-bold text-[#16241C]">{crop.plantedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Droplets size={15} className="text-blue-500" />
                    <div>
                      <p className="opacity-80 text-[10px] uppercase font-semibold">{t.status}</p>
                      <p className={`font-bold ${crop.status === "Optimal" || crop.status === "পর্যাপ্ত" ? "text-green-700" : "text-amber-700"}`}>
                        {lang === "bn" ? crop.statusBn || crop.status : crop.status}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-[#6B7A6E] border-t border-[#FAF8F3] pt-3">
                  <span>{t.daysToHarvest}: <strong className="text-[#16241C]">{crop.daysToHarvest} {t.daysLeft}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
