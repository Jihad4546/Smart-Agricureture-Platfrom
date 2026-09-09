"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getAuthUserClient } from "../../../lib/auth";
import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus, CreditCard, Tag } from "lucide-react";

const translations = {
  en: {
    backToMarket: "Back to Market",
    cart: "Shopping Cart",
    emptyCart: "Your cart is empty. Add products from the Marketplace to buy!",
    summary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Delivery / Shipping Fee",
    total: "Total Amount",
    checkout: "Proceed to Checkout / Place Order",
    qty: "Qty",
    free: "Free",
    successCheckout: "Order placed successfully!",
  },
  bn: {
    backToMarket: "বাজারে ফিরে যান",
    cart: "শপিং কার্ট",
    emptyCart: "আপনার কার্ট খালি। পণ্য কিনতে মার্কেটপ্লেস থেকে পণ্য যোগ করুন!",
    summary: "অর্ডারের সারসংক্ষেপ",
    subtotal: "উপমোট",
    shipping: "ডেলিভারি খরচ",
    total: "সর্বমোট মূল্য",
    checkout: "অর্ডার সম্পন্ন করুন",
    qty: "পরিমাণ",
    free: "ফ্রি",
    successCheckout: "অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!",
  }
};

export default function CartPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = translations[lang];

  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getAuthUserClient();
    if (!user) {
      router.push("/auth/login?redirect=/cart");
      return;
    }

    try {
      const stored = localStorage.getItem("farmer_cart");
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const updateQuantity = (id: string, delta: number) => {
    const updated = cart
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCart(updated);
    localStorage.setItem("farmer_cart", JSON.stringify(updated));
  };

  const handleRemove = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("farmer_cart", JSON.stringify(updated));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    try {
      const storedOrders = localStorage.getItem("farmer_orders");
      const currentOrders = storedOrders ? JSON.parse(storedOrders) : [];

      const newOrder = {
        id: "ORD-" + Date.now().toString().slice(-6),
        date: new Date().toISOString().split("T")[0],
        items: cart,
        total: subtotal,
        status: "Pending",
        statusBn: lang === "bn" ? "অপেক্ষমান" : "Pending",
      };

      localStorage.setItem("farmer_orders", JSON.stringify([newOrder, ...currentOrders]));
      localStorage.removeItem("farmer_cart");
      
      alert(t.successCheckout);
      router.push("/orders");
    } catch (e) {
      console.error(e);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 0 ? 100 : 0;
  const grandTotal = subtotal + shippingFee;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F3]">
        <div className="text-center animate-pulse">
          <ShoppingCart className="mx-auto h-12 w-12 text-[#1F3D2B]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Navigation Link */}
        <button
          onClick={() => router.push("/marketplace")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#1F3D2B] transition hover:text-[#2F5943]"
        >
          <ArrowLeft size={16} />
          {t.backToMarket}
        </button>

        {/* Page Title */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF0E8] text-[#1F3D2B]">
            <ShoppingCart size={24} />
          </div>
          <h1 className="text-3xl font-bold text-[#16241C]">{t.cart}</h1>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#E4DFD1] bg-white p-12 text-center">
            <ShoppingCart className="mx-auto h-16 w-16 text-[#6B7A6E]/50 mb-4" />
            <p className="text-[#6B7A6E] font-medium">{t.emptyCart}</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left side: Cart Items (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#E4DFD1] bg-white p-4 shadow-sm flex items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <span className="inline-block rounded bg-[#EAF0E8] px-2 py-0.5 text-[10px] font-bold text-[#1F3D2B] mb-1">
                      {lang === "bn" ? item.categoryBn : item.category}
                    </span>
                    <h3 className="text-sm font-bold text-[#16241C]">
                      {lang === "bn" ? item.titleBn : item.title}
                    </h3>
                    <p className="text-xs font-extrabold text-[#1F3D2B] mt-1">
                      ৳{item.price} <span className="text-[10px] font-normal text-[#6B7A6E]">/ {lang === "bn" ? item.unitBn : item.unit}</span>
                    </p>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4DFD1] hover:bg-[#FAF8F3] text-[#6B7A6E] transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-bold text-[#16241C] w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4DFD1] hover:bg-[#FAF8F3] text-[#6B7A6E] transition"
                    >
                      <Plus size={14} />
                    </button>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="h-8 w-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right side: Summary Form (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
                <h2 className="text-base font-bold text-[#16241C] mb-4 flex items-center gap-2">
                  <Tag size={16} className="text-[#1F3D2B]" />
                  {t.summary}
                </h2>

                <div className="space-y-3 text-sm border-b border-[#FAF8F3] pb-4">
                  <div className="flex justify-between text-[#6B7A6E]">
                    <span>{t.subtotal}</span>
                    <span className="font-semibold text-[#16241C]">৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#6B7A6E]">
                    <span>{t.shipping}</span>
                    <span className="font-semibold text-[#16241C]">৳{shippingFee}</span>
                  </div>
                </div>

                <div className="flex justify-between text-base font-bold text-[#16241C] py-4">
                  <span>{t.total}</span>
                  <span className="text-[#1F3D2B] text-lg">৳{grandTotal.toLocaleString()}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="flex w-full h-11 items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] text-sm font-semibold text-white transition hover:bg-[#2F5943] shadow-lg mt-4"
                >
                  <CreditCard size={16} />
                  {t.checkout}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
