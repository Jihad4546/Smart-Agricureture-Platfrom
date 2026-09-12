"use client";
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Home, Menu, MessageCircle, Sprout, X } from 'lucide-react';
import React, { useState } from 'react';
import Link from "next/link";
import { useSession } from '@/lib/auth-client';

const SideBar = () => {
   const [isOpen, setIsOpen] = useState(false); 
   const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const {
      lang,
      toggleLang,
      t: translation,
    } = useLanguage();
    const t = translation.nav;
    const toggleLanguage = () => {
    toggleLang();
setIsOpen(false); 
  };
  const {data: session} = useSession();
  const user = session?.user;
  type DashboardMenuItem = {
    name: string;
    icon: React.ReactNode;
    href?: string;
    onClick?: () => void;
  };

  const dashboardMenuItems: Record<string, DashboardMenuItem[]> = {
    farmer: [
      { name: t.language, icon: <Globe size={14} />, onClick: toggleLanguage },
      { name: lang === 'bn' ? 'হোম' : 'Home', icon: <Home className="w-5 h-5" />, href: '/dashboard/farmer' },
      { name: lang === 'bn' ? 'চ্যাট' : 'Chat', icon: <MessageCircle className="w-5 h-5" />, href: '/dashboard/farmerChat' },
    ],
    expert: [
      { name: t.language, icon: <Globe size={14} />, onClick: toggleLanguage },
       { name: lang === 'bn' ? 'হোম' : 'Home', icon: <Home className="w-5 h-5" />, href: '/dashboard/expert' },
      { name: lang === 'bn' ? 'চ্যাট' : 'Chat', icon: <MessageCircle className="w-5 h-5" />, href: '/dashboard/expertChat' },
    ],
  };

  const role = (user as (NonNullable<typeof user> & { role?: string }) | undefined)?.role as
    keyof typeof dashboardMenuItems | undefined;
  const menuItems = role && dashboardMenuItems[role] ? dashboardMenuItems[role] : [];
    return (
 <>
      {/* Mobile Menu Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
className="p-2 rounded-md bg-white shadow-md text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

  
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`
fixed inset-y-0 left-0 z-40 w-1/2 min-w-[220px] lg:w-64 border-r border-[#2F5943] text-black p-5 flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:h-screen
        `}
      >
        <div>
          <div className="flex items-center gap-3 px-2 py-4 mb-6 border-b border-[#2F5943]">
           <div
           
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
             AgriTech
            </span>
          </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              item.href ? (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-700 hover:bg-[#2F5943] hover:text-white transition-all group"
                >
                  <div className="text-slate-600 group-hover:text-white transition-colors flex gap-2 items-center">
                    {item.icon}
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                </Link>
              ) : (
                <button
                  key={index}
                  type="button"
                  onClick={item.onClick}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-slate-700 hover:bg-[#2F5943] hover:text-white transition-all group"
                >
                  <div className="text-slate-600 group-hover:text-white transition-colors flex gap-2 items-center">
                    {item.icon}
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                </button>
              )
            ))}
          </nav>
        </div>
      </aside>
    </>
    );
};

export default SideBar;