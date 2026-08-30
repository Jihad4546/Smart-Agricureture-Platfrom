import { Leaf, Droplets, Thermometer, Beaker, TrendingUp, Heart } from "lucide-react";
import type { SoilOverviewData } from "@/types/soil";

interface SoilOverviewProps {
  data: SoilOverviewData | null;
  loading: boolean;
}

export default function SoilOverview({ data, loading }: SoilOverviewProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl border border-slate-200 bg-slate-100 p-4 h-24" />
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
        কোনো ডেটা পাওয়া যায়নি
      </div>
    );
  }

  const cards = [
    { icon: Leaf, label: "মাটির ধরন", value: data.soilType, unit: "" },
    { icon: Beaker, label: "মাটির pH", value: data.ph.toFixed(1), unit: "" },
    { icon: Droplets, label: "মাটির আর্দ্রতা", value: data.moisture, unit: "%" },
    { icon: Thermometer, label: "মাটির তাপমাত্রা", value: data.temperature, unit: "°C" },
    { icon: TrendingUp, label: "জৈব পদার্থ", value: data.organicMatter, unit: "%" },
    { icon: Heart, label: "মাটির স্বাস্থ্য", value: data.healthScore, unit: "/100" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Icon size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-500">{card.label}</p>
                <p className="mt-1 truncate text-lg font-bold text-slate-900">
                  {card.value}
                  <span className="ml-1 text-xs text-slate-600">{card.unit}</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
