"use client";

import React, { useState, useRef, useEffect, type ReactNode, type CSSProperties, type RefObject } from "react";
import { useRouter } from "next/navigation";
import {
  Sprout, Menu, X, ChevronDown, LayoutDashboard, Wheat, CloudSun,
  PawPrint, UserCircle2, Bug, TestTube2, BookOpen,
  MessageCircleQuestion, LineChart, Store, PackageSearch, ShoppingCart,
  ClipboardList, Bell, Shield, LogIn, UserPlus, Globe, Beaker, type LucideIcon,
} from "lucide-react";

type Lang = "bn" | "en";
type GroupKey = "dashboard" | "crop" | "knowledge" | "market" | "livestock" | "account";

interface SingleGroup {
  label: string;
  single: true;
}

interface MultiGroup {
  label: string;
  single?: false;
  items: string[];
}

type Group = SingleGroup | MultiGroup;

interface Translation {
  brand: string;
  home: string;
  login: string;
  register: string;
  lang: string;
  groups: Record<GroupKey, Group>;
}

const T: Record<Lang, Translation> = {
  bn: {
    brand: "এগ্রিটেক",
    home: "হোম",
    login: "লগ ইন",
    register: "নিবন্ধন",
    lang: "EN",
    groups: {
      dashboard: { label: "ড্যাশবোর্ড", single: true },
      crop: {
        label: "ফসল ব্যবস্থাপনা",
        items: ["ফসল ব্যবস্থাপনা", "ফসল যোগ করুন", "ফসলের বিবরণ", "ফসল ক্যালেন্ডার"],
      },
      knowledge: {
        label: "জ্ঞান ও পরামর্শ",
        items: ["আবহাওয়া", "মাটি ব্যবস্থাপনা", "রোগ শনাক্তকরণ", "রোগ লাইব্রেরি", "বিশেষজ্ঞ পরামর্শ"],
      },
      market: {
        label: "বাজার",
        items: ["বাজার দর", "মার্কেটপ্লেস", "পণ্যের বিবরণ", "কার্ট", "অর্ডার"],
      },
      livestock: { label: "পশুপালন", single: true },
      account: {
        label: "অ্যাকাউন্ট",
        items: ["নোটিফিকেশন", "প্রোফাইল", "অ্যাডমিন ড্যাশবোর্ড"],
      },
    },
  },
  en: {
    brand: "AgriTech",
    home: "Home",
    login: "Log in",
    register: "Register",
    lang: "বাং",
    groups: {
      dashboard: { label: "Dashboard", single: true },
      crop: {
        label: "Crop Management",
        items: ["Crop Management", "Add Crop", "Crop Details", "Crop Calendar"],
      },
      knowledge: {
        label: "Farm Intelligence",
        items: ["Weather", "Soil Management", "Disease Detection", "Disease Library", "Expert Consultation"],
      },
      market: {
        label: "Market",
        items: ["Market Prices", "Marketplace", "Product Details", "Cart", "Orders"],
      },
      livestock: { label: "Livestock", single: true },
      account: {
        label: "Account",
        items: ["Notifications", "Profile", "Admin Dashboard"],
      },
    },
  },
};

const GROUP_ICONS: Record<GroupKey, LucideIcon> = {
  dashboard: LayoutDashboard,
  crop: Wheat,
  knowledge: CloudSun,
  market: Store,
  livestock: PawPrint,
  account: UserCircle2,
};

const ITEM_ICONS: Partial<Record<GroupKey, LucideIcon[]>> = {
  crop: [Wheat, Sprout, ClipboardList, CloudSun],
  knowledge: [CloudSun, TestTube2, Bug, BookOpen, MessageCircleQuestion],
  market: [LineChart, Store, PackageSearch, ShoppingCart, ClipboardList],
  account: [Bell, UserCircle2, Shield],
};

const NAV_ROUTES: Record<string, string> = {
  "হোম": "/",
  Home: "/",
  "ড্যাশবোর্ড": "/dashboard",
  Dashboard: "/dashboard",
  "ফসল ব্যবস্থাপনা": "/cropManagement",
  "Crop Management": "/cropManagement",
  "ফসল যোগ করুন": "/addCrop",
  "Add Crop": "/addCrop",
  "ফসলের বিবরণ": "/cropDetails",
  "Crop Details": "/cropDetails",
  "ফসল ক্যালেন্ডার": "/cropCalender",
  "Crop Calendar": "/cropCalender",
  "আবহাওয়া": "/weather",
  Weather: "/weather",
  "মাটি ব্যবস্থাপনা": "/soil",
  "Soil Management": "/soil",
  "রোগ শনাক্তকরণ": "/disease",
  "Disease Detection": "/disease",
  "রোগ লাইব্রেরি": "/disease",
  "Disease Library": "/disease",
  "বিশেষজ্ঞ পরামর্শ": "/settings",
  "Expert Consultation": "/settings",
  "বাজার দর": "/market-prices",
  "Market Prices": "/market-prices",
  "মার্কেটপ্লেস": "/marketplace",
  Marketplace: "/marketplace",
  "পণ্যের বিবরণ": "/cropDetails",
  "Product Details": "/cropDetails",
  "কার্ট": "/cart",
  Cart: "/cart",
  "অর্ডার": "/orders",
  Orders: "/orders",
  "পশুপালন": "/dashboard",
  Livestock: "/dashboard",
  "নোটিফিকেশন": "/settings",
  Notifications: "/settings",
  "প্রোফাইল": "/profile",
  Profile: "/profile",
  "অ্যাডমিন ড্যাশবোর্ড": "/dashboard",
  "Admin Dashboard": "/dashboard",
  "লগ ইন": "/auth/login",
  "Log in": "/auth/login",
  "নিবন্ধন": "/auth/register",
  Register: "/auth/register",
};

