import { useEffect, useState } from "react";
import { CalendarDays, CircleX, Leaf, Sprout } from "lucide-react";
import type { Crop, CropPayload } from "@/types/crop";

interface CropFormProps {
  initialData?: Crop | null;
  onSubmit: (payload: CropPayload) => Promise<void> | void;
  onCancel: () => void;
  submitting: boolean;
  mode: "create" | "edit";
}

const defaultValues: CropPayload = {
  crop_name: "",
  variety: "",
  land_area: 0,
  land_unit: "acre",
  planting_date: "",
  expected_harvest_date: "",
  seed_type: "",
  irrigation_type: "",
  fertilizer: "",
  notes: "",
  growth_stage: "Seedling",
  growth_percentage: 10,
  status: "Growing",
};

export default function CropForm({ initialData, onSubmit, onCancel, submitting, mode }: CropFormProps) {
  const [form, setForm] = useState<CropPayload>(defaultValues);

  useEffect(() => {
    if (initialData) {
      setForm({
        crop_name: initialData.crop_name,
        variety: initialData.variety,
        land_area: initialData.land_area,
        land_unit: initialData.land_unit,
        planting_date: initialData.planting_date,
        expected_harvest_date: initialData.expected_harvest_date,
        seed_type: initialData.seed_type,
        irrigation_type: initialData.irrigation_type,
        fertilizer: initialData.fertilizer,
        notes: initialData.notes,
        growth_stage: initialData.growth_stage,
        growth_percentage: initialData.growth_percentage,
        status: initialData.status,
      });
      return;
    }

    setForm(defaultValues);
  }, [initialData]);

  const updateField = (field: keyof CropPayload, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.crop_name.trim() || !form.variety.trim()) {
      return;
    }
    await onSubmit(form);
  };

  return (
    <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-xl">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <Sprout size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{mode === "create" ? "Add New" : "Update"}</p>
            <h3 className="text-xl font-bold text-slate-900">{mode === "create" ? "নতুন ফসল যোগ করুন" : "ফসল সম্পাদনা"}</h3>
          </div>
        </div>
        <button onClick={onCancel} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close form">
          <CircleX size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>ফসলের নাম</span>
            <input
              value={form.crop_name}
              onChange={(e) => updateField("crop_name", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-emerald-400 focus:bg-white"
              placeholder="ধান, আলু, টমেটো"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>ফসলের জাত</span>
            <input
              value={form.variety}
              onChange={(e) => updateField("variety", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-emerald-400 focus:bg-white"
              placeholder="BRRI Dhan 28"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>জমির পরিমাণ</span>
            <input
              type="number"
              min={0}
              step="0.1"
              value={form.land_area}
              onChange={(e) => updateField("land_area", Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-emerald-400 focus:bg-white"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>জমির একক</span>
            <select
              value={form.land_unit}
              onChange={(e) => updateField("land_unit", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-emerald-400 focus:bg-white"
            >
              <option value="acre">acre</option>
              <option value="bigha">bigha</option>
              <option value="decimal">decimal</option>
              <option value="hectare">hectare</option>
            </select>
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>রোপণের তারিখ</span>
            <input
              type="date"
              value={form.planting_date}
              onChange={(e) => updateField("planting_date", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-emerald-400 focus:bg-white"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>সম্ভাব্য সংগ্রহের তারিখ</span>
            <input
              type="date"
              value={form.expected_harvest_date}
              onChange={(e) => updateField("expected_harvest_date", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-emerald-400 focus:bg-white"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>বীজের ধরন</span>
            <input
              value={form.seed_type}
              onChange={(e) => updateField("seed_type", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-emerald-400 focus:bg-white"
              placeholder="Hybrid, Certified"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>সেচের ধরন</span>
            <input
              value={form.irrigation_type}
              onChange={(e) => updateField("irrigation_type", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-emerald-400 focus:bg-white"
              placeholder="Drip / Canal / Sprinkler"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
            <span>সার তথ্য</span>
            <input
              value={form.fertilizer}
              onChange={(e) => updateField("fertilizer", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-emerald-400 focus:bg-white"
              placeholder="Urea, Potash, Compost"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
            <span>অতিরিক্ত নোট</span>
            <textarea
              rows={4}
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-emerald-400 focus:bg-white"
              placeholder="ফসলের সংক্রান্ত নোট লিখুন..."
            />
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
          <button type="button" onClick={onCancel} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-700">
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="rounded-xl bg-emerald-600 px-4 py-2.5 font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300">
            {submitting ? "Saving..." : mode === "create" ? "Add Crop" : "Update Crop"}
          </button>
        </div>
      </form>
    </div>
  );
}
