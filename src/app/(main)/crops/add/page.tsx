"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { getAuthUserClient } from "../../../../lib/auth";
import { ArrowLeft, Sprout, Save } from "lucide-react";

const translations = {
  en: {
    backToCrops: "Back to Crops",
    addNewCrop: "Add New Crop",
    cropNameEn: "Crop Name (English)",
    cropNameBn: "Crop Name (Bangla)",
    variety: "Crop Variety / Seed Name",
    fieldSize: "Field Size (Acres)",
    plantedDate: "Planting Date",
    daysToHarvest: "Estimated Days to Harvest",
    initialStage: "Current Growth Stage",
    save: "Register Crop",
    successMsg: "Crop registered successfully!",
    fillAll: "Please fill in all required fields.",
    
    // Stages
    seedling: "Seedling",
    vegetative: "Vegetative",
    flowering: "Flowering",
    fruiting: "Fruiting / Tuber",
    harvesting: "Harvesting",
  },
  bn: {
    backToCrops: "ফসলের তালিকায় ফিরে যান",
    addNewCrop: "নতুন ফসল যোগ করুন",
    cropNameEn: "ফসলের নাম (ইংরেজি)",
    cropNameBn: "ফসলের নাম (বাংলা)",
    variety: "ফসলের জাত / বীজের নাম",
    fieldSize: "জমির পরিমাণ (একর)",
    plantedDate: "রোপণের তারিখ",
    daysToHarvest: "কাটার আনুমানিক দিন",
    initialStage: "বর্তমান বৃদ্ধির ধাপ",
    save: "ফসল যুক্ত করুন",
    successMsg: "ফসলটি সফলভাবে যুক্ত করা হয়েছে!",
    fillAll: "দয়া করে সব প্রয়োজনীয় তথ্য পূরণ করুন।",

    // Stages
    seedling: "চারা পর্যায়",
    vegetative: "বাড়ন্ত পর্যায়",
    flowering: "ফুল ফোটার পর্যায়",
    fruiting: "ফল ধরা / আলু গঠন পর্যায়",
    harvesting: "ফসল তোলার পর্যায়",
  }
};

export default function AddCropPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = translations[lang];

  const [name, setName] = useState("");
  const [nameBn, setNameBn] = useState("");
  const [variety, setVariety] = useState("");
  const [fieldSize, setFieldSize] = useState("");
  const [plantedDate, setPlantedDate] = useState("");
  const [daysToHarvest, setDaysToHarvest] = useState("");
  const [stage, setStage] = useState("Vegetative");
  const [error, setError] = useState("");

  useEffect(() => {
    const user = getAuthUserClient();
    if (!user) {
      router.push("/auth/login?redirect=/crops/add");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !nameBn || !variety || !plantedDate || !daysToHarvest) {
      setError(t.fillAll);
      return;
    }

    try {
      const stored = localStorage.getItem("farmer_crops");
      const currentCrops = stored ? JSON.parse(stored) : [];

      const stageBnMap: Record<string, string> = {
        Seedling: lang === "bn" ? "চারা পর্যায়" : "Seedling",
        Vegetative: lang === "bn" ? "বাড়ন্ত পর্যায়" : "Vegetative",
        Flowering: lang === "bn" ? "ফুল ফোটার পর্যায়" : "Flowering",
        Fruiting: lang === "bn" ? "ফল ধরা / আলু গঠন পর্যায়" : "Fruiting / Tuber",
        Harvesting: lang === "bn" ? "ফসল তোলার পর্যায়" : "Harvesting",
      };

      const newCrop = {
        id: Date.now().toString(),
        name,
        nameBn,
        variety,
        fieldSize: Number(fieldSize),
        plantedDate,
        daysToHarvest: Number(daysToHarvest),
        stage,
        stageBn: stageBnMap[stage] || stage,
        progress: stage === "Seedling" ? 15 : stage === "Vegetative" ? 45 : stage === "Flowering" ? 70 : stage === "Fruiting" ? 85 : 95,
        status: "Optimal",
        statusBn: lang === "bn" ? "পর্যাপ্ত" : "Optimal",
      };

      localStorage.setItem("farmer_crops", JSON.stringify([...currentCrops, newCrop]));
      router.push("/crops");
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-xl">
        {/* Navigation Link */}
        <button
          onClick={() => router.push("/crops")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#1F3D2B] transition hover:text-[#2F5943]"
        >
          <ArrowLeft size={16} />
          {t.backToCrops}
        </button>

        {/* Form Container */}
        <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF0E8] text-[#1F3D2B]">
              <Sprout size={20} />
            </div>
            <h1 className="text-xl font-bold text-[#16241C]">{t.addNewCrop}</h1>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-2">
                {t.cropNameEn} *
              </label>
              <input
                type="text"
                placeholder="e.g. Rice, Tomato, Potato"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] px-4 text-sm text-[#16241C] outline-none focus:border-[#1F3D2B] focus:bg-white transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-2">
                {t.cropNameBn} *
              </label>
              <input
                type="text"
                placeholder="যেমন: ধান, আলু, টমেটো"
                value={nameBn}
                onChange={(e) => setNameBn(e.target.value)}
                className="w-full h-11 rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] px-4 text-sm text-[#16241C] outline-none focus:border-[#1F3D2B] focus:bg-white transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-2">
                {t.variety} *
              </label>
              <input
                type="text"
                placeholder="e.g. BRRI dhan29, Diamant"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                className="w-full h-11 rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] px-4 text-sm text-[#16241C] outline-none focus:border-[#1F3D2B] focus:bg-white transition"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-2">
                  {t.fieldSize}
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 1.5"
                  value={fieldSize}
                  onChange={(e) => setFieldSize(e.target.value)}
                  className="w-full h-11 rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] px-4 text-sm text-[#16241C] outline-none focus:border-[#1F3D2B] focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-2">
                  {t.daysToHarvest} *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 90"
                  value={daysToHarvest}
                  onChange={(e) => setDaysToHarvest(e.target.value)}
                  className="w-full h-11 rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] px-4 text-sm text-[#16241C] outline-none focus:border-[#1F3D2B] focus:bg-white transition"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-2">
                  {t.plantedDate} *
                </label>
                <input
                  type="date"
                  value={plantedDate}
                  onChange={(e) => setPlantedDate(e.target.value)}
                  className="w-full h-11 rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] px-4 text-sm text-[#16241C] outline-none focus:border-[#1F3D2B] focus:bg-white transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-2">
                  {t.initialStage}
                </label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full h-11 rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] px-4 text-sm text-[#16241C] outline-none focus:border-[#1F3D2B] focus:bg-white transition"
                >
                  <option value="Seedling">{t.seedling}</option>
                  <option value="Vegetative">{t.vegetative}</option>
                  <option value="Flowering">{t.flowering}</option>
                  <option value="Fruiting">{t.fruiting}</option>
                  <option value="Harvesting">{t.harvesting}</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] text-sm font-semibold text-white transition hover:bg-[#2F5943] shadow-lg shadow-green-900/10 mt-6"
            >
              <Save size={16} />
              {t.save}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
