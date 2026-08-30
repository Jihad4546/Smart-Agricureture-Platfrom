"use client";

<<<<<<< HEAD:src/app/(main)/cropManagement/page.tsx
import React, { useState } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { 
  Sprout, 
  Plus, 
  Droplets, 
  Bug, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign 
=======
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpDown,
  CalendarRange,
  ChevronDown,
  Filter,
  Leaf,
  Plus,
  Search,
  Sparkles,
  Sprout,
  X,
>>>>>>> 1ef4fe7 (crad design):src/app/cropManagement/page.tsx
} from "lucide-react";
import CropCard from "@/components/crop/CropCard";
import CropDetails from "@/components/crop/CropDetails";
import CropForm from "@/components/crop/CropForm";
import CropSummary from "@/components/crop/CropSummary";
import DeleteCropModal from "@/components/crop/DeleteCropModal";
import cropApi from "@/services/cropApi";
import type {
  Crop,
  CropActivity,
  CropActivityPayload,
  CropGrowthUpdatePayload,
  CropPayload,
  CropSummary as CropSummaryType,
} from "@/types/crop";

<<<<<<< HEAD:src/app/(main)/cropManagement/page.tsx
// --- Types Definition ---
interface Crop {
  id: string;
  name: string;
  nameBn: string;
  category: string;
  categoryBn: string;
  area: string;
  areaBn: string;
  plantedDate: string;
  harvestDate: string;
  stage: "Germination" | "Vegetative" | "Flowering" | "Maturity";
  stageBn: string;
  healthStatus: "Excellent" | "Good" | "Needs Attention";
  healthStatusBn: string;
  progressPercentage: number;
}

// --- Translations Definition ---
const translations = {
  en: {
    title: "Crop Management",
    subtitle: "Monitor and manage the overall condition of your crops in the field.",
    addNewCrop: "Add New Crop",
    totalLand: "Total Cultivated Land",
    totalLandValue: "4.5 Acres",
    activeCrops: "Active Crops",
    activeCropsValue: "3 Crops",
    irrigationAlert: "Today's Irrigation Alert",
    irrigationAlertValue: "1 Field",
    estimatedCost: "Est. Cost This Month",
    estimatedCostValue: "$320",
    alertTitle: "Agricultural Alert: Late Blight Prevention in Potato Field",
    alertDesc: "Due to high humidity, applying fungicide to your potato field is recommended.",
    currentCrops: "Current Crops",
    tabAll: "All",
    tabAttention: "Needs Attention",
    landArea: "Land Area",
    currentStage: "Current Stage",
    plantingDate: "Planting Date",
    harvestDate: "Est. Harvest Date",
    cropProgress: "Crop Growth Progress",
    waterCrop: "Irrigate",
    reportPest: "Report Disease",
    schedule: "Schedule",
  },
  bn: {
    title: "ফসল ব্যবস্থাপনা",
    subtitle: "আপনার ক্ষেতের ফসলের সার্বিক অবস্থা পর্যবেক্ষণ ও পরিচালনা করুন।",
    addNewCrop: "নতুন ফসল যোগ করুন",
    totalLand: "মোট চাষাবাদকৃত জমি",
    totalLandValue: "৪.৫ একর",
    activeCrops: "সক্রিয় ফসল",
    activeCropsValue: "৩ টি",
    irrigationAlert: "আজকের সেচ অ্যালার্ট",
    irrigationAlertValue: "১ টি ক্ষেত",
    estimatedCost: "চলতি মাসের আনুমানিক খরচ",
    estimatedCostValue: "৳ ৩৫,০০০",
    alertTitle: "কৃষি সতর্কতা: আলু ক্ষেতে লেট ব্লাইট রোগ প্রতিরোধ",
    alertDesc: "আবহাওয়ার আর্দ্রতা বেশি থাকায় আপনার আলু ক্ষেতে ছত্রাকনাশক স্প্রে করার পরামর্শ দেওয়া হচ্ছে।",
    currentCrops: "বর্তমান ফসলসমূহ",
    tabAll: "সবগুলো",
    tabAttention: "নজরদারি প্রয়োজন",
    landArea: "জমির পরিমাণ",
    currentStage: "বর্তমান ধাপ",
    plantingDate: "রোপণের তারিখ",
    harvestDate: "সম্ভাব্য কাটার তারিখ",
    cropProgress: "ফসল বৃদ্ধির অগ্রগতি",
    waterCrop: "সেচ দিন",
    reportPest: "রোগ রিপোর্ট",
    schedule: "সময়সূচী",
  }
};

