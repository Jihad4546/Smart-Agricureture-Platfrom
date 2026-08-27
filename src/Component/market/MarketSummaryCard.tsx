import React from "react";
import { TrendingUp, TrendingDown, Store, Sprout } from "lucide-react";
import { MarketSummaryData } from "../../types/market";

interface MarketSummaryCardProps {
  summary: MarketSummaryData;
}

export default function MarketSummaryCard({ summary }: MarketSummaryCardProps) {
  return (
    <section aria-label="Market Summary Overview" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Today's Market */}
      <div className="bg-white rounded-xl p-4 md:p-5 border border-[#E4DFD1] shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs md:text-sm font-medium text-[#6B7A6E]">
            আজকের বাজার
          </span>
          <div className="mt-1 text-2xl md:text-3xl font-bold text-[#1F3D2B]">
            ৳ {summary.todayPrice}
          </div>
          <p className="text-xs md:text-sm font-medium text-[#2F5943]">
            {summary.todayCropBn} / {summary.todayUnit}
          </p>
        </div>
        <div className="w-11 h-11 rounded-lg bg-[#EAF0E8] flex items-center justify-center text-[#1F3D2B]">
          <Store className="w-5 h-5" />
        </div>
      </div>

      {/* Card 2: Top Increase */}
      <div className="bg-white rounded-xl p-4 md:p-5 border border-[#E4DFD1] shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs md:text-sm font-medium text-[#6B7A6E]">
            সর্বোচ্চ বৃদ্ধি
          </span>
          <div className="mt-1 text-2xl md:text-3xl font-bold text-emerald-700 flex items-center gap-1">
            <TrendingUp className="w-6 h-6" />
            +১২.৫%
          </div>
          <p className="text-xs md:text-sm font-medium text-[#16241C]">
            {summary.topIncreaseCropBn} ({summary.topIncreaseCropEn})
          </p>
        </div>
        <div className="w-11 h-11 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>

      {/* Card 3: Top Decrease */}
      <div className="bg-white rounded-xl p-4 md:p-5 border border-[#E4DFD1] shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs md:text-sm font-medium text-[#6B7A6E]">
            সর্বোচ্চ হ্রাস
          </span>
          <div className="mt-1 text-2xl md:text-3xl font-bold text-rose-700 flex items-center gap-1">
            <TrendingDown className="w-6 h-6" />
            -৮.৬%
          </div>
          <p className="text-xs md:text-sm font-medium text-[#16241C]">
            {summary.topDecreaseCropBn} ({summary.topDecreaseCropEn})
          </p>
        </div>
        <div className="w-11 h-11 rounded-lg bg-rose-50 flex items-center justify-center text-rose-700">
          <TrendingDown className="w-5 h-5" />
        </div>
      </div>

      {/* Card 4: Tracked Crops */}
      <div className="bg-white rounded-xl p-4 md:p-5 border border-[#E4DFD1] shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs md:text-sm font-medium text-[#6B7A6E]">
            ট্র্যাক করা ফসল
          </span>
          <div className="mt-1 text-2xl md:text-3xl font-bold text-[#1F3D2B]">
            {summary.trackedCount}
          </div>
          <p className="text-xs md:text-sm font-medium text-[#6B7A6E]">
            আজকের বাজার
          </p>
        </div>
        <div className="w-11 h-11 rounded-lg bg-[#EAF0E8] flex items-center justify-center text-[#1F3D2B]">
          <Sprout className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
}