const palette = {
  primary: "#1F3D2B",
  primaryLight: "#2F5943",
  primarySoft: "#EAF0E8",
  accent: "#E0A458",
  accentDark: "#C6863A",
  bg: "#FAF8F3",
  surface: "#FFFFFF",
  text: "#16241C",
  muted: "#6B7A6E",
  border: "#E4DFD1",
} as const;

function useOutsideClose(ref: RefObject<HTMLElement | null>, onClose: () => void): void {
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && e.target instanceof Node && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, onClose]);
}

interface GrowLinkProps {
  children: ReactNode;
  onClick: () => void;
  style?: CSSProperties;
}

function GrowLink({ children, onClick, style }: GrowLinkProps) {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center gap-1 px-1 py-1"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "'Hind Siliguri', sans-serif",
        fontSize: "0.95rem",
        fontWeight: 500,
        color: palette.text,
        position: "relative",
        ...style,
      }}
    >
      {children}
      <span
        style={{
          position: "absolute",
          left: 2,
          right: 2,
          bottom: -4,
          height: 2,
          background: palette.accent,
          transformOrigin: "left",
          transform: hover ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 220ms ease",
          borderRadius: 2,
        }}
      />
      {hover && (
        <Sprout
          size={11}
          strokeWidth={2.5}
          style={{
            position: "absolute",
            right: -2,
            bottom: -9,
            color: palette.accentDark,
            transition: "opacity 220ms ease",
          }}
        />
      )}
    </button>
  );
}

interface MegaPanelProps {
  groupKey: GroupKey;
  group: MultiGroup;
  onNavigate: (label: string) => void;
}

