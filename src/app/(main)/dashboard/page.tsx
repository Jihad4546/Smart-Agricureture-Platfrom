"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthUserClient, logoutUserClient, User } from "../../../lib/auth";
import { useLanguage } from "../../../contexts/LanguageContext";
import {
  Sprout,
  User as UserIcon,
  LogOut,
  Settings,
  Activity,
  Users,
  Database,
  Wheat,
  CloudSun,
  Droplets,
  ShieldAlert,
  Calendar,
  TrendingUp,
  Plus,
  Coins,
  Bug,
  Wind,
  ArrowRight,
} from "lucide-react";

// Local translation object matching home page structure
const translations = {
  en: {
    loading: "Loading Dashboard...",
    adminDashboard: "Admin Dashboard",
    farmerDashboard: "Farmer Dashboard",
    welcome: (name: string) => `Welcome back, ${name}`,
    settings: "Settings",
    logout: "Logout",
    
    // Stats
    cropHealth: "Crop Health",
    cropHealthVal: "Excellent (91%)",
    todaysWeather: "Today's Weather",
    weatherVal: "28°C • Clear Sky",
    soilMoisture: "Soil Moisture",
    soilMoistureVal: "74% (Optimal)",
    alerts: "Alerts",
    alertsVal: (count: number) => `${count} Warnings`,

    // Sections
    weatherSummary: "Weather Summary",
    activeCrops: "Active Crops",
    marketPriceSnapshot: "Market Prices",
    alertsSection: "Recent Alerts",
    quickActions: "Quick Actions",
    financeOverview: "Finance Overview",

    // Action button labels
    addCrop: "Add Crop",
    cropCalendar: "Crop Calendar",
    scanDisease: "Scan Disease",
    logFinance: "Log Finance",
    viewAllCrops: "View All Crops",
    viewFullWeather: "Full Weather Forecast",
    viewAllPrices: "View All Prices",
    manageFinance: "Manage Finance",

    // Crop details
    growthStage: "Growth Stage",
    daysToHarvest: "Days to harvest",
    daysLeft: "days left",
    waterStatus: "Watering Status",
    optimal: "Optimal",
    needsWater: "Needs Water",
    variety: "Variety",

    // Alerts
    heavyRain: "Heavy Rainfall Warning",
    heavyRainDesc: "Expected in 48 hours. Postpone fertilizer application.",
    pestRisk: "Late Blight Risk",
    pestRiskDesc: "High humidity levels increase blight risk for potato crops.",

    // Finance overview
    totalIncome: "Total Income",
    totalExpenses: "Total Expenses",
    netProfit: "Net Profit",
    noRecords: "No financial records found.",
    currency: "BDT",
  },
  bn: {
    loading: "ড্যাশবোর্ড লোড হচ্ছে...",
    adminDashboard: "অ্যাডমিন ড্যাশবোর্ড",
    farmerDashboard: "কৃষক ড্যাশবোর্ড",
    welcome: (name: string) => `স্বাগতম, ${name}`,
    settings: "সেটিংস",
    logout: "লগ আউট",

    // Stats
    cropHealth: "ফসলের স্বাস্থ্য",
    cropHealthVal: "চমৎকার (৯১%)",
    todaysWeather: "আজকের আবহাওয়া",
    weatherVal: "২৮°C • পরিষ্কার আকাশ",
    soilMoisture: "মাটির আর্দ্রতা",
    soilMoistureVal: "৭৪% (আদর্শ)",
    alerts: "সতর্কতা",
    alertsVal: (count: number) => `${count}টি সতর্কতা`,

    // Sections
    weatherSummary: "আবহাওয়া সারসংক্ষেপ",
    activeCrops: "চলতি ফসলসমূহ",
    marketPriceSnapshot: "বাজার দর",
    alertsSection: "সাম্প্রতিক সতর্কতা",
    quickActions: "দ্রুত সেবা",
    financeOverview: "আর্থিক সারসংক্ষেপ",

    // Action buttons
    addCrop: "ফসল যোগ করুন",
    cropCalendar: "ফসল ক্যালেন্ডার",
    scanDisease: "রোগ নির্ণয়",
    logFinance: "হিসাব যুক্ত করুন",
    viewAllCrops: "সব ফসল দেখুন",
    viewFullWeather: "আবহাওয়ার পূর্বাভাস",
    viewAllPrices: "সব বাজার দর দেখুন",
    manageFinance: "আর্থিক হিসাব",

    // Crop details
    growthStage: "বৃদ্ধির ধাপ",
    daysToHarvest: "কাটার বাকি দিন",
    daysLeft: "দিন বাকি",
    waterStatus: "সেচ পরিস্থিতি",
    optimal: "পর্যাপ্ত",
    needsWater: "সেচ প্রয়োজন",
    variety: "জাত",

    // Alerts
    heavyRain: "ভারী বৃষ্টির পূর্বাভাস",
    heavyRainDesc: "আগামী ৪৮ ঘণ্টার মধ্যে ভারী বৃষ্টিপাত হতে পারে। সার প্রয়োগ স্থগিত রাখুন।",
    pestRisk: "লেট ব্লাইট রোগ ঝুঁকি",
    pestRiskDesc: "অতিরিক্ত আর্দ্রতার কারণে আলু ফসলে ব্লাইট রোগ দেখা দিতে পারে।",

    // Finance overview
    totalIncome: "মোট আয়",
    totalExpenses: "মোট ব্যয়",
    netProfit: "নিট লাভ",
    noRecords: "কোনো আর্থিক রেকর্ড পাওয়া যায়নি।",
    currency: "টাকা",
  }
};

