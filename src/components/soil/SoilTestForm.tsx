import React from "react";
import { X } from "lucide-react";
import type { SoilTestPayload, SoilType, SoilTest } from "@/types/soil";

interface SoilTestFormProps {
  initialData?: SoilTest | null;
  mode: "create" | "edit";
  submitting: boolean;
  onCancel: () => void;
  onSubmit: (payload: SoilTestPayload) => void;
}

const soilTypes: SoilType[] = ["দোআঁশ", "এঁটেল", "বেলে", "পলি"];
const landUnits: Array<"একর" | "কাঠা" | "বিঘা" | "শতাংশ"> = ["একর", "কাঠা", "বিঘা", "শতাংশ"];

export default function SoilTestForm({ initialData, mode, submitting, onCancel, onSubmit }: SoilTestFormProps) {
  const [formData, setFormData] = React.useState<SoilTestPayload>(
    initialData
      ? {
          fieldName: initialData.fieldName,
          soilType: initialData.soilType,
          landArea: initialData.landArea,
          landUnit: initialData.landUnit,
          testDate: initialData.testDate,
          ph: initialData.ph,
          moisture: initialData.moisture,
          temperature: initialData.temperature,
          organicMatter: initialData.organicMatter,
          nitrogen: initialData.nitrogen,
          phosphorus: initialData.phosphorus,
          potassium: initialData.potassium,
          notes: initialData.notes,
        }
      : {
          fieldName: "",
          soilType: "দোআঁশ",
          landArea: 0,
          landUnit: "একর",
          testDate: new Date().toISOString().split("T")[0],
          ph: 6.5,
          moisture: 0,
          temperature: 27,
          organicMatter: 0,
          nitrogen: 0,
          phosphorus: 0,
          potassium: 0,
          notes: "",
        }
  );

  const handleChange = (field: keyof SoilTestPayload, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h3 className="text-xl font-bold text-slate-900">{mode === "create" ? "নতুন Soil Test" : "Soil Test সম্পাদনা"}</h3>
        <button onClick={onCancel} disabled={submitting} className="rounded-lg p-2 hover:bg-slate-100">
          <X size={20} className="text-slate-500" />
        </button>
      </div>

      <div className="max-h-[60vh] overflow-y-auto p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">জমির নাম</span>
            <input
              type="text"
              value={formData.fieldName}
              onChange={(e) => handleChange("fieldName", e.target.value)}
              disabled={submitting}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400 disabled:opacity-50"
              placeholder="আপনার জমির নাম"
            />
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">মাটির ধরন</span>
            <select
              value={formData.soilType}
              onChange={(e) => handleChange("soilType", e.target.value as SoilType)}
              disabled={submitting}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400 disabled:opacity-50"
            >
              {soilTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">জমির আকার</span>
            <input
              type="number"
              value={formData.landArea}
              onChange={(e) => handleChange("landArea", parseFloat(e.target.value) || 0)}
              disabled={submitting}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400 disabled:opacity-50"
              placeholder="0"
              step="0.1"
            />
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">একক</span>
            <select
              value={formData.landUnit}
              onChange={(e) => handleChange("landUnit", e.target.value)}
              disabled={submitting}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400 disabled:opacity-50"
            >
              {landUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">পরীক্ষার তারিখ</span>
            <input
              type="date"
              value={formData.testDate}
              onChange={(e) => handleChange("testDate", e.target.value)}
              disabled={submitting}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400 disabled:opacity-50"
            />
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">মাটির তাপমাত্রা (°C)</span>
            <input
              type="number"
              value={formData.temperature}
              onChange={(e) => handleChange("temperature", parseFloat(e.target.value) || 0)}
              disabled={submitting}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400 disabled:opacity-50"
              placeholder="27"
              step="0.1"
            />
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">মাটির pH</span>
            <input
              type="number"
              value={formData.ph}
              onChange={(e) => handleChange("ph", parseFloat(e.target.value) || 0)}
              disabled={submitting}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400 disabled:opacity-50"
              placeholder="6.5"
              step="0.1"
            />
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">আর্দ্রতা (%)</span>
            <input
              type="number"
              value={formData.moisture}
              onChange={(e) => handleChange("moisture", parseFloat(e.target.value) || 0)}
              disabled={submitting}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400 disabled:opacity-50"
              placeholder="68"
              step="0.1"
            />
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">জৈব পদার্থ (%)</span>
            <input
              type="number"
              value={formData.organicMatter}
              onChange={(e) => handleChange("organicMatter", parseFloat(e.target.value) || 0)}
              disabled={submitting}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400 disabled:opacity-50"
              placeholder="3.2"
              step="0.1"
            />
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">নাইট্রোজেন (mg/kg)</span>
            <input
              type="number"
              value={formData.nitrogen}
              onChange={(e) => handleChange("nitrogen", parseFloat(e.target.value) || 0)}
              disabled={submitting}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400 disabled:opacity-50"
              placeholder="45"
              step="1"
            />
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">ফসফরাস (mg/kg)</span>
            <input
              type="number"
              value={formData.phosphorus}
              onChange={(e) => handleChange("phosphorus", parseFloat(e.target.value) || 0)}
              disabled={submitting}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400 disabled:opacity-50"
              placeholder="18"
              step="1"
            />
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">পটাশিয়াম (mg/kg)</span>
            <input
              type="number"
              value={formData.potassium}
              onChange={(e) => handleChange("potassium", parseFloat(e.target.value) || 0)}
              disabled={submitting}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400 disabled:opacity-50"
              placeholder="120"
              step="1"
            />
          </label>
        </div>

        <label className="mt-4 space-y-2">
          <span className="block text-sm font-medium text-slate-700">নোট</span>
          <textarea
            rows={3}
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            disabled={submitting}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400 disabled:opacity-50"
            placeholder="অতিরিক্ত তথ্য যোগ করুন..."
          />
        </label>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
        <button
          onClick={onCancel}
          disabled={submitting}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          বাতিল করুন
        </button>
        <button
          onClick={() => onSubmit(formData)}
          disabled={submitting || !formData.fieldName}
          className="rounded-xl bg-emerald-600 px-4 py-2.5 font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {submitting ? "সংরক্ষণ করছে..." : mode === "create" ? "Soil Test যোগ করুন" : "আপডেট করুন"}
        </button>
      </div>
    </div>
  );
}
