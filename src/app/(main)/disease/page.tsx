"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getAuthUserClient } from "../../../lib/auth";
import {
  ArrowLeft,
  Upload,
  Bug,
  ShieldCheck,
  RotateCcw,
  Activity,
  AlertTriangle,
} from "lucide-react";

const translations = {
  en: {
    backToDashboard: "Back to Dashboard",
    diseaseDoctor: "AI Crop Doctor",
    uploadTitle: "Upload Leaf Image",
    uploadDesc: "Drag & drop or click to upload a photo of the affected plant leaf for diagnostic analysis.",
    diagnose: "Analyze Image",
    scanning: "AI Diagnostic Scanning in Progress...",
    symptoms: "Symptoms",
    organicTreatments: "Organic Treatment",
    chemicalTreatments: "Chemical Treatment",
    confidence: "Confidence Score",
    newScan: "Scan New Image",
    errorUpload: "Please select an image first.",
    mockResultTitle: "Late Blight (Phytophthora infestans)",
    mockResultTitleBn: "লেট ব্লাইট রোগ (ছত্রাকজনিত)",
    mockSymptoms: "Dark water-soaked lesions appear on leaves, which rapidly expand. A white, velvety fungal growth appears on the lower surface of leaves in humid conditions.",
    mockOrganic: "1. Uproot and burn severely infected plants immediately.\n2. Apply baking soda solution (5g/L) or copper-based bio-fungicides.\n3. Avoid overhead sprinkler irrigation to keep leaves dry.",
    mockChemical: "1. Spray Mancozeb (2g/L) or Metalaxyl-M (1.5g/L) on leaves at the first sign of blight.\n2. Apply fungicide uniformly, focusing on the lower leaf surfaces.",
  },
  bn: {
    backToDashboard: "ড্যাশবোর্ডে ফিরে যান",
    diseaseDoctor: "এআই শস্য ডাক্তার",
    uploadTitle: "পাতার ছবি আপলোড করুন",
    uploadDesc: "রোগ নির্ণয়ের জন্য আক্রান্ত ফসলের পাতার একটি পরিষ্কার ছবি ড্র্যাগ করুন অথবা ক্লিক করে আপলোড করুন।",
    diagnose: "রোগ নির্ণয় করুন",
    scanning: "এআই দ্বারা রোগ বিশ্লেষণ করা হচ্ছে...",
    symptoms: "লক্ষণসমূহ",
    organicTreatments: "জৈব সমাধান / নিরাময়",
    chemicalTreatments: "রাসায়নিক সমাধান",
    confidence: "নিশ্চয়তার হার",
    newScan: "নতুন রোগ পরীক্ষা",
    errorUpload: "দয়া করে প্রথমে একটি ছবি নির্বাচন করুন।",
    mockResultTitle: "লেট ব্লাইট রোগ (ছত্রাকজনিত)",
    mockResultTitleBn: "লেট ব্লাইট রোগ (ছত্রাকজনিত)",
    mockSymptoms: "পাতায় ভেজা কালচে দাগ দেখা দেয় যা দ্রুত ছড়িয়ে পড়ে। স্যাঁতসেঁতে আবহাওয়ায় পাতার নিচের পিঠে সাদাটে তুলার মতো ছত্রাক দেখা যায়।",
    mockOrganic: "১. আক্রান্ত গাছ দ্রুত উপড়ে ফেলে পুড়িয়ে ফেলুন।\n২. বেকিং সোডা দ্রবণ (৫ গ্রাম/লিটার) বা তামা-সমৃদ্ধ জৈব ছত্রাকনাশক প্রয়োগ করুন।\n৩. পাতার উপরিভাগে সরাসরি পানি দেওয়া পরিহার করুন যেন পাতা শুকনো থাকে।",
    mockChemical: "১. লক্ষণ দেখামাত্র ম্যানকোজেব (২ গ্রাম/লিটার) বা মেটালাক্সিল-এম (১.৫ গ্রাম/লিটার) ছত্রাকনাশক স্প্রে করুন।\n২. পাতার নিচে ও উপরে সমানভাবে ছত্রাকনাশক স্প্রে করুন।",
  }
};