// --- Mock Data ---
const initialCrops: Crop[] = [
  {
    id: "1",
    name: "BRRI Dhan 28",
    nameBn: "বিআর-২৮ ধান (BRRI Dhan 28)",
    category: "Cereal",
    categoryBn: "দানাদার",
    area: "2.5 Acres",
    areaBn: "২.৫ একর",
    plantedDate: "15 Jan 2026",
    harvestDate: "20 Apr 2026",
    stage: "Vegetative",
    stageBn: "বাড়ন্ত পর্যায়",
    healthStatus: "Excellent",
    healthStatusBn: "চমৎকার",
    progressPercentage: 45,
  },
  {
    id: "2",
    name: "Cardinal Potato",
    nameBn: "আলু (Cardinal Potato)",
    category: "Vegetable",
    categoryBn: "সবজি",
    area: "1.2 Acres",
    areaBn: "১.২ একর",
    plantedDate: "01 Dec 2025",
    harvestDate: "10 Mar 2026",
    stage: "Flowering",
    stageBn: "ফুল ফোটার পর্যায়",
    healthStatus: "Needs Attention",
    healthStatusBn: "নজরদারি প্রয়োজন",
    progressPercentage: 75,
  },
  {
    id: "3",
    name: "Bari Tomato 14",
    nameBn: "টমেটো (Bari Tomato 14)",
    category: "Vegetable",
    categoryBn: "সবজি",
    area: "0.8 Acres",
    areaBn: "০.৮ একর",
    plantedDate: "10 Feb 2026",
    harvestDate: "25 May 2026",
    stage: "Germination",
    stageBn: "অঙ্কুরোদ্গম",
    healthStatus: "Good",
    healthStatusBn: "ভালো",
    progressPercentage: 15,
  },
];

export default function CropManagementPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [crops] = useState<Crop[]>(initialCrops);
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Sprout className="h-7 w-7 text-emerald-600" /> {t.title}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {t.subtitle}
          </p>
        </div>
