import type { SoilHealthStatus } from "@/types/soil";

interface SoilHealthProps {
  score: number;
  loading?: boolean;
}

const getStatus = (score: number): SoilHealthStatus => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Moderate";
  return "Poor";
};

const getStatusColor = (status: SoilHealthStatus): string => {
  switch (status) {
    case "Excellent":
      return "bg-emerald-100 text-emerald-700";
    case "Good":
      return "bg-blue-100 text-blue-700";
    case "Moderate":
      return "bg-amber-100 text-amber-700";
    case "Poor":
      return "bg-rose-100 text-rose-700";
  }
};

const getBarColor = (status: SoilHealthStatus): string => {
  switch (status) {
    case "Excellent":
      return "bg-emerald-600";
    case "Good":
      return "bg-blue-600";
    case "Moderate":
      return "bg-amber-600";
    case "Poor":
      return "bg-rose-600";
  }
};

const getStatusBangla = (status: SoilHealthStatus): string => {
  switch (status) {
    case "Excellent":
      return "চমৎকার";
    case "Good":
      return "ভালো";
    case "Moderate":
      return "মধ্যম";
    case "Poor":
      return "দুর্বল";
  }
};

export default function SoilHealth({ score, loading }: SoilHealthProps) {
  const status = getStatus(score);

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
        <div className="mt-8 h-32 animate-pulse rounded bg-slate-100" />
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">মাটির স্বাস্থ্য স্কোর</h3>

      <div className="mt-8 text-center">
        <div className="inline-flex items-baseline gap-1">
          <span className="text-5xl font-bold text-slate-900">{score}</span>
          <span className="text-2xl text-slate-600">/100</span>
        </div>

        <div className="mt-6 w-full overflow-hidden rounded-full bg-slate-100 px-2 py-2">
          <div className={`h-2 rounded-full transition-all duration-500 ${getBarColor(status)}`} style={{ width: `${score}%` }} />
        </div>

        <div className={`mt-4 inline-block rounded-full px-4 py-2 font-semibold text-sm ${getStatusColor(status)}`}>
          {getStatusBangla(status)}
        </div>
      </div>

      <div className="mt-6 space-y-2 text-xs text-slate-600 text-center">
        <p>আপনার মাটি {getStatusBangla(status).toLowerCase()} অবস্থায় রয়েছে।</p>
      </div>
    </div>
  );
}
