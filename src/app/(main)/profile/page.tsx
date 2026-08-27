"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthUserClient, logoutUserClient, User } from "../../../lib/auth";
import { useLanguage } from "../../../contexts/LanguageContext";
import {
  Sprout,
  User as UserIcon,
  Mail,
  Shield,
  ArrowLeft,
  LogOut,
  Calendar,
} from "lucide-react";

const translations = {
  en: {
    backToDashboard: "Back to Dashboard",
    loadingProfile: "Loading Profile...",
    accountRole: (role: string) => `${role} Account`,
    emailAddress: "Email Address",
    accessLevel: "Access Level",
    privilege: (role: string) => `${role} Privilege`,
    memberSince: "Member Since",
    memberDate: "August 2026",
    logoutBtn: "Logout from Account",
  },
  bn: {
    backToDashboard: "ড্যাশবোর্ডে ফিরে যান",
    loadingProfile: "প্রোফাইল লোড হচ্ছে...",
    accountRole: (role: string) => `${role === "Admin" ? "অ্যাডমিন" : "কৃষক"} অ্যাকাউন্ট`,
    emailAddress: "ইমেইল ঠিকানা",
    accessLevel: "অ্যাক্সেস লেভেল",
    privilege: (role: string) => `${role === "Admin" ? "অ্যাডমিন" : "কৃষক"} অধিকার`,
    memberSince: "সদস্যপদ শুরু",
    memberDate: "আগস্ট ২০২৬",
    logoutBtn: "অ্যাকাউন্ট থেকে লগ আউট",
  }
};

export default function ProfilePage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = translations[lang];
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getAuthUserClient();
    if (!currentUser) {
      router.push("/auth/login?redirect=/profile");
      return;
    }
    setUser(currentUser);
  }, [router]);

  const handleLogout = () => {
    logoutUserClient();
    router.push("/");
    router.refresh();
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F3]">
        <div className="text-center">
          <Sprout className="mx-auto h-12 w-12 animate-pulse text-[#1F3D2B]" />
          <p className="mt-4 text-sm font-medium text-[#6B7A6E]">{t.loadingProfile}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-2xl">
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#1F3D2B] transition hover:text-[#2F5943]"
        >
          <ArrowLeft size={16} />
          {t.backToDashboard}
        </button>

        <div className="overflow-hidden rounded-3xl border border-[#E4DFD1] bg-white shadow-sm">
          {/* Cover Header */}
          <div className="h-32 bg-[#1F3D2B] relative">
            <div className="absolute -bottom-12 left-8 flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-[#FAF8F3] text-[#1F3D2B]">
              <UserIcon size={44} />
            </div>
          </div>

          {/* Details */}
          <div className="px-8 pb-8 pt-16">
            <div className="mb-6 border-b border-[#E4DFD1] pb-6">
              <h1 className="text-2xl font-bold text-[#16241C]">{user.name}</h1>
              <p className="text-sm font-medium text-[#C6863A] uppercase tracking-wider mt-1">
                {t.accountRole(user.role)}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-[#6B7A6E]">
                <Mail size={18} className="text-[#1F3D2B]" />
                <div>
                  <span className="block text-[11px] font-semibold text-[#16241C] uppercase">
                    {t.emailAddress}
                  </span>
                  <span>{user.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#6B7A6E]">
                <Shield size={18} className="text-[#1F3D2B]" />
                <div>
                  <span className="block text-[11px] font-semibold text-[#16241C] uppercase">
                    {t.accessLevel}
                  </span>
                  <span>{t.privilege(user.role)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#6B7A6E]">
                <Calendar size={18} className="text-[#1F3D2B]" />
                <div>
                  <span className="block text-[11px] font-semibold text-[#16241C] uppercase">
                    {t.memberSince}
                  </span>
                  <span>{t.memberDate}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-[#9B1C1C] text-sm font-semibold text-white transition hover:bg-[#B82525] shadow-lg shadow-red-900/10"
            >
              <LogOut size={16} />
              {t.logoutBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
