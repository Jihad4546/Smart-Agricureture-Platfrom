"use client";

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

const STATUS_OPTIONS = [
  "All",
  "Growing",
  "Ready to Harvest",
  "Needs Attention",
  "Harvested",
] as const;

const STAGE_OPTIONS = [
  "All",
  "Seed",
  "Seedling",
  "Vegetative Growth",
  "Flowering/Fruiting",
  "Mature",
  "Harvest",
] as const;

export default function CropManagementPage() {
  const [summary, setSummary] = useState<CropSummaryType | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loadingCrops, setLoadingCrops] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_OPTIONS)[number]>("All");
  const [stageFilter, setStageFilter] = useState<(typeof STAGE_OPTIONS)[number]>("All");
  const [sortBy, setSortBy] = useState("latest");
  const [notice, setNotice] = useState<string | null>(null);
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
            </button>
          </div>
        </header>

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