function MegaPanel({ groupKey, group, onNavigate }: MegaPanelProps) {
  const icons = ITEM_ICONS[groupKey] ?? [];
  return (
    <div
      className="absolute top-full mt-3 left-0 grid gap-1 p-3"
      style={{
        background: palette.surface,
        border: `1px solid ${palette.border}`,
        borderRadius: 14,
        boxShadow: "0 18px 40px -12px rgba(31,61,43,0.25)",
        minWidth: 260,
        zIndex: 40,
      }}
    >
      {group.items.map((label, i) => {
        const Icon = icons[i] ?? Sprout;
        return (
          <button
            key={label}
            onClick={() => onNavigate(label)}
            className="flex items-center gap-3 px-3 py-2 w-full text-left"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              borderRadius: 10,
              fontFamily: "'Hind Siliguri', sans-serif",
              fontSize: "0.92rem",
              color: palette.text,
              transition: "background 150ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = palette.primarySoft)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            <Icon size={16} style={{ color: palette.primaryLight, flexShrink: 0 }} />
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default function AgriTechNavbar() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("bn");
  const [openGroup, setOpenGroup] = useState<GroupKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [mobileAccordion, setMobileAccordion] = useState<GroupKey | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  useOutsideClose(navRef, () => setOpenGroup(null));

  const t = T[lang];
  const groupKeys = Object.keys(t.groups) as GroupKey[];

  const handleNavigate = (label: string): void => {
    setOpenGroup(null);
    setMobileOpen(false);
    const route = NAV_ROUTES[label];
    if (route) router.push(route);
  };

  return (
    <div style={{ background: palette.bg, fontFamily: "'Hind Siliguri', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Hind+Siliguri:wght@400;500;600;700&display=swap');
      `}</style>

      <nav
        ref={navRef}
        className="sticky top-0 flex items-center justify-between px-4 md:px-8"
        style={{
          background: palette.surface,
          borderBottom: `1px solid ${palette.border}`,
          height: 68,
          zIndex: 50,
        }}
      >
        {/* Brand */}
        <button
          onClick={() => handleNavigate(t.home)}
          className="flex items-center gap-2"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span
            className="flex items-center justify-center"
            style={{
              width: 34, height: 34, borderRadius: 9,
              background: palette.primary, color: palette.accent,
            }}
          >
            <Sprout size={19} strokeWidth={2.2} />
          </span>
          <span
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: palette.primary,
              letterSpacing: "-0.01em",
            }}
          >
            {t.brand}
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 relative">
          {groupKeys.map((key) => {
            const group = t.groups[key];
            const Icon = GROUP_ICONS[key];
            if (group.single) {
              return (
                <GrowLink key={key} onClick={() => handleNavigate(group.label)}>
                  <Icon size={15} style={{ color: palette.primaryLight }} />
                  {group.label}
                </GrowLink>
              );
            }
            return (
              <div key={key} style={{ position: "relative" }}>
                <GrowLink
                  onClick={() => setOpenGroup(openGroup === key ? null : key)}
                  style={{ color: openGroup === key ? palette.primary : palette.text }}
                >
                  <Icon size={15} style={{ color: palette.primaryLight }} />
                  {group.label}
                  <ChevronDown
                    size={13}
                    style={{
                      transition: "transform 180ms ease",
                      transform: openGroup === key ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </GrowLink>
                {openGroup === key && (
                  <MegaPanel groupKey={key} group={group as MultiGroup} onNavigate={handleNavigate} />
                )}
              </div>
            );
          })}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className="flex items-center gap-1 px-2.5 py-1.5"
            style={{
              border: `1px solid ${palette.border}`,
              borderRadius: 8,
              background: palette.bg,
              color: palette.muted,
              fontSize: "0.82rem",
              cursor: "pointer",
            }}
          >
            <Globe size={13} /> {t.lang}
          </button>
          <button
            onClick={() => handleNavigate(t.login)}
            className="flex items-center gap-1.5 px-3 py-1.5"
            style={{
              border: `1px solid ${palette.border}`,
              borderRadius: 8,
              background: "none",
              color: palette.text,
              fontSize: "0.88rem",
              cursor: "pointer",
            }}
          >
            <LogIn size={14} /> {t.login}
          </button>
          <button
            onClick={() => handleNavigate(t.register)}
            className="flex items-center gap-1.5 px-3.5 py-1.5"
            style={{
              border: "none",
              borderRadius: 8,
              background: palette.accent,
              color: palette.primary,
              fontWeight: 600,
              fontSize: "0.88rem",
              cursor: "pointer",
            }}
          >
            <UserPlus size={14} /> {t.register}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: palette.primary }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 py-4"
          style={{ background: palette.surface, borderBottom: `1px solid ${palette.border}` }}
        >
          <div className="flex items-center justify-between mb-4">
            <span style={{ color: palette.muted, fontSize: "0.85rem" }}>{t.home}</span>
            <button
              onClick={() => setLang(lang === "bn" ? "en" : "bn")}
              className="flex items-center gap-1 px-2.5 py-1.5"
              style={{
                border: `1px solid ${palette.border}`,
                borderRadius: 8,
                background: palette.bg,
                color: palette.muted,
                fontSize: "0.82rem",
              }}
            >
              <Globe size={13} /> {t.lang}
            </button>
          </div>

          {groupKeys.map((key) => {
            const group = t.groups[key];
            const Icon = GROUP_ICONS[key];
            if (group.single) {
              return (
                <button
                  key={key}
                  onClick={() => handleNavigate(group.label)}
                  className="flex items-center gap-3 w-full px-2 py-3"
                  style={{ background: "none", border: "none", borderTop: `1px solid ${palette.border}`, textAlign: "left" }}
                >
                  <Icon size={17} style={{ color: palette.primaryLight }} />
                  <span style={{ color: palette.text, fontSize: "0.95rem" }}>{group.label}</span>
                </button>
              );
            }
            const isOpen = mobileAccordion === key;
            const icons = ITEM_ICONS[key] ?? [];
            return (
              <div key={key} style={{ borderTop: `1px solid ${palette.border}` }}>
                <button
                  onClick={() => setMobileAccordion(isOpen ? null : key)}
                  className="flex items-center justify-between w-full px-2 py-3"
                  style={{ background: "none", border: "none", textAlign: "left" }}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={17} style={{ color: palette.primaryLight }} />
                    <span style={{ color: palette.text, fontSize: "0.95rem" }}>{group.label}</span>
                  </span>
                  <ChevronDown
                    size={16}
                    style={{
                      color: palette.muted,
                      transition: "transform 180ms ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                {isOpen && (
                  <div className="pb-2 pl-9 grid gap-1">
                    {group.items.map((label, i) => {
                      const ItemIcon = icons[i] ?? Sprout;
                      return (
                        <button
                          key={label}
                          onClick={() => handleNavigate(label)}
                          className="flex items-center gap-2.5 py-2"
                          style={{ background: "none", border: "none", textAlign: "left" }}
                        >
                          <ItemIcon size={14} style={{ color: palette.accentDark }} />
                          <span style={{ color: palette.muted, fontSize: "0.88rem" }}>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleNavigate(t.login)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5"
              style={{ border: `1px solid ${palette.border}`, borderRadius: 8, background: "none", color: palette.text, fontSize: "0.9rem" }}
            >
              <LogIn size={15} /> {t.login}
            </button>
            <button
              onClick={() => handleNavigate(t.register)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5"
              style={{ border: "none", borderRadius: 8, background: palette.accent, color: palette.primary, fontWeight: 600, fontSize: "0.9rem" }}
            >
              <UserPlus size={15} /> {t.register}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}