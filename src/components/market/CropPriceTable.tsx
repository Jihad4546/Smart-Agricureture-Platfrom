import React from "react";
import { CropPrice } from "../../types/market";
import CropPriceRow from "./CropPriceRow";
import MobilePriceCard from "./MobilePriceCard";
import { Inbox } from "lucide-react";

interface CropPriceTableProps {
  crops: CropPrice[];
}

export default function CropPriceTable({ crops }: CropPriceTableProps) {
  return (
    <section aria-label="Agricultural Crop Prices Table" className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-[#1F3D2B]">
            ফসলের বর্তমান বাজার দর
          </h2>
          <p className="text-xs md:text-sm text-[#6B7A6E]">
            Current agricultural prices across selected markets.
          </p>
        </div>
        <span className="text-xs text-[#6B7A6E] font-medium">
          মোট ফলাফল: {crops.length} টি ফসল
        </span>
      </div>

      {crops.length === 0 ? (
        <div className="bg-white rounded-xl p-8 border border-[#E4DFD1] text-center space-y-3">
          <Inbox className="w-10 h-10 text-[#6B7A6E] mx-auto" />
          <p className="text-sm font-semibold text-[#16241C]">
            কোন ফসল পাওয়া যায়নি!
          </p>
          <p className="text-xs text-[#6B7A6E]">
            অনুগ্রহ করে আপনার খোঁজার নাম অথবা ফিল্টার পরিবর্তন করুন।
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View (Hidden on mobile) */}
          <div className="hidden md:block bg-white rounded-xl border border-[#E4DFD1] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#EAF0E8] border-b border-[#E4DFD1] text-[#1F3D2B] text-sm font-semibold">
                    <th scope="col" className="py-3 px-4">ফসল</th>
                    <th scope="col" className="py-3 px-4">বাজার</th>
                    <th scope="col" className="py-3 px-4">বর্তমান দর</th>
                    <th scope="col" className="py-3 px-4">আগের দর</th>
                    <th scope="col" className="py-3 px-4">পরিবর্তন</th>
                  </tr>
                </thead>
                <tbody>
                  {crops.map((crop) => (
                    <CropPriceRow key={crop.id} crop={crop} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards View (Visible on mobile screens < 768px) */}
          <div className="md:hidden grid grid-cols-1 gap-3">
            {crops.map((crop) => (
              <MobilePriceCard key={crop.id} crop={crop} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
