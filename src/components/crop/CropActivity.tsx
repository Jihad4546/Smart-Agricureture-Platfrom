import { Plus, Droplets, Leaf, ShieldAlert, Sparkles, ScanSearch } from "lucide-react";
import type { ComponentType } from "react";
import type { CropActivity as CropActivityType } from "@/types/crop";

interface CropActivityProps {
  activities: CropActivityType[];
  loading: boolean;
  onAdd: () => void;
}

const activityIcons: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Irrigation: Droplets,
  Fertilizer: Leaf,
  Pesticide: ShieldAlert,
  Weeding: Sparkles,
  Inspection: ScanSearch,
};

export default function CropActivity({ activities, loading, onAdd }: CropActivityProps) {
  if (loading) {
    return (
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-20 animate-pulse rounded-xl bg-slate-100" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-bold text-slate-900">Activities</h4>
        <button onClick={onAdd} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700">
          <Plus size={16} /> Add Activity
        </button>
      </div>

      {activities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-500">
          No activities recorded yet.
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.activity_type] ?? Sparkles;
            return (
              <div key={activity.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{activity.activity_type}</p>
                      <p className="text-xs text-slate-500">{activity.activity_date}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-600">{activity.quantity}</span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{activity.description}</p>
                {activity.notes && <p className="mt-2 text-xs text-slate-500">{activity.notes}</p>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
