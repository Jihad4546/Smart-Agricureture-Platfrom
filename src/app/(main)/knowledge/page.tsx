"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, AlertTriangle, ShieldCheck, Loader2, Wifi } from "lucide-react";
import { io } from "socket.io-client";

interface Slide {
  id?: number;
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

function DiseaseCard({ disease }: { disease: Disease }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = disease.slides || [];
  const totalSlides = slides.length;
  const currentSlide = slides[currentIndex] || {};

  const nextSlide = () => {
    if (totalSlides > 0) setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    if (totalSlides > 0) setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl p-5 shadow-sm transition-all hover:shadow-md mb-6">
      {/* Top Header & Badges */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium">
            আক্রান্ত ফসল: {disease.crop}
          </span>
          <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium">
            {disease.type}
          </span>
        </div>
        <span className="text-xs px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded-full font-semibold">
          {disease.risk}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 mb-4">{disease.title}</h3>

      {/* Main Body */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Left: Image Carousel */}
        <div className="relative w-full sm:w-56 h-48 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 group">
          <img
            src={currentSlide.img || "https://via.placeholder.com/300x200?text=No+Image"}
            alt={disease.title}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition"
                aria-label="Next slide"
              >
                <ChevronRight size={18} />
              </button>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex ? "w-4 bg-emerald-600" : "w-2 bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right: Dynamic Details */}
        <div className="flex-1 flex flex-col justify-between gap-3">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-lg">
            <div className="flex items-center gap-1.5 text-amber-900 font-semibold text-xs mb-1">
              <AlertTriangle size={15} className="text-amber-600" />
              <span>প্রধান লক্ষণসমূহ ({totalSlides > 0 ? currentIndex + 1 : 0}/{totalSlides}):</span>
            </div>
            <p className="text-xs text-amber-950 leading-relaxed">
              {currentSlide.symptom || "কোনো তথ্য পাওয়া যায়নি"}
            </p>
          </div>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-r-lg">
            <div className="flex items-center gap-1.5 text-emerald-900 font-semibold text-xs mb-1">
              <ShieldCheck size={15} className="text-emerald-600" />
              <span>প্রস্তাবিত প্রতিকার:</span>
            </div>
            <p className="text-xs text-emerald-950 leading-relaxed">
              {currentSlide.remedy || "কোনো তথ্য পাওয়া যায়নি"}
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
        <span className="text-xs text-slate-400 font-medium">ID: #{disease.id}</span>
        <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1 transition">
          বিস্তারিত গাইড দেখুন
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function DiseaseList() {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ১. ব্যাকএন্ড থেকে প্রাথমিক ডাটা ফেচিং
    const fetchDiseases = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/diseases");
        if (!res.ok) throw new Error("ডাটা ফেচ করতে ব্যর্থ হয়েছে");
        const data = await res.json();
        setDiseases(data);
      } catch (err: any) {
        setError(err.message || "সমস্যা দেখা দিয়েছে");
      } finally {
        setLoading(false);
      }
    };

    fetchDiseases();

    // ২. Socket.io কানেকশন (Real-time updates-এর জন্য)
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("Real-time socket connected!");
    });

    // নতুন কোনো রোগ বা ডাটা যোগ হলে সাথে সাথে লিস্টে আপডেট হবে
    socket.on("new_disease", (newDisease: Disease) => {
      setDiseases((prev) => [newDisease, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50 gap-2">
        <Loader2 className="animate-spin text-emerald-600" size={36} />
        <p className="text-sm text-slate-600 font-medium">ডাটা লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          <p className="font-semibold">ত্রুটি ঘটেছে:</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen flex flex-col items-center">
      {/* Real-time Indicator Badge */}
      <div className="flex items-center gap-2 mb-4 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
        <Wifi size={14} className="animate-pulse text-emerald-600" />
        <span>লাইভ ডাটা আপডেট সক্রিয়</span>
      </div>

      {diseases.length > 0 ? (
        diseases.map((disease) => (
          <DiseaseCard key={disease.id} disease={disease} />
        ))
      ) : (
        <p className="text-slate-500">কোনো তথ্য পাওয়া যায়নি।</p>
      )}
    </div>
  );
}