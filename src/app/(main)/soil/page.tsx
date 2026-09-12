"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../contexts/LanguageContext";
import {
  ArrowLeft,
  Upload,
  Layers,
  RotateCcw,
  Loader2,
  Sprout,
  TrendingUp,
  Droplets,
  Activity,
  CheckCircle2,
  TestTube2,
} from "lucide-react";

const translations = {
  en: {
    backToDashboard: "Back to Dashboard",
    soilDoctor: "AI Soil Analyzer",
    uploadTitle: "Upload Soil Image",
    uploadDesc:
      "Drag & drop or click to upload a clear photo of your soil for analysis.",
    analyze: "Analyze Soil",
    scanning: "AI is analyzing your soil sample...",
    characteristics: "Observed Characteristics",
    suitableCrops: "Suitable Crops",
    soilImprovements: "Soil Improvement Steps",
    confidence: "Confidence Score",
    estimatedPh: "Estimated pH",
    moistureLevel: "Moisture Level",
    organicMatter: "Organic Matter",
    soilType: "Soil Type",
    newScan: "Analyze New Sample",
    errorUpload: "Please select an image first.",
    uploading: "Uploading image...",
    uploadFailed: "Image upload failed. Please try again.",
    analysisFailed: "AI soil analysis failed. Please try again.",
  },

  bn: {
    backToDashboard: "ড্যাশবোর্ডে ফিরে যান",
    soilDoctor: "এআই মাটি পরীক্ষক",
    uploadTitle: "মাটির ছবি আপলোড করুন",
    uploadDesc:
      "মাটি পরীক্ষার জন্য মাটির একটি পরিষ্কার ছবি ড্র্যাগ করুন অথবা ক্লিক করে আপলোড করুন।",
    analyze: "মাটি পরীক্ষা করুন",
    scanning: "এআই আপনার মাটির নমুনা বিশ্লেষণ করছে...",
    characteristics: "দেখা যাওয়া বৈশিষ্ট্যসমূহ",
    suitableCrops: "উপযুক্ত ফসলসমূহ",
    soilImprovements: "মাটি উন্নতির উপায়",
    confidence: "নিশ্চয়তার হার",
    estimatedPh: "আনূমানিক পিএইচ (pH)",
    moistureLevel: "আর্দ্রতার মাত্রা",
    organicMatter: "জৈব উপাদান",
    soilType: "মাটির ধরন",
    newScan: "নতুন মাটি পরীক্ষা",
    errorUpload: "দয়া করে প্রথমে একটি ছবি নির্বাচন করুন।",
    uploading: "ছবি আপলোড হচ্ছে...",
    uploadFailed: "ছবি আপলোড ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
    analysisFailed: "এআই মাটি বিশ্লেষণ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
  },
} as const;

type SoilResult = {
  soilType: string;
  confidence: number | string;
  estimatedPh: string;
  moistureLevel: string;
  organicMatterContent: string;
  suitableCrops?: string[];
  soilImprovements?: string[];
  characteristics?: string[];
};

