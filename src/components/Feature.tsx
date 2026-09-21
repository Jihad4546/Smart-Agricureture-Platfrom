"use client";

import React from "react";
import {
  CloudSun,
  Scan,
  UserCheck,
  ShoppingBag,
  TestTube2,
  Calendar,
  Book,
  Send,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const services = [
  {
    icon: CloudSun,
    iconBg: "bg-blue-500 hover:bg-blue-600",
    title: {
      bn: "স্মার্ট আবহাওয়া সেবা",
      en: "Smart Weather Service",
    },
    desc: {
      bn: "আপনার সঠিক অবস্থানের জন্য জিপিএস-ভিত্তিক আবহাওয়া আপডেট, বৃষ্টিপাতের পূর্বাভাস এবং ঘূর্ণিঝড় সতর্কতা।",
      en: "GPS-based weather updates, rainfall forecasts, and cyclone warnings for your location.",
    },
  },
  {
    icon: Scan,
    iconBg: "bg-emerald-500 hover:bg-emerald-600",
    title: {
      bn: "এআই রোগ নির্ণয়",
      en: "AI Disease Diagnosis",
    },
    desc: {
      bn: "রোগ চিহ্নিত করতে ফসলের একটি পরিষ্কার ছবি ড্র্যাগ অথবা ক্লিক করে আপলোড করার সুবিধা।",
      en: "Upload or drag a clear image of your crop to identify diseases using AI.",
    },
  },
  {
    icon: TestTube2,
    iconBg: "bg-amber-500 hover:bg-amber-600",
    title: {
      bn: "এআই মাটি পরীক্ষক",
      en: "AI Soil Tester",
    },
    desc: {
      bn: "মাটি পরীক্ষার জন্য মাটির একটি পরিষ্কার ছবি ড্র্যাগ অথবা ক্লিক করে আপলোড করার সুবিধা।",
      en: "Upload a photo of your soil to test quality and get instant nutrient insights.",
    },
  },
  {
    icon: UserCheck,
    iconBg: "bg-purple-500 hover:bg-purple-600",
    title: {
      bn: "কৃষকের ড্যাশবোর্ড সিস্টেম",
      en: "Farmer Dashboard System",
    },
    desc: {
      bn: "ড্যাশবোর্ডের মাধ্যমে আপনার ডিজিটাল পরিচয় তৈরি করুন এবং ব্যক্তিগত সুবিধা নিন।",
      en: "Create your digital profile via dashboard and get personalized farming benefits.",
    },
  },
  {
    icon: Calendar,
    iconBg: "bg-rose-500 hover:bg-rose-600",
    title: {
      bn: "ফসল পঞ্জিকা ও রোপণ সূচি",
      en: "Crop Calendar & Planting Schedule",
    },
    desc: {
      bn: "বাংলা ও ইংরেজি পঞ্জিকার মাধ্যমে সবজি, ফল এবং ফসল ফলন ও সংরক্ষণের নির্দেশিকা।",
      en: "Sowing, harvesting, and crop preservation guides aligned with Bengali and English calendars.",
    },
  },
  {
    icon: ShoppingBag,
    iconBg: "bg-orange-500 hover:bg-orange-600",
    title: {
      bn: "বাজার দর",
      en: "Market Prices",
    },
    desc: {
      bn: "সরাসরি বাংলাদেশের বিভিন্ন অঞ্চলের বাজারের টাটকা দর দাম সম্পর্কে জানুন।",
      en: "Get real-time crop market prices across different regions of Bangladesh.",
    },
  },
  {
    icon: Send,
    iconBg: "bg-indigo-500 hover:bg-indigo-600",
    title: {
      bn: "বিশেষজ্ঞের সাথে কথোপকথন",
      en: "Expert Consultation",
    },
    desc: {
      bn: "সরাসরি কৃষি বিশেষজ্ঞদের সাথে লিখিত আকারে মেসেজ পাঠিয়ে প্রশ্নের উত্তর নিন।",
      en: "Direct messaging platform to consult with agricultural experts instantly.",
    },
  },
  {
    icon: Book,
    iconBg: "bg-teal-500 hover:bg-teal-600",
    title: {
      bn: "রোগ লাইব্রেরি",
      en: "Disease Library",
    },
    desc: {
      bn: "ফসলের বিভিন্ন রোগব্যাধি ও প্রতিকার নিয়ে বিশেষজ্ঞদের লেখা নিবন্ধ।",
      en: "Comprehensive articles written by experts on crop diseases and solutions.",
    },
  },
];

const FeatureGrid = () => {
 
  const { lang } = useLanguage();
  const currentLang = (lang as "bn" | "en") || "bn";

  return (
    <section className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* সেকশন হেডার */}
        <div className="mb-10 text-center sm:text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            {currentLang === "bn" ? "আমাদের সেবাসমূহ" : "Our Services"}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {currentLang === "bn"
              ? "কৃষকদের জন্য সর্বাধুনিক প্রযুক্তিভিত্তিক সমাধান"
              : "Modern technology-driven solutions for farmers"}
          </p>
        </div>

        {/* সার্ভিস গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-start group"
              >
                {/* আইকন বক্স */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 transition-transform duration-300 group-hover:scale-110 ${item.iconBg}`}
                >
                  <IconComponent className="w-6 h-6 stroke-[2]" />
                </div>

                {/* শিরোনাম */}
                <h3 className="text-slate-800 font-bold text-lg mb-2">
                  {item.title[currentLang]}
                </h3>

                {/* বিবরণ */}
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc[currentLang]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;