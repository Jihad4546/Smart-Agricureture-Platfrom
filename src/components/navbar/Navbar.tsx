"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "../../contexts/LanguageContext";

import styles from "./Navbar.module.css";

import {
  Sprout,
  Menu,
  X,
  ChevronDown,
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
  LogIn,
  Globe,
} from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import Image from "next/image";
import { FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

type MenuItem = {
  bn: string;
  en: string;
  href: string;
};

type MenuGroup = {
  key: string;
  bn: string;
  en: string;
  icon: any;
  items?: MenuItem[];
  href?: string;
};

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
        href: "/cropManagement",
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
        href: "/marketPrices",
      },
      {
        bn: "মার্কেটপ্লেস",
        en: "Marketplace",
        href: "/marketplace",
      },
      {
        bn: "পণ্যের বিবরণ",
        en: "Product Details",
        href: "/productDetails",
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
];

const itemIcons: Record<string, any[]> = {
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
  livestock: [PawPrint],
};

export default function AgriTechNavbar() {
  const [openMenu, setOpenMenu] =
    useState<string | null>(null);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [mobileMenu, setMobileMenu] =
    useState<string | null>(null);

  const [scrolled, setScrolled] =
    useState(false);
 const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const navRef =
    useRef<HTMLElement>(null);
  const {data: session} = useSession();
  const user = session?.user;
  console.log(user)
  /* ================================
     GLOBAL LANGUAGE
  ================================= */
  const router = useRouter()
const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };
  const {
    lang,
    toggleLang,
    t: translation,
  } = useLanguage();

  const t = translation.nav;

  /* ================================
     OUTSIDE CLICK
  ================================= */

  useEffect(() => {
    const handleClick = (
      event: MouseEvent
    ) => {
      if (
        navRef.current &&
        !navRef.current.contains(
          event.target as Node
        )
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClick
      );
    };
  }, []);

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

  /* ================================
     CLOSE
  ================================= */

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileMenu(null);
  };

  /* ================================
     LANGUAGE
  ================================= */

  const toggleLanguage = () => {
    toggleLang();

    setOpenMenu(null);
    setMobileMenu(null);
  };
  
  /* ================================
     MENU TOGGLE
  ================================= */

  const toggleDesktopMenu = (
    key: string
  ) => {
    setOpenMenu((current) =>
      current === key ? null : key
    );
  };

  const toggleMobileMenu = (
    key: string
  ) => {
    setMobileMenu((current) =>
      current === key ? null : key
    );
  };
  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="
          fixed
          left-3
          right-3
          top-3
          z-[1000]
          mx-auto
          transition-all
          duration-300
          sm:left-5
          sm:right-5
          lg:left-8
          lg:right-8
        "
        style={{
          maxWidth: 1240,

          background: scrolled
            ? "rgba(255,255,255,0.94)"
            : "rgba(255,255,255,0.88)",

          border:
            "1px solid #E4DFD1",

          borderRadius:
            scrolled ? 18 : 22,

          boxShadow:
            "0 18px 45px -24px rgba(31,61,43,0.30)",

          backdropFilter:
            "blur(16px)",

          WebkitBackdropFilter:
            "blur(16px)",
        }}
      >
        {/* ================================
            MAIN NAVBAR
        ================================= */}

        <div
          className="
            flex
            min-h-[66px]
            items-center
            justify-between
            gap-4
            px-4
            sm:px-6
            lg:px-7
          "
        >
          {/* LOGO */}

          <Link
            href="/"
            onClick={closeAll}
            className="
              group
              flex
              shrink-0
              items-center
              gap-2.5
            "
            style={{
              color: "#1F3D2B",
              textDecoration: "none",
            }}
          >
            <span
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                transition-transform
                duration-200
                group-hover:-translate-y-1
              "
              style={{
                background:
                  "linear-gradient(145deg,#2F5943,#1F3D2B)",

                color: "#E0A458",

                boxShadow:
                  "0 6px 15px -8px rgba(31,61,43,.7)",
              }}
            >
              <Sprout
                size={21}
                strokeWidth={2.2}
              />
            </span>

            <span
              className="
                hidden
                text-xl
                font-semibold
                sm:block
              "
            >
              {t.brand}
            </span>
          </Link>

          {/* ================================
              DESKTOP MENU

              NO HOME HERE
              NO DASHBOARD HERE
          ================================= */}

          <div
            className="
              hidden
              items-center
              gap-4
              lg:flex
            "
          >
            {menuGroups.map(
              (group) => {
                const Icon =
                  group.icon;

                const label =
                  lang === "bn"
                    ? group.bn
                    : group.en;

                /* SIMPLE LINK */

                if (group.href) {
                  return (
                    <Link
                      key={
                        group.key
                      }
                      href={
                        group.href
                      }
                      onClick={
                        closeAll
                      }
                      className={`${styles.navLink} flex items-center gap-1`}
                    >
                      <Icon
                        size={14}
                      />

                      {label}
                    </Link>
                  );
                }

                /* DROPDOWN */

                const isOpen =
                  openMenu ===
                  group.key;

                return (
                  <div
                    key={
                      group.key
                    }
                    className="relative"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        toggleDesktopMenu(
                          group.key
                        )
                      }
                      className={`${styles.navButton} flex items-center gap-1`}
                    >
                      <Icon
                        size={14}
                      />

                      {label}

                      <ChevronDown
                        size={13}
                        style={{
                          transform:
                            isOpen
                              ? "rotate(180deg)"
                              : "rotate(0deg)",

                          transition:
                            "transform 180ms ease",
                        }}
                      />
                    </button>

                    {isOpen && (
                      <div
                        className="
                          absolute
                          left-0
                          top-full
                          mt-3
                          min-w-[260px]
                          rounded-2xl
                          bg-white
                          p-2
                          shadow-2xl
                        "
                        style={{
                          border:
                            "1px solid #E4DFD1",
                        }}
                      >
                        {group.items?.map(
                          (
                            item,
                            index
                          ) => {
                            const ItemIcon =
                              itemIcons[
                                group.key
                              ]?.[
                                index
                              ] ??
                              Sprout;

                            return (
                              <Link
                                key={
                                  item.href +
                                  item.en
                                }
                                href={
                                  item.href
                                }
                                onClick={
                                  closeAll
                                }
                                className={
                                  styles.dropdownLink
                                }
                              >
                                <span
                                  className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-lg
                                  "
                                  style={{
                                    background:
                                      "#EAF0E8",
                                    color:
                                      "#2F5943",
                                  }}
                                >
                                  <ItemIcon
                                    size={
                                      15
                                    }
                                  />
                                </span>

                                <span>
                                  {lang ===
                                  "bn"
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
              }
            )}
          </div>

          {/* ================================
              RIGHT SIDE
          ================================= */}

          <div className="hidden items-center gap-3 lg:flex">
            {/* LANGUAGE BUTTON */}
            <button
              type="button"
              onClick={toggleLanguage}
              className={styles.actionButton}
            >
              <Globe size={14} />
              {t.language}
            </button>

            {/* LOGGED USER */}
            {session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex cursor-pointer items-center"
                >
                  <Image
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full border border-[#2F5943] object-cover"
                    src={session.user.image || "/default-avatar.png"}
                    alt="avatar"
                  />
                </button>

                {dropdownOpen && (
      <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-white py-2 shadow-xl">
                    <div className="border-b border-[#2F5943] px-4 py-2">
                      <p className="text-xs font-bold text-slate-600">
                        {(session.user as typeof session.user & { role?: string }).role ?? "User"} Account
                      </p>
                      <p className="font-semibold text-slate-600">
                        {session.user.name}
                      </p>
                      <p className="truncate text-xs text-slate-600">
                        {session.user.email}
                      </p>
                    </div>

                    <Link
                      href={`/dashboard/${(session.user as typeof session.user & { role?: string }).role ?? "user"}`}
                      className="flex items-center gap-2 px-4 py-2 text-slate-600"
                    >
                      <MdDashboard />
                      Dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
              className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-500/10"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ):(
         <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <button className="text-slate-500 hover:text-slate-700 cursor-pointer">
              Login
            </button>
          </Link>

          <Link
            href="/register"
className="text-white px-4 py-2 rounded-xl"
          >
            SignUp
          </Link>
        </div>     
            )}
          </div>

          {/* MOBILE */}
          <button
            type="button"
            onClick={() => {
              setMobileOpen((current) => !current);
              setOpenMenu(null);
            }}
            aria-label="Toggle menu"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border-none
              lg:hidden
            "
            style={{
              background: "#1F3D2B",
              color: "#E0A458",
              cursor: "pointer",
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ================================
            MOBILE MENU
            NO HOME HERE
        ================================= */}

        {mobileOpen && (
          <div
            className="
              border-t
              px-3
              pb-3
              pt-2
              lg:hidden
            "
            style={{
              borderColor:
                "#E4DFD1",
            }}
          >
            {menuGroups.map(
              (group) => {
                const Icon =
                  group.icon;

                const label =
                  lang === "bn"
                    ? group.bn
                    : group.en;

                /* SIMPLE */

                if (group.href) {
                  return (
                    <Link
                      key={
                        group.key
                      }
                      href={
                        group.href
                      }
                      onClick={
                        closeAll
                      }
                      className={
                        styles.mobileLink
                      }
                    >
                      <Icon size={16} />

                      {label}
                    </Link>
                  );
                }

                /* DROPDOWN */

                const isOpen =
                  mobileMenu ===
                  group.key;

                return (
                  <div
                    key={
                      group.key
                    }
                    className="border-t border-[#E4DFD1]"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        toggleMobileMenu(
                          group.key
                        )
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        border-none
                        bg-transparent
                        px-2
                        py-3
                      "
                      style={{
                        color:
                          "#1F3D2B",

                        cursor:
                          "pointer",
                      }}
                    >
                      <span className="flex items-center gap-3">
                        <Icon
                          size={16}
                        />

                        {label}
                      </span>

                      <ChevronDown
                        size={16}
                        style={{
                          transform:
                            isOpen
                              ? "rotate(180deg)"
                              : "rotate(0deg)",

                          transition:
                            "transform 180ms ease",
                        }}
                      />
                    </button>

                    {isOpen && (
                      <div className="pb-2 pl-8">
                        {group.items?.map(
                          (
                            item,
                            index
                          ) => {
                            const ItemIcon =
                              itemIcons[
                                group.key
                              ]?.[
                                index
                              ] ??
                              Sprout;

                            return (
                              <Link
                                key={
                                  item.href +
                                  item.en
                                }
                                href={
                                  item.href
                                }
                                onClick={
                                  closeAll
                                }
                                className="
                                  flex
                                  items-center
                                  gap-2.5
                                  rounded-lg
                                  px-2
                                  py-2.5
                                  text-sm
                                "
                                style={{
                                  color:
                                    "#6B7A6E",

                                  textDecoration:
                                    "none",
                                }}
                              >
                                <ItemIcon
                                  size={
                                    14
                                  }
                                  style={{
                                    color:
                                      "#C6863A",
                                  }}
                                />

                                {lang ===
                                "bn"
                                  ? item.bn
                                  : item.en}
                              </Link>
                            );
                          }
                        )}

                        {/* PROFILE USER */}

                        
                             
                      </div>
                    )}
                  </div>
                );
              }
            )}

            {/* MOBILE ACTIONS */}

            <div
              className="
                mt-2
                flex
                gap-2
                border-t
                border-[#E4DFD1]
                pt-3
              "
            >
              <button
                type="button"
                onClick={
                  toggleLanguage
                }
                className={`${styles.actionButton} flex-1 justify-center`}
              >
                <Globe size={14} />

                {t.language}
              </button>

             
            </div>
          </div>
        )}
      </nav>

      {/* Fixed navbar spacer */}

      <div
        aria-hidden="true"
        style={{
          height: 84,
        }}
      />
    </>
  );
}