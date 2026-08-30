import { X } from "lucide-react";
import type { SoilTest } from "@/types/soil";

interface SoilDetailsModalProps {
  soil: SoilTest;
  onClose: () => void;
}

export default function SoilDetailsModal({ soil, onClose }: SoilDetailsModalProps) {
  return (
    <div className="w-full max-w-4xl rounded-3xl bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Soil Test বিস্তারিত</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">{soil.fieldName}</h3>
        </div>
        <button onClick={onClose} className="rounded-lg p-2 hover:bg-slate-100">
          <X size={20} className="text-slate-500" />
        </button>
      </div>

      <div className="max-h-[70vh] overflow-y-auto p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">মৌলিক তথ্য</h4>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">জমির নাম</span>
                <span className="font-medium text-slate-900">{soil.fieldName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">মাটির ধরন</span>
                <span className="font-medium text-slate-900">{soil.soilType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">জমির আকার</span>
                <span className="font-medium text-slate-900">
                  {soil.landArea} {soil.landUnit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">পরীক্ষার তারিখ</span>
                <span className="font-medium text-slate-900">{soil.testDate}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">মাটির অবস্থা</h4>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">pH মান</span>
                <span className="font-medium text-slate-900">{soil.ph.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">আর্দ্রতা</span>
                <span className="font-medium text-slate-900">{soil.moisture}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">তাপমাত্রা</span>
                <span className="font-medium text-slate-900">{soil.temperature}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">জৈব পদার্থ</span>
                <span className="font-medium text-slate-900">{soil.organicMatter}%</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">NPK বিশ্লেষণ</h4>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">নাইট্রোজেন (N)</span>
                <span className="font-medium text-slate-900">{soil.nitrogen} mg/kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">ফসফরাস (P)</span>
                <span className="font-medium text-slate-900">{soil.phosphorus} mg/kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">পটাশিয়াম (K)</span>
                <span className="font-medium text-slate-900">{soil.potassium} mg/kg</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">মাটির স্বাস্থ্য</h4>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-slate-900">{soil.healthScore}</span>
                <span className="text-xl text-slate-600">/100</span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${soil.healthScore}%` }} />
              </div>
              <p className="mt-2 text-xs text-slate-600">
                {soil.healthScore >= 80 ? "চমৎকার" : soil.healthScore >= 60 ? "ভালো" : soil.healthScore >= 40 ? "মধ্যম" : "দুর্বল"}
              </p>
            </div>
          </div>
        </div>

        {soil.notes && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">নোট</h4>
            <p className="mt-3 text-sm text-slate-700">{soil.notes}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
        <button
          onClick={onClose}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
        >
          বন্ধ করুন
        </button>
      </div>
    </div>
  );
}