<button className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] px-5 text-sm font-semibold text-white transition hover:bg-[#2F5943] shadow-md shadow-green-950/15">
          <Plus className="h-4 w-4" /> {t.addNewCrop}
        </button>
      </div>

      {/* Overview Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.totalLand}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{t.totalLandValue}</p>
          </div>
          <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
            <Sprout className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.activeCrops}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{t.activeCropsValue}</p>
          </div>
          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.irrigationAlert}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{t.irrigationAlertValue}</p>
          </div>
          <div className="h-10 w-10 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">
            <Droplets className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.estimatedCost}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{t.estimatedCostValue}</p>
          </div>
          <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
            <DollarSign className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Advisory Alert Banner */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-amber-900">{t.alertTitle}</h4>
          <p className="text-xs text-amber-700 mt-0.5">
            {t.alertDesc}
          </p>
        </div>
      </div>

      {/* Crop List Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">{t.currentCrops}</h2>
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
=======
const STATUS_OPTIONS = ["All", "Growing", "Ready to Harvest", "Needs Attention", "Harvested"] as const;
const STAGE_OPTIONS = ["All", "Seed", "Seedling", "Vegetative Growth", "Flowering/Fruiting", "Mature", "Harvest"] as const;

export default function CropManagementPage() {
  const [summary, setSummary] = useState<CropSummaryType | null>(null);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingCrops, setLoadingCrops] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_OPTIONS)[number]>("All");
  const [stageFilter, setStageFilter] = useState<(typeof STAGE_OPTIONS)[number]>("All");
  const [sortBy, setSortBy] = useState("latest");
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [selectedForDelete, setSelectedForDelete] = useState<Crop | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [editingCrop, setEditingCrop] = useState<Crop | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activityFormOpen, setActivityFormOpen] = useState(false);
  const [activities, setActivities] = useState<CropActivity[]>([]);
  const [activityLoading, setActivityLoading] = useState(false);
  const [activityForm, setActivityForm] = useState<CropActivityPayload>({
    activity_type: "Irrigation",
    activity_date: new Date().toISOString().slice(0, 10),
    description: "",
    quantity: "",
    notes: "",
  });

  const loadSummary = async () => {
    try {
      setLoadingSummary(true);
      const data = await cropApi.getSummary();
      setSummary(data);
      setError(null);
    } catch {
      setSummary(null);
      setError("Unable to load summary");
    } finally {
      setLoadingSummary(false);
    }
  };

  const loadCrops = async () => {
    try {
      setLoadingCrops(true);
      const data = await cropApi.getCrops();
      setCrops(data);
      setError(null);
    } catch {
      setError("Unable to load crop list");
      setCrops([]);
    } finally {
      setLoadingCrops(false);
    }
  };

  const refreshAll = async () => {
    await Promise.all([loadSummary(), loadCrops()]);
  };

  useEffect(() => {
    void refreshAll();
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const filteredCrops = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return [...crops]
      .filter((crop) => {
        const matchesSearch =
          normalized.length === 0 ||
          crop.crop_name.toLowerCase().includes(normalized) ||
          crop.variety.toLowerCase().includes(normalized);
        const matchesStatus = statusFilter === "All" || crop.status === statusFilter;
        const matchesStage = stageFilter === "All" || crop.growth_stage === stageFilter;
        return matchesSearch && matchesStatus && matchesStage;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.crop_name.localeCompare(b.crop_name);
        }
        if (sortBy === "growth") {
          return b.growth_percentage - a.growth_percentage;
        }
        if (sortBy === "harvest") {
          return new Date(a.expected_harvest_date).getTime() - new Date(b.expected_harvest_date).getTime();
        }
        return b.id - a.id;
      });
  }, [crops, search, statusFilter, stageFilter, sortBy]);

  const loadActivities = async (cropId: number) => {
    try {
      setActivityLoading(true);
      const data = await cropApi.getActivities(cropId);
      setActivities(data);
    } catch {
      setActivities([]);
    } finally {
      setActivityLoading(false);
    }
  };

  const handleOpenCreateForm = () => {
    setEditingCrop(null);
    setFormMode("create");
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (crop: Crop) => {
    setEditingCrop(crop);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (payload: CropPayload) => {
    setSubmitting(true);
    try {
      if (formMode === "create") {
        await cropApi.createCrop(payload);
      } else if (editingCrop) {
        await cropApi.updateCrop(editingCrop.id, payload);
      }
      setNotice(formMode === "create" ? "Crop created successfully." : "Crop updated successfully.");
      setIsFormOpen(false);
      await refreshAll();
    } catch {
      setNotice("Operation failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedForDelete) return;
    setDeleting(true);
    try {
      await cropApi.deleteCrop(selectedForDelete.id);
      setNotice("Crop deleted successfully.");
      setSelectedForDelete(null);
      setSelectedCrop(null);
      await refreshAll();
    } catch {
      setNotice("Deletion failed. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handleViewDetails = async (crop: Crop) => {
    setSelectedCrop(crop);
    await loadActivities(crop.id);
  };

  const handleUpdateGrowth = async (payload: CropGrowthUpdatePayload) => {
    if (!selectedCrop) return;
    try {
      const updated = await cropApi.updateGrowth(selectedCrop.id, payload);
      setSelectedCrop(updated);
      setCrops((current) => current.map((crop) => (crop.id === updated.id ? updated : crop)));
      await refreshAll();
      setNotice("Growth updated successfully.");
    } catch {
      setNotice("Growth update failed. Please try again.");
    }
  };

  const handleCreateActivity = async () => {
    if (!selectedCrop) return;
    try {
      await cropApi.createActivity(selectedCrop.id, activityForm);
      setActivityFormOpen(false);
      setActivityForm({
        activity_type: "Irrigation",
        activity_date: new Date().toISOString().slice(0, 10),
        description: "",
        quantity: "",
        notes: "",
      });
      await loadActivities(selectedCrop.id);
      setNotice("Activity saved successfully.");
    } catch {
      setNotice("Activity could not be saved.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f8f4] p-4 text-slate-800 sm:p-6 lg:p-8">
      {notice && (
        <div className="fixed right-4 top-4 z-50 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-lg">
          {notice}
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        <header className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3 text-emerald-700">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
                  <Leaf size={22} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">AgriTech</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">ফসল ব্যবস্থাপনা</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
                আপনার সকল ফসলের তথ্য, বৃদ্ধি এবং কৃষি কার্যক্রম এক জায়গা থেকে পরিচালনা করুন।
              </p>
            </div>

            <button
              onClick={handleOpenCreateForm}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <Plus size={18} />
              নতুন ফসল যোগ করুন
>>>>>>> 1ef4fe7 (crad design):src/app/cropManagement/page.tsx
            </button>
          </div>
        </header>

<<<<<<< HEAD:src/app/(main)/cropManagement/page.tsx
        {/* Crops Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops.map((crop) => (
            <div key={crop.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {lang === "bn" ? crop.categoryBn : crop.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mt-1">
                      {lang === "bn" ? crop.nameBn : crop.name}
                    </h3>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 shrink-0 ${
                    crop.healthStatus === "Excellent" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                    crop.healthStatus === "Good" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                    "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>
                    {crop.healthStatus === "Excellent" && <CheckCircle2 className="w-3 h-3" />}
                    {crop.healthStatus === "Needs Attention" && <AlertTriangle className="w-3 h-3" />}
                    {lang === "bn" ? crop.healthStatusBn : crop.healthStatus}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>{t.landArea}:</span>
                    <span className="font-semibold text-slate-800">{lang === "bn" ? crop.areaBn : crop.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.currentStage}:</span>
                    <span className="font-semibold text-slate-800">{lang === "bn" ? crop.stageBn : crop.stage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.plantingDate}:</span>
                    <span className="font-medium text-slate-700">{crop.plantedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.harvestDate}:</span>
                    <span className="font-medium text-slate-700">{crop.harvestDate}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-slate-500">{t.cropProgress}</span>
                    <span className="text-emerald-700">{crop.progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${crop.progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-between gap-2">
                <button className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-emerald-600 font-medium transition">
                  <Droplets className="w-3.5 h-3.5" /> {t.waterCrop}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-amber-600 font-medium transition">
                  <Bug className="w-3.5 h-3.5" /> {t.reportPest}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 font-medium transition">
                  <Calendar className="w-3.5 h-3.5" /> {t.schedule}
                </button>
=======
        <CropSummary summary={summary} loading={loadingSummary} error={error} onRetry={() => void refreshAll()} />

        <section className="mt-8 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ফসল খুঁজুন..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:w-auto xl:min-w-[420px]">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as (typeof STATUS_OPTIONS)[number])}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 pr-10 text-sm outline-none transition focus:border-emerald-400 focus:bg-white"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option === "All" ? "সকল ফসল" : option}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              </div>

              <div className="relative">
                <select
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value as (typeof STAGE_OPTIONS)[number])}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 pr-10 text-sm outline-none transition focus:border-emerald-400 focus:bg-white"
                >
                  {STAGE_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option === "All" ? "সকল স্ট্যাটাস" : option}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 pr-10 text-sm outline-none transition focus:border-emerald-400 focus:bg-white"
                >
                  <option value="latest">Sort</option>
                  <option value="name">Name</option>
                  <option value="growth">Growth</option>
                  <option value="harvest">Harvest Date</option>
                </select>
                <ArrowUpDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
>>>>>>> 1ef4fe7 (crad design):src/app/cropManagement/page.tsx
              </div>
            </div>
          </div>

          {loadingCrops ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse rounded-3xl border border-slate-200 bg-slate-100 p-4">
                  <div className="h-16 rounded-2xl bg-slate-200" />
                  <div className="mt-4 h-4 w-28 rounded bg-slate-200" />
                  <div className="mt-3 h-4 w-40 rounded bg-slate-200" />
                  <div className="mt-8 h-2 rounded-full bg-slate-200" />
                  <div className="mt-4 h-10 rounded-xl bg-slate-200" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
              <p className="font-medium">ফসলের তথ্য লোড করা যায়নি।</p>
              <button onClick={() => void refreshAll()} className="mt-3 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700">
                Try Again
              </button>
            </div>
          ) : filteredCrops.length === 0 ? (
            <div className="mt-8 rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Sprout size={28} />
              </div>
              <h3 className="mt-5 text-2xl font-bold text-slate-900">এখনও কোনো ফসল যোগ করা হয়নি</h3>
              <p className="mt-2 text-sm text-slate-500">আপনার প্রথম ফসলটি যোগ করুন।</p>
              <button
                onClick={handleOpenCreateForm}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                <Plus size={18} /> নতুন ফসল যোগ করুন
              </button>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredCrops.map((crop) => (
                <CropCard
                  key={crop.id}
                  crop={crop}
                  onView={handleViewDetails}
                  onEdit={handleOpenEditForm}
                  onDelete={(cropToDelete) => setSelectedForDelete(cropToDelete)}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <CropForm
            initialData={editingCrop}
            mode={formMode}
            submitting={submitting}
            onCancel={() => setIsFormOpen(false)}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}

      {selectedForDelete && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <DeleteCropModal
            cropName={selectedForDelete.crop_name}
            deleting={deleting}
            onCancel={() => setSelectedForDelete(null)}
            onConfirm={handleDelete}
          />
        </div>
      )}

      {selectedCrop && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-end">
              <button onClick={() => setSelectedCrop(null)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                <X size={20} />
              </button>
            </div>
            <CropDetails
              crop={selectedCrop}
              activities={activities}
              activityLoading={activityLoading}
              onAddActivity={() => setActivityFormOpen(true)}
              onUpdateGrowth={handleUpdateGrowth}
            />
          </div>
        </div>
      )}

      {activityFormOpen && selectedCrop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Add Activity</h3>
              <button onClick={() => setActivityFormOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-4">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Activity type</span>
                <select
                  value={activityForm.activity_type}
                  onChange={(e) => setActivityForm((prev) => ({ ...prev, activity_type: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400"
                >
                  <option>Irrigation</option>
                  <option>Fertilizer</option>
                  <option>Pesticide</option>
                  <option>Weeding</option>
                  <option>Inspection</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Date</span>
                <input
                  type="date"
                  value={activityForm.activity_date}
                  onChange={(e) => setActivityForm((prev) => ({ ...prev, activity_date: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400"
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Description</span>
                <input
                  value={activityForm.description}
                  onChange={(e) => setActivityForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400"
                  placeholder="Describe the work"
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Quantity</span>
                <input
                  value={activityForm.quantity}
                  onChange={(e) => setActivityForm((prev) => ({ ...prev, quantity: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400"
                  placeholder="10L / 20kg"
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Notes</span>
                <textarea
                  rows={3}
                  value={activityForm.notes}
                  onChange={(e) => setActivityForm((prev) => ({ ...prev, notes: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400"
                  placeholder="Add extra notes"
                />
              </label>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => setActivityFormOpen(false)} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-700">
                Cancel
              </button>
              <button onClick={() => void handleCreateActivity()} className="rounded-xl bg-emerald-600 px-4 py-2.5 font-medium text-white hover:bg-emerald-700">
                Add Activity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
