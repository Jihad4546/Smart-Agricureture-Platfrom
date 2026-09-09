"use client";

import React, { useState } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { 
  UserCheck, 
  PhoneCall, 
  MessageSquare, 
  Video, 
  Calendar, 
  Clock, 
  Star, 
  Award, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  Send 
} from "lucide-react";

// --- Types Definition ---
interface Expert {
  id: string;
  name: string;
  nameBn: string;
  specialty: string;
  specialtyBn: string;
  hospitalOrOrg: string;
  hospitalOrOrgBn: string;
  experience: string;
  experienceBn: string;
  rating: number;
  reviewsCount: number;
  availableDays: string;
  availableDaysBn: string;
  isOnline: boolean;
  fee: string;
  feeBn: string;
}

// --- Translations Definition ---
const translations = {
  en: {
    title: "Expert Agriculture Consultation",
    subtitle: "Get direct advice, instant diagnosis, and crop prescriptions from certified agronomists.",
    searchPlaceholder: "Search expert by name or specialty (e.g. Rice Specialist)...",
    totalExperts: "Active Experts",
    totalExpertsVal: "25+ Specialists",
    consultationsToday: "Consultations Today",
    consultationsTodayVal: "140+ Farmers",
    avgResponseTime: "Avg. Response Time",
    avgResponseTimeVal: "< 10 Mins",
    satisfactionRate: "Success Rate",
    satisfactionRateVal: "98.5%",
    tabAll: "All Experts",
    tabOnline: "Online Now",
    experience: "Experience",
    rating: "Rating",
    fee: "Consultation Fee",
    available: "Available",
    bookAppointment: "Book Call",
    chatNow: "Instant Chat",
    videoCall: "Video Call",
    noExperts: "No agronomists found matching your criteria.",
    askQuestionBoxTitle: "Have an urgent crop problem?",
    askQuestionBoxDesc: "Upload photos or voice messages of your infected crops. Our experts will respond shortly.",
    sendQuestionBtn: "Ask Expert Now",
  },
  bn: {
    title: "কৃষিবিদ পরামর্শ সেবা",
    subtitle: "প্রত্যয়িত কৃষিবিদ ও বিশেষজ্ঞদের কাছ থেকে সরাসরি পরামর্শ, তাৎক্ষণিক রোগ নির্ণয় ও সমাধান নিন।",
    searchPlaceholder: "কৃষিবিদের নাম বা বিশেষজ্ঞতার ক্ষেত্র লিখে খুঁজুন (যেমন: ধান বিশেষজ্ঞ)...",
    totalExperts: "সক্রিয় বিশেষজ্ঞ",
    totalExpertsVal: "২৫+ জন বিশেষজ্ঞ",
    consultationsToday: "আজকের পরামর্শ সেবা",
    consultationsTodayVal: "১৪০+ কৃষক",
    avgResponseTime: "গড় সাড়া দেওয়ার সময়",
    avgResponseTimeVal: "< ১০ মিনিট",
    satisfactionRate: "সন্তুষ্টির হার",
    satisfactionRateVal: "৯৮.৫%",
    tabAll: "সকল বিশেষজ্ঞ",
    tabOnline: "অনলাইনে আছেন",
    experience: "অভিজ্ঞতা",
    rating: "রেটিং",
    fee: "পরামর্শ ফি",
    available: "পরামর্শের সময়",
    bookAppointment: "কল বুক করুন",
    chatNow: "সরাসরি চ্যাট",
    videoCall: "ভিডিও কল",
    noExperts: "আপনার অনুসন্ধানের সাথে মেলে এমন কোনো বিশেষজ্ঞ পাওয়া যায়নি।",
    askQuestionBoxTitle: "ফসল নিয়ে জরুরি সমস্যায় পড়েছেন?",
    askQuestionBoxDesc: "আপনার আক্রান্ত ফসলের ছবি তুলে বা ভয়েস মেসেজ পাঠিয়ে প্রশ্ন করুন। আমাদের বিশেষজ্ঞরা দ্রুত উত্তর দিবেন।",
    sendQuestionBtn: "এখনই প্রশ্ন পাঠান",
  }
};

// --- Mock Data ---
const initialExperts: Expert[] = [
  {
    id: "1",
    name: "Dr. Shafiqul Islam",
    nameBn: "ড. শফিকুল ইসলাম",
    specialty: "Rice & Cereal Specialist",
    specialtyBn: "ধান ও দানাদার ফসল বিশেষজ্ঞ",
    hospitalOrOrg: "BRRI (Bangladesh Rice Research Institute)",
    hospitalOrOrgBn: "বাংলাদেশ ধান গবেষণা ইনস্টিটিউট (BRRI)",
    experience: "12 Years",
    experienceBn: "১২ বছর",
    rating: 4.9,
    reviewsCount: 320,
    availableDays: "Sat - Thu (10 AM - 6 PM)",
    availableDaysBn: "শনিবার - বৃহস্পতিবার (সকাল ১০টা - সন্ধ্যা ৬টা)",
    isOnline: true,
    fee: "Free",
    feeBn: "ফ্রি (বিনামূল্যে)",
  },
  {
    id: "2",
    name: "Prof. Anisur Rahman",
    nameBn: "প্রফেসর আনিসুর রহমান",
    specialty: "Soil & Fertilizer Specialist",
    specialtyBn: "মাটি ও সার বিশেষজ্ঞ",
    hospitalOrOrg: "BAU (Bangladesh Agricultural University)",
    hospitalOrOrgBn: "বাংলাদেশ কৃষি বিশ্ববিদ্যালয় (BAU)",
    experience: "15 Years",
    experienceBn: "১৫ বছর",
    rating: 4.8,
    reviewsCount: 245,
    availableDays: "Fri - Sat (4 PM - 8 PM)",
    availableDaysBn: "শুক্রবার - শনিবার (বিকাল ৪টা - রাত ৮টা)",
    isOnline: false,
    fee: "৳ ১০০ / কল",
    feeBn: "৳ ১০০ / কল",
  },
  {
    id: "3",
    name: "Dr. Nasrin Sultana",
    nameBn: "ড. নাসরিন সুলতানা",
    specialty: "Vegetable & Pest Management",
    specialtyBn: "সবজি চাষ ও পোকা দমন বিশেষজ্ঞ",
    hospitalOrOrg: "BARI (Bangladesh Agricultural Research Inst.)",
    hospitalOrOrgBn: "বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI)",
    experience: "9 Years",
    experienceBn: "৯ বছর",
    rating: 4.9,
    reviewsCount: 180,
    availableDays: "Everyday (2 PM - 9 PM)",
    availableDaysBn: "প্রতিদিন (বিকাল ২টা - রাত ৯টা)",
    isOnline: true,
    fee: "Free",
    feeBn: "ফ্রি (বিনামূল্যে)",
  },
];

