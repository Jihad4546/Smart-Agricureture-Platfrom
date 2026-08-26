"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
    key: "dashboard",
    bn: "ড্যাশবোর্ড",
    en: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },

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
    key: "account",
    bn: "অ্যাকাউন্ট",
    en: "Account",
    icon: UserCircle2,
    items: [
      {
        bn: "নোটিফিকেশন",
        en: "Notifications",
        href: "/profile",
      },
      {
        bn: "প্রোফাইল",
        en: "Profile",
        href: "/profile",
      },
      {
        bn: "অ্যাডমিন ড্যাশবোর্ড",
        en: "Admin Dashboard",
        href: "/admin",
      },
    ],
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

  account: [
    Bell,
    UserCircle2,
    Shield,
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

  const navRef = useRef<HTMLElement>(null);

  const t = text[lang];

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
              className="nav-link"
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
                    className="nav-link flex items-center gap-1"
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
                    className="nav-button flex items-center gap-1"
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
                              className="dropdown-link"
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
              className="action-button"
              style={{
                color: colors.muted,
              }}
            >
              <Globe size={14} />
              {t.language}
            </button>

            {/* Login */}

            <Link
              href="/auth/login"
              onClick={closeAll}
              className="login-button"
            >
              <LogIn size={14} />
              {t.login}
            </Link>

            {/* Register */}

            <Link
              href="/auth/register"
              onClick={closeAll}
              className="register-button"
            >
              <UserPlus size={14} />
              {t.register}
            </Link>
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
              className="mobile-link"
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
                    className="mobile-link"
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
                className="action-button flex-1 justify-center"
              >
                <Globe size={14} />
                {t.language}
              </button>

              <Link
                href="/auth/login"
                onClick={closeAll}
                className="login-button flex-1 justify-center"
              >
                <LogIn size={14} />
                {t.login}
              </Link>

              <Link
                href="/auth/register"
                onClick={closeAll}
                className="register-button flex-1 justify-center"
              >
                <UserPlus size={14} />
                {t.register}
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* =================================================
          LIGHTWEIGHT CSS
      ================================================= */}

      <style jsx>{`
        .nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 2px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition:
            transform 180ms ease,
            color 180ms ease;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          left: 2px;
          right: 2px;
          bottom: 0;
          height: 2px;
          border-radius: 99px;
          background: ${colors.gold};
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 180ms ease;
        }

        .nav-link:hover {
          transform: translateY(-1px);
          color: ${colors.green} !important;
        }

        .nav-link:hover::after {
          transform: scaleX(1);
        }

        .nav-button {
          position: relative;
          border: none;
          background: transparent;
          padding: 6px 2px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition:
            transform 180ms ease,
            color 180ms ease;
        }

        .nav-button:hover {
          transform: translateY(-1px);
          color: ${colors.green} !important;
        }

        .dropdown-link {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 9px;
          border-radius: 11px;
          color: ${colors.text};
          text-decoration: none;
          font-size: 13px;
          transition:
            background 150ms ease,
            transform 150ms ease;
        }

        .dropdown-link:hover {
          background: ${colors.greenSoft};
          transform: translateX(3px);
        }

        .action-button,
        .login-button,
        .register-button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 34px;
          padding: 7px 11px;
          border-radius: 10px;
          font-size: 13px;
          text-decoration: none;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .action-button {
          border: 1px solid ${colors.border};
          background: ${colors.cream};
          cursor: pointer;
        }

        .login-button {
          border: 1px solid ${colors.border};
          background: ${colors.white};
          color: ${colors.text};
        }

        .register-button {
          border: none;
          background: linear-gradient(
            145deg,
            #f0b76a,
            ${colors.gold}
          );
          color: ${colors.green};
          font-weight: 700;
          cursor: pointer;
          box-shadow:
            0 6px 12px -8px
            rgba(198, 134, 58, 0.8);
        }

        .action-button:hover,
        .login-button:hover,
        .register-button:hover {
          transform: translateY(-1px);
        }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 12px 8px;
          border-top: 1px solid ${colors.border};
          color: ${colors.text};
          text-decoration: none;
          font-size: 14px;
        }

        @media (max-width: 380px) {
          .register-button,
          .login-button,
          .action-button {
            padding-left: 7px;
            padding-right: 7px;
            font-size: 12px;
          }
        }
      `}</style>

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