
"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

interface Slide {
  img: string;
  symptom: string;
  remedy: string;
}

interface Disease {
  id: number;
  title: string;
  crop: string;
  type: string;
  risk: string;
  slides: Slide[];
}

const diseases: Disease[] = [
  {
    id: 1,
    title: "ধানের ব্লাস্ট রোগ",
    crop: "ধান",
    type: "ছত্রাকজনিত",
    risk: "উচ্চ ঝুঁকি",
    slides: [
      {
        img: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800",
        symptom: "পাতায় ছোট ছোট বাদামী বা ধূসর দাগ দেখা যায়।",
        remedy: "আক্রান্ত অংশ পর্যবেক্ষণ করুন এবং প্রয়োজনে অনুমোদিত ছত্রাকনাশক ব্যবহার করুন।",
      },
      {
        img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800",
        symptom: "পাতার দাগ ধীরে ধীরে বড় হয়ে মাঝখানে ধূসর রঙ ধারণ করে।",
        remedy: "জমিতে অতিরিক্ত নাইট্রোজেন সার ব্যবহার এড়িয়ে চলুন।",
      },
      {
        img: "https://images.unsplash.com/photo-1536633051366-2c1a3c2c7d1a?w=800",
        symptom: "গাছের শীষ দুর্বল হয়ে ধানের ফলন কমে যেতে পারে।",
        remedy: "রোগ দেখা দিলে দ্রুত কৃষি বিশেষজ্ঞের পরামর্শ নিন।",
      },
    ],
  },
  {
    id: 2,
    title: "টমেটোর পাতার দাগ",
    crop: "টমেটো",
    type: "ছত্রাকজনিত",
    risk: "মাঝারি ঝুঁকি",
    slides: [
      {
        img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800",
        symptom: "পাতায় গোলাকার কালচে বা বাদামী দাগ দেখা যায়।",
        remedy: "আক্রান্ত পাতা অপসারণ করে জমি পরিষ্কার রাখুন।",
      },
      {
        img: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=800",
        symptom: "পাতার কিনারা শুকিয়ে যেতে শুরু করে।",
        remedy: "পাতায় অতিরিক্ত পানি না দেওয়া এবং পর্যাপ্ত বাতাস চলাচল নিশ্চিত করুন।",
      },
      {
        img: "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=800",
        symptom: "ক্রমে গাছের নিচের দিকের পাতাগুলো ঝরে যেতে পারে।",
        remedy: "প্রয়োজনে কৃষি কর্মকর্তার পরামর্শ অনুযায়ী ছত্রাকনাশক ব্যবহার করুন।",
      },
    ],
  },
  {
    id: 3,
    title: "আলুর লেট ব্লাইট",
    crop: "আলু",
    type: "ছত্রাকজনিত",
    risk: "উচ্চ ঝুঁকি",
    slides: [
      {
        img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800",
        symptom: "পাতায় পানির মতো ভেজা বাদামী দাগ দেখা যায়।",
        remedy: "আক্রান্ত গাছ দ্রুত শনাক্ত করে নিয়ন্ত্রণ ব্যবস্থা গ্রহণ করুন।",
      },
      {
        img: "https://images.unsplash.com/photo-1508313880080-c4bef0730395?w=800",
        symptom: "আর্দ্র আবহাওয়ায় রোগ দ্রুত ছড়িয়ে পড়তে পারে।",
        remedy: "জমিতে অতিরিক্ত আর্দ্রতা জমতে দেবেন না।",
      },
      {
        img: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=800",
        symptom: "কন্দে বাদামী দাগ সৃষ্টি হতে পারে।",
        remedy: "সুস্থ বীজ আলু ব্যবহার করুন এবং আক্রান্ত অংশ আলাদা করুন।",
      },
    ],
  },
  {
    id: 4,
    title: "মরিচের অ্যানথ্রাকনোজ",
    crop: "মরিচ",
    type: "ছত্রাকজনিত",
    risk: "মাঝারি ঝুঁকি",
    slides: [
      {
        img: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800",
        symptom: "মরিচের গায়ে কালচে বা ডেবে যাওয়া দাগ দেখা যায়।",
        remedy: "আক্রান্ত ফল সংগ্রহ করে নষ্ট করুন।",
      },
      {
        img: "https://images.unsplash.com/photo-1599307734024-2b9e7a2a3c55?w=800",
        symptom: "দাগ ধীরে ধীরে বড় হয়ে ফলের পচন সৃষ্টি করে।",
        remedy: "গাছের চারপাশ পরিষ্কার ও শুষ্ক রাখুন।",
      },
      {
        img: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800",
        symptom: "আক্রান্ত ফল দ্রুত নষ্ট হয়ে যেতে পারে।",
        remedy: "প্রয়োজনে অনুমোদিত ছত্রাকনাশক ব্যবহার করুন।",
      },
    ],
  },
  {
    id: 5,
    title: "বেগুনের ডাই-ব্যাক",
    crop: "বেগুন",
    type: "ব্যাকটেরিয়াজনিত",
    risk: "মাঝারি ঝুঁকি",
    slides: [
      {
        img: "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?w=800",
        symptom: "গাছের ডগা থেকে শুকিয়ে যাওয়ার লক্ষণ দেখা যায়।",
        remedy: "আক্রান্ত ডাল কেটে ফেলে দিন।",
      },
      {
        img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800",
        symptom: "পাতা হলুদ হয়ে ধীরে ধীরে শুকিয়ে যায়।",
        remedy: "গাছের গোড়ায় পানি জমতে দেবেন না।",
      },
      {
        img: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=800",
        symptom: "গাছের বৃদ্ধি কমে যেতে পারে।",
        remedy: "সুস্থ চারা ব্যবহার এবং জমি পরিষ্কার রাখা গুরুত্বপূর্ণ।",
      },
    ],
  },
  {
    id: 6,
    title: "ভুট্টার পাতার দাগ",
    crop: "ভুট্টা",
    type: "ছত্রাকজনিত",
    risk: "মাঝারি ঝুঁকি",
    slides: [
      {
        img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800",
        symptom: "পাতায় লম্বা বাদামী দাগ দেখা যায়।",
        remedy: "আক্রান্ত গাছ নিয়মিত পর্যবেক্ষণ করুন।",
      },
      {
        img: "https://images.unsplash.com/photo-1601593768798-7689f1c0b6f1?w=800",
        symptom: "দাগ ধীরে ধীরে পাতার বড় অংশে ছড়িয়ে পড়ে।",
        remedy: "সঠিক দূরত্বে চারা রোপণ করে বাতাস চলাচল নিশ্চিত করুন।",
      },
      {
        img: "https://images.unsplash.com/photo-1601593768233-7d9a2e8a3e31?w=800",
        symptom: "পাতা শুকিয়ে গেলে গাছের খাদ্য তৈরি কমে যায়।",
        remedy: "প্রয়োজনে কৃষি বিশেষজ্ঞের পরামর্শ নিন।",
      },
    ],
  },
  {
    id: 7,
    title: "শসার পাউডারি মিলডিউ",
    crop: "শসা",
    type: "ছত্রাকজনিত",
    risk: "মাঝারি ঝুঁকি",
    slides: [
      {
        img: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=800",
        symptom: "পাতার উপর সাদা গুঁড়ার মতো আস্তরণ দেখা যায়।",
        remedy: "আক্রান্ত পাতা শনাক্ত করে প্রয়োজনে অপসারণ করুন।",
      },
      {
        img: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=800",
        symptom: "সাদা দাগ ধীরে ধীরে পুরো পাতায় ছড়িয়ে পড়তে পারে।",
        remedy: "গাছের মধ্যে পর্যাপ্ত দূরত্ব রাখুন।",
      },
      {
        img: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=800",
        symptom: "পাতা দুর্বল হয়ে ফলন কমতে পারে।",
        remedy: "অনুমোদিত ছত্রাকনাশক ব্যবহারের আগে বিশেষজ্ঞের পরামর্শ নিন।",
      },
    ],
  },
  {
    id: 8,
    title: "আমের অ্যানথ্রাকনোজ",
    crop: "আম",
    type: "ছত্রাকজনিত",
    risk: "উচ্চ ঝুঁকি",
    slides: [
      {
        img: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800",
        symptom: "পাতা ও ফলে কালচে দাগ দেখা যায়।",
        remedy: "গাছের আক্রান্ত অংশ পরিষ্কার করে ফেলুন।",
      },
      {
        img: "https://images.unsplash.com/photo-1605027990121-cbae9a8f7c4b?w=800",
        symptom: "ফলের গায়ে কালো দাগ তৈরি হয়ে পচন হতে পারে।",
        remedy: "বাগানে অতিরিক্ত আর্দ্রতা কমানোর ব্যবস্থা করুন।",
      },
      {
        img: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=800",
        symptom: "ফল পাকতে যাওয়ার সময় রোগের প্রভাব বাড়তে পারে।",
        remedy: "ফল ও গাছ নিয়মিত পর্যবেক্ষণ করুন।",
      },
    ],
  },
  {
    id: 9,
    title: "পাটের পাতার দাগ",
    crop: "পাট",
    type: "ছত্রাকজনিত",
    risk: "কম ঝুঁকি",
    slides: [
      {
        img: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=800",
        symptom: "পাতায় ছোট ছোট বাদামী দাগ দেখা যায়।",
        remedy: "আক্রান্ত পাতা দ্রুত শনাক্ত করুন।",
      },
      {
        img: "https://images.unsplash.com/photo-1530968464165-7a1861cbaf9f?w=800",
        symptom: "দাগ বড় হয়ে পাতার স্বাভাবিক বৃদ্ধি ব্যাহত করতে পারে।",
        remedy: "জমিতে পর্যাপ্ত আলো ও বাতাস চলাচল নিশ্চিত করুন।",
      },
      {
        img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800",
        symptom: "আক্রান্ত গাছ দুর্বল হয়ে যেতে পারে।",
        remedy: "সুষম সার ব্যবহার করুন এবং নিয়মিত জমি পর্যবেক্ষণ করুন।",
      },
    ],
  },
];

