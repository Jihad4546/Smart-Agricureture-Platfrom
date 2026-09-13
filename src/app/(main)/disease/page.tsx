"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../contexts/LanguageContext";
import {
  ArrowLeft,
  Upload,
  Bug,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  Loader2,
  History,
  Clock,
  ChevronRight,
} from "lucide-react";

const translations = {
  en: {
    backToDashboard: "Back to Dashboard",
    diseaseDoctor: "AI Crop Doctor",
    uploadTitle: "Upload Leaf Image",
    uploadDesc:
      "Drag & drop or click to upload a photo of the affected plant leaf for diagnostic analysis.",
    diagnose: "Analyze Image",
    scanning: "AI is analyzing your crop image...",
    symptoms: "Symptoms",
    organicTreatments: "Organic Treatment",
    chemicalTreatments: "Chemical Treatment",
    prevention: "Prevention",
    confidence: "Confidence Score",
    newScan: "Scan New Image",
    errorUpload: "Please select an image first.",
    uploading: "Uploading image...",
    uploadFailed: "Image upload failed. Please try again.",
    diagnosisFailed: "AI diagnosis failed. Please try again.",
    historyTitle: "Scan History",
    noHistory: "No previous diagnoses found.",
    viewDetails: "View Details",
  },

  bn: {
    backToDashboard: "ড্যাশবোর্ডে ফিরে যান",
    diseaseDoctor: "এআই শস্য ডাক্তার",
    uploadTitle: "ফসলের ছবি আপলোড করুন",
    uploadDesc:
      "রোগ নির্ণয়ের জন্য আক্রান্ত ফসলের পাতার একটি পরিষ্কার ছবি ড্র্যাগ করুন অথবা ক্লিক করে আপলোড করুন।",
    diagnose: "রোগ নির্ণয় করুন",
    scanning: "এআই আপনার ফসলের ছবি বিশ্লেষণ করছে...",
    symptoms: "লক্ষণসমূহ",
    organicTreatments: "জৈব সমাধান / নিরাময়",
    chemicalTreatments: "রাসায়নিক সমাধান",
    prevention: "প্রতিরোধ",
    confidence: "নিশ্চয়তার হার",
    newScan: "নতুন রোগ পরীক্ষা",
    errorUpload: "দয়া করে প্রথমে একটি ছবি নির্বাচন করুন।",
    uploading: "ছবি আপলোড হচ্ছে...",
    uploadFailed: "ছবি আপলোড ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
    diagnosisFailed: "এআই রোগ নির্ণয় ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
    historyTitle: "পূর্বের পরীক্ষাসমূহ",
    noHistory: "কোনো আগের ইতিহাস পাওয়া যায়নি।",
    viewDetails: "বিস্তারিত দেখুন",
  },
} as const;

type DiagnosisResult = {
  id?: string;
  disease: string;
  scientificName?: string;
  confidence: number | string;
  symptoms?: string[];
  organicTreatment?: string[];
  chemicalTreatment?: string[];
  prevention?: string[];
  imageUrl?: string;
  createdAt?: string;
};

