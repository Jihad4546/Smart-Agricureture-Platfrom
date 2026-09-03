"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getAuthUserClient } from "../../../lib/auth";
import {
  ArrowLeft,
  TrendingUp,
  ShoppingBag,
  Plus,
  Bookmark,
  ShoppingCart,
  Store,
  Tag,
  Scale,
  Trash2,
  Search,
  Heart,
} from "lucide-react";

const translations = {
  en: {
    backToDashboard: "Back to Dashboard",
    marketplace: "Market & Marketplace",
    tabPrices: "Market Prices",
    tabBuy: "Buy Products",
    tabSell: "Create Listing",
    tabMyListings: "My Listings",
    cartButton: "View Cart",
    ordersButton: "My Orders",
    
    // Prices tab
    cropName: "Crop Name",
    currentPrice: "Current Price",
    weeklyChange: "Weekly Change",
    priceTrend: "6-Month Trend",
    unit: "Quintal",
    kg: "Kg",
    maund: "Maund",
    
    // Buy tab
    addToCart: "Add to Cart",
    seller: "Seller",
    searchPlaceholder: "Search crops or seeds...",
    addedToCart: "Added to cart!",
    
    // Sell Form
    itemNameEn: "Product Title (English)",
    itemNameBn: "Product Title (Bangla)",
    category: "Category",
    price: "Price",
    quantity: "Quantity / Available Stock",
    unitSelect: "Unit",
    description: "Description",
    saveListing: "Publish Listing",
    fillAll: "Please fill in all required fields.",
    successPublish: "Product listed for sale successfully!",

    // Categories
    crops: "Harvested Crops",
    seeds: "Seeds",
    fertilizer: "Fertilizer / Pesticides",
    tools: "Tools",

    // My Listings
    deleteListing: "Remove Listing",
    confirmDelete: "Are you sure you want to remove this listing?",
    noListings: "You have no active listings. Post your first product in the 'Create Listing' tab!",
  },
  bn: {
    backToDashboard: "ড্যাশবোর্ডে ফিরে যান",
    marketplace: "বাজার ও মার্কেটপ্লেস",
    tabPrices: "বাজার দর",
    tabBuy: "পণ্য কিনুন",
    tabSell: "বিজ্ঞাপন তৈরি করুন",
    tabMyListings: "আমার বিজ্ঞাপন",
    cartButton: "কার্ট দেখুন",
    ordersButton: "আমার অর্ডার",

    // Prices tab
    cropName: "ফসলের নাম",
    currentPrice: "বর্তমান মূল্য",
    weeklyChange: "সাপ্তাহিক পরিবর্তন",
    priceTrend: "৬ মাসের দামের গ্রাফ",
    unit: "কুইন্টাল",
    kg: "কেজি",
    maund: "মন",

    // Buy tab
    addToCart: "কার্টে যুক্ত করুন",
    seller: "বিক্রেতা",
    searchPlaceholder: "ফসল বা বীজ খুঁজুন...",
    addedToCart: "কার্টে যুক্ত করা হয়েছে!",

    // Sell Form
    itemNameEn: "পণ্যের শিরোনাম (ইংরেজি)",
    itemNameBn: "পণ্যের শিরোনাম (বাংলা)",
    category: "বিভাগ",
    price: "মূল্য",
    quantity: "পরিমাণ / মোট স্টক",
    unitSelect: "একক",
    description: "বিবরণ",
    saveListing: "বিজ্ঞাপনটি প্রকাশ করুন",
    fillAll: "দয়া করে সব প্রয়োজনীয় তথ্য পূরণ করুন।",
    successPublish: "পণ্যটি বিক্রির জন্য সফলভাবে তালিকাভুক্ত হয়েছে!",

    // Categories
    crops: "উত্পাদিত ফসল",
    seeds: "বীজ",
    fertilizer: "সার / কীটনাশক",
    tools: "কৃষি যন্ত্রপাতি",

    // My Listings
    deleteListing: "মুছে ফেলুন",
    confirmDelete: "আপনি কি নিশ্চিত যে আপনি এই বিজ্ঞাপনটি মুছে ফেলতে চান?",
    noListings: "আপনার কোনো বিজ্ঞাপন নেই। পণ্য বিক্রি করতে 'বিজ্ঞাপন তৈরি করুন' ট্যাব থেকে যুক্ত করুন!",
  }
};

