"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthUserClient, logoutUserClient, User } from "../../../lib/auth";
import {
  Sprout,
  User as UserIcon,
  LogOut,
  Settings,
  Bell,
  Activity,
  Users,
  Database,
  Wheat,
  CloudSun,
  Droplets,
  ShieldAlert,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);

  useEffect(() => {
    // Retrieve authenticated user
    const currentUser = getAuthUserClient();
    if (!currentUser) {
      router.push("/auth/login?redirect=/dashboard");
      return;
    }
    setUser(currentUser);

    // If Admin, load registered users from localStorage
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
          <p className="mt-4 text-sm font-medium text-[#6B7A6E]">Loading Dashboard...</p>
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
                {user.role} Dashboard
              </p>
              <h1 className="text-2xl font-bold text-[#16241C]">
                Welcome back, {user.name}
              </h1>
              <p className="text-sm text-[#6B7A6E]">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/profile")}
              className="flex h-10 items-center justify-center gap-2 rounded-xl border border-[#E4DFD1] bg-white px-4 text-sm font-semibold text-[#1F3D2B] transition hover:bg-[#FAF8F3]"
            >
              <Settings size={16} />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#9B1C1C] px-4 text-sm font-semibold text-white transition hover:bg-[#B82525] shadow-lg shadow-red-900/10"
            >
              <LogOut size={16} />
              Logout
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
                    {/* Default Users */}
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
                    {/* Registered Users */}
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
            <div className="grid gap-6 sm:grid-cols-4">
              <div className="rounded-2xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF0E8] text-[#1F3D2B]">
                    <Wheat size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7A6E]">Crop Health</span>
                    <p className="text-base font-bold text-[#1F3D2B]">Excellent (91%)</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF0E8] text-[#1F3D2B]">
                    <CloudSun size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7A6E]">Today's Weather</span>
                    <p className="text-base font-bold text-[#16241C]">28°C • Clear Sky</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF0E8] text-[#1F3D2B]">
                    <Droplets size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7A6E]">Soil Moisture</span>
                    <p className="text-base font-bold text-[#16241C]">74% (Optimal)</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                    <ShieldAlert size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7A6E]">Alerts</span>
                    <p className="text-base font-bold text-orange-700">0 Warnings</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Farm Management Quick Actions */}
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#16241C] mb-4">Crop Management</h2>
                <p className="text-sm text-[#6B7A6E] mb-6">
                  Monitor your crops' growth stages, track irrigation cycles, and optimize crop yields using AI recommendations.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => router.push("/crops")}
                    className="flex-1 h-11 rounded-xl bg-[#1F3D2B] text-sm font-semibold text-white transition hover:bg-[#2F5943]"
                  >
                    View My Crops
                  </button>
                  <button
                    onClick={() => router.push("/planner")}
                    className="flex-1 h-11 rounded-xl border border-[#E4DFD1] text-sm font-semibold text-[#1F3D2B] transition hover:bg-[#FAF8F3]"
                  >
                    Crop Calendar
                  </button>
                </div>
              </div>

              <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#16241C] mb-4">Farm Intelligence</h2>
                <p className="text-sm text-[#6B7A6E] mb-6">
                  Access weather intelligence reports, run disease diagnostic tool on crop images, or get expert AI recommendations.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => router.push("/ai-assistant")}
                    className="flex-1 h-11 rounded-xl bg-[#E0A458] text-sm font-semibold text-[#1F3D2B] transition hover:bg-[#C6863A]"
                  >
                    Consult Agri AI
                  </button>
                  <button
                    onClick={() => router.push("/disease")}
                    className="flex-1 h-11 rounded-xl border border-[#E4DFD1] text-sm font-semibold text-[#1F3D2B] transition hover:bg-[#FAF8F3]"
                  >
                    Detect Disease
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
