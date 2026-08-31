"use client";

import React, { useState } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import {
  ShoppingCart,
  Heart,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
  Store,
  MessageCircle,
  Share2,
  ChevronLeft
} from "lucide-react";

// --- Translations Definition ---
const translations = {
  en: {
    back: "Back to Products",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    sku: "SKU",
    category: "Category",
    organicTag: "100% Organic Certified",
    quantity: "Quantity",
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    deliveryInfo: "Fast Home Delivery within 2-3 Days",
    returnInfo: "7 Days Easy Return Guarantee",
    qualityInfo: "Directly Sourced from Verified Farmers",
    sellerInfo: "Farmer / Seller Information",
    verifiedSeller: "Verified Farmer",
    chatSeller: "Chat with Seller",
    detailsTab: "Product Description",
    specsTab: "Specifications",
    reviewsTab: "Customer Reviews",
    weight: "Weight / Unit",
    origin: "Origin",
    shelfLife: "Shelf Life",
    packaging: "Packaging",
  },
  bn: {
    back: "পূর্ববর্তী পেজে ফিরে যান",
    inStock: "স্টকে আছে",
    outOfStock: "স্টকে নেই",
    sku: "এসকেইউ (SKU)",
    category: "ক্যাটাগরি",
    organicTag: "১০০% অর্গানিক সার্টিফাইড",
    quantity: "পরিমাণ",
    addToCart: "কার্টে যোগ করুন",
    buyNow: "সরাসরি কিনুন",
    deliveryInfo: "২-৩ দিনের মধ্যে দ্রুত হোম ডেলিভারি",
    returnInfo: "৭ দিনের সহজ রিটার্ন গ্যারান্টি",
    qualityInfo: "যাচাইকৃত কৃষক থেকে সরাসরি সংগৃহীত",
    sellerInfo: "কৃষক / বিক্রেতার তথ্য",
    verifiedSeller: "যাচাইকৃত কৃষক",
    chatSeller: "কথা বলুন",
    detailsTab: "পণ্যের বিবরণ",
    specsTab: "স্পেসিফিকেশন",
    reviewsTab: "গ্রাহক রিভিউ",
    weight: "ওজন / পরিমাপ",
    origin: "উৎপাদনস্থল",
    shelfLife: "সংরক্ষণ মেয়াদ",
    packaging: "প্যাকেজিং",
  }
};

// --- Dummy Product Data ---
const dummyProduct = {
  id: "PROD-8821",
  title: "Premium Organic Katari Bhog Rice",
  titleBn: "প্রিমিয়াম অর্গানিক কাটারীভোগ চাল",
  category: "Cereal & Grains",
  categoryBn: "দানাদার শস্য",
  price: 85,
  priceBn: "৮৫",
  originalPrice: 95,
  originalPriceBn: "৯৫",
  rating: 4.8,
  reviewsCount: 124,
  stock: 450,
  images: [
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
  ],
  description: "Our Premium Katari Bhog Rice is grown using 100% organic practices without harmful pesticides. Known for its distinct aroma and non-sticky texture after cooking.",
  descriptionBn: "আমাদের প্রিমিয়াম কাটারীভোগ চাল কোনো প্রকার ক্ষতিকারক কীটনাশক ছাড়াই ১০০% জৈব পদ্ধতিতে উৎপাদিত। সুগন্ধি ও ঝরঝরে ভাতের জন্য এটি অত্যন্ত জনপ্রিয়।",
  seller: {
    name: "Dinajpur Organic Agro Farm",
    nameBn: "দিনাজপুর অর্গানিক এগ্রো ফার্ম",
    location: "Dinajpur Sadar, Dinajpur",
    locationBn: "দিনাজপুর সদর, দিনাজপুর",
    rating: 4.9,
  },
  specs: {
    weight: "1 KG (Bag)",
    weightBn: "১ কেজি (ব্যাগ)",
    origin: "Dinajpur, Bangladesh",
    originBn: "দিনাজপুর, বাংলাদেশ",
    shelfLife: "12 Months",
    shelfLifeBn: "১২ মাস",
    packaging: "Eco-friendly Jute Bag",
    packagingBn: "পরিবেশবান্ধব পাটের ব্যাগ",
  }
};

