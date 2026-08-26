"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuthUserClient, logoutUserClient, User } from "../../lib/auth";
import styles from "./Navbar.module.css";
import {
  Sprout,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  Wheat,
  CloudSun,
  PawPrint,
  UserCircle2,
  Bug,
  TestTube2,
  BookOpen,
  MessageCircleQuestion,
  LineChart,
  Store,
  PackageSearch,
  ShoppingCart,
  ClipboardList,
  Bell,
  Shield,
  LogIn,
  UserPlus,
  Globe,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type Lang = "bn" | "en";

type MenuItem = {
  bn: string;
  en: string;
  href: string;
};

type MenuGroup = {
  key: string;
  bn: string;
  en: string;
  icon: React.ElementType;
  items?: MenuItem[];
  href?: string;
};

/* =========================================================
   MENU DATA
========================================================= */

const menuGroups: MenuGroup[] = [
  {
    key: "crop",
    bn: "ফসল ব্যবস্থাপনা",
    en: "Crop Management",
    icon: Wheat,
    items: [
      {
        bn: "ফসল ব্যবস্থাপনা",
        en: "Crop Management",
        href: "/crops",
      },
      {
        bn: "ফসল যোগ করুন",
        en: "Add Crop",
        href: "/crops/add",
      },
      {
        bn: "ফসলের বিবরণ",
        en: "Crop Details",
        href: "/crops",
      },
      {
        bn: "ফসল ক্যালেন্ডার",
        en: "Crop Calendar",
        href: "/planner",
      },
    ],
  },

  {
    key: "knowledge",
    bn: "জ্ঞান ও পরামর্শ",
    en: "Farm Intelligence",
    icon: CloudSun,
    items: [
      {
        bn: "আবহাওয়া",
        en: "Weather",
        href: "/weather",
      },
      {
        bn: "রোগ শনাক্তকরণ",
        en: "Disease Detection",
        href: "/disease",
      },
      {
        bn: "মাটি বিশ্লেষণ",
        en: "Soil Analysis",
        href: "/soil",
      },
      {
        bn: "রোগ লাইব্রেরি",
        en: "Disease Library",
        href: "/knowledge",
      },
      {
        bn: "বিশেষজ্ঞ পরামর্শ",
        en: "Expert Consultation",
        href: "/ai-assistant",
      },
    ],
  },

  {
    key: "market",
    bn: "বাজার",
    en: "Market",
    icon: Store,
    items: [
      {
        bn: "বাজার দর",
        en: "Market Prices",
        href: "/marketplace",
      },
      {
        bn: "মার্কেটপ্লেস",
        en: "Marketplace",
        href: "/marketplace",
      },
      {
        bn: "পণ্যের বিবরণ",
        en: "Product Details",
        href: "/marketplace",
      },
      {
        bn: "কার্ট",
        en: "Cart",
        href: "/cart",
      },
      {
        bn: "অর্ডার",
        en: "Orders",
        href: "/orders",
      },
    ],
  },

  {
    key: "livestock",
    bn: "পশুপালন",
    en: "Livestock",
    icon: PawPrint,
    href: "/livestock",
  },

  {
    key: "profile",
    bn: "প্রোফাইল",
    en: "Profile",
    icon: UserCircle2,
    href: "/profile",
  },
];

/* =========================================================
   DROPDOWN ICONS
========================================================= */

const itemIcons: Record<string, React.ElementType[]> = {
  crop: [
    Wheat,
    Sprout,
    ClipboardList,
    CloudSun,
  ],

  knowledge: [
    CloudSun,
    Bug,
    TestTube2,
    BookOpen,
    MessageCircleQuestion,
  ],

  market: [
    LineChart,
    Store,
    PackageSearch,
    ShoppingCart,
    ClipboardList,
  ],
};

/* =========================================================
   COLORS
========================================================= */

const colors = {
  green: "#1F3D2B",
  greenLight: "#2F5943",
  greenSoft: "#EAF0E8",

  gold: "#E0A458",
  goldDark: "#C6863A",

  cream: "#FAF8F3",
  white: "#FFFFFF",

  text: "#16241C",
  muted: "#6B7A6E",
  border: "#E4DFD1",
};

/* =========================================================
   TRANSLATIONS
========================================================= */

const text = {
  bn: {
    brand: "এগ্রিটেক",
    home: "হোম",
    login: "লগ ইন",
    register: "নিবন্ধন",
    language: "EN",
  },

  en: {
    brand: "AgriTech",
    home: "Home",
    login: "Log in",
    register: "Register",
    language: "বাং",
  },
};

/* =========================================================
   NAVBAR
========================================================= */

export default function AgriTechNavbar() {
  const [lang, setLang] = useState<Lang>("bn");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const navRef = useRef<HTMLElement>(null);

  const t = text[lang];

  useEffect(() => {
    setUser(getAuthUserClient());
  }, []);

  /* =======================================================
     SCROLL
  ======================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =======================================================
     OUTSIDE CLICK
  ======================================================= */

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  /* =======================================================
     HELPERS
  ======================================================= */

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileMenu(null);
  };

  const toggleLanguage = () => {
    setLang((current) =>
      current === "bn" ? "en" : "bn"
    );

    setOpenMenu(null);
    setMobileMenu(null);
  };

  const toggleDesktopMenu = (key: string) => {
    setOpenMenu((current) =>
      current === key ? null : key
    );
  };

  const toggleMobileMenu = (key: string) => {
    setMobileMenu((current) =>
      current === key ? null : key
    );
  };

  return (
    <>
      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="fixed left-3 right-3 top-3 z-[1000] mx-auto transition-all duration-300 sm:left-5 sm:right-5 lg:left-8 lg:right-8"
        style={{
          maxWidth: 1240,

          background: scrolled
            ? "rgba(255,255,255,0.94)"
            : "rgba(255,255,255,0.88)",

          border: `1px solid ${colors.border}`,

          borderRadius: scrolled ? 18 : 22,

          boxShadow: scrolled
            ? "0 14px 35px -20px rgba(31,61,43,0.42)"
            : "0 18px 45px -24px rgba(31,61,43,0.30)",

          backdropFilter: "blur(16px)",

          WebkitBackdropFilter: "blur(16px)",

          transform: "translateZ(0)",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            minHeight: scrolled ? 60 : 66,
            padding: "8px 12px 8px 14px",
          }}
        >
          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            href="/"
            onClick={closeAll}
            className="group flex items-center gap-2.5"
            style={{
              color: colors.green,
              textDecoration: "none",
            }}
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:-translate-y-1"
              style={{
                background: `linear-gradient(145deg, ${colors.greenLight}, ${colors.green})`,
                color: colors.gold,

                boxShadow:
                  "inset 0 1px 1px rgba(255,255,255,0.18), 0 6px 12px -7px rgba(31,61,43,0.7)",
              }}
            >
              <Sprout size={21} strokeWidth={2.2} />
            </span>

            <span
              className="hidden text-xl font-semibold sm:block"
              style={{
                color: colors.green,
              }}
            >
              {t.brand}
            </span>
          </Link>

          {/* =================================================
              DESKTOP NAV
          ================================================= */}

          <div className="hidden items-center gap-4 lg:flex">
            {/* HOME */}

            <Link
              href="/"
              onClick={closeAll}
              className={styles.navLink}
              style={{
                color: colors.text,
              }}
            >
              {t.home}
            </Link>

            {menuGroups.map((group) => {
              const Icon = group.icon;
              const label =
                lang === "bn" ? group.bn : group.en;

              /* Single link */

              if (group.href) {
                return (
                  <Link
                    key={group.key}
                    href={group.href}
                    onClick={closeAll}
                    className={`${styles.navLink} flex items-center gap-1`}
                    style={{
                      color: colors.text,
                    }}
                  >
                    <Icon size={14} />
                    {label}
                  </Link>
                );
              }

              /* Dropdown */

              const isOpen = openMenu === group.key;

              return (
                <div
                  key={group.key}
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={() =>
                      toggleDesktopMenu(group.key)
                    }
                    className={`${styles.navButton} flex items-center gap-1`}
                    style={{
                      color: isOpen
                        ? colors.green
                        : colors.text,
                    }}
                  >
                    <Icon size={14} />

                    {label}

                    <ChevronDown
                      size={13}
                      style={{
                        transform: isOpen
                          ? "rotate(180deg)"
                          : "rotate(0)",
                        transition:
                          "transform 180ms ease",
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div
                      className="absolute left-0 top-full mt-3 min-w-[260px] rounded-2xl p-2"
                      style={{
                        background:
                          "rgba(255,255,255,0.97)",

                        border:
                          `1px solid ${colors.border}`,

                        boxShadow:
                          "0 20px 40px -20px rgba(31,61,43,0.4)",

                        backdropFilter:
                          "blur(16px)",
                      }}
                    >
                      {group.items?.map(
                        (item, index) => {
                          const ItemIcon =
                            itemIcons[group.key]?.[
                              index
                            ] ?? Sprout;

                          return (
                            <Link
                              key={
                                item.href +
                                item.en
                              }
                              href={item.href}
                              onClick={closeAll}
                              className={styles.dropdownLink}
                            >
                              <span
                                className="flex h-8 w-8 items-center justify-center rounded-lg"
                                style={{
                                  background:
                                    colors.greenSoft,
                                  color:
                                    colors.greenLight,
                                }}
                              >
                                <ItemIcon size={15} />
                              </span>

                              <span>
                                {lang === "bn"
                                  ? item.bn
                                  : item.en}
                              </span>
                            </Link>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* =================================================
              DESKTOP ACTIONS
          ================================================= */}

          <div className="hidden items-center gap-2 lg:flex">
            {/* Language */}

            <button
              type="button"
              onClick={toggleLanguage}
              className={styles.actionButton}
              style={{
                color: colors.muted,
              }}
            >
              <Globe size={14} />
              {t.language}
            </button>

            {!user ? (
              <>
                {/* Login */}
                <Link
                  href="/auth/login"
                  onClick={closeAll}
                  className={styles.loginButton}
                >
                  <LogIn size={14} />
                  {t.login}
                </Link>

                {/* Register */}
                <Link
                  href="/auth/register"
                  onClick={closeAll}
                  className={styles.registerButton}
                >
                  <UserPlus size={14} />
                  {t.register}
                </Link>
              </>
            ) : (
              <>
                {/* User badge */}
                <span className="text-xs font-semibold text-[#1F3D2B] bg-[#EAF0E8] px-3 py-1.5 rounded-xl border border-[#E4DFD1] flex items-center gap-1.5">
                  <UserCircle2 size={14} />
                  {user.name} ({lang === "bn" ? (user.role === "Admin" ? "অ্যাডমিন" : "কৃষক") : user.role})
                </span>

                {/* Logout */}
                <button
                  onClick={() => {
                    logoutUserClient();
                    setUser(null);
                    closeAll();
                    router.push("/");
                    router.refresh();
                  }}
                  className={styles.registerButton}
                  style={{
                    backgroundColor: "#9B1C1C",
                    borderColor: "#9B1C1C",
                  }}
                >
                  <LogIn size={14} style={{ transform: "rotate(180deg)" }} />
                  {lang === "bn" ? "লগ আউট" : "Log out"}
                </button>
              </>
            )}
          </div>

          {/* =================================================
              MOBILE BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() => {
              setMobileOpen((current) => !current);
              setOpenMenu(null);
            }}
            aria-label={
              mobileOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl lg:hidden"
            style={{
              background: colors.green,
              border: "none",
              color: colors.gold,
              cursor: "pointer",
            }}
          >
            {mobileOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {mobileOpen && (
          <div
            className="border-t px-3 pb-3 pt-2 lg:hidden"
            style={{
              borderColor: colors.border,
            }}
          >
            {/* Home */}

            <Link
              href="/"
              onClick={closeAll}
              className={styles.mobileLink}
            >
              <Sprout size={16} />
              {t.home}
            </Link>

            {menuGroups.map((group) => {
              const Icon = group.icon;

              const label =
                lang === "bn"
                  ? group.bn
                  : group.en;

              /* Single */

              if (group.href) {
                return (
                  <Link
                    key={group.key}
                    href={group.href}
                    onClick={closeAll}
                    className={styles.mobileLink}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                );
              }

              /* Accordion */

              const isOpen =
                mobileMenu === group.key;

              return (
                <div
                  key={group.key}
                  style={{
                    borderTop:
                      `1px solid ${colors.border}`,
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      toggleMobileMenu(
                        group.key
                      )
                    }
                    className="flex w-full items-center justify-between px-2 py-3"
                    style={{
                      background:
                        "transparent",
                      border: "none",
                      color: colors.text,
                      cursor: "pointer",
                    }}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={16} />
                      {label}
                    </span>

                    <ChevronDown
                      size={16}
                      style={{
                        transform: isOpen
                          ? "rotate(180deg)"
                          : "rotate(0)",
                        transition:
                          "transform 180ms ease",
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div className="pb-2 pl-8">
                      {group.items?.map(
                        (item, index) => {
                          const ItemIcon =
                            itemIcons[
                              group.key
                            ]?.[index] ??
                            Sprout;

                          return (
                            <Link
                              key={
                                item.href +
                                item.en
                              }
                              href={item.href}
                              onClick={
                                closeAll
                              }
                              className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm"
                              style={{
                                color:
                                  colors.muted,
                                textDecoration:
                                  "none",
                              }}
                            >
                              <ItemIcon
                                size={14}
                                style={{
                                  color:
                                    colors.goldDark,
                                }}
                              />

                              {lang === "bn"
                                ? item.bn
                                : item.en}
                            </Link>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile language */}

            <div
              className="mt-2 flex gap-2 border-t pt-3"
              style={{
                borderColor:
                  colors.border,
              }}
            >
              <button
                type="button"
                onClick={toggleLanguage}
                className={`${styles.actionButton} flex-1 justify-center`}
              >
                <Globe size={14} />
                {t.language}
              </button>

              {!user ? (
                <>
                  <Link
                    href="/auth/login"
                    onClick={closeAll}
                    className={`${styles.loginButton} flex-1 justify-center`}
                  >
                    <LogIn size={14} />
                    {t.login}
                  </Link>

                  <Link
                    href="/auth/register"
                    onClick={closeAll}
                    className={`${styles.registerButton} flex-1 justify-center`}
                  >
                    <UserPlus size={14} />
                    {t.register}
                  </Link>
                </>
              ) : (
                <div className="flex flex-col gap-2 w-full">
                  <span className="text-xs font-semibold text-[#1F3D2B] bg-[#EAF0E8] px-3 py-2 rounded-xl border border-[#E4DFD1] text-center flex items-center justify-center gap-1.5">
                    <UserCircle2 size={14} />
                    {user.name} ({lang === "bn" ? (user.role === "Admin" ? "অ্যাডমিন" : "কৃষক") : user.role})
                  </span>
                  
                  <button
                    onClick={() => {
                      logoutUserClient();
                      setUser(null);
                      closeAll();
                      router.push("/");
                      router.refresh();
                    }}
                    className={`${styles.registerButton} justify-center w-full`}
                    style={{
                      backgroundColor: "#9B1C1C",
                      borderColor: "#9B1C1C",
                    }}
                  >
                    <LogIn size={14} style={{ transform: "rotate(180deg)" }} />
                    {lang === "bn" ? "লগ আউট" : "Log out"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* =================================================
          LIGHTWEIGHT CSS
      ================================================= */}



      {/* Navbar spacer */}

      <div
        aria-hidden="true"
        style={{
          height: 84,
        }}
      />
    </>
  );
}