export default function ExpertConsultationPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [searchQuery, setSearchQuery] = useState("");
  const [filterOnlineOnly, setFilterOnlineOnly] = useState(false);

  // Filter Logic
  const filteredExperts = initialExperts.filter((expert) => {
    const matchesSearch = 
      expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.nameBn.includes(searchQuery) ||
      expert.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.specialtyBn.includes(searchQuery);

    const matchesOnline = !filterOnlineOnly || expert.isOnline;

    return matchesSearch && matchesOnline;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
      {/* Top Header */}
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <UserCheck className="h-7 w-7 text-emerald-600" /> {t.title}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {t.subtitle}
        </p>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.totalExperts}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{t.totalExpertsVal}</p>
          </div>
          <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
            <Award className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.consultationsToday}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{t.consultationsTodayVal}</p>
          </div>
          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            <PhoneCall className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.avgResponseTime}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{t.avgResponseTimeVal}</p>
          </div>
          <div className="h-10 w-10 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">
            <Clock className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">{t.satisfactionRate}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{t.satisfactionRateVal}</p>
          </div>
          <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Quick Problem Asking Banner */}
      <div className="mt-6 bg-gradient-to-r from-emerald-800 to-emerald-700 text-white rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
        <div>
          <h4 className="text-base font-bold flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-emerald-300" /> {t.askQuestionBoxTitle}
          </h4>
          <p className="text-xs text-emerald-100 mt-1 max-w-2xl">
            {t.askQuestionBoxDesc}
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs px-4 py-2.5 rounded-lg transition shrink-0">
          <Send className="h-4 w-4" /> {t.sendQuestionBtn}
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition shadow-sm"
          />
        </div>

        <div className="flex gap-2 bg-slate-200/60 p-1 rounded-lg text-xs font-medium self-start md:self-auto">
          <button
            onClick={() => setFilterOnlineOnly(false)}
            className={`px-3 py-1.5 rounded-md transition ${!filterOnlineOnly ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}
          >
            {t.tabAll}
          </button>
          <button
            onClick={() => setFilterOnlineOnly(true)}
            className={`px-3 py-1.5 rounded-md transition ${filterOnlineOnly ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}
          >
            {t.tabOnline}
          </button>
        </div>
      </div>

      {/* Experts List */}
      <div className="mt-6">
        {filteredExperts.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            <p className="text-sm font-medium">{t.noExperts}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperts.map((expert) => (
              <div key={expert.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
                <div className="p-5">
                  {/* Top Status & Avatar */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3 items-center">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-emerald-800 font-bold border border-slate-200">
                          {expert.name.charAt(4) || "E"}
                        </div>
                        {expert.isOnline && (
                          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white" title="Online" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base flex items-center gap-1">
                          {lang === "bn" ? expert.nameBn : expert.name}
                          <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                        </h3>
                        <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                          {lang === "bn" ? expert.specialtyBn : expert.specialty}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Organization & Ratings */}
                  <div className="mt-3 text-xs text-slate-500 border-b border-slate-100 pb-3">
                    <p>{lang === "bn" ? expert.hospitalOrOrgBn : expert.hospitalOrOrg}</p>
                    <div className="flex items-center gap-3 mt-2 text-slate-700">
                      <span className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {expert.rating} <span className="text-slate-400 font-normal">({expert.reviewsCount})</span>
                      </span>
                      <span>•</span>
                      <span>{t.experience}: <strong>{lang === "bn" ? expert.experienceBn : expert.experience}</strong></span>
                    </div>
                  </div>

                  {/* Availability & Fee */}
                  <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1 text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> {t.available}:
                      </span>
                      <span className="font-medium text-slate-800">{lang === "bn" ? expert.availableDaysBn : expert.availableDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t.fee}:</span>
                      <span className="font-bold text-emerald-700">{lang === "bn" ? expert.feeBn : expert.fee}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-between gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 text-xs bg-white border border-slate-200 hover:border-emerald-600 text-slate-700 font-medium py-2 rounded-lg transition shadow-sm">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" /> {t.chatNow}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition shadow-sm">
                    <PhoneCall className="w-3.5 h-3.5" /> {t.bookAppointment}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}