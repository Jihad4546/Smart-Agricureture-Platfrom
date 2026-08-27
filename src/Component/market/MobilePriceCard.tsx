import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus, MapPin } from "lucide-react";
import { CropPrice } from "../../types/market";

interface MobilePriceCardProps {
  crop: CropPrice;
}

export default function MobilePriceCard({ crop }: MobilePriceCardProps) {
  const diff = crop.price - crop.previousPrice;
  const percentChange = crop.previousPrice > 0 ? (diff / crop.previousPrice) * 100 : 0;
  const formattedPercent = Math.abs(percentChange).toFixed(1);

  return (
    <article className="bg-white rounded-xl p-4 border border-[#E4DFD1] shadow-xs space-y-3">
      {/* Header: Name, English name, category badge */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-bold text-[#16241C] text-base leading-tight">
            {crop.nameBn}
          </h3>
          <span className="text-xs font-normal text-[#6B7A6E]">
            {crop.nameEn}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded text-xs font-medium bg-[#EAF0E8] text-[#1F3D2B] border border-[#E4DFD1]">
          {crop.category}
        </span>
      </div>

      {/* Main Prices & Percentage */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div>
          <span className="text-xs text-[#6B7A6E] block">বর্তমান দর</span>
          <span className="text-lg font-bold text-[#1F3D2B]">
            ৳ {crop.price} <span className="text-xs font-normal text-[#6B7A6E]">/ {crop.unit}</span>
          </span>
        </div>

        <div>
          <span className="text-xs text-[#6B7A6E] block">আগের দর</span>
          <span className="text-sm font-medium text-[#6B7A6E]">
            ৳ {crop.previousPrice} / {crop.unit}
          </span>
        </div>

        {/* Change Badge */}
        <div>
          <span className="text-xs text-[#6B7A6E] block mb-0.5">পরিবর্তন</span>
          {diff > 0 ? (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ArrowUpRight className="w-3 h-3" />
              +{formattedPercent}%
            </span>
          ) : diff < 0 ? (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
              <ArrowDownRight className="w-3 h-3" />
              -{formattedPercent}%
            </span>
          ) : (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
              <Minus className="w-3 h-3" />
              0.0%
            </span>
          )}
        </div>
      </div>

      {/* Footer: Market location */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-[#6B7A6E]">
        <span className="flex items-center gap-1 font-medium text-[#16241C]">
          <MapPin className="w-3.5 h-3.5 text-[#2F5943]" />
          {crop.market} বাজার
        </span>
        <span>আজকের আপডেট</span>
      </div>
    </article>
  );
}
