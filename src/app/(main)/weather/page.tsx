"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../contexts/LanguageContext";
import {
  ArrowLeft,
  CloudSun,
  Droplets,
  Wind,
  Sun,
  CloudRain,
  CloudLightning,
  AlertTriangle,
  Info,
} from "lucide-react";

const translations = {
  en: {
    backToDashboard: "Back to Dashboard",
    weatherForecast: "Weather & Alerts",
    currentWeather: "Current Weather",
    forecast7Day: "7-Day Forecast",
    activeAlerts: "Severe Weather Alerts",
    dhaka: "Dhaka, Bangladesh",
    humidity: "Humidity",
    windSpeed: "Wind Speed",
    uvIndex: "UV Index",
    pressure: "Pressure",
    advisory: "Farming Advisory",
    tempLowHigh: "Low / High",
    
    // Alert Details
    heavyRain: "Heavy Rainfall Warning",
    heavyRainDesc: "Expected within next 48 hours due to monsoon depression. Rain accumulation may exceed 100mm.",
    pestAdvice: "Late Blight Risk",
    pestAdviceDesc: "High humidity (>85%) and temperature between 15-22°C are favorable for late blight in potato. Spray recommended fungicide if needed.",
    advisoryTitle: "Special Advisory for Farmers",
    advisoryText: "1. Clean drainage channels in potato and vegetable fields to prevent logging.\n2. Delay harvesting of Aman rice and store harvested grains in dry shelter.\n3. Postpone spray of pesticides and fertilizer until rain stops.",

    // Weather states
    sunny: "Sunny",
    partlyCloudy: "Partly Cloudy",
    cloudy: "Cloudy",
    rainy: "Rainy",
    thunderstorm: "Thunderstorm",
  },
  bn: {
    backToDashboard: "ড্যাশবোর্ডে ফিরে যান",
    weatherForecast: "আবহাওয়া ও সতর্কতা",
    currentWeather: "বর্তমান আবহাওয়া",
    forecast7Day: "৭ দিনের পূর্বাভাস",
    activeAlerts: "তীব্র আবহাওয়ার সতর্কতা",
    dhaka: "ঢাকা, বাংলাদেশ",
    humidity: "আর্দ্রতা",
    windSpeed: "বাতাসের গতি",
    uvIndex: "ইউভি ইনডেক্স",
    pressure: "বায়ুচাপ",
    advisory: "কৃষি পরামর্শ",
    tempLowHigh: "সর্বনিম্ন / সর্বোচ্চ",

    // Alert Details
    heavyRain: "ভারী বর্ষণের সতর্কতা",
    heavyRainDesc: "বর্ষাকালীন নিম্নচাপের কারণে আগামী ৪৮ ঘণ্টার মধ্যে ভারী বৃষ্টিপাতের সম্ভাবনা রয়েছে। মোট বৃষ্টিপাত ১০০ মিমি অতিক্রম করতে পারে।",
    pestAdvice: "লেট ব্লাইট রোগ ঝুঁকি",
    pestAdviceDesc: "অতিরিক্ত আর্দ্রতা (৮৫% এর বেশি) এবং ১৫-২২°C তাপমাত্রা আলুর ব্লাইট রোগের জন্য অনুকূল। প্রয়োজনে ছত্রাকনাশক স্প্রে করুন।",
    advisoryTitle: "কৃষকদের জন্য বিশেষ পরামর্শ",
    advisoryText: "১. আলু ও সবজি ক্ষেতে পানি নিষ্কাশনের জন্য নালা পরিষ্কার রাখুন।\n২. আমন ধান কাটা বিলম্বিত করুন এবং সংগৃহীত ধান শুকনো জায়গায় রাখুন।\n৩. বৃষ্টি না থামা পর্যন্ত কীটনাশক ও সার প্রয়োগ স্থগিত রাখুন।",

    // Weather states
    sunny: "রৌদ্রোজ্জ্বল",
    partlyCloudy: "আংশিক মেঘলা",
    cloudy: "মেঘলা",
    rainy: "বৃষ্টি",
    thunderstorm: "বজ্রঝড়",
  }
};

