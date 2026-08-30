import { AlertTriangle, CheckCircle2, Leaf, Sprout, TrendingUp } from "lucide-react";
import type { CropSummary as CropSummaryType } from "@/types/crop";

interface CropSummaryProps {
  summary: CropSummaryType | null;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

const cards = [
  {
    key: "totalCrops",
    label: "মোট ফসল",
    icon: Leaf,
    tone: "emerald",
  },
  {
    key: "growingCrops",
    label: "চলমান ফসল",
    icon: Sprout,
    tone: "blue",
  },
  {
    key: "readyToHarvest",
    label: "সংগ্রহের জন্য প্রস্তুত",
    icon: CheckCircle2,
    tone: "amber",
  },
  {
    key: "attentionRequired",
    label: "মনোযোগ প্রয়োজন",
    icon: AlertTriangle,
    tone: "rose",
  },
] as const;

const toneStyles = {
  emerald: "bg-emerald-50 text-emerald-700",
  blue: "bg-sky-50 text-sky-700",
  amber: "bg-amber-50 text-amber-700",
  rose: "bg-rose-50 text-rose-700",
};

export default function CropSummary({ summary, loading, error, onRetry }: CropSummaryProps) {
  if (loading) {
    return (
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 h-9 w-9 rounded-xl bg-slate-200" />
            <div className="h-3 w-24 rounded bg-slate-200" />
            <div className="mt-3 h-8 w-16 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <div className="flex items-center justify-between gap-3">
          <span>ফসলের তথ্য লোড করা যায়নি।</span>
          <button
            onClick={onRetry}
            className="rounded-lg border border-red-200 bg-white px-3 py-1.5 font-medium text-red-700 hover:bg-red-100"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ key, label, icon: Icon, tone }) => {
        const value = summary[key];
        return (
          <div key={key} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
                <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${toneStyles[tone]}`}>
                <Icon size={20} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
