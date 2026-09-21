"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";

import { Sprout, Globe, Home, Calendar, CloudSun, Book, Store } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import { FaBars, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function AgriTechNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const { lang, toggleLang, t: translation } = useLanguage();
  const t = translation.nav;

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (pathname.includes("dashboard")) {
    return null;
  }

  const toggleLanguage = () => {
    toggleLang();
  };

  const navLinks = [
    {
      href: "/",
      label: lang === "bn" ? "ঘর" : "Home",
      icon: Home,
    },
    {
      href: "/calender",
      label: lang === "bn" ? "ফসল ক্যালেন্ডার" : "Crop Calendar",
      icon: Calendar,
    },
    {
      href: "/weather",
      label: lang === "bn" ? "আবহাওয়া" : "Weather",
      icon: CloudSun,
    },
    {
      href: "/knowledge",
      label: lang === "bn" ? "রোগ লাইব্রেরি" : "Disease Library",
      icon: Book,
    },
    {
      href: "/marketPrices",
      label: lang === "bn" ? "বাজার দর" : "Market Prices",
      icon: Store,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* 1. বাঁপাশের সেকশন: Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            style={{ textDecoration: "none" }}
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(145deg, #2F5943, #1F3D2B)",
                color: "#E0A458",
                boxShadow: "0 4px 12px -2px rgba(31,61,43,0.3)",
              }}
            >
              <Sprout size={22} strokeWidth={2.2} />
            </span>

            <span className="text-xl font-bold text-[#1F3D2B] tracking-tight">
              AgriTech
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
  className={`flex items-center gap-1.5 text-sm transition-colors text-[#2F5943] font-semibold ${
                  isActive
                    ? "border-b-2 border-b-[#2F5943]"
                    : ""
                }`}
              >
                <Icon size={16} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={toggleLanguage}
className="flex items-center gap-1.5 text-sm cursor-pointer font-medium bg-[#EAF0E8] text-slate-700 hover:text-[#2F5943] transition-colors border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-slate-50"
          >
            <Globe size={16} />
            <span>{t.language}</span>
          </button>

          {session?.user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex cursor-pointer items-center transition-transform active:scale-95"
              >
                <Image
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full border-2 border-[#2F5943] object-cover"
                  src={session.user.image || "/default-avatar.png"}
                  alt="avatar"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-100 bg-white py-2 shadow-xl z-50">
                  <div className="border-b border-slate-100 px-4 py-2.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#2F5943]">
                      {(session.user as typeof session.user & { role?: string }).role ?? "User"}{" "}
                      {lang === "bn" ? "অ্যাকাউন্ট" : "Account"}
                    </p>
                    <p className="font-semibold text-slate-800 truncate">
                      {session.user.name}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {session.user.email}
                    </p>
                  </div>

                  <Link
                    href={`/dashboard/${(session.user as typeof session.user & { role?: string }).role ?? "user"}`}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <MdDashboard className="text-lg text-[#2F5943]" />
                    {lang === "bn" ? "ড্যাশবোর্ড" : "Dashboard"}
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FaSignOutAlt />
                    {lang === "bn" ? "লগআউট" : "Logout"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-[#2F5943] px-3 py-1.5 transition-colors"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="text-sm font-medium bg-[#2F5943] hover:bg-[#1F3D2B] text-white px-4 py-2 rounded-xl transition-colors shadow-sm"
              >
                SignUp
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleLanguage}
className="md:hidden flex items-center gap-1 text-xs font-medium cursor-pointer bg-[#EAF0E8] text-slate-700 border border-gray-200 px-2 py-1 rounded-md"
          >
            <Globe size={14} />
            <span>{t.language}</span>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-[#2F5943] transition-colors"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 bg-white/95 rounded-2xl p-4 shadow-lg transition-all">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#2F5943]/10 text-[#2F5943] font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="border-t border-slate-100 my-1 pt-2">
              {session?.user ? (
                <>
                  <Link
                    href={`/dashboard/${(session.user as typeof session.user & { role?: string }).role ?? "user"}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <MdDashboard size={18} className="text-[#2F5943]" />
                    {lang === "bn" ? "ড্যাশবোর্ড" : "Dashboard"}
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <FaSignOutAlt size={16} />
                    {lang === "bn" ? "লগআউট" : "Logout"}
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-1">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-center py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
className="w-full text-center py-2 text-sm font-medium bg-[#2F5943] text-white rounded-xl hover:bg-[#1F3D2B]"
                  >
                    SignUp
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}