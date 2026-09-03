import { CheckCircle, AlertTriangle } from "lucide-react";
import type { SoilRecommendation } from "@/types/soil";

interface SoilRecommendationProps {
  recommendations: SoilRecommendation[];
  loading?: boolean;
}

export default function SoilRecommendation({ recommendations, loading }: SoilRecommendationProps) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 animate-pulse rounded-lg bg-slate-100" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">মাটি ব্যবস্থাপনা পরামর্শ</h3>

      <div className="mt-4 space-y-2">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
              rec.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
            }`}
          >
            {rec.type === "success" ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
            <span className="text-sm font-medium">{rec.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