export default function WeatherPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = translations[lang];

  const currentDetails = {
    temp: "28°C",
    condition: lang === "bn" ? "আংশিক মেঘলা" : "Partly Cloudy",
    humidity: "68%",
    wind: "12 km/h",
    uv: "5 (Moderate)",
    pressure: "1008 hPa",
  };

  const forecastData = [
    { day: lang === "bn" ? "শুক্রবার" : "Fri", temp: "28°C / 24°C", icon: CloudRain, cond: lang === "bn" ? t.rainy : t.rainy },
    { day: lang === "bn" ? "শনিবার" : "Sat", temp: "27°C / 23°C", icon: CloudLightning, cond: lang === "bn" ? t.thunderstorm : t.thunderstorm },
    { day: lang === "bn" ? "রবিবার" : "Sun", temp: "29°C / 25°C", icon: CloudRain, cond: lang === "bn" ? t.rainy : t.rainy },
    { day: lang === "bn" ? "সোমবার" : "Mon", temp: "31°C / 26°C", icon: CloudSun, cond: lang === "bn" ? t.partlyCloudy : t.partlyCloudy },
    { day: lang === "bn" ? "মঙ্গলবার" : "Tue", temp: "32°C / 27°C", icon: Sun, cond: lang === "bn" ? t.sunny : t.sunny },
    { day: lang === "bn" ? "বুধবার" : "Wed", temp: "32°C / 26°C", icon: Sun, cond: lang === "bn" ? t.sunny : t.sunny },
    { day: lang === "bn" ? "বৃহস্পতিবার" : "Thu", temp: "30°C / 25°C", icon: CloudSun, cond: lang === "bn" ? t.partlyCloudy : t.partlyCloudy },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF0E8] text-[#1F3D2B]">
            <CloudSun size={24} />
          </div>
          <h1 className="text-3xl font-bold text-[#16241C]">{t.weatherForecast}</h1>
        </div>

        {/* Grid layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* Current weather and forecast details (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Current Weather Card */}
            <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#16241C] mb-4">{t.currentWeather}</h2>
              
              <div className="flex flex-col items-center justify-between gap-6 sm:flex-row rounded-2xl bg-gradient-to-br from-[#1F3D2B] to-[#2F5943] p-6 text-white">
                <div>
                  <p className="text-sm opacity-80">{t.dhaka}</p>
                  <p className="text-5xl font-extrabold mt-2">{currentDetails.temp}</p>
                  <p className="text-sm font-medium mt-1 opacity-90">{currentDetails.condition}</p>
                </div>
                <CloudSun size={80} className="text-[#E0A458]" />
              </div>

              {/* Specs Grid */}
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mt-6 border-t border-[#FAF8F3] pt-6 text-sm">
                <div>
                  <p className="text-[#6B7A6E] text-xs font-semibold uppercase">{t.humidity}</p>
                  <p className="text-lg font-bold text-[#16241C] mt-1">{currentDetails.humidity}</p>
                </div>
                <div>
                  <p className="text-[#6B7A6E] text-xs font-semibold uppercase">{t.windSpeed}</p>
                  <p className="text-lg font-bold text-[#16241C] mt-1">{currentDetails.wind}</p>
                </div>
                <div>
                  <p className="text-[#6B7A6E] text-xs font-semibold uppercase">{t.uvIndex}</p>
                  <p className="text-lg font-bold text-[#16241C] mt-1">{currentDetails.uv}</p>
                </div>
                <div>
                  <p className="text-[#6B7A6E] text-xs font-semibold uppercase">{t.pressure}</p>
                  <p className="text-lg font-bold text-[#16241C] mt-1">{currentDetails.pressure}</p>
                </div>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#16241C] mb-4">{t.forecast7Day}</h2>
              <div className="space-y-4">
                {forecastData.map((dayData, index) => {
                  const IconComp = dayData.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF8F3]/50 hover:bg-[#FAF8F3] border border-transparent hover:border-[#E4DFD1]/55 transition text-sm">
                      <span className="font-bold text-[#16241C] w-24">{dayData.day}</span>
                      <div className="flex items-center gap-2 text-[#6B7A6E]">
                        <IconComp size={18} className="text-[#C6863A]" />
                        <span>{dayData.cond}</span>
                      </div>
                      <span className="font-bold text-[#1F3D2B] text-right">{dayData.temp}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Warnings & Advisories (1 col) */}
          <div className="space-y-6">
            
            {/* Severe Warnings */}
            <div className="rounded-3xl border border-red-200 bg-red-50/40 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#9B1C1C] mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-[#9B1C1C]" />
                {t.activeAlerts}
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-amber-500 pl-3">
                  <h3 className="font-bold text-sm text-[#16241C]">{t.heavyRain}</h3>
                  <p className="text-xs text-[#6B7A6E] mt-1 leading-relaxed">{t.heavyRainDesc}</p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-3">
                  <h3 className="font-bold text-sm text-[#16241C]">{t.pestAdvice}</h3>
                  <p className="text-xs text-[#6B7A6E] mt-1 leading-relaxed">{t.pestAdviceDesc}</p>
                </div>
              </div>
            </div>

            {/* Farm Advisory */}
            <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#16241C] mb-4 flex items-center gap-2">
                <Info size={18} className="text-[#1F3D2B]" />
                {t.advisory}
              </h2>
              <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E4DFD1]/50">
                <h3 className="font-bold text-xs text-[#1F3D2B] mb-3 uppercase tracking-wider">
                  {t.advisoryTitle}
                </h3>
                <p className="text-xs text-[#6B7A6E] whitespace-pre-line leading-relaxed">
                  {t.advisoryText}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