function DiseaseCard({ disease }: { disease: Disease }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSlide = disease.slides[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % disease.slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + disease.slides.length) % disease.slides.length
    );
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image Slider */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={currentSlide.img}
          alt={disease.title}
          className="h-full w-full object-cover transition-all duration-500"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Risk */}
        <div className="absolute right-3 top-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold backdrop-blur-sm ${
              disease.risk === "উচ্চ ঝুঁকি"
                ? "bg-red-500/90 text-white"
                : disease.risk === "মাঝারি ঝুঁকি"
                ? "bg-amber-500/90 text-white"
                : "bg-emerald-500/90 text-white"
            }`}
          >
            {disease.risk}
          </span>
        </div>

        {/* Crop Name */}
        <div className="absolute bottom-3 left-3">
          <span className="rounded-lg bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur-sm">
            আক্রান্ত ফসল: {disease.crop}
          </span>
        </div>

        {/* Previous */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-black/60 group-hover:opacity-100"
          aria-label="Previous image"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Next */}
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-black/60 group-hover:opacity-100"
          aria-label="Next image"
        >
          <ChevronRight size={18} />
        </button>

        {/* Slider Dots */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {disease.slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Type */}
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
            {disease.type}
          </span>

          <span className="text-xs font-medium text-slate-400">
            #{disease.id}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-4 text-lg font-bold text-slate-900">
          {disease.title}
        </h3>

        {/* Symptoms */}
        <div className="mb-3 rounded-xl border border-amber-100 bg-amber-50 p-3">
          <div className="mb-1.5 flex items-center gap-2 text-amber-800">
            <AlertTriangle size={16} />
            <span className="text-xs font-bold">প্রধান লক্ষণ</span>
          </div>

          <p className="text-xs leading-5 text-amber-950">
            {currentSlide.symptom}
          </p>
        </div>

        {/* Remedy */}
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3">
          <div className="mb-1.5 flex items-center gap-2 text-emerald-800">
            <ShieldCheck size={16} />
            <span className="text-xs font-bold">প্রস্তাবিত প্রতিকার</span>
          </div>

          <p className="text-xs leading-5 text-emerald-950">
            {currentSlide.remedy}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-[11px] text-slate-400">
            ছবি {currentIndex + 1}/{disease.slides.length}
          </span>

          <button className="flex items-center gap-1 text-xs font-bold text-emerald-600 transition hover:text-emerald-700">
            বিস্তারিত দেখুন
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DiseaseList() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-2 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
            🌱 Crop Disease Guide
          </div>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            ফসলের রোগ ও প্রতিকার
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            বিভিন্ন ফসলের সাধারণ রোগ, লক্ষণ এবং সম্ভাব্য প্রতিকার সম্পর্কে
            সহজে জানুন।
          </p>
        </div>

        {/* 3 Column Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {diseases.map((disease) => (
            <DiseaseCard key={disease.id} disease={disease} />
          ))}
        </div>
      </div>
    </main>
  );
}