export default function MarketplacePage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState<"prices" | "buy" | "sell" | "my">("prices");
  const [user, setUser] = useState<any | null>(null);
  
  // States
  const [listings, setListings] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  // Sell Form States
  const [titleEn, setTitleEn] = useState("");
  const [titleBn, setTitleBn] = useState("");
  const [category, setCategory] = useState("Crops");
  const [priceVal, setPriceVal] = useState("");
  const [qtyVal, setQtyVal] = useState("");
  const [unitVal, setUnitVal] = useState("Kg");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const currentUser = getAuthUserClient();
    if (!currentUser) {
      router.push("/auth/login?redirect=/marketplace");
      return;
    }
    setUser(currentUser);

    // Initial listings configuration
    try {
      const storedListings = localStorage.getItem("market_listings");
      if (storedListings) {
        setListings(JSON.parse(storedListings));
      } else {
        const defaultListings = [
          {
            id: "101",
            title: "Premium BRRI Rice Seedlings",
            titleBn: "উন্নত ব্রি ধান চারা",
            category: "Seeds",
            categoryBn: "বীজ",
            price: 500,
            unit: "Bundle",
            unitBn: "আঁটি",
            quantity: 80,
            seller: "Rahman Seeds",
            description: "High quality disease-free BRRI dhan29 seedlings ready for transplanting.",
          },
          {
            id: "102",
            title: "Organic Red Potato",
            titleBn: "জৈব লাল আলু",
            category: "Crops",
            categoryBn: "উত্পাদিত ফসল",
            price: 40,
            unit: "Kg",
            unitBn: "কেজি",
            quantity: 500,
            seller: "Karim Farms",
            description: "Completely organic red potatoes grown without synthetic fertilizers.",
          },
          {
            id: "103",
            title: "High Yield Jute Seeds",
            titleBn: "উন্নত ফলনশীল পাটের বীজ",
            category: "Seeds",
            categoryBn: "বীজ",
            price: 250,
            unit: "Pack",
            unitBn: "প্যাকেট",
            quantity: 30,
            seller: "AgriTech Store",
            description: "Tossa Jute seeds with 95% germination rate certification.",
          },
          {
            id: "104",
            title: "Organic NPK Fertilizer",
            titleBn: "জৈব এনপিকে সার",
            category: "Fertilizer",
            categoryBn: "সার / কীটনাশক",
            price: 1200,
            unit: "Bag",
            unitBn: "বস্তা",
            quantity: 15,
            seller: "Agro Care Chemicals",
            description: "Balanced nitrogen-phosphorus-potassium organic blend for optimal crop yields.",
          }
        ];
        localStorage.setItem("market_listings", JSON.stringify(defaultListings));
        setListings(defaultListings);
      }

      // Read cart items count
      const storedCart = localStorage.getItem("farmer_cart");
      if (storedCart) {
        const cartItems = JSON.parse(storedCart);
        setCartCount(cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0));
      }
    } catch (e) {
      console.error(e);
    }
  }, [router]);

  const handleAddToCart = (item: any) => {
    try {
      const storedCart = localStorage.getItem("farmer_cart");
      let cart = storedCart ? JSON.parse(storedCart) : [];
      
      const idx = cart.findIndex((i: any) => i.id === item.id);
      if (idx !== -1) {
        cart[idx].quantity += 1;
      } else {
        cart.push({ ...item, quantity: 1 });
      }

      localStorage.setItem("farmer_cart", JSON.stringify(cart));
      setCartCount(cart.reduce((acc: number, i: any) => acc + i.quantity, 0));
      alert(t.addedToCart);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn || !titleBn || !priceVal || !qtyVal) {
      setError(t.fillAll);
      return;
    }

    try {
      const newListing = {
        id: Date.now().toString(),
        title: titleEn,
        titleBn,
        category,
        categoryBn: lang === "bn" ? translations.bn[category.toLowerCase() as keyof typeof translations.bn] || category : category,
        price: Number(priceVal),
        unit: unitVal,
        unitBn: lang === "bn" ? (unitVal === "Kg" ? "কেজি" : unitVal === "Maund" ? "মন" : "কুইন্টাল") : unitVal,
        quantity: Number(qtyVal),
        seller: user?.name || "Local Farmer",
        description: desc,
      };

      const updated = [newListing, ...listings];
      setListings(updated);
      localStorage.setItem("market_listings", JSON.stringify(updated));

      setTitleEn("");
      setTitleBn("");
      setPriceVal("");
      setQtyVal("");
      setDesc("");
      setError("");
      setSuccess(t.successPublish);

      setTimeout(() => setSuccess(""), 3000);
      setActiveTab("my");
    } catch (err) {
      console.error(err);
      setError("Failed to create listing.");
    }
  };

  const handleDeleteListing = (id: string) => {
    if (!confirm(t.confirmDelete)) return;
    const updated = listings.filter((l) => l.id !== id);
    setListings(updated);
    localStorage.setItem("market_listings", JSON.stringify(updated));
  };

  // Mock Market Price data with SVG trends
  const marketCrops = [
    { name: lang === "bn" ? "ধান (Rice)" : "Rice", price: "৳২,৪০০ / " + t.unit, change: "+1.5%", isUp: true, path: "M 0 22 L 20 20 L 40 23 L 60 15 L 80 12 L 100 8" },
    { name: lang === "bn" ? "আলু (Potato)" : "Potato", price: "৳১,২০০ / " + t.unit, change: "-0.8%", isUp: false, path: "M 0 10 L 20 12 L 40 8 L 60 14 L 80 16 L 100 18" },
    { name: lang === "bn" ? "পাট (Jute)" : "Jute", price: "৳৫,৫০০ / " + t.unit, change: "+3.2%", isUp: true, path: "M 0 25 L 20 22 L 40 18 L 60 16 L 80 10 L 100 5" },
    { name: lang === "bn" ? "পেঁয়াজ (Onion)" : "Onion", price: "৳৪,০০০ / " + t.unit, change: "+5.4%", isUp: true, path: "M 0 28 L 20 25 L 40 20 L 60 15 L 80 8 L 100 4" },
    { name: lang === "bn" ? "গম (Wheat)" : "Wheat", price: "৳২,৮০০ / " + t.unit, change: "+0.5%", isUp: true, path: "M 0 15 L 20 14 L 40 13 L 60 15 L 80 11 L 100 9" },
  ];

  const filteredListings = listings.filter((item) => {
    const query = search.toLowerCase();
    const matchesTitle = item.title.toLowerCase().includes(query) || item.titleBn.toLowerCase().includes(query);
    return matchesTitle;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Navigation back and Cart/Orders */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-sm font-semibold text-[#1F3D2B] transition hover:text-[#2F5943]"
          >
            <ArrowLeft size={16} />
            {t.backToDashboard}
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/orders")}
              className="flex h-9 items-center justify-center gap-2 rounded-xl border border-[#E4DFD1] bg-white px-4 text-xs font-semibold text-[#1F3D2B] hover:bg-[#FAF8F3] transition"
            >
              <Bookmark size={14} />
              {t.ordersButton}
            </button>
            
            <button
              onClick={() => router.push("/cart")}
              className="flex h-9 items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] px-4 text-xs font-semibold text-white hover:bg-[#2F5943] transition relative"
            >
              <ShoppingCart size={14} />
              {t.cartButton}
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF0E8] text-[#1F3D2B]">
            <Store size={24} />
          </div>
          <h1 className="text-3xl font-bold text-[#16241C]">{t.marketplace}</h1>
        </div>

        {/* Tab Selection */}
        <div className="mb-8 flex border-b border-[#E4DFD1] overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setActiveTab("prices")}
            className={`pb-4 px-6 text-sm font-bold border-b-2 transition ${
              activeTab === "prices"
                ? "border-[#1F3D2B] text-[#1F3D2B]"
                : "border-transparent text-[#6B7A6E] hover:text-[#1F3D2B]"
            }`}
          >
            <TrendingUp size={16} className="inline mr-2" />
            {t.tabPrices}
          </button>
          <button
            onClick={() => setActiveTab("buy")}
            className={`pb-4 px-6 text-sm font-bold border-b-2 transition ${
              activeTab === "buy"
                ? "border-[#1F3D2B] text-[#1F3D2B]"
                : "border-transparent text-[#6B7A6E] hover:text-[#1F3D2B]"
            }`}
          >
            <ShoppingBag size={16} className="inline mr-2" />
            {t.tabBuy}
          </button>
          <button
            onClick={() => setActiveTab("sell")}
            className={`pb-4 px-6 text-sm font-bold border-b-2 transition ${
              activeTab === "sell"
                ? "border-[#1F3D2B] text-[#1F3D2B]"
                : "border-transparent text-[#6B7A6E] hover:text-[#1F3D2B]"
            }`}
          >
            <Plus size={16} className="inline mr-2" />
            {t.tabSell}
          </button>
          <button
            onClick={() => setActiveTab("my")}
            className={`pb-4 px-6 text-sm font-bold border-b-2 transition ${
              activeTab === "my"
                ? "border-[#1F3D2B] text-[#1F3D2B]"
                : "border-transparent text-[#6B7A6E] hover:text-[#1F3D2B]"
            }`}
          >
            <Store size={16} className="inline mr-2" />
            {t.tabMyListings}
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === "prices" && (
          /* ==============================================
             MARKET CROP PRICES TAB
             ============================================== */
          <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-[#6B7A6E]">
                <thead>
                  <tr className="border-b border-[#E4DFD1] text-xs font-semibold uppercase tracking-wider text-[#16241C]">
                    <th className="py-3 px-4">{t.cropName}</th>
                    <th className="py-3 px-4">{t.currentPrice}</th>
                    <th className="py-3 px-4">{t.weeklyChange}</th>
                    <th className="py-3 px-4 w-44">{t.priceTrend}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FAF8F3]">
                  {marketCrops.map((crop, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF8F3]">
                      <td className="py-4 px-4 font-bold text-[#16241C]">{crop.name}</td>
                      <td className="py-4 px-4 font-extrabold text-[#1F3D2B]">{crop.price}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          crop.isUp ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                        }`}>
                          {crop.change}
                        </span>
                      </td>
                      <td className="py-2 px-4">
                        {/* Inline SVG Chart */}
                        <svg className="w-full h-8" viewBox="0 0 100 30" preserveAspectRatio="none">
                          <path
                            d={crop.path}
                            fill="none"
                            stroke={crop.isUp ? "#16a34a" : "#dc2626"}
                            strokeWidth="2"
                          />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "buy" && (
          /* ==============================================
             BUY PRODUCTS TAB
             ============================================== */
         <div className="space-y-6">
  {/* Search Input */}
  <div className="max-w-md">
    <input
      type="text"
      placeholder={t.searchPlaceholder}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full h-11 rounded-xl border border-[#E4DFD1] bg-white px-4 text-sm text-[#16241C] outline-none focus:border-[#1F3D2B] transition"
    />
  </div>

  {/* Product Grid */}
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {filteredListings.map((item) => (
      <div
        key={item.id}
        className="group relative bg-white border border-[#E4DFD1] p-4 rounded-2xl transition-all hover:shadow-lg hover:border-[#1F3D2B] text-center flex flex-col justify-between"
      >
        {/* Sale Badge */}
        {item.onSale && (
          <span className="absolute top-3 left-3 bg-[#1F3D2B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">
            SALE!
          </span>
        )}

        <div>
          {/* Image & Overlay Actions */}
          <div className="relative w-full h-44 mb-4 overflow-hidden rounded-xl flex items-center justify-center bg-[#FAF8F3]">
            <img
              src={item.image}
              alt={lang === "bn" ? item.titleBn : item.title}
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />

            {/* Quick Action Buttons */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  setSelectedProduct(item);
                  setQuantity(1);
                }}
                title="Quick View"
                className="p-2 bg-white text-[#16241C] rounded-full hover:bg-[#1F3D2B] hover:text-white transition-colors shadow"
              >
                <Search size={16} />
              </button>
              <button
                onClick={() => handleAddToCart(item)}
                title={t.addToCart}
                className="p-2 bg-white text-[#16241C] rounded-full hover:bg-[#1F3D2B] hover:text-white transition-colors shadow"
              >
                <ShoppingCart size={16} />
              </button>
              <button
                title="Wishlist"
                className="p-2 bg-white text-[#16241C] rounded-full hover:bg-[#1F3D2B] hover:text-white transition-colors shadow"
              >
                <Heart size={16} />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <h3
            onClick={() => {
              setSelectedProduct(item);
              setQuantity(1);
            }}
            className="text-base font-bold text-[#16241C] hover:text-[#1F3D2B] cursor-pointer transition-colors leading-snug"
          >
            {lang === "bn" ? item.titleBn : item.title}
          </h3>

          <p className="text-xs text-[#6B7A6E] mt-1">
            {t.seller}: <strong className="text-[#16241C]">{item.seller}</strong>
          </p>
        </div>

        {/* Price & Weight */}
        <div className="mt-4 pt-3 border-t border-[#FAF8F3] flex items-center justify-center gap-1.5 text-sm">
          {item.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ৳{item.originalPrice}
            </span>
          )}
          <span className="text-base font-extrabold text-[#1F3D2B]">
            ৳{item.price}
          </span>
          <span className="text-xs text-[#6B7A6E]">
            / {lang === "bn" ? item.unitBn : item.unit}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>
        )}

        {activeTab === "sell" && (
          /* ==============================================
             CREATE LISTING TAB
             ============================================== */
          <div className="max-w-xl mx-auto rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-[#16241C] mb-6 flex items-center gap-2">
              <Tag size={18} className="text-[#1F3D2B]" />
              {t.tabSell}
            </h2>

            {error && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-4 text-xs font-semibold text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 rounded-xl bg-green-50 border border-green-200 p-4 text-xs font-semibold text-[#1F3D2B]">
                {success}
              </div>
            )}

            <form onSubmit={handlePublish} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-2">
                  {t.itemNameEn} *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Organic Potato Seeds"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="w-full h-11 rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] px-4 text-sm text-[#16241C] outline-none focus:border-[#1F3D2B] focus:bg-white transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-2">
                  {t.itemNameBn} *
                </label>
                <input
                  type="text"
                  placeholder="যেমন: উন্নত আলু বীজ"
                  value={titleBn}
                  onChange={(e) => setTitleBn(e.target.value)}
                  className="w-full h-11 rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] px-4 text-sm text-[#16241C] outline-none focus:border-[#1F3D2B] focus:bg-white transition"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-2">
                    {t.category}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] px-4 text-sm text-[#16241C] outline-none focus:border-[#1F3D2B] focus:bg-white transition"
                  >
                    <option value="Crops">{lang === "bn" ? "উত্পাদিত ফসল" : "Harvested Crops"}</option>
                    <option value="Seeds">{lang === "bn" ? "বীজ" : "Seeds"}</option>
                    <option value="Fertilizer">{lang === "bn" ? "সার / কীটনাশক" : "Fertilizer"}</option>
                    <option value="Tools">{lang === "bn" ? "যন্ত্রপাতি" : "Tools"}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-2">
                    {t.unitSelect}
                  </label>
                  <select
                    value={unitVal}
                    onChange={(e) => setUnitVal(e.target.value)}
                    className="w-full h-11 rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] px-4 text-sm text-[#16241C] outline-none focus:border-[#1F3D2B] focus:bg-white transition"
                  >
                    <option value="Kg">Kg / কেজি</option>
                    <option value="Maund">Maund / মন</option>
                    <option value="Quintal">Quintal / কুইন্টাল</option>
                    <option value="Pack">Pack / প্যাকেট</option>
                    <option value="Bundle">Bundle / আঁটি</option>
                    <option value="Bag">Bag / বস্তা</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-2">
                    {t.price} (BDT) *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 50"
                    value={priceVal}
                    onChange={(e) => setPriceVal(e.target.value)}
                    className="w-full h-11 rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] px-4 text-sm text-[#16241C] outline-none focus:border-[#1F3D2B] focus:bg-white transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-2">
                    {t.quantity} *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 100"
                    value={qtyVal}
                    onChange={(e) => setQtyVal(e.target.value)}
                    className="w-full h-11 rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] px-4 text-sm text-[#16241C] outline-none focus:border-[#1F3D2B] focus:bg-white transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-2">
                  {t.description}
                </label>
                <textarea
                  placeholder="Tell buyers about your seed quality, certifications or crop health..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full h-24 rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] p-4 text-sm text-[#16241C] outline-none focus:border-[#1F3D2B] focus:bg-white transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] text-sm font-semibold text-white transition hover:bg-[#2F5943] shadow-lg"
              >
                <Plus size={16} />
                {t.saveListing}
              </button>
            </form>
          </div>
        )}

        {activeTab === "my" && (
          /* ==============================================
             MY LISTINGS TAB
             ============================================== */
          <div className="space-y-6">
            {listings.filter((l) => l.seller === user?.name).length === 0 ? (
              <div className="rounded-3xl border border-dashed border-[#E4DFD1] bg-white p-12 text-center">
                <Store className="mx-auto h-16 w-16 text-[#6B7A6E]/50 mb-4" />
                <p className="text-[#6B7A6E] font-medium">{t.noListings}</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {listings
                  .filter((l) => l.seller === user?.name)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm flex flex-col justify-between hover:border-[#1F3D2B] transition"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-flex items-center rounded-full bg-[#EAF0E8] px-2.5 py-0.5 text-xs font-semibold text-[#1F3D2B]">
                            {lang === "bn" ? item.categoryBn : item.category}
                          </span>
                          <button
                            onClick={() => handleDeleteListing(item.id)}
                            className="h-8 w-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition"
                            title={t.deleteListing}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <h3 className="text-lg font-bold text-[#16241C] leading-snug">
                          {lang === "bn" ? item.titleBn : item.title}
                        </h3>
                        <p className="text-xs text-[#6B7A6E] mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-6 border-t border-[#FAF8F3] pt-4 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-[#6B7A6E] uppercase font-semibold">{t.price}</p>
                          <p className="text-lg font-extrabold text-[#1F3D2B]">
                            ৳{item.price} <span className="text-xs font-normal text-[#6B7A6E]">/ {lang === "bn" ? item.unitBn : item.unit}</span>
                          </p>
                          <p className="text-[10px] text-[#6B7A6E] mt-0.5">Stock: {item.quantity} {lang === "bn" ? item.unitBn : item.unit}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
