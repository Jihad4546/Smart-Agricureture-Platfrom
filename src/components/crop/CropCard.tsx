import { CalendarDays, Droplets, Edit3, Eye, FileText, Sprout, Trash2 } from "lucide-react";
import type { Crop } from "@/types/crop";

interface CropCardProps {
  crop: Crop;
  onView: (crop: Crop) => void;
  onEdit: (crop: Crop) => void;
  onDelete: (crop: Crop) => void;
}

const statusStyles: Record<string, string> = {
  Growing: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "Ready to Harvest": "bg-amber-50 text-amber-700 border border-amber-200",
  "Needs Attention": "bg-rose-50 text-rose-700 border border-rose-200",
  Harvested: "bg-slate-100 text-slate-700 border border-slate-200",
};

export default function CropCard({ crop, onView, onEdit, onDelete }: CropCardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="border-b border-slate-100 bg-linear-to-r from-emerald-50 via-white to-emerald-50 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{crop.variety}</p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">{crop.crop_name}</h3>
            </div>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[crop.status] ?? "bg-slate-100 text-slate-700"}`}>
            {crop.status}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="space-y-2 text-sm text-slate-600">
          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-500">জমির পরিমাণ</span>
            <span className="font-semibold text-slate-800">{crop.land_area} {crop.land_unit}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-500">রোপণ</span>
            <span className="font-medium text-slate-700">{crop.planting_date}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-500">সম্ভাব্য সংগ্রহ</span>
            <span className="font-medium text-slate-700">{crop.expected_harvest_date}</span>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-600">
            <span>বৃদ্ধি</span>
            <span className="text-emerald-700">{crop.growth_percentage}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-linear-to-r from-emerald-500 to-lime-500" style={{ width: `${crop.growth_percentage}%` }} />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
          <CalendarDays size={14} className="text-emerald-600" />
          <span>{crop.growth_stage}</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3">
        <button
          onClick={() => onView(crop)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:border-emerald-200 hover:text-emerald-700"
        >
          <Eye size={14} /> View Details
        </button>
        <button
          onClick={() => onEdit(crop)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:border-sky-200 hover:text-sky-700"
        >
          <Edit3 size={14} /> Edit
        </button>
        <button
          onClick={() => onDelete(crop)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:border-rose-200 hover:text-rose-700"
        >
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </div>
  );
}
