"use client";

import React, { useState, useMemo } from "react";
import { Product, CategoryFilter, SortOption, CartItem } from "./types";
import { INITIAL_PRODUCTS } from "./components/MarketplaceData";
import ProductCard from "./components/ProductCard";
import MarketplaceFilters from "./components/MarketplaceFilters";
import AddProductModal from "./components/AddProductModal";
import TrustSection from "./components/TrustSection";
import { Plus, ShoppingCart, SearchX, CheckCircle2 } from "lucide-react";

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("সব");
  const [selectedSort, setSelectedSort] = useState<SortOption>("newest");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      // Search matching Bangla name, English name, farmer, location
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        product.nameBn.toLowerCase().includes(query) ||
        product.nameEn.toLowerCase().includes(query) ||
        product.farmer.toLowerCase().includes(query) ||
        product.location.toLowerCase().includes(query);

      // Category filter
      const matchesCategory =
        selectedCategory === "সব" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sorting
    return result.sort((a, b) => {
      if (selectedSort === "price-asc") return a.price - b.price;
      if (selectedSort === "price-desc") return b.price - a.price;
      if (selectedSort === "popular") return b.rating - a.rating;
      // "newest" by default (higher ID = newer)
      return b.id - a.id;
    });
  }, [products, searchQuery, selectedCategory, selectedSort]);

  // Handle Add to Cart
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, { product, addedAt: new Date() }]);
    showToast(`"${product.nameBn}" কার্টে যোগ হয়েছে`);
  };

  // Handle Add New Product from Modal
  const handleAddProduct = (newProductData: Omit<Product, "id" | "farmer" | "rating">) => {
    const newProduct: Product = {
      ...newProductData,
      id: Date.now(),
      farmer: "আপনার খামার (আপনি)",
      rating: 5.0,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast("পণ্য সফলভাবে যোগ হয়েছে!");
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("সব");
    setSelectedSort("newest");
  };

  const cartProductIds = useMemo(
    () => new Set(cartItems.map((item) => item.product.id)),
    [cartItems]
  );

  return (
    <div className="w-full min-h-screen bg-[#FAF8F3] py-6 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#1F3D2B] text-white px-4 py-3 rounded-xl shadow-lg border border-[#E0A458] flex items-center gap-2 text-sm font-semibold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#E0A458]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E4DFD1]">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1F3D2B]">
              কৃষি মার্কেটপ্লেস
            </h1>
            <p className="mt-1 text-sm md:text-base font-medium text-[#16241C]">
              কৃষকদের কাছ থেকে সরাসরি তাজা কৃষিপণ্য খুঁজে কিনুন।
            </p>
            <p className="text-xs md:text-sm font-normal text-[#6B7A6E]">
              Buy fresh agricultural products directly from local farmers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Local Cart Indicator */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E4DFD1] text-xs font-semibold text-[#1F3D2B] shadow-xs"
              title="কার্টে যোগ করা পণ্যসমূহ"
            >
              <ShoppingCart className="w-4 h-4 text-[#2F5943]" />
              <span>কার্ট: {cartItems.length} টি</span>
            </div>

            {/* Add Product Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1F3D2B] text-white text-xs md:text-sm font-bold shadow-xs hover:bg-[#2F5943] transition active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>পণ্য যোগ করুন</span>
            </button>
          </div>
        </header>

        {/* Search, Filter & Sort Section */}
        <MarketplaceFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          onClearFilters={handleClearFilters}
        />

        {/* Main Product Grid */}
        <section aria-label="Product Listings">
          {filteredProducts.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-2xl p-10 border border-[#E4DFD1] text-center space-y-4 shadow-xs my-6">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <SearchX className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#16241C]">
                  কোনো পণ্য পাওয়া যায়নি
                </h3>
                <p className="text-sm text-[#6B7A6E]">
                  আপনার সার্চ বা ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।
                </p>
              </div>
              <button
                onClick={handleClearFilters}
                className="px-5 py-2.5 rounded-xl bg-[#1F3D2B] text-white text-xs md:text-sm font-semibold hover:bg-[#2F5943] transition shadow-xs"
              >
                ফিল্টার পরিষ্কার করুন
              </button>
            </div>
          ) : (
            /* Responsive Product Grid (4 columns desktop, 2 columns tablet, 1 column mobile) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  isInCart={cartProductIds.has(product.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Trust Section */}
        <TrustSection />
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}
