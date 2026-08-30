interface DeleteCropModalProps {
  cropName: string;
  onCancel: () => void;
  onConfirm: () => void;
  deleting: boolean;
}

export default function DeleteCropModal({ cropName, onCancel, onConfirm, deleting }: DeleteCropModalProps) {
  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
      <div className="mb-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <span className="text-2xl">⚠️</span>
        </div>
      </div>
      <h3 className="text-center text-xl font-bold text-slate-900">আপনি কি এই ফসলটি মুছে ফেলতে চান?</h3>
      <p className="mt-2 text-center text-sm text-slate-600">{cropName}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button onClick={onCancel} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-700">
          Cancel
        </button>
        <button onClick={onConfirm} disabled={deleting} className="rounded-xl bg-rose-600 px-4 py-2.5 font-medium text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-rose-300">
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
