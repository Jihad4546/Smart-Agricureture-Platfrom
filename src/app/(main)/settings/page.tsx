"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getAuthUserClient } from "../../../lib/auth";
import { ArrowLeft, Settings, Globe, Bell, RefreshCw, Moon, Sun } from "lucide-react";

const translations = {
  en: {
    backToDashboard: "Back to Dashboard",
    settings: "Settings & Configuration",
    langPref: "Language Preference",
    currentLang: "Active Language",
    notifications: "Alerts & Notifications",
    smsAlerts: "Enable SMS Weather Warnings",
    pushAlerts: "Enable Crop Doctor Notifications",
    resetData: "System Reset / Clear Cache",
    resetDesc: "Warning: This will clear all added crops, financial logs, and orders from your browser storage.",
    resetBtn: "Reset Local Database",
    successReset: "Local database has been reset to defaults.",
    saveBtn: "Save Settings",
    saved: "Settings updated successfully!",
    themePref: "Theme Preference (Mock)",
    light: "Light",
    dark: "Dark",
  },
  bn: {
    backToDashboard: "ড্যাশবোর্ডে ফিরে যান",
    settings: "সেটিংস ও কনফিগারেশন",
    langPref: "ভাষার পছন্দ",
    currentLang: "সক্রিয় ভাষা",
    notifications: "সতর্কতা ও নোটিফিকেশন",
    smsAlerts: "এসএমএস আবহাওয়া সতর্কতা চালু করুন",
    pushAlerts: "ক্রপ ডক্টর নোটিফিকেশন চালু করুন",
    resetData: "সিস্টেম রিসেট / ক্যাশ মুছুন",
    resetDesc: "সতর্কতা: এটি আপনার ব্রাউজার স্টোরেজ থেকে সমস্ত যুক্ত করা ফসল, আর্থিক লগ এবং অর্ডার মুছে ফেলবে।",
    resetBtn: "ডাটাবেস রিসেট করুন",
    successReset: "লোকাল ডাটাবেস সফলভাবে রিসেট করা হয়েছে।",
    saveBtn: "সেটিংস সংরক্ষণ করুন",
    saved: "সেটিংস সফলভাবে আপডেট করা হয়েছে!",
    themePref: "থিম পছন্দ (মক)",
    light: "লাইট",
    dark: "ডার্ক",
  }
};

export default function SettingsPage() {
  const router = useRouter();
  const { lang, toggleLang } = useLanguage();
  const t = translations[lang];

  const [sms, setSms] = useState(true);
  const [push, setPush] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    const user = getAuthUserClient();
    if (!user) {
      router.push("/auth/login?redirect=/settings");
    }
  }, [router]);

  const handleReset = () => {
    if (!confirm(t.resetBtn + "?")) return;
    localStorage.removeItem("farmer_crops");
    localStorage.removeItem("farm_finance");
    localStorage.removeItem("farmer_cart");
    localStorage.removeItem("farmer_orders");
    alert(t.successReset);
    router.push("/dashboard");
    router.refresh();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMsg(t.saved);
    setTimeout(() => setSavedMsg(""), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Navigation Link */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#1F3D2B] transition hover:text-[#2F5943]"
        >
          <ArrowLeft size={16} />
          {t.backToDashboard}
        </button>

        {/* Page Title */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF0E8] text-[#1F3D2B]">
            <Settings size={24} />
          </div>
          <h1 className="text-3xl font-bold text-[#16241C]">{t.settings}</h1>
        </div>

        {savedMsg && (
          <div className="mb-6 rounded-xl bg-green-50 border border-green-200 p-4 text-xs font-semibold text-[#1F3D2B]">
            {savedMsg}
          </div>
        )}

        <div className="space-y-6">
          {/* Language Selection */}
          <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-[#16241C] mb-4 flex items-center gap-2">
              <Globe size={18} className="text-[#1F3D2B]" />
              {t.langPref}
            </h2>

            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6B7A6E] font-medium">{t.currentLang}</span>
              
              <button
                onClick={toggleLang}
                className="h-10 rounded-xl bg-[#EAF0E8] px-4 text-xs font-bold text-[#1F3D2B] hover:bg-[#D8E4D5] transition"
              >
                {lang === "en" ? "English 🌐" : "বাংলা 🌐"}
              </button>
            </div>
          </div>

          {/* Alert Toggles */}
          <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-[#16241C] mb-4 flex items-center gap-2">
              <Bell size={18} className="text-[#1F3D2B]" />
              {t.notifications}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-[#FAF8F3]">
                <label className="text-xs text-[#6B7A6E] font-semibold">{t.smsAlerts}</label>
                <input
                  type="checkbox"
                  checked={sms}
                  onChange={(e) => setSms(e.target.checked)}
                  className="h-5 w-5 accent-[#1F3D2B] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-[#FAF8F3]">
                <label className="text-xs text-[#6B7A6E] font-semibold">{t.pushAlerts}</label>
                <input
                  type="checkbox"
                  checked={push}
                  onChange={(e) => setPush(e.target.checked)}
                  className="h-5 w-5 accent-[#1F3D2B] cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="flex w-full h-11 items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] text-xs font-semibold text-white transition hover:bg-[#2F5943] shadow-md mt-4"
              >
                {t.saveBtn}
              </button>
            </form>
          </div>

          {/* Theme Mock Options */}
          <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-[#16241C] mb-4 flex items-center gap-2">
              <Moon size={18} className="text-[#1F3D2B]" />
              {t.themePref}
            </h2>

            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6B7A6E] font-semibold">Active Theme</span>
              <div className="flex bg-[#FAF8F3] border border-[#E4DFD1] rounded-xl p-1 gap-1">
                <button
                  onClick={() => setDarkMode(false)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    !darkMode ? "bg-white text-[#1F3D2B] shadow-sm" : "text-[#6B7A6E] hover:text-[#1F3D2B]"
                  }`}
                >
                  <Sun size={14} />
                  {t.light}
                </button>
                <button
                  onClick={() => setDarkMode(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    darkMode ? "bg-white text-[#1F3D2B] shadow-sm" : "text-[#6B7A6E] hover:text-[#1F3D2B]"
                  }`}
                >
                  <Moon size={14} />
                  {t.dark}
                </button>
              </div>
            </div>
          </div>

          {/* Clear Cache */}
          <div className="rounded-3xl border border-red-200 bg-red-50/20 p-6 shadow-sm">
            <h2 className="text-base font-bold text-red-700 mb-2 flex items-center gap-2">
              <RefreshCw size={18} />
              {t.resetData}
            </h2>
            <p className="text-xs text-[#6B7A6E] leading-relaxed mb-4">
              {t.resetDesc}
            </p>
            <button
              onClick={handleReset}
              className="flex w-full h-11 items-center justify-center gap-2 rounded-xl bg-red-700 text-xs font-semibold text-white transition hover:bg-red-800 shadow-md"
            >
              {t.resetBtn}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
