import React from "react";
import { MapPin, Clock, Info } from "lucide-react";

export default function MarketHeader() {
  return (
    <header className="space-y-4">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#6B7A6E]">
        <span className="hover:text-[#1F3D2B] transition-colors cursor-pointer">বাজার</span>
        <span>/</span>
        <span className="font-medium text-[#1F3D2B]">বাজার দর</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E4DFD1]">
        {/* Titles */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1F3D2B]">
              বাজার দর
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
              <Info className="w-3.5 h-3.5" />
              ডেমো ডাটা
            </span>
          </div>

          <p className="mt-1 text-sm md:text-base font-normal text-[#16241C]">
            বিভিন্ন কৃষিপণ্যের বর্তমান বাজার দর ও দামের পরিবর্তন দেখুন।
          </p>
          <p className="text-xs md:text-sm font-normal text-[#6B7A6E]">
            Track current agricultural prices and market trends.
          </p>
        </div>

        {/* Location & Last Update Metadata */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EAF0E8] text-[#1F3D2B] font-medium border border-[#E4DFD1]">
            <MapPin className="w-4 h-4 text-[#2F5943]" />
            গাজীপুর
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#6B7A6E] border border-[#E4DFD1]">
            <Clock className="w-4 h-4 text-[#6B7A6E]" />
            সর্বশেষ আপডেট: আজ
          </span>
        </div>
      </div>
    </header>
  );
}