export default function DashboardPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
  const [crops, setCrops] = useState<any[]>([]);
  const [finances, setFinances] = useState<any>({ income: 0, expense: 0, profit: 0 });

  const t = translations[lang];

  useEffect(() => {
    // Retrieve authenticated user
    const currentUser = getAuthUserClient();
    if (!currentUser) {
      router.push("/auth/login?redirect=/dashboard");
      return;
    }
    setUser(currentUser);

    // Load registered users (Admin only)
    if (currentUser.role === "Admin") {
      try {
        const storedUsers = localStorage.getItem("registered_users");
        if (storedUsers) {
          setRegisteredUsers(JSON.parse(storedUsers));
        }
      } catch (err) {
        console.error("Failed to load registered users", err);
      }
    }

    // Load crops and initialize with defaults if empty (Farmer only)
    if (currentUser.role === "Farmer") {
      try {
        let storedCrops = localStorage.getItem("farmer_crops");
        if (!storedCrops) {
          const defaultCrops = [
            {
              id: "1",
              name: "Rice",
              nameBn: "ধান",
              variety: "BRRI dhan29",
              stage: "Vegetative",
              stageBn: "বাড়ন্ত পর্যায়",
              plantedDate: "2026-06-15",
              progress: 65,
              daysToHarvest: 45,
              status: "Optimal",
              statusBn: "পর্যাপ্ত",
            },
            {
              id: "2",
              name: "Potato",
              nameBn: "আলু",
              variety: "Diamant",
              stage: "Tuber Initiation",
              stageBn: "আলু গঠন পর্যায়",
              plantedDate: "2026-07-10",
              progress: 45,
              daysToHarvest: 55,
              status: "Needs Water",
              statusBn: "সেচ প্রয়োজন",
            },
            {
              id: "3",
              name: "Tomato",
              nameBn: "টমেটো",
              variety: "Roma",
              stage: "Flowering",
              stageBn: "ফুল ফোটার পর্যায়",
              plantedDate: "2026-07-25",
              progress: 30,
              daysToHarvest: 60,
              status: "Optimal",
              statusBn: "পর্যাপ্ত",
            }
          ];
          localStorage.setItem("farmer_crops", JSON.stringify(defaultCrops));
          setCrops(defaultCrops);
        } else {
          setCrops(JSON.parse(storedCrops));
        }

        // Load financial metrics
        const storedFinance = localStorage.getItem("farm_finance");
        if (storedFinance) {
          const records = JSON.parse(storedFinance);
          let income = 0;
          let expense = 0;
          records.forEach((rec: any) => {
            if (rec.type === "income") income += Number(rec.amount);
            else expense += Number(rec.amount);
          });
          setFinances({ income, expense, profit: income - expense });
        } else {
          const defaultFinance = [
            { id: "1", type: "income", category: "Rice Sale", categoryBn: "ধান বিক্রি", amount: 25000, date: "2026-08-15", note: "Bumper harvest sale" },
            { id: "2", type: "expense", category: "Fertilizer", categoryBn: "সার ক্রয়", amount: 5000, date: "2026-08-01", note: "Urea and TSP" },
            { id: "3", type: "expense", category: "Seed purchase", categoryBn: "বীজ ক্রয়", amount: 3000, date: "2026-08-05", note: "Potato seeds" }
          ];
          localStorage.setItem("farm_finance", JSON.stringify(defaultFinance));
          setFinances({ income: 25000, expense: 8000, profit: 17000 });
        }
      } catch (err) {
        console.error("Failed to load local data", err);
      }
    }
  }, [router]);

  const handleLogout = () => {
    logoutUserClient();
    router.push("/");
    router.refresh();
  };

  // Mock Market price data
  const marketPrices = [
    { name: "Rice (ধান)", price: "2,400 BDT/Quintal", change: "+1.5%", isUp: true },
    { name: "Potato (আলু)", price: "1,200 BDT/Quintal", change: "-0.8%", isUp: false },
    { name: "Jute (পাট)", price: "5,500 BDT/Quintal", change: "+3.2%", isUp: true },
    { name: "Tomato (টমেটো)", price: "3,000 BDT/Quintal", change: "+4.0%", isUp: true },
  ];

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F3]">
        <div className="text-center">
          <Sprout className="mx-auto h-12 w-12 animate-pulse text-[#1F3D2B]" />
          <p className="mt-4 text-sm font-medium text-[#6B7A6E]">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Block */}
        <header className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF0E8] text-[#1F3D2B]">
              <UserIcon size={30} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#C6863A]">
                {user.role === "Admin" ? t.adminDashboard : t.farmerDashboard}
              </p>
              <h1 className="text-2xl font-bold text-[#16241C]">
                {t.welcome(user.name)}
              </h1>
              <p className="text-sm text-[#6B7A6E]">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/settings")}
              className="flex h-10 items-center justify-center gap-2 rounded-xl border border-[#E4DFD1] bg-white px-4 text-sm font-semibold text-[#1F3D2B] transition hover:bg-[#FAF8F3]"
            >
              <Settings size={16} />
              {t.settings}
            </button>
            <button
              onClick={handleLogout}
              className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#9B1C1C] px-4 text-sm font-semibold text-white transition hover:bg-[#B82525] shadow-lg shadow-red-900/10"
            >
              <LogOut size={16} />
              {t.logout}
            </button>
          </div>
        </header>

        {/* Dashboard Content based on role */}
        {user.role === "Admin" ? (
          /* ==============================================
             ADMIN AREA
             ============================================== */
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#6B7A6E]">System Status</span>
                  <Activity className="text-green-600" size={20} />
                </div>
                <p className="mt-2 text-2xl font-bold text-[#16241C]">Healthy</p>
                <p className="mt-1 text-xs text-[#6B7A6E]">All services online</p>
              </div>

              <div className="rounded-2xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#6B7A6E]">Total Users</span>
                  <Users className="text-[#C6863A]" size={20} />
                </div>
                <p className="mt-2 text-2xl font-bold text-[#16241C]">
                  {2 + registeredUsers.length}
                </p>
                <p className="mt-1 text-xs text-[#6B7A6E]">
                  2 defaults + {registeredUsers.length} registered
                </p>
              </div>

              <div className="rounded-2xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#6B7A6E]">Server Region</span>
                  <Database className="text-[#1F3D2B]" size={20} />
                </div>
                <p className="mt-2 text-2xl font-bold text-[#16241C]">AP-South-1</p>
                <p className="mt-1 text-xs text-[#6B7A6E]">Ping: 24ms</p>
              </div>
            </div>

            {/* Users Management */}
            <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#16241C] mb-4">User Registry</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm text-[#6B7A6E]">
                  <thead>
                    <tr className="border-b border-[#E4DFD1] text-xs font-semibold uppercase tracking-wider text-[#16241C]">
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FAF8F3]">
                    <tr className="hover:bg-[#FAF8F3]">
                      <td className="py-3 px-4 font-medium text-[#16241C]">Abdul Rahman</td>
                      <td className="py-3 px-4">farmer@agritech.com</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center rounded-full bg-[#EAF0E8] px-2.5 py-0.5 text-xs font-medium text-[#1F3D2B]">
                          Farmer
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs italic">System Default</td>
                    </tr>
                    <tr className="hover:bg-[#FAF8F3]">
                      <td className="py-3 px-4 font-medium text-[#16241C]">Administrator</td>
                      <td className="py-3 px-4">admin@agritech.com</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                          Admin
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs italic">System Default</td>
                    </tr>
                    {registeredUsers.map((regUser, i) => (
                      <tr key={i} className="hover:bg-[#FAF8F3]">
                        <td className="py-3 px-4 font-medium text-[#16241C]">{regUser.name}</td>
                        <td className="py-3 px-4">{regUser.email}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center rounded-full bg-[#FAF8F3] border border-[#E4DFD1] px-2.5 py-0.5 text-xs font-medium text-[#6B7A6E]">
                            {regUser.role || "Farmer"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs">Registered Form</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* ==============================================
             FARMER / OTHER USERS AREA
             ============================================== */
          <div className="space-y-8">
            {/* Real-time Indicators */}
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
              <div className="rounded-2xl border border-[#E4DFD1] bg-white p-4 md:p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF0E8] text-[#1F3D2B]">
                    <Wheat size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7A6E] block md:inline">{t.cropHealth}</span>
                    <p className="text-sm md:text-base font-bold text-[#1F3D2B] truncate">{t.cropHealthVal}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E4DFD1] bg-white p-4 md:p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF0E8] text-[#1F3D2B]">
                    <CloudSun size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7A6E] block md:inline">{t.todaysWeather}</span>
                    <p className="text-sm md:text-base font-bold text-[#16241C] truncate">{t.weatherVal}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E4DFD1] bg-white p-4 md:p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF0E8] text-[#1F3D2B]">
                    <Droplets size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7A6E] block md:inline">{t.soilMoisture}</span>
                    <p className="text-sm md:text-base font-bold text-[#16241C] truncate">{t.soilMoistureVal}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E4DFD1] bg-white p-4 md:p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                    <ShieldAlert size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7A6E] block md:inline">{t.alerts}</span>
                    <p className="text-sm md:text-base font-bold text-orange-700 truncate">{t.alertsVal(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Sections Grid */}
            <div className="grid gap-6 lg:grid-cols-12">
              
              {/* Left Column: Active Crops (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Active Crops section */}
                <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-[#16241C]">{t.activeCrops}</h2>
                    <button
                      onClick={() => router.push("/crops")}
                      className="text-xs font-semibold text-[#1F3D2B] hover:underline flex items-center gap-1"
                    >
                      {t.viewAllCrops} <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="space-y-5">
                    {crops.slice(0, 3).map((crop) => (
                      <div
                        key={crop.id}
                        onClick={() => router.push(`/crops/${crop.id}`)}
                        className="group cursor-pointer rounded-2xl border border-[#FAF8F3] bg-[#FAF8F3]/50 p-4 transition hover:border-[#E4DFD1] hover:bg-white"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF0E8] text-[#1F3D2B]">
                              <Sprout size={20} />
                            </div>
                            <div>
                              <h3 className="font-bold text-[#16241C] group-hover:text-[#1F3D2B]">
                                {lang === "bn" ? crop.nameBn : crop.name}
                              </h3>
                              <p className="text-xs text-[#6B7A6E]">
                                {t.variety}: {crop.variety}
                              </p>
                            </div>
                          </div>

                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            crop.status === "Optimal" || crop.status === "পর্যাপ্ত"
                              ? "bg-[#EAF0E8] text-[#1F3D2B]"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}>
                            {lang === "bn" ? crop.statusBn : crop.status}
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-4">
                          <div className="flex justify-between text-[11px] text-[#6B7A6E] mb-1">
                            <span>{t.growthStage}: <strong className="text-[#16241C]">{lang === "bn" ? crop.stageBn : crop.stage}</strong></span>
                            <span>{crop.progress}%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E4DFD1]">
                            <div
                              className="h-full rounded-full bg-[#1F3D2B] transition-all duration-500"
                              style={{ width: `${crop.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-xs text-[#6B7A6E] border-t border-[#E4DFD1]/40 pt-2">
                          <span>{t.daysToHarvest}: <strong className="text-[#16241C]">{crop.daysToHarvest} {t.daysLeft}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Farm Finance Snapshot */}
                <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-[#16241C]">{t.financeOverview}</h2>
                    <button
                      onClick={() => router.push("/finance")}
                      className="text-xs font-semibold text-[#1F3D2B] hover:underline flex items-center gap-1"
                    >
                      {t.manageFinance} <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E4DFD1]/50">
                      <p className="text-xs text-[#6B7A6E] font-medium mb-1">{t.totalIncome}</p>
                      <p className="text-lg font-bold text-[#1F3D2B]">
                        ৳{finances.income.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E4DFD1]/50">
                      <p className="text-xs text-[#6B7A6E] font-medium mb-1">{t.totalExpenses}</p>
                      <p className="text-lg font-bold text-red-700">
                        ৳{finances.expense.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-[#EAF0E8] p-4 rounded-2xl border border-[#DCD7C9]">
                      <p className="text-xs text-[#2F5943] font-medium mb-1">{t.netProfit}</p>
                      <p className="text-lg font-bold text-[#1F3D2B]">
                        ৳{finances.profit.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Weather Summary & Market Prices & Alerts (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Weather Summary Card */}
                <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-[#16241C]">{t.weatherSummary}</h2>
                    <button
                      onClick={() => router.push("/weather")}
                      className="text-xs font-semibold text-[#1F3D2B] hover:underline"
                    >
                      {t.viewFullWeather}
                    </button>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-[#1F3D2B] to-[#2F5943] p-5 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold">28°C</p>
                        <p className="text-xs opacity-90 mt-1">Dhaka, Bangladesh</p>
                      </div>
                      <CloudSun size={48} className="text-[#E0A458]" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6 border-t border-white/20 pt-4 text-xs">
                      <div className="flex items-center gap-2">
                        <Droplets size={16} className="text-[#E0A458]" />
                        <div>
                          <p className="opacity-80">Humidity</p>
                          <p className="font-semibold">68%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wind size={16} className="text-[#E0A458]" />
                        <div>
                          <p className="opacity-80">Wind Speed</p>
                          <p className="font-semibold">12 km/h</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Market Price Snapshot */}
                <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-[#16241C]">{t.marketPriceSnapshot}</h2>
                    <button
                      onClick={() => router.push("/marketplace")}
                      className="text-xs font-semibold text-[#1F3D2B] hover:underline"
                    >
                      {t.viewAllPrices}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {marketPrices.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm py-2 border-b border-[#FAF8F3] last:border-0">
                        <span className="font-semibold text-[#16241C]">{item.name}</span>
                        <div className="text-right">
                          <p className="font-bold text-[#1F3D2B]">{item.price}</p>
                          <span className={`text-[10px] font-bold ${item.isUp ? "text-green-600" : "text-red-600"}`}>
                            {item.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alerts Section */}
                <div className="rounded-3xl border border-red-200 bg-red-50/30 p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-[#9B1C1C] mb-4 flex items-center gap-2">
                    <ShieldAlert size={20} className="text-[#9B1C1C]" />
                    {t.alertsSection}
                  </h2>

                  <div className="space-y-4">
                    <div className="border-l-4 border-amber-500 pl-3">
                      <p className="text-sm font-bold text-[#16241C]">{t.heavyRain}</p>
                      <p className="text-xs text-[#6B7A6E] mt-1">{t.heavyRainDesc}</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-3">
                      <p className="text-sm font-bold text-[#16241C]">{t.pestRisk}</p>
                      <p className="text-xs text-[#6B7A6E] mt-1">{t.pestRiskDesc}</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Farm Management Quick Actions */}
            <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm mt-8">
              <h2 className="text-lg font-bold text-[#16241C] mb-6">{t.quickActions}</h2>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
                <button
                  onClick={() => router.push("/crops/add")}
                  className="flex flex-col items-center justify-center p-5 rounded-2xl border border-[#E4DFD1] bg-[#FAF8F3] hover:bg-[#EAF0E8]/50 hover:border-[#1F3D2B] transition group text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF0E8] text-[#1F3D2B] mb-3 group-hover:scale-110 transition">
                    <Plus size={22} />
                  </div>
                  <span className="text-sm font-semibold text-[#16241C]">{t.addCrop}</span>
                </button>

                <button
                  onClick={() => router.push("/planner")}
                  className="flex flex-col items-center justify-center p-5 rounded-2xl border border-[#E4DFD1] bg-[#FAF8F3] hover:bg-[#EAF0E8]/50 hover:border-[#1F3D2B] transition group text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF0E8] text-[#1F3D2B] mb-3 group-hover:scale-110 transition">
                    <Calendar size={22} />
                  </div>
                  <span className="text-sm font-semibold text-[#16241C]">{t.cropCalendar}</span>
                </button>

                <button
                  onClick={() => router.push("/disease")}
                  className="flex flex-col items-center justify-center p-5 rounded-2xl border border-[#E4DFD1] bg-[#FAF8F3] hover:bg-[#EAF0E8]/50 hover:border-[#1F3D2B] transition group text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-700 mb-3 group-hover:scale-110 transition">
                    <Bug size={22} />
                  </div>
                  <span className="text-sm font-semibold text-[#16241C]">{t.scanDisease}</span>
                </button>

                <button
                  onClick={() => router.push("/finance")}
                  className="flex flex-col items-center justify-center p-5 rounded-2xl border border-[#E4DFD1] bg-[#FAF8F3] hover:bg-[#EAF0E8]/50 hover:border-[#1F3D2B] transition group text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-700 mb-3 group-hover:scale-110 transition">
                    <Coins size={22} />
                  </div>
                  <span className="text-sm font-semibold text-[#16241C]">{t.logFinance}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
