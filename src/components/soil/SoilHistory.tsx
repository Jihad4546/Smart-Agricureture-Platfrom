import { Eye, Edit3, Trash2 } from "lucide-react";
import type { SoilTest, SoilType } from "@/types/soil";

interface SoilHistoryProps {
  soils: SoilTest[];
  loading: boolean;
  searchQuery: string;
  soilTypeFilter: SoilType | "All";
  healthFilter: "All" | "Excellent" | "Good" | "Moderate" | "Poor";
  sortBy: "newest" | "oldest" | "highest" | "lowest";
  onView: (soil: SoilTest) => void;
  onEdit: (soil: SoilTest) => void;
  onDelete: (soil: SoilTest) => void;
}

const soilTypeOptions: Array<SoilType | "All"> = ["All", "দোআঁশ", "এঁটেল", "বেলে", "পলি"];
const healthOptions = ["All", "Excellent", "Good", "Moderate", "Poor"] as const;

const getHealthStatus = (score: number): "Excellent" | "Good" | "Moderate" | "Poor" => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Moderate";
  return "Poor";
};

export default function SoilHistory({
  soils,
  loading,
  searchQuery,
  soilTypeFilter,
  healthFilter,
  sortBy,
  onView,
  onEdit,
  onDelete,
}: SoilHistoryProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />
        ))}
      </div>
    );
  }

  if (soils.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <p className="text-slate-500">কোনো Soil Test পাওয়া যায়নি</p>
      </div>
    );
  }

  // Desktop table view
  return (
    <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">জমির নাম</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">পরীক্ষার তারিখ</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">মাটির ধরন</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">pH</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">আর্দ্রতা</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">N</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">P</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">K</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">স্বাস্থ্য স্কোর</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">বিকল্প</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {soils.map((soil) => (
            <tr key={soil.id} className="hover:bg-slate-50 transition">
              <td className="px-4 py-3 text-sm text-slate-900 font-medium">{soil.fieldName}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{soil.testDate}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{soil.soilType}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{soil.ph.toFixed(1)}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{soil.moisture}%</td>
              <td className="px-4 py-3 text-sm text-slate-600">{soil.nitrogen}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{soil.phosphorus}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{soil.potassium}</td>
              <td className="px-4 py-3">
                <span className="inline-flex rounded-full px-2 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700">
                  {soil.healthScore}/100
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onView(soil)}
                    className="rounded-lg p-1.5 hover:bg-emerald-100 text-emerald-700"
                    title="View"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => onEdit(soil)}
                    className="rounded-lg p-1.5 hover:bg-blue-100 text-blue-700"
                    title="Edit"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(soil)}
                    className="rounded-lg p-1.5 hover:bg-rose-100 text-rose-700"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
