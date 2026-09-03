import { Trash2, AlertTriangle } from "lucide-react";

interface DeleteSoilModalProps {
  soilName: string;
  deleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteSoilModal({ soilName, deleting, onCancel, onConfirm }: DeleteSoilModalProps) {
  return (
    <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white shadow-xl">
      <div className="flex items-center justify-center bg-gradient-to-r from-rose-50 to-red-50 px-6 py-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <AlertTriangle size={28} />
        </div>
      </div>

      <div className="px-6 py-6 text-center">
        <h3 className="text-lg font-bold text-slate-900">Soil Test মুছে ফেলবেন?</h3>
        <p className="mt-2 text-sm text-slate-600">
          আপনি কি <span className="font-semibold">"{soilName}"</span> Soil Test record টি মুছে ফেলতে চান?
        </p>
        <p className="mt-2 text-xs text-slate-500">এই পদক্ষেপটি পূর্বাবাস করা যাবে না।</p>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
        <button
          onClick={onCancel}
          disabled={deleting}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          বাতিল করুন
        </button>
        <button
          onClick={onConfirm}
          disabled={deleting}
          className="rounded-lg bg-rose-600 px-4 py-2.5 font-medium text-white hover:bg-rose-700 disabled:opacity-50 flex items-center gap-2"
        >
          <Trash2 size={16} />
          {deleting ? "মুছছি..." : "মুছে ফেলুন"}
        </button>
      </div>
    </div>
  );
}
