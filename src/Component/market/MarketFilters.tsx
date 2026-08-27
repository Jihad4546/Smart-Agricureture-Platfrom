import React from "react";
import { Search, Filter, RefreshCw } from "lucide-react";
import { CropCategory, MarketLocation } from "../../types/market";

interface MarketFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: CropCategory;
  onCategoryChange: (category: CropCategory) => void;
  selectedMarket: MarketLocation;
  onMarketChange: (market: MarketLocation) => void;
  onReset: () => void;
}

export default function MarketFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedMarket,
  onMarketChange,
  onReset,
}: MarketFiltersProps) {
  const categories: CropCategory[] = ["সব ফসল", "শস্য", "সবজি"];
  const markets: MarketLocation[] = ["সব বাজার", "ঢাকা", "গাজীপুর", "রাজশাহী", "রংপুর"];

  return (
    <section aria-label="Search and Filters" className="bg-white rounded-xl p-4 border border-[#E4DFD1] shadow-xs space-y-3 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
      {/* Search Input */}
      <div className="relative flex-1 min-w-0">
        <label htmlFor="crop-search" className="sr-only">
          ফসলের নাম খুঁজুন (Search Crop)
        </label>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B7A6E]">
          <Search className="w-4 h-4" />
        </div>
        <input
          id="crop-search"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ফসলের নাম খুঁজুন... (Search agricultural products...)"
          className="w-full pl-9 pr-4 py-2.5 bg-[#FAF8F3] border border-[#E4DFD1] rounded-lg text-sm text-[#16241C] placeholder-[#6B7A6E] focus:outline-none focus:ring-2 focus:ring-[#1F3D2B] focus:border-transparent transition"
        />
      </div>

      {/* Dropdown Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Category Filter */}
        <div className="flex items-center gap-1.5 flex-1 sm:flex-initial min-w-[130px]">
          <label htmlFor="category-filter" className="sr-only">
            ক্যাটাগরি
          </label>
          <div className="relative w-full">
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value as CropCategory)}
              className="w-full appearance-none pl-3 pr-8 py-2.5 bg-[#FAF8F3] border border-[#E4DFD1] rounded-lg text-sm font-medium text-[#16241C] focus:outline-none focus:ring-2 focus:ring-[#1F3D2B] focus:border-transparent cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-[#6B7A6E]">
              <Filter className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Market Filter */}
        <div className="flex items-center gap-1.5 flex-1 sm:flex-initial min-w-[130px]">
          <label htmlFor="market-filter" className="sr-only">
            বাজার
          </label>
          <div className="relative w-full">
            <select
              id="market-filter"
              value={selectedMarket}
              onChange={(e) => onMarketChange(e.target.value as MarketLocation)}
              className="w-full appearance-none pl-3 pr-8 py-2.5 bg-[#FAF8F3] border border-[#E4DFD1] rounded-lg text-sm font-medium text-[#16241C] focus:outline-none focus:ring-2 focus:ring-[#1F3D2B] focus:border-transparent cursor-pointer"
            >
              {markets.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-[#6B7A6E]">
              <Filter className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Reset Filters button if active */}
        {(searchQuery || selectedCategory !== "সব ফসল" || selectedMarket !== "সব বাজার") && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-[#E4DFD1] text-xs font-semibold text-[#6B7A6E] hover:text-[#1F3D2B] hover:bg-[#EAF0E8] transition"
            title="ফিল্টার রিসেট করুন"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            রিসেট
          </button>
        )}
      </div>
    </section>
  );
}
