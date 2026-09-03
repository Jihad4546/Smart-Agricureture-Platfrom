import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import type { SoilAlert } from "@/types/soil";

interface SoilAlertsProps {
  alerts: SoilAlert[];
  loading?: boolean;
}

export default function SoilAlerts({ alerts, loading }: SoilAlertsProps) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-lg bg-slate-100" />
          ))}
        </div>
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <CheckCircle size={20} className="text-emerald-700" />
          <div>
            <p className="font-semibold text-emerald-900">সবকিছু ঠিক আছে</p>
            <p className="text-sm text-emerald-700">আপনার মাটির কোনো সতর্কতা নেই।</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">সতর্কতা ও তথ্য</h3>

      <div className="mt-4 space-y-3">
        {alerts.map((alert) => {
          const Icon = alert.type === "warning" ? AlertTriangle : alert.type === "success" ? CheckCircle : Info;
          const colors = {
            warning: "bg-amber-50 border-amber-200 text-amber-700",
            success: "bg-emerald-50 border-emerald-200 text-emerald-700",
            info: "bg-blue-50 border-blue-200 text-blue-700",
          };

          return (
            <div key={alert.id} className={`flex items-start gap-3 rounded-lg border ${colors[alert.type]} p-3`}>
              <Icon size={18} className="shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm">{alert.message}</p>
                <p className="text-xs opacity-75 mt-1">{alert.parameter}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
