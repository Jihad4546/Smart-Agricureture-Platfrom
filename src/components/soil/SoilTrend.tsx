interface SoilTrendProps {
  loading?: boolean;
}

export default function SoilTrend({ loading }: SoilTrendProps) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
        <div className="mt-6 h-48 animate-pulse rounded bg-slate-100" />
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">মাটি ট্রেন্ড</h3>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-600">pH ট্রেন্ড</p>
          <svg className="mt-4 h-24 w-full" viewBox="0 0 100 50" preserveAspectRatio="none">
            <polyline
              points="0,20 25,18 50,15 75,22 100,20"
              stroke="#10b981"
              strokeWidth="2"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <p className="mt-2 text-xs text-slate-600">স্থিতিশীল প্রবণতা</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-600">আর্দ্রতা ট্রেন্ড</p>
          <svg className="mt-4 h-24 w-full" viewBox="0 0 100 50" preserveAspectRatio="none">
            <polyline
              points="0,30 25,25 50,20 75,28 100,25"
              stroke="#3b82f6"
              strokeWidth="2"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <p className="mt-2 text-xs text-slate-600">ওঠানামা করছে</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-600">স্বাস্থ্য ট্রেন্ড</p>
          <svg className="mt-4 h-24 w-full" viewBox="0 0 100 50" preserveAspectRatio="none">
            <polyline
              points="0,35 25,30 50,25 75,20 100,18"
              stroke="#f59e0b"
              strokeWidth="2"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <p className="mt-2 text-xs text-slate-600">ধীরে ধীরে উন্নতি হচ্ছে</p>
        </div>
      </div>
    </div>
  );
}