export default function DiseaseDoctorPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = translations[lang];

  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState("");

  // History state
  const [historyList, setHistoryList] = useState<DiagnosisResult[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Fetch History from backend API
  const fetchHistory = async () => {
    try {
      setLoadingHistory(true);
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      if (!serverUrl) return;

      const res = await fetch(`${serverUrl}/api/diagnose/history`);
      if (res.ok) {
        const data = await res.json();
        setHistoryList(data.history || []);
      }
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setResult(null);
    setImageUrl("");

    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const preview = reader.result;
      if (typeof preview === "string") {
        setImage(preview);
      } else {
        setError("Unable to read the selected image.");
      }
    };
    reader.readAsDataURL(file);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setError("Cloudinary configuration is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      setUploading(true);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "Image upload failed");
      }

      const optimizedUrl = data.secure_url.replace(
        "/upload/",
        "/upload/f_auto,q_auto,w_800/"
      );
      setImageUrl(optimizedUrl);
    } catch (error) {
      setError(t.uploadFailed);
      setImage(null);
    } finally {
      setUploading(false);
    }
  };

  const handleDiagnose = async () => {
    if (!imageUrl) {
      setError(t.errorUpload);
      return;
    }

    try {
      setScanning(true);
      setError("");
      setResult(null);

      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      if (!serverUrl) {
        throw new Error("Server URL configuration is missing.");
      }

      const response = await fetch(`${serverUrl}/api/diagnose`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, language: lang }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || t.diagnosisFailed);
      }

      setResult(data.result);
      fetchHistory(); // Refresh history after new scan
    } catch (error) {
      setError(
        error instanceof Error ? error.message : t.diagnosisFailed
      );
    } finally {
      setScanning(false);
    }
  };

  const resetScan = () => {
    setImage(null);
    setImageUrl("");
    setResult(null);
    setError("");
  };

  const selectHistoryItem = (item: DiagnosisResult) => {
    setResult(item);
    if (item.imageUrl) {
      setImage(item.imageUrl);
      setImageUrl(item.imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#1F3D2B] transition hover:text-[#2F5943]"
        >
          <ArrowLeft size={16} />
          {t.backToDashboard}
        </button>

        {/* Page Title */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-700">
            <Bug size={24} />
          </div>
          <h1 className="text-3xl font-bold text-[#16241C]">
            {t.diseaseDoctor}
          </h1>
        </div>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT CONTENT (Scanner & Results) - 2 Columns on large screens */}
          <div className="lg:col-span-2">
            {!result ? (
              <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm sm:p-8">
                {error && (
                  <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
                    {error}
                  </div>
                )}

                {scanning ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="relative mb-6 h-44 w-44 overflow-hidden rounded-2xl border border-[#E4DFD1] bg-black/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image || undefined}
                        alt="Scanning crop"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-x-0 top-0 h-1 animate-[scan_2s_ease-in-out_infinite] bg-red-500 shadow-lg shadow-red-500/50" />
                    </div>

                    <div className="flex items-center gap-2">
                      <Loader2
                        size={18}
                        className="animate-spin text-[#1F3D2B]"
                      />
                      <h3 className="text-sm font-bold text-[#1F3D2B]">
                        {t.scanning}
                      </h3>
                    </div>
                    <p className="mt-2 text-xs text-[#6B7A6E]">
                      Please wait...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {!image ? (
                      <div className="relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#E4DFD1] bg-[#FAF8F3]/50 p-8 text-center transition hover:border-[#1F3D2B]/50 hover:bg-[#EAF0E8]/10">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="absolute inset-0 cursor-pointer opacity-0"
                        />
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#6B7A6E] shadow-sm">
                          <Upload size={24} />
                        </div>
                        <p className="text-sm font-bold text-[#16241C]">
                          {t.uploadTitle}
                        </p>
                        <p className="mt-2 max-w-sm text-xs leading-relaxed text-[#6B7A6E]">
                          {t.uploadDesc}
                        </p>
                      </div>
                    ) : (
                      <div className="relative flex max-h-80 items-center justify-center overflow-hidden rounded-2xl border border-[#E4DFD1] bg-black/5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image}
                          alt="Selected crop"
                          className="max-h-80 object-contain"
                        />
                        <button
                          onClick={resetScan}
                          disabled={uploading || scanning}
                          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-red-600 shadow transition hover:bg-white hover:text-red-700 disabled:opacity-50"
                        >
                          <RotateCcw size={16} />
                        </button>
                        {uploading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-semibold text-[#1F3D2B] shadow-lg">
                              <Loader2 size={16} className="animate-spin" />
                              {t.uploading}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <button
                      onClick={handleDiagnose}
                      disabled={!imageUrl || uploading}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] text-sm font-semibold text-white shadow-lg transition hover:bg-[#2F5943] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Bug size={16} />
                      {uploading ? t.uploading : t.diagnose}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* RESULT SECTION */
              <div className="space-y-6">
                <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
                  <div className="flex flex-col justify-between gap-4 border-b border-[#FAF8F3] pb-6 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                        <AlertTriangle size={24} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-red-600">
                          {result.disease}
                        </h2>
                        {result.scientificName && (
                          <p className="mt-0.5 text-xs text-[#6B7A6E]">
                            {result.scientificName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-[#EAF0E8] p-4 text-center sm:min-w-[120px]">
                      <p className="text-[10px] font-semibold uppercase text-[#2F5943]">
                        {t.confidence}
                      </p>
                      <p className="mt-0.5 text-lg font-extrabold text-[#1F3D2B]">
                        {result.confidence}%
                      </p>
                    </div>
                  </div>

                  {/* Symptoms */}
                  {result.symptoms && result.symptoms.length > 0 && (
                    <div className="mt-6">
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#1F3D2B]">
                        {t.symptoms}
                      </h3>
                      <div className="rounded-xl border border-[#E4DFD1]/55 bg-[#FAF8F3] p-4">
                        <ul className="list-disc space-y-2 pl-5">
                          {result.symptoms.map((symptom, index) => (
                            <li key={index} className="text-xs text-[#6B7A6E]">
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Organic Treatment */}
                  {result.organicTreatment &&
                    result.organicTreatment.length > 0 && (
                      <div className="mt-6">
                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#1F3D2B]">
                          {t.organicTreatments}
                        </h3>
                        <div className="rounded-xl border border-[#1F3D2B]/10 bg-[#EAF0E8]/40 p-4">
                          <ul className="list-disc space-y-2 pl-5">
                            {result.organicTreatment.map((treatment, index) => (
                              <li key={index} className="text-xs text-[#6B7A6E]">
                                {treatment}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                  {/* Chemical Treatment */}
                  {result.chemicalTreatment &&
                    result.chemicalTreatment.length > 0 && (
                      <div className="mt-6">
                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-red-600">
                          {t.chemicalTreatments}
                        </h3>
                        <div className="rounded-xl border border-red-200/50 bg-red-50/20 p-4">
                          <ul className="list-disc space-y-2 pl-5">
                            {result.chemicalTreatment.map((treatment, index) => (
                              <li key={index} className="text-xs text-[#6B7A6E]">
                                {treatment}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                  {/* Prevention */}
                  {result.prevention && result.prevention.length > 0 && (
                    <div className="mt-6">
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#1F3D2B]">
                        {t.prevention}
                      </h3>
                      <div className="rounded-xl border border-[#1F3D2B]/10 bg-[#EAF0E8]/40 p-4">
                        <ul className="list-disc space-y-2 pl-5">
                          {result.prevention.map((item, index) => (
                            <li key={index} className="text-xs text-[#6B7A6E]">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={resetScan}
                      className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] text-sm font-semibold text-white shadow-md transition hover:bg-[#2F5943]"
                    >
                      <ShieldCheck size={16} />
                      {t.newScan}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR (Scan History) - 1 Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 border-b border-[#FAF8F3] pb-4">
                <History size={20} className="text-[#1F3D2B]" />
                <h2 className="text-lg font-bold text-[#16241C]">
                  {t.historyTitle}
                </h2>
              </div>

              {loadingHistory ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 size={24} className="animate-spin text-[#1F3D2B]" />
                </div>
              ) : historyList.length === 0 ? (
                <p className="py-6 text-center text-xs text-[#6B7A6E]">
                  {t.noHistory}
                </p>
              ) : (
                <div className="max-h-[600px] space-y-3 overflow-y-auto pr-1">
                  {historyList.map((item, idx) => (
                    <button
                      key={item.id || idx}
                      onClick={() => selectHistoryItem(item)}
                      className="group flex w-full items-center justify-between rounded-2xl border border-[#E4DFD1]/60 bg-[#FAF8F3]/50 p-3 text-left transition hover:border-[#1F3D2B]/40 hover:bg-[#EAF0E8]/30"
                    >
                      <div className="flex items-center gap-3">
                        {item.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.imageUrl}
                            alt={item.disease}
                            className="h-12 w-12 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                            <Bug size={18} />
                          </div>
                        )}
                        <div>
                          <h4 className="text-xs font-bold text-[#16241C] line-clamp-1">
                            {item.disease}
                          </h4>
                          <p className="mt-0.5 flex items-center gap-1 text-[10px] text-[#6B7A6E]">
                            <Clock size={10} />
                            {item.createdAt
                              ? new Date(item.createdAt).toLocaleDateString()
                              : "Recently"}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        size={16}
                        className="text-[#6B7A6E] transition group-hover:translate-x-0.5 group-hover:text-[#1F3D2B]"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            top: 0%;
          }
          50% {
            top: 95%;
          }
          100% {
            top: 0%;
          }
        }
      `}</style>
    </div>
  );
}