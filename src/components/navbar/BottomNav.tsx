"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  LayoutDashboard,
  Wheat,
  CloudSun,
  ShieldAlert,
  Store,
  UserCircle2,
} from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  // Bottom Navigation Translation
  const translations = {
    en: {
      dashboard: "Dashboard",
      crops: "Crops",
      weather: "Weather",
      doctor: "AI Doctor",
      market: "Market",
      profile: "Profile",
    },
    bn: {
      dashboard: "ড্যাশবোর্ড",
      crops: "ফসল",
      weather: "আবহাওয়া",
      doctor: "এআই ডাক্তার",
      market: "বাজার",
      profile: "প্রোফাইল",
    },
  };

  const t = translations[lang];

  const navItems = [
    {
      label: t.dashboard,
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: t.crops,
      href: "/crops",
      icon: Wheat,
    },
    {
      label: t.weather,
      href: "/weather",
      icon: CloudSun,
    },
    {
      label: t.doctor,
      href: "/disease",
      icon: ShieldAlert,
    },
    {
      label: t.market,
      href: "/marketplace",
      icon: Store,
    },
    {
      label: t.profile,
      href: "/profile",
      icon: UserCircle2,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[999] border-t border-[#E4DFD1] bg-white/90 pb-safe-bottom shadow-[0_-8px_30px_rgb(31,61,43,0.08)] backdrop-blur-md lg:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 px-2.5 py-1 text-center transition-all ${
                isActive
                  ? "text-[#1F3D2B] scale-105 font-bold"
                  : "text-[#6B7A6E] hover:text-[#1F3D2B]"
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all ${
                  isActive
                    ? "bg-[#EAF0E8] text-[#1F3D2B]"
                    : "bg-transparent text-[#6B7A6E]"
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
