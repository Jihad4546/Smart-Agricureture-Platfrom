"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  CloudSun,
  Droplets,
  Leaf,
  MapPinned,
  ShieldCheck,
  Sprout,
  SunMedium,
  TrendingUp,
  Wheat,
} from "lucide-react";

const quickStats = [
  { value: "24/7", label: "Smart monitoring" },
  { value: "96%", label: "Crop health" },
  { value: "18%", label: "Yield uplift" },
];

const modules = [
  {
    icon: Wheat,
    title: "Crop Management",
    description: "Track planting, crop health, and seasonal planning in one dashboard.",
    href: "/cropManagement",
  },
  {
    icon: CloudSun,
    title: "Weather Intelligence",
    description: "Monitor climate conditions and plan better irrigation and harvest timing.",
    href: "/weather",
  },
  {
    icon: Bot,
    title: "AI Farm Assistant",
    description: "Get guidance on crop performance, risks, and routine field decisions.",
    href: "/dashboard",
  },
  {
    icon: BarChart3,
    title: "Market Prices",
    description: "Compare field-to-market trends and stay informed about profitability.",
    href: "/market-prices",
  },
  {
    icon: ShieldCheck,
    title: "Disease Detection",
    description: "Identify plant issues early and reduce damage before it spreads.",
    href: "/disease",
  },
  {
    icon: Bell,
    title: "Farm Alerts",
    description: "Receive timely notifications for weather changes, reminders, and tasks.",
    href: "/settings",
  },
];

const projectHighlights = [
  "AI-powered crop insights",
  "Weather-aware planning",
  "Field and market visibility",
  "Smart reminders and alerts",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#16241C]">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-[#2F5943]/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#E0A458]/10 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7FA66F]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#E4DFD1] bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF0E8] text-[#2F5943]">
                  <Sprout size={16} />
                </span>
                <span className="text-sm font-medium text-[#2F5943]">AI-Powered Smart Agriculture</span>
              </div>

              <h1 className="max-w-2xl text-4xl font-bold tracking-[-0.06em] text-[#16241C] sm:text-5xl lg:text-6xl">
                Grow smarter.
                <span className="mt-2 block text-[#2F5943]">Farm better.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-[#6B7A6E] sm:text-lg">
                A complete agriculture platform to monitor crops, forecast weather, detect diseases, view market prices, and make data-driven farming decisions from a single place.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_30px_-20px_rgba(31,61,43,0.8)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Explore dashboard
                  <ArrowRight size={17} />
                </Link>

                <Link
                  href="/cropManagement"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DCD7C9] bg-white px-6 py-3.5 text-sm font-semibold text-[#1F3D2B] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  View crop tools
                </Link>
              </div>

              <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
                {quickStats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-[#E4DFD1] bg-white/75 px-3 py-4 text-center shadow-sm backdrop-blur-sm">
                    <div className="text-xl font-bold text-[#1F3D2B]">{item.value}</div>
                    <div className="mt-1 text-[11px] text-[#6B7A6E]">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="relative aspect-square w-full">
                <div className="absolute inset-[10%] rounded-full border border-[#D9E5D8] bg-[#EEF5EE]/70" />
                <div className="absolute inset-[22%] rounded-full border border-dashed border-[#C3D2BF]" />

                <div className="absolute right-0 top-8 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF0E8] text-[#2F5943]">
                      <CloudSun size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.12em] text-[#6B7A6E]">Weather</div>
                      <div className="text-sm font-semibold text-[#16241C]">28°C • Clear</div>
                    </div>
                  </div>
                </div>

                <div className="absolute left-3 top-20 flex items-center gap-2 rounded-xl border border-white/80 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
                  <MapPinned size={16} className="text-[#C6863A]" />
                  <div>
                    <div className="text-[10px] text-[#6B7A6E]">Farm location</div>
                    <div className="text-xs font-semibold text-[#16241C]">Your Farm</div>
                  </div>
                </div>

                <div className="absolute left-1/2 top-1/2 h-[54%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-[32px] bg-gradient-to-br from-[#8FAD7F] via-[#5B7D5D] to-[#254A2E] shadow-[35px_35px_55px_-32px_rgba(31,61,43,0.75)]">
                  <div className="absolute inset-[8%] overflow-hidden rounded-[26px] bg-gradient-to-br from-[#7B9E67] to-[#406750]">
                    <div className="absolute inset-[10%] grid grid-cols-5 gap-2">
                      {Array.from({ length: 15 }).map((_, idx) => (
                        <div key={idx} className="flex items-center justify-center">
                          <Leaf
                            size={16 + (idx % 3) * 4}
                            strokeWidth={2}
                            className="text-[#ECF4E8] opacity-80"
                            style={{ transform: `rotate(${idx % 2 === 0 ? -10 : 10}deg)` }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="absolute left-2 right-2 top-1/2 h-[2px] rounded-full bg-white/40" />
                    <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/15 backdrop-blur-sm">
                      <Sprout size={28} className="text-white" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-5 left-2 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF0E8] text-[#2F5943]">
                      <Wheat size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] text-[#6B7A6E]">Crop health</div>
                      <div className="text-sm font-semibold text-[#1F3D2B]">Excellent</div>
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 w-32 overflow-hidden rounded-full bg-[#EAF0E8]">
                    <div className="h-full w-[91%] rounded-full bg-[#2F5943]" />
                  </div>
                </div>

                <div className="absolute bottom-10 right-0 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-lg backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF0E8] text-[#2F5943]">
                      <Droplets size={16} />
                    </div>
                    <div>
                      <div className="text-[10px] text-[#6B7A6E]">Soil moisture</div>
                      <div className="text-sm font-semibold text-[#16241C]">74%</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-24 right-2 flex items-center gap-2 rounded-full border border-[#E4DFD1] bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1F3D2B] text-[#E0A458]">
                    <Bot size={12} />
                  </span>
                  <span className="text-xs font-semibold text-[#1F3D2B]">AI monitoring</span>
                </div>

                <div className="absolute left-[14%] top-[8%] flex h-14 w-14 items-center justify-center rounded-full bg-[#E0A458]/15 text-[#C6863A] shadow-[0_0_40px_rgba(224,164,88,0.18)]">
                  <SunMedium size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2F5943]">Project overview</p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-[#16241C] sm:text-4xl">Everything a modern farm needs</h2>
          </div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F3D2B]">
            Open dashboard <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {modules.map(({ icon: Icon, title, description, href }) => (
            <Link key={title} href={href} className="group rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-[0_18px_30px_-30px_rgba(31,61,43,0.6)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_40px_-28px_rgba(31,61,43,0.65)]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF0E8] text-[#2F5943]">
                <Icon size={22} />
              </div>
              <h3 className="text-xl font-semibold text-[#16241C]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#6B7A6E]">{description}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2F5943]">
                View module <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[#E4DFD1] bg-white/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div className="rounded-3xl bg-[#1F3D2B] p-8 text-white shadow-[0_24px_40px_-28px_rgba(31,61,43,0.9)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E0A458]">Why this platform</p>
            <h3 className="mt-3 text-3xl font-bold tracking-[-0.05em]">One place for smarter farm decisions</h3>
            <p className="mt-4 text-sm leading-7 text-[#E8EFE6]">
              This project brings field data, live weather, crop and market insights together so farmers can act faster, reduce risk, and improve productivity.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {projectHighlights.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-[#E4DFD1] bg-[#F9F7F1] p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF0E8] text-[#2F5943]">
                  <TrendingUp size={16} />
                </div>
                <span className="text-sm font-medium text-[#1F3D2B]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
