import React from "react";
import { CategoryFilter, SortOption } from "../types";
import { Search, ArrowUpDown, X } from "lucide-react";

interface MarketplaceFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  onClearFilters: () => void;
}

export default function MarketplaceFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
  onClearFilters,
}: MarketplaceFiltersProps) {
  const categories: CategoryFilter[] = ["সব", "ধান", "সবজি", "ফল", "শস্য", "মসলা", "অন্যান্য"];

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "সব" || selectedSort !== "newest";

  return (
    <section aria-label="Marketplace Search and Filters" className="space-y-4">
      {/* Top Bar: Search Input & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Large Search Input */}
        <div className="relative flex-1">
          <label htmlFor="marketplace-search" className="sr-only">
            পণ্য খুঁজুন (Search Products)
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B7A6E]">
            <Search className="w-5 h-5" />
          </div>
          <input
            id="marketplace-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="পণ্য খুঁজুন... (Search by crop, farmer, or location...)"
            className="w-full pl-10 pr-10 py-3 bg-white border border-[#E4DFD1] rounded-xl text-sm md:text-base text-[#16241C] placeholder-[#6B7A6E] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#1F3D2B] focus:border-transparent transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7A6E] hover:text-[#16241C]"
              title="সার্চ মুছুন"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto min-w-[170px]">
          <label htmlFor="sort-dropdown" className="text-xs font-semibold text-[#6B7A6E] whitespace-nowrap">
            সাজান:
          </label>
          <div className="relative w-full">
            <select
              id="sort-dropdown"
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full appearance-none pl-3 pr-8 py-2.5 bg-white border border-[#E4DFD1] rounded-xl text-xs md:text-sm font-semibold text-[#16241C] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#1F3D2B] cursor-pointer"
            >
              <option value="newest">নতুন পণ্য</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
              <option value="popular">জনপ্রিয়</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-[#6B7A6E]">
              <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Horizontal Category Tabs */}
      <div className="flex items-center justify-between gap-2 border-b border-[#E4DFD1] pb-3 overflow-hidden">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 w-full max-w-full">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#1F3D2B] text-white shadow-xs"
                    : "bg-white text-[#6B7A6E] border border-[#E4DFD1] hover:bg-[#EAF0E8] hover:text-[#1F3D2B]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Clear All Filters Button if active */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition whitespace-nowrap"
          >
            <X className="w-3.5 h-3.5" />
            রিসেট
          </button>
        )}
      </div>
    </section>
  );
}
