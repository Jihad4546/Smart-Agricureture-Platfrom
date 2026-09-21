"use client"
import { useLanguage } from "@/contexts/LanguageContext";
import React, { useState, useEffect } from "react";

const HeroSlider = () => {
  const images = [
    "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800",
    "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800",
    "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=800",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const {lang} = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(timer); 
  }, [images.length]);

  return (
    <div className="relative w-7xl mx-auto rounded-2xl h-[500px] overflow-hidden">
      {/* ব্যাকগ্রাউন্ড ছবি */}
      <img
        src={images[currentIndex]}
        alt="Hero Background"
        className="w-full h-full object-cover transition-all duration-700 ease-in-out"
      />

      {/* কন্টেন্ট ও ডট ওভারলে */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
<h1 className="text-5xl font-bold">
    {lang === 'bn' ? 'প্রযুক্তির মাধ্যমে কৃষির উন্নয়ন' : "Development of agriculture through technology"}</h1>

<div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
  {/* বামপাশের ছোট হলুদ ডট */}
  <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
  
  {/* টেক্সট */}
  <span className="text-sm font-medium text-white/90">
    {lang === 'bn' ? '৩০+ কৃষকের বিশ্বস্ত প্ল্যাটফর্ম' : "Trusted by 30+ farmers"}
  </span>
</div>

        {/* অটো ইন্ডিকেটর (বাটন বাদ দিয়ে শুধু div/span) */}
        <div className="absolute bottom-6 flex items-center gap-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                currentIndex === index
                  ? "w-8 bg-yellow-400"
                  : "w-2.5 bg-gray-400 opacity-60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;