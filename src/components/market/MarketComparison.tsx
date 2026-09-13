import React from "react";
import { DEMO_MARKET_COMPARISON } from "../../data/marketData";
import { MapPin, Award, Info } from "lucide-react";

export default function MarketComparison() {
  const comparisonData = DEMO_MARKET_COMPARISON;

  // Calculate best (lowest) price for each crop column dynamically
  const minRicePrice = Math.min(...comparisonData.map((d) => d.rice));
  const minPotatoPrice = Math.min(...comparisonData.map((d) => d.potato));
  const minTomatoPrice = Math.min(...comparisonData.map((d) => d.tomato));

  return (
    <section aria-label="Nearby Market Price Comparison" className="bg-white rounded-xl p-4 md:p-6 border border-[#E4DFD1] shadow-xs space-y-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-[#1F3D2B] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#2F5943]" />
            কাছাকাছি বাজারের তুলনা
          </h2>
          <p className="text-xs md:text-sm text-[#6B7A6E]">
            Compare crop prices across nearby markets. (সর্বনিম্ন দর হাইলাইট করা হয়েছে)
          </p>
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-md border border-amber-200 w-fit">
          <Info className="w-3.5 h-3.5" />
          ডেমো ডাটা (GPS ব্যতীত)
        </span>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-lg border border-[#E4DFD1]">
        <table className="w-full text-left border-collapse min-w-[450px]">
          <thead>
            <tr className="bg-[#EAF0E8] text-[#1F3D2B] text-sm font-semibold border-b border-[#E4DFD1]">
              <th scope="col" className="py-3 px-4">বাজার (Market)</th>
              <th scope="col" className="py-3 px-4">ধান (Rice)</th>
              <th scope="col" className="py-3 px-4">আলু (Potato)</th>
              <th scope="col" className="py-3 px-4">টমেটো (Tomato)</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row) => {
              const isBestRice = row.rice === minRicePrice;
              const isBestPotato = row.potato === minPotatoPrice;
              const isBestTomato = row.tomato === minTomatoPrice;

              return (
                <tr key={row.market} className="border-b border-[#E4DFD1] hover:bg-[#FAF8F3] transition-colors text-sm">
                  <td className="py-3 px-4 font-semibold text-[#16241C]">
                    📍 {row.market}
                  </td>

                  {/* Rice Column */}
                  <td className="py-3 px-4">
                    {isBestRice ? (
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300">
                        <Award className="w-3.5 h-3.5 text-emerald-700" />
                        ৳{row.rice}
                        <span className="text-[10px] font-normal text-emerald-700 ml-0.5">(সেরা দর)</span>
                      </span>
                    ) : (
                      <span className="font-medium text-[#16241C]">৳{row.rice}</span>
                    )}
                  </td>

                  {/* Potato Column */}
                  <td className="py-3 px-4">
                    {isBestPotato ? (
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300">
                        <Award className="w-3.5 h-3.5 text-emerald-700" />
                        ৳{row.potato}
                        <span className="text-[10px] font-normal text-emerald-700 ml-0.5">(সেরা দর)</span>
                      </span>
                    ) : (
                      <span className="font-medium text-[#16241C]">৳{row.potato}</span>
                    )}
                  </td>

                  {/* Tomato Column */}
                  <td className="py-3 px-4">
                    {isBestTomato ? (
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300">
                        <Award className="w-3.5 h-3.5 text-emerald-700" />
                        ৳{row.tomato}
                        <span className="text-[10px] font-normal text-emerald-700 ml-0.5">(সেরা দর)</span>
                      </span>
                    ) : (
                      <span className="font-medium text-[#16241C]">৳{row.tomato}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
