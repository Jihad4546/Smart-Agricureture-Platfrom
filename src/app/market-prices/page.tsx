"use client";

import React, { useState, useMemo } from "react";
import MarketHeader from "../../Component/market/MarketHeader";
import MarketSummaryCard from "../../Component/market/MarketSummaryCard";
import MarketFilters from "../../Component/market/MarketFilters";
import CropPriceTable from "../../Component/market/CropPriceTable";
import PriceTrend from "../../Component/market/PriceTrend";
import MarketComparison from "../../Component/market/MarketComparison";
import MarketInsight from "../../Component/market/MarketInsight";

import { CropCategory, MarketLocation } from "../../types/market";
import { DEMO_CROP_PRICES, DEMO_SUMMARY_DATA } from "../../data/marketData";

export default function MarketPricesPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<CropCategory>("সব ফসল");
  const [selectedMarket, setSelectedMarket] = useState<MarketLocation>("সব বাজার");

  // Programmatic Search & Filter Logic
  const filteredCrops = useMemo(() => {
    return DEMO_CROP_PRICES.filter((crop) => {
      // Search matching Bangla OR English name
      const matchesSearch =
        searchQuery.trim() === "" ||
        crop.nameBn.includes(searchQuery.trim()) ||
        crop.nameEn.toLowerCase().includes(searchQuery.trim().toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === "সব ফসল" || crop.category === selectedCategory;

      // Market filter
      const matchesMarket =
        selectedMarket === "সব বাজার" || crop.market === selectedMarket;

      return matchesSearch && matchesCategory && matchesMarket;
    });
  }, [searchQuery, selectedCategory, selectedMarket]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("সব ফসল");
    setSelectedMarket("সব বাজার");
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF8F3] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        {/* 1. Header Section */}
        <MarketHeader />

        {/* 2. Summary Metric Cards */}
        <MarketSummaryCard summary={DEMO_SUMMARY_DATA} />

        {/* 3. Search and Filter Bar */}
        <MarketFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedMarket={selectedMarket}
          onMarketChange={setSelectedMarket}
          onReset={handleResetFilters}
        />

        {/* 4. Main Price Table & Mobile Cards */}
        <CropPriceTable crops={filteredCrops} />

        {/* 5. Price Trends Chart */}
        <PriceTrend />

        {/* 6. Nearby Market Comparison Grid */}
        <MarketComparison />

        {/* 7. AI Insight Card */}
        <MarketInsight />
      </div>
    </div>
  );
}
