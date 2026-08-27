import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { CropPrice } from "../../types/market";

interface CropPriceRowProps {
  crop: CropPrice;
}

export default function CropPriceRow({ crop }: CropPriceRowProps) {
  const diff = crop.price - crop.previousPrice;
  const percentChange = crop.previousPrice > 0 ? (diff / crop.previousPrice) * 100 : 0;
  const formattedPercent = Math.abs(percentChange).toFixed(1);

  return (
    <tr className="border-b border-[#E4DFD1] hover:bg-[#FAF8F3] transition-colors">
      {/* Crop Name & Category */}
      <td className="py-3.5 px-4">
        <div className="font-semibold text-[#16241C] text-sm md:text-base">
          {crop.nameBn}
        </div>
        <div className="text-xs text-[#6B7A6E]">
          {crop.nameEn} • <span className="bg-[#EAF0E8] text-[#1F3D2B] px-1.5 py-0.5 rounded font-medium">{crop.category}</span>
        </div>
      </td>

      {/* Market */}
      <td className="py-3.5 px-4 text-sm font-medium text-[#16241C]">
        📍 {crop.market}
      </td>

      {/* Current Price */}
      <td className="py-3.5 px-4 font-bold text-[#1F3D2B] text-base">
        ৳ {crop.price} <span className="text-xs font-normal text-[#6B7A6E]">/ {crop.unit}</span>
      </td>

      {/* Previous Price */}
      <td className="py-3.5 px-4 text-sm text-[#6B7A6E]">
        ৳ {crop.previousPrice} / {crop.unit}
      </td>

      {/* Programmatic Percentage Change */}
      <td className="py-3.5 px-4">
        {diff > 0 ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ArrowUpRight className="w-3.5 h-3.5" />
            +{formattedPercent}%
          </span>
        ) : diff < 0 ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <ArrowDownRight className="w-3.5 h-3.5" />
            -{formattedPercent}%
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
            <Minus className="w-3.5 h-3.5" />
            0.0%
          </span>
        )}
      </td>
    </tr>
  );
}