export default function ProductDetailsPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "specs" | "reviews">("details");

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    if (type === "inc" && quantity < dummyProduct.stock) setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
      {/* Back Button */}
      <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-600 transition mb-6">
        <ChevronLeft className="w-4 h-4" /> {t.back}
      </button>

      {/* Main Product Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
            <img
              src={dummyProduct.images[selectedImage]}
              alt="Product View"
              className="w-full h-full object-cover"
            />
            <span className="absolute top-3 left-3 bg-[#1F3D2B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {t.organicTag}
            </span>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {dummyProduct.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                  selectedImage === idx ? "border-emerald-600" : "border-slate-200 opacity-70"
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* Category & Stock */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-1 rounded">
                {lang === "bn" ? dummyProduct.categoryBn : dummyProduct.category}
              </span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {t.inStock} ({dummyProduct.stock})
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-slate-900 mt-3">
              {lang === "bn" ? dummyProduct.titleBn : dummyProduct.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-sm font-bold ml-1 text-slate-800">{dummyProduct.rating}</span>
              </div>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">
                {dummyProduct.reviewsCount} {t.reviewsTab}
              </span>
            </div>

            {/* Pricing */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-[#1F3D2B]">
                ৳{lang === "bn" ? dummyProduct.priceBn : dummyProduct.price}
              </span>
              <span className="text-sm text-slate-400 line-through">
                ৳{lang === "bn" ? dummyProduct.originalPriceBn : dummyProduct.originalPrice}
              </span>
              <span className="text-xs text-slate-500">/ {t.weight}</span>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6">
              <label className="text-xs font-bold text-slate-700 block mb-2">{t.quantity}</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                  <button
                    onClick={() => handleQuantityChange("dec")}
                    className="p-2 text-slate-600 hover:text-slate-900 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-slate-800">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("inc")}
                    className="p-2 text-slate-600 hover:text-slate-900 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
<button className="flex-1 bg-[#1F3D2B] hover:bg-[#2F5943] text-white font-bold text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm transition">
                <ShoppingCart className="w-4 h-4" /> {t.addToCart}
              </button>
              <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm transition">
                {t.buyNow}
              </button>
              <button className="p-3 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Value Badges */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.deliveryInfo}</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.returnInfo}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.qualityInfo}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seller & Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left: Product Description & Tabs */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex border-b border-slate-200 text-sm font-semibold gap-6">
            <button
              onClick={() => setActiveTab("details")}
              className={`pb-3 transition border-b-2 ${
                activeTab === "details" ? "border-emerald-600 text-emerald-600" : "border-transparent text-slate-500"
              }`}
            >
              {t.detailsTab}
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-3 transition border-b-2 ${
                activeTab === "specs" ? "border-emerald-600 text-emerald-600" : "border-transparent text-slate-500"
              }`}
            >
              {t.specsTab}
            </button>
          </div>

          <div className="mt-5 text-sm leading-relaxed text-slate-600">
            {activeTab === "details" && (
              <p>{lang === "bn" ? dummyProduct.descriptionBn : dummyProduct.description}</p>
            )}

            {activeTab === "specs" && (
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">{t.weight}</span>
                  <span className="font-semibold text-slate-800">{lang === "bn" ? dummyProduct.specs.weightBn : dummyProduct.specs.weight}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">{t.origin}</span>
                  <span className="font-semibold text-slate-800">{lang === "bn" ? dummyProduct.specs.originBn : dummyProduct.specs.origin}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">{t.shelfLife}</span>
                  <span className="font-semibold text-slate-800">{lang === "bn" ? dummyProduct.specs.shelfLifeBn : dummyProduct.specs.shelfLife}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">{t.packaging}</span>
                  <span className="font-semibold text-slate-800">{lang === "bn" ? dummyProduct.specs.packagingBn : dummyProduct.specs.packaging}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Seller Profile Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm self-start">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{t.sellerInfo}</h3>
          
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg border border-emerald-200">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1">
                {lang === "bn" ? dummyProduct.seller.nameBn : dummyProduct.seller.name}
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
              </h4>
              <p className="text-xs text-slate-500">{lang === "bn" ? dummyProduct.seller.locationBn : dummyProduct.seller.location}</p>
            </div>
          </div>

          <button className="w-full mt-5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs py-2.5 rounded-xl border border-slate-200 flex items-center justify-center gap-2 transition">
            <MessageCircle className="w-4 h-4 text-emerald-600" /> {t.chatSeller}
          </button>
        </div>
      </div>
    </div>
  );
}