export default function DiseaseDoctorPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = translations[lang];

  const [image, setImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = getAuthUserClient();
    if (!user) {
      router.push("/auth/login?redirect=/disease");
    }
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDiagnose = () => {
    if (!image) {
      setError(t.errorUpload);
      return;
    }

    setScanning(true);
    setScanProgress(10);
    setError("");

    // Simulate progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          setResult({
            title: t.mockResultTitle,
            titleBn: t.mockResultTitleBn,
            confidence: "94%",
            symptoms: t.mockSymptoms,
            organic: t.mockOrganic,
            chemical: t.mockChemical,
          });
          return 100;
        }
        return prev + 15;
      });
    }, 300);
  };

  const resetScan = () => {
    setImage(null);
    setResult(null);
    setScanProgress(0);
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Back navigation */}
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
          <h1 className="text-3xl font-bold text-[#16241C]">{t.diseaseDoctor}</h1>
        </div>

        {/* Disease diagnostic card */}
        {!result ? (
          <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm sm:p-8">
            {error && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-4 text-xs font-semibold text-red-700">
                {error}
              </div>
            )}

            {!scanning ? (
              <div className="space-y-6">
                {/* Upload box */}
                {!image ? (
                  <div className="relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#E4DFD1] bg-[#FAF8F3]/50 p-8 text-center transition hover:bg-[#EAF0E8]/10 hover:border-[#1F3D2B]/50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm text-[#6B7A6E] mb-4">
                      <Upload size={24} />
                    </div>
                    <p className="font-bold text-[#16241C] text-sm">{t.uploadTitle}</p>
                    <p className="text-xs text-[#6B7A6E] max-w-sm mt-2 leading-relaxed">
                      {t.uploadDesc}
                    </p>
                  </div>
                ) : (
                  <div className="relative overflow-hidden rounded-2xl border border-[#E4DFD1] max-h-80 flex items-center justify-center bg-black/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt="Selected leaf preview" className="max-h-80 object-contain" />
                    <button
                      onClick={resetScan}
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-red-600 hover:text-red-700 shadow shadow-black/10 hover:bg-white transition"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </div>
                )}

                <button
                  onClick={handleDiagnose}
                  className="flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] text-sm font-semibold text-white transition hover:bg-[#2F5943] shadow-lg shadow-green-900/10"
                >
                  <Activity size={16} />
                  {t.diagnose}
                </button>
              </div>
            ) : (
              /* Scanning Animation */
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="relative h-44 w-44 rounded-2xl border border-[#E4DFD1] overflow-hidden bg-black/5 mb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image!} alt="Scanning" className="h-full w-full object-cover" />
                  
                  {/* Laser Scanning Line */}
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-bounce" style={{ top: `${scanProgress}%` }} />
                  
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                
                <h3 className="font-bold text-[#1F3D2B] text-sm">{t.scanning}</h3>
                
                {/* Progress bar */}
                <div className="w-full max-w-xs bg-[#E4DFD1] h-2 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#1F3D2B] to-[#2F5943] rounded-full transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                </div>
                <span className="text-xs text-[#6B7A6E] mt-2 font-bold">{scanProgress}%</span>
              </div>
            )}
          </div>
        ) : (
          /* Result Details Card */
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
              <div className="flex flex-col justify-between gap-4 border-b border-[#FAF8F3] pb-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-red-600">
                      {lang === "bn" ? result.titleBn : result.title}
                    </h2>
                    <p className="text-xs text-[#6B7A6E] mt-0.5">
                      Phytophthora infestans (Late Blight)
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#EAF0E8] p-4 text-center sm:min-w-[120px]">
                  <p className="text-[10px] text-[#2F5943] font-semibold uppercase">{t.confidence}</p>
                  <p className="text-lg font-extrabold text-[#1F3D2B] mt-0.5">{result.confidence}</p>
                </div>
              </div>

              {/* Symptoms */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-[#16241C] uppercase tracking-wider mb-2">
                  {t.symptoms}
                </h3>
                <p className="text-xs leading-relaxed text-[#6B7A6E] bg-[#FAF8F3] p-4 rounded-xl border border-[#E4DFD1]/55">
                  {result.symptoms}
                </p>
              </div>

              {/* Organic Solution */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-[#2F5943] uppercase tracking-wider mb-2">
                  {t.organicTreatments}
                </h3>
                <p className="text-xs leading-relaxed text-[#6B7A6E] bg-[#EAF0E8]/40 p-4 rounded-xl border border-[#1F3D2B]/10 whitespace-pre-line">
                  {result.organic}
                </p>
              </div>

              {/* Chemical Solution */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-red-700 uppercase tracking-wider mb-2">
                  {t.chemicalTreatments}
                </h3>
                <p className="text-xs leading-relaxed text-[#6B7A6E] bg-red-50/20 p-4 rounded-xl border border-red-200/50 whitespace-pre-line">
                  {result.chemical}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
              <button
                onClick={resetScan}
                className="flex-1 h-12 items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] text-sm font-semibold text-white transition hover:bg-[#2F5943] shadow-md flex"
              >
                <ShieldCheck size={16} />
                {t.newScan}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
