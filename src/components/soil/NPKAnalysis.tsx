import type { NPKStatus } from "@/types/soil";

interface NPKCardProps {
  label: string;
  value: number;
  unit: string;
  status: NPKStatus;
  icon: string;
}

const getStatusColor = (status: NPKStatus): string => {
  switch (status) {
    case "Low":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "Normal":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "High":
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
};

const getStatusBangla = (status: NPKStatus): string => {
  switch (status) {
    case "Low":
      return "কম";
    case "Normal":
      return "স্বাভাবিক";
    case "High":
      return "বেশি";
  }
};

const getProgressColor = (status: NPKStatus): string => {
  switch (status) {
    case "Low":
      return "bg-rose-500";
    case "Normal":
      return "bg-emerald-500";
    case "High":
      return "bg-amber-500";
  }
};

const normalMin = 30;
const normalMax = 150;

const getProgress = (value: number, status: NPKStatus): number => {
  if (status === "Low") return Math.min((value / normalMin) * 100, 100);
  if (status === "High") return Math.min((value / normalMax) * 100, 100);
  return Math.min((value / normalMax) * 100, 100);
};

export default function NPKAnalysis() {
  const npkData = [
    { label: "নাইট্রোজেন (N)", value: 45, unit: "mg/kg", status: "Normal" as NPKStatus, icon: "🌱" },
    { label: "ফসফরাস (P)", value: 18, unit: "mg/kg", status: "Low" as NPKStatus, icon: "🧪" },
    { label: "পটাশিয়াম (K)", value: 120, unit: "mg/kg", status: "Normal" as NPKStatus, icon: "⚗️" },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">NPK বিশ্লেষণ</h3>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {npkData.map((item, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{item.icon}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold border ${getStatusColor(item.status)}`}>
                {getStatusBangla(item.status)}
              </span>
            </div>

            <p className="mt-3 text-sm font-medium text-slate-700">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {item.value}
              <span className="ml-1 text-xs font-normal text-slate-600">{item.unit}</span>
            </p>

            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-300 ${getProgressColor(item.status)}`}
                style={{ width: `${Math.min(getProgress(item.value, item.status), 100)}%` }}
              />
            </div>

            <p className="mt-2 text-xs text-slate-600">
              {item.status === "Low" && "মাত্রা বৃদ্ধির প্রয়োজন"}
              {item.status === "Normal" && "স্বাভাবিক পর্যায়ে আছে"}
              {item.status === "High" && "মাত্রা কমানোর প্রয়োজন"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
