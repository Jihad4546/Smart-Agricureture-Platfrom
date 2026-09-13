import React, { useState } from "react";
import { TrendTimeframe } from "../../types/market";
import { DEMO_PRICE_TRENDS } from "../../data/marketData";
import { LineChart as LineChartIcon, Info } from "lucide-react";

export default function PriceTrend() {
  const [selectedCropId, setSelectedCropId] = useState<number>(1); // Default: Rice (धान)
  const [timeframe, setTimeframe] = useState<TrendTimeframe>("7 দিন");
  const [hoveredPoint, setHoveredPoint] = useState<{ label: string; price: number } | null>(null);

  const cropTrend = DEMO_PRICE_TRENDS[selectedCropId] ?? DEMO_PRICE_TRENDS[1];
  const points = cropTrend.timeframes[timeframe] ?? cropTrend.timeframes["7 দিন"];

  // SVG Chart Dimensions
  const chartWidth = 600;
  const chartHeight = 200;
  const paddingX = 40;
  const paddingY = 30;

  const prices = points.map((p) => p.price);
  const minPrice = Math.min(...prices) - 2;
  const maxPrice = Math.max(...prices) + 2;
  const priceRange = maxPrice - minPrice || 1;

  const getX = (index: number) => {
    if (points.length <= 1) return paddingX;
    const step = (chartWidth - paddingX * 2) / (points.length - 1);
    return paddingX + index * step;
  };

  const getY = (price: number) => {
    const usableHeight = chartHeight - paddingY * 2;
    const normalized = (price - minPrice) / priceRange;
    return chartHeight - paddingY - normalized * usableHeight;
  };

  const pathD = points.reduce((acc, point, i) => {
    const x = getX(i);
    const y = getY(point.price);
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, "");

  // Area fill path below the line
  const areaD = points.length > 0
    ? `${pathD} L ${getX(points.length - 1)} ${chartHeight - paddingY} L ${getX(0)} ${chartHeight - paddingY} Z`
    : "";

  return (
    <section aria-label="Price Trends Section" className="bg-white rounded-xl p-4 md:p-6 border border-[#E4DFD1] shadow-xs space-y-4">
      {/* Header & Selectors */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <LineChartIcon className="w-5 h-5 text-[#2F5943]" />
            <h2 className="text-xl md:text-2xl font-semibold text-[#1F3D2B]">
              দামের পরিবর্তনের ধারা
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#6B7A6E]">
            Price Trends over selected timeframe (Demo Data)
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Crop Selector */}
          <select
            value={selectedCropId}
            onChange={(e) => setSelectedCropId(Number(e.target.value))}
            className="px-3 py-1.5 bg-[#FAF8F3] border border-[#E4DFD1] rounded-lg text-xs md:text-sm font-semibold text-[#16241C] focus:outline-none focus:ring-2 focus:ring-[#1F3D2B] cursor-pointer"
          >
            <option value={1}>ধান (Rice)</option>
            <option value={2}>আলু (Potato)</option>
            <option value={3}>টমেটো (Tomato)</option>
          </select>

          {/* Timeframe Filter Tabs */}
          <div className="flex items-center bg-[#FAF8F3] p-1 rounded-lg border border-[#E4DFD1]">
            {(["7 দিন", "৩০ দিন", "৩ মাস"] as TrendTimeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  timeframe === tf
                    ? "bg-[#1F3D2B] text-white shadow-xs"
                    : "text-[#6B7A6E] hover:text-[#16241C]"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-hidden bg-[#FAF8F3] rounded-xl p-3 border border-[#E4DFD1]">
        {/* Dynamic Tooltip */}
        {hoveredPoint && (
          <div className="absolute top-2 right-4 bg-[#1F3D2B] text-white text-xs px-2.5 py-1 rounded-md shadow-xs flex items-center gap-2">
            <span>{hoveredPoint.label}:</span>
            <span className="font-bold text-[#E0A458]">৳ {hoveredPoint.price} / কেজি</span>
          </div>
        )}

        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto max-h-[220px]">
          <defs>
            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2F5943" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2F5943" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[0, 0.5, 1].map((ratio, i) => {
            const yVal = paddingY + ratio * (chartHeight - paddingY * 2);
            return (
              <line
                key={i}
                x1={paddingX}
                y1={yVal}
                x2={chartWidth - paddingX}
                y2={yVal}
                stroke="#E4DFD1"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#trendGradient)" />

          {/* Trend Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#1F3D2B"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {points.map((pt, i) => {
            const cx = getX(i);
            const cy = getY(pt.price);
            const isHovered = hoveredPoint?.label === pt.label;
            return (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? "6" : "4"}
                  fill={isHovered ? "#E0A458" : "#2F5943"}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => setHoveredPoint(pt)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                {/* X-axis labels */}
                <text
                  x={cx}
                  y={chartHeight - 8}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#6B7A6E"
                  fontWeight="500"
                >
                  {pt.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Chart Footer / API Integration Note */}
      <div className="flex items-center justify-between text-xs text-[#6B7A6E]">
        <span className="flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-amber-700" />
          বর্তমানে নমুনা ডেমো ডাটা প্রদর্শিত হচ্ছে। পরবর্তীতে সরাসরি API দিয়ে ডাটা সচল করা হবে।
        </span>
        <span className="font-semibold text-[#1F3D2B]">
          {cropTrend.cropBn} ({cropTrend.cropEn})
        </span>
      </div>
    </section>
  );
}
