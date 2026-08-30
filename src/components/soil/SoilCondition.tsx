import type { SoilTest } from "@/types/soil";

interface SoilConditionProps {
  data: SoilTest | null;
  loading?: boolean;
}

export default function SoilCondition({ data, loading }: SoilConditionProps) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded bg-slate-100" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
        কোনো ডেটা পাওয়া যায়নি
      </div>
    );
  }

  const items = [
    { label: "মাটির ধরন", value: data.soilType },
    { label: "pH মান", value: `${data.ph.toFixed(1)}` },
    { label: "আর্দ্রতা", value: `${data.moisture}%` },
    { label: "তাপমাত্রা", value: `${data.temperature}°C` },
    { label: "জৈব পদার্থ", value: `${data.organicMatter}%` },
    { label: "সর্বশেষ পরীক্ষা", value: data.testDate },
    { label: "জমির নাম", value: data.fieldName },
    { label: "জমির আকার", value: `${data.landArea} ${data.landUnit}` },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">মাটির অবস্থা</h3>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="text-sm font-medium text-slate-600">{item.label}</span>
            <span className="font-semibold text-slate-900">{item.value}</span>
          </div>
        ))}
      </div>

      {data.notes && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase text-slate-500">নোট</p>
          <p className="mt-2 text-sm text-slate-700">{data.notes}</p>
        </div>
      )}
    </div>
  );
}