export default function SoilDoctorPage() {
  const router = useRouter();
  const { lang } = useLanguage();

  const t = translations[lang];

  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<SoilResult | null>(null);
  const [error, setError] = useState("");

  // Image upload
  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        throw new Error(
          data.error?.message || "Image upload failed"
        );
      }

      const optimizedUrl = data.secure_url.replace(
        "/upload/",
        "/upload/f_auto,q_auto,w_800/"
      );

      setImageUrl(optimizedUrl);
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      setError(t.uploadFailed);
      setImage(null);
    } finally {
      setUploading(false);
    }
  };

  // AI Soil Analysis
  const handleAnalyze = async () => {
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

      const response = await fetch(`${serverUrl}/api/soil`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          language: lang,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.analysisFailed);
      }

      setResult(data.result);
    } catch (error) {
      console.error("AI soil analysis error:", error);
      setError(
        error instanceof Error ? error.message : t.analysisFailed
      );
    } finally {
      setScanning(false);
    }
  };

  // Reset
  const resetScan = () => {
    setImage(null);
    setImageUrl("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#1F3D2B] transition hover:text-[#2F5943]"
        >
          <ArrowLeft size={16} />
          {t.backToDashboard}
        </button>

        {/* Page Title */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF0E8] text-amber-800">
            <TestTube2 size={24} />
          </div>

          <h1 className="text-3xl font-bold text-[#16241C]">
            {t.soilDoctor}
          </h1>
        </div>

        {/* UPLOAD / SCAN SECTION */}
        {!result ? (
          <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm sm:p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
                {error}
              </div>
            )}

            {/* Scanning State */}
            {scanning ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="relative mb-6 h-44 w-44 overflow-hidden rounded-2xl border border-[#E4DFD1] bg-black/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image || undefined}
                    alt="Scanning soil"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 top-0 h-1 animate-[scan_2s_ease-in-out_infinite] bg-amber-600 shadow-lg shadow-amber-600/50" />
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

                <p className="mt-2 text-xs text-[#6B7A6E]">Please wait...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Upload Area */}
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
                      alt="Selected soil sample"
                      className="max-h-80 object-contain"
                    />

                    <button
                      onClick={resetScan}
                      disabled={uploading || scanning}
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-red-600 shadow shadow-black/10 transition hover:bg-white hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
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

                {/* Analyze Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={!imageUrl || uploading}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-[#2F5943] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <TestTube2 size={16} />
                  {uploading ? t.uploading : t.analyze}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* RESULT SECTION */
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
              {/* Main Info Header */}
              <div className="flex flex-col justify-between gap-4 border-b border-[#FAF8F3] pb-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF0E8] text-amber-800">
                    <TestTube2 size={24} />
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7A6E]">
                      {t.soilType}
                    </span>
                    <h2 className="text-2xl font-bold text-[#16241C]">
                      {result.soilType}
                    </h2>
                  </div>
                </div>

                {/* Confidence */}
                <div className="rounded-2xl bg-[#EAF0E8] p-4 text-center sm:min-w-[120px]">
                  <p className="text-[10px] font-semibold uppercase text-[#2F5943]">
                    {t.confidence}
                  </p>
                  <p className="mt-0.5 text-lg font-extrabold text-[#1F3D2B]">
                    {result.confidence}%
                  </p>
                </div>
              </div>

              {/* Key Indicators Grid */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-[#E4DFD1]/60 bg-[#FAF8F3] p-4">
                  <div className="mb-1 flex items-center gap-2 text-amber-700">
                    <Activity size={16} />
                    <span className="text-xs font-semibold">{t.estimatedPh}</span>
                  </div>
                  <p className="text-base font-bold text-[#16241C]">
                    {result.estimatedPh}
                  </p>
                </div>

                <div className="rounded-xl border border-[#E4DFD1]/60 bg-[#FAF8F3] p-4">
                  <div className="mb-1 flex items-center gap-2 text-blue-600">
                    <Droplets size={16} />
                    <span className="text-xs font-semibold">{t.moistureLevel}</span>
                  </div>
                  <p className="text-base font-bold text-[#16241C]">
                    {result.moistureLevel}
                  </p>
                </div>

                <div className="rounded-xl border border-[#E4DFD1]/60 bg-[#FAF8F3] p-4">
                  <div className="mb-1 flex items-center gap-2 text-emerald-700">
                    <Sprout size={16} />
                    <span className="text-xs font-semibold">{t.organicMatter}</span>
                  </div>
                  <p className="text-base font-bold text-[#16241C]">
                    {result.organicMatterContent}
                  </p>
                </div>
              </div>

              {/* Characteristics */}
              <div className="mt-6">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#1F3D2B]">
                  {t.characteristics}
                </h3>
                <div className="rounded-xl border border-[#E4DFD1]/55 bg-[#FAF8F3] p-4">
                  <ul className="list-disc space-y-2 pl-5">
                    {Array.isArray(result.characteristics) &&
                      result.characteristics.map((item, index) => (
                        <li key={index} className="text-xs text-[#6B7A6E]">
                          {item}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              {/* Suitable Crops */}
              <div className="mt-6">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#1F3D2B]">
                  {t.suitableCrops}
                </h3>
                <div className="rounded-xl border border-[#1F3D2B]/10 bg-[#EAF0E8]/40 p-4">
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(result.suitableCrops) &&
                      result.suitableCrops.map((crop, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-[#1F3D2B] shadow-sm"
                        >
                          <CheckCircle2 size={12} className="text-emerald-600" />
                          {crop}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              {/* Soil Improvement Steps */}
              <div className="mt-6">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#1F3D2B]">
                  {t.soilImprovements}
                </h3>
                <div className="rounded-xl border border-amber-200/60 bg-amber-50/30 p-4">
                  <ul className="list-disc space-y-2 pl-5">
                    {Array.isArray(result.soilImprovements) &&
                      result.soilImprovements.map((item, index) => (
                        <li key={index} className="text-xs text-[#6B7A6E]">
                          {item}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              {/* New Scan Button */}
              <div className="mt-8">
                <button
                  onClick={resetScan}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] text-sm font-semibold text-white shadow-md transition hover:bg-[#2F5943]"
                >
                  <TrendingUp size={16} />
                  {t.newScan}
                </button>
              </div>
            </div>
          </div>
        )}
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