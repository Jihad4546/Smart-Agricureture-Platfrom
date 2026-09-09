"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getAuthUserClient } from "../../../lib/auth";
import { ArrowLeft, Bookmark, CheckCircle, Clock, Truck } from "lucide-react";

const translations = {
  en: {
    backToMarket: "Back to Market",
    myOrders: "My Orders",
    noOrders: "No orders found. Shop items in the Marketplace to see orders!",
    orderId: "Order ID",
    date: "Date",
    total: "Total Paid",
    status: "Status",
    items: "Items Ordered",
    statusPending: "Pending Approval",
    statusShipped: "Shipped",
    statusDelivered: "Delivered",
  },
  bn: {
    backToMarket: "বাজারে ফিরে যান",
    myOrders: "আমার অর্ডারসমূহ",
    noOrders: "কোনো অর্ডার পাওয়া যায়নি। অর্ডার দেখতে মার্কেটপ্লেস থেকে পণ্য কিনুন!",
    orderId: "অর্ডার আইডি",
    date: "তারিখ",
    total: "সর্বমোট পরিশোধিত",
    status: "অবস্থা",
    items: "অর্ডারকৃত পণ্যসমূহ",
    statusPending: "অনুমোদনের অপেক্ষায়",
    statusShipped: "পাঠানো হয়েছে",
    statusDelivered: "ডেলিভারি সম্পন্ন",
  }
};

export default function OrdersPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = translations[lang];

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getAuthUserClient();
    if (!user) {
      router.push("/auth/login?redirect=/orders");
      return;
    }

    try {
      const stored = localStorage.getItem("farmer_orders");
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const getStatusIcon = (status: string) => {
    if (status === "Pending") return <Clock size={16} className="text-amber-600" />;
    if (status === "Shipped") return <Truck size={16} className="text-blue-600" />;
    return <CheckCircle size={16} className="text-green-600" />;
  };

  const getStatusClass = (status: string) => {
    if (status === "Pending") return "bg-amber-50 text-amber-700 border border-amber-200";
    if (status === "Shipped") return "bg-blue-50 text-blue-700 border border-blue-200";
    return "bg-[#EAF0E8] text-[#1F3D2B] border border-[#1F3D2B]/10";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F3]">
        <div className="text-center animate-pulse">
          <Bookmark className="mx-auto h-12 w-12 text-[#1F3D2B]" />
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
            <Bookmark size={24} />
          </div>
          <h1 className="text-3xl font-bold text-[#16241C]">{t.myOrders}</h1>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#E4DFD1] bg-white p-12 text-center">
            <Bookmark className="mx-auto h-16 w-16 text-[#6B7A6E]/50 mb-4" />
            <p className="text-[#6B7A6E] font-medium">{t.noOrders}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm space-y-4"
              >
                {/* Order Meta Header */}
                <div className="flex flex-col justify-between gap-4 border-b border-[#FAF8F3] pb-4 sm:flex-row sm:items-center text-sm">
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <p className="text-xs text-[#6B7A6E] uppercase font-semibold">{t.orderId}</p>
                      <p className="font-bold text-[#16241C] mt-0.5">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7A6E] uppercase font-semibold">{t.date}</p>
                      <p className="font-bold text-[#16241C] mt-0.5">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7A6E] uppercase font-semibold">{t.total}</p>
                      <p className="font-bold text-[#1F3D2B] mt-0.5">৳{order.total.toLocaleString()}</p>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {lang === "bn"
                      ? order.status === "Pending"
                        ? t.statusPending
                        : order.status === "Shipped"
                        ? t.statusShipped
                        : t.statusDelivered
                      : order.status === "Pending"
                      ? t.statusPending
                      : order.status === "Shipped"
                      ? t.statusShipped
                      : t.statusDelivered}
                  </span>
                </div>

                {/* Items list */}
                <div>
                  <h3 className="text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-2">
                    {t.items}
                  </h3>
                  <div className="space-y-2">
                    {order.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-xs py-1 text-[#6B7A6E]">
                        <span>
                          {lang === "bn" ? item.titleBn : item.title} <strong className="text-[#16241C]">x {item.quantity}</strong>
                        </span>
                        <span className="font-bold text-[#16241C]">৳{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
