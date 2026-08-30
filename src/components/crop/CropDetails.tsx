import type { Crop, CropActivity, CropGrowthUpdatePayload } from "@/types/crop";
import CropActivityList from "@/components/crop/CropActivity";
import CropGrowth from "@/components/crop/CropGrowth";

interface CropDetailsProps {
  crop: Crop;
  activities: CropActivity[];
  activityLoading: boolean;
  onAddActivity: () => void;
  onUpdateGrowth: (payload: CropGrowthUpdatePayload) => Promise<void> | void;
}

export default function CropDetails({ crop, activities, activityLoading, onAddActivity, onUpdateGrowth }: CropDetailsProps) {
  return (
    <div className="w-full max-w-5xl rounded-3xl bg-white p-6 shadow-xl">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Crop Details</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">{crop.crop_name}</h3>
        </div>
        <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
          {crop.status}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h4 className="mb-4 text-lg font-bold text-slate-900">Basic Information</h4>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex justify-between gap-3"><span>Crop name</span><span className="font-semibold text-slate-800">{crop.crop_name}</span></div>
            <div className="flex justify-between gap-3"><span>Variety</span><span className="font-semibold text-slate-800">{crop.variety}</span></div>
            <div className="flex justify-between gap-3"><span>Land area</span><span className="font-semibold text-slate-800">{crop.land_area} {crop.land_unit}</span></div>
            <div className="flex justify-between gap-3"><span>Seed type</span><span className="font-semibold text-slate-800">{crop.seed_type}</span></div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h4 className="mb-4 text-lg font-bold text-slate-900">Growing Information</h4>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex justify-between gap-3"><span>Planting date</span><span className="font-semibold text-slate-800">{crop.planting_date}</span></div>
            <div className="flex justify-between gap-3"><span>Expected harvest</span><span className="font-semibold text-slate-800">{crop.expected_harvest_date}</span></div>
            <div className="flex justify-between gap-3"><span>Current stage</span><span className="font-semibold text-slate-800">{crop.growth_stage}</span></div>
            <div className="flex justify-between gap-3"><span>Growth percentage</span><span className="font-semibold text-slate-800">{crop.growth_percentage}%</span></div>
            <div className="flex justify-between gap-3"><span>Status</span><span className="font-semibold text-slate-800">{crop.status}</span></div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h4 className="mb-4 text-lg font-bold text-slate-900">Farming Information</h4>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex justify-between gap-3"><span>Irrigation type</span><span className="font-semibold text-slate-800">{crop.irrigation_type}</span></div>
            <div className="flex justify-between gap-3"><span>Fertilizer</span><span className="font-semibold text-slate-800">{crop.fertilizer}</span></div>
            <div className="mt-3 text-slate-600"><span className="font-medium text-slate-700">Notes:</span> {crop.notes || "No notes added."}</div>
          </div>
        </div>

        <CropGrowth crop={crop} onUpdate={onUpdateGrowth} />
      </div>

      <div className="mt-5">
        <CropActivityList activities={activities} loading={activityLoading} onAdd={onAddActivity} />
      </div>
    </div>
  );
}
