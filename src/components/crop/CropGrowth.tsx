import type { Crop, CropGrowthUpdatePayload } from "@/types/crop";

interface CropGrowthProps {
  crop: Crop;
  onUpdate: (payload: CropGrowthUpdatePayload) => Promise<void> | void;
}

const growthStages = [
  "Seed",
  "Seedling",
  "Vegetative Growth",
  "Flowering/Fruiting",
  "Mature",
  "Harvest",
] as const;

export default function CropGrowth({ crop, onUpdate }: CropGrowthProps) {
  const currentIndex = growthStages.indexOf(crop.growth_stage as (typeof growthStages)[number]);

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-bold text-slate-900">Update Growth</h4>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">{crop.growth_percentage}%</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Growth stage</span>
          <select
            defaultValue={crop.growth_stage}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400"
            onChange={(e) => {
              const payload: CropGrowthUpdatePayload = {
                growth_stage: e.target.value as typeof crop.growth_stage,
                growth_percentage: crop.growth_percentage,
                status: crop.status,
                notes: crop.notes,
              };
              onUpdate(payload);
            }}
          >
            {growthStages.map((stage) => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Growth percentage</span>
          <input
            type="number"
            min={0}
            max={100}
            defaultValue={crop.growth_percentage}
            onBlur={(e) => {
              const value = Number(e.target.value);
              const payload: CropGrowthUpdatePayload = {
                growth_stage: crop.growth_stage,
                growth_percentage: value,
                status: crop.status,
                notes: crop.notes,
              };
              onUpdate(payload);
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-400"
          />
        </label>
      </div>

      <div>
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Growth Timeline</div>
        <div className="space-y-3">
          {growthStages.map((stage, idx) => (
            <div key={stage} className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${idx <= currentIndex ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"}`}>
                {idx + 1}
              </div>
              <div className={`flex-1 rounded-xl border px-3 py-2 text-sm ${idx <= currentIndex ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-50 text-slate-500"}`}>
                {stage}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
