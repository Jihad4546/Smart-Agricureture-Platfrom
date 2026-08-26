"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CloudSun,
  Droplets,
  Leaf,
  MapPin,
  Sprout,
  SunMedium,
  TrendingUp,
  Wheat,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF8F3] text-[#16241C]">
      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative">
        {/* Background atmosphere */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#2F5943]/10 blur-3xl" />

          <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-[#E0A458]/10 blur-3xl" />

          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7FA66F]/5 blur-3xl" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:py-20">
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="relative z-10 max-w-2xl">
            {/* Small badge */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E4DFD1] bg-white/75 px-4 py-2 text-sm shadow-sm backdrop-blur-md">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EAF0E8] text-[#2F5943]">
                <Sprout size={15} strokeWidth={2.2} />
              </span>

              <span className="font-medium text-[#2F5943]">
                AI-Powered Smart Agriculture
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-[#E0A458]" />
            </div>

            {/* Main heading */}

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[72px]">
              Grow Smarter.
              <br />

              <span className="relative inline-block text-[#2F5943]">
                Farm Better.
                <span className="absolute -bottom-1 left-0 h-[5px] w-full rounded-full bg-[#E0A458]/70" />
              </span>

              <br />

              <span className="text-[#16241C]">
                Live Better.
              </span>
            </h1>

            {/* Description */}

            <p className="mt-7 max-w-xl text-base leading-7 text-[#6B7A6E] sm:text-lg">
              A smarter way to manage your farm with AI-powered
              crop insights, weather intelligence, soil analysis,
              disease detection and real-time market information.
            </p>

            {/* CTA */}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] px-6 py-3.5 text-sm font-semibold text-white no-underline shadow-[0_15px_30px_-18px_rgba(31,61,43,0.8)] transition-all duration-200 hover:-translate-y-1 hover:bg-[#2F5943]"
              >
                Explore Your Farm

                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/ai-assistant"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-[#DCD7C9] bg-white/80 px-6 py-3.5 text-sm font-semibold text-[#1F3D2B] no-underline shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:bg-white"
              >
                <Bot
                  size={17}
                  className="text-[#C6863A]"
                />

                Ask Agri AI

                <span className="text-[#C6863A] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            {/* Trust / stats */}

            <div className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-[#E4DFD1] rounded-2xl border border-[#E4DFD1] bg-white/55 px-2 py-4 shadow-sm backdrop-blur-md">
              <HeroStat
                value="98%"
                label="Crop Health"
              />

              <HeroStat
                value="24/7"
                label="AI Assistance"
              />

              <HeroStat
                value="Live"
                label="Farm Insights"
              />
            </div>
          </div>

          {/* =================================================
              RIGHT VISUAL
          ================================================= */}

          <div className="relative mx-auto flex w-full max-w-[590px] items-center justify-center">
            <div
              className="relative aspect-square w-full"
              style={{
                perspective: "1200px",
              }}
            >
              {/* =================================================
                  BACK CIRCLE
              ================================================= */}

              <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D8E2D5] bg-[#EAF0E8]/60" />

              <div className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#C8D7C4]" />

              {/* =================================================
                  FLOATING WEATHER CARD
              ================================================= */}

              <div
                className="absolute right-[2%] top-[8%] z-30 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-[0_20px_40px_-22px_rgba(31,61,43,0.5)] backdrop-blur-xl"
                style={{
                  animation:
                    "heroFloat 5s ease-in-out infinite",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF0E8] text-[#2F5943]">
                    <CloudSun size={21} />
                  </div>

                  <div>
                    <p className="text-[11px] text-[#6B7A6E]">
                      Today's Weather
                    </p>

                    <p className="text-sm font-semibold text-[#16241C]">
                      28°C • Clear
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  MAIN FARM PLATFORM
              ================================================= */}

              <div
                className="absolute left-1/2 top-1/2 h-[58%] w-[76%] -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform:
                    "translate(-50%, -50%) rotateX(58deg) rotateZ(-35deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Farm base */}

                <div
                  className="absolute inset-0 rounded-[28px]"
                  style={{
                    background:
                      "linear-gradient(145deg, #88AA7B, #4D7652)",
                    boxShadow:
                      "35px 40px 55px -30px rgba(31,61,43,0.6)",
                    transform: "translateZ(0)",
                  }}
                />

                {/* Farm soil layer */}

                <div
                  className="absolute inset-[7%] overflow-hidden rounded-[22px]"
                  style={{
                    background:
                      "linear-gradient(145deg, #6E965F, #426B49)",
                    transform: "translateZ(25px)",
                  }}
                >
                  {/* Crop rows */}

                  <div className="absolute inset-[8%] grid grid-cols-5 gap-3">
                    {Array.from({
                      length: 20,
                    }).map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center"
                      >
                        <Leaf
                          size={
                            22 +
                            (index % 3) * 3
                          }
                          strokeWidth={2}
                          className="text-[#EAF0E8]"
                          style={{
                            transform:
                              `rotate(${index % 2 === 0 ? -12 : 12}deg)`,
                            opacity:
                              0.65 +
                              (index % 4) * 0.08,
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Irrigation lines */}

                  <div className="absolute left-[10%] right-[10%] top-1/2 h-1 rounded-full bg-[#D8F0F0]/50" />

                  <div className="absolute bottom-[22%] left-[10%] right-[10%] h-1 rounded-full bg-[#D8F0F0]/40" />

                  {/* Smart farm sensor */}

                  <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/20 shadow-lg backdrop-blur">
                    <Sprout
                      size={31}
                      className="text-white"
                    />
                  </div>
                </div>

                {/* Platform depth */}

                <div
                  className="absolute bottom-[-20px] left-[5%] right-[5%] h-7 rounded-b-[20px] bg-[#31563B]"
                  style={{
                    transform:
                      "translateZ(-12px)",
                  }}
                />
              </div>

              {/* =================================================
                  LOCATION
              ================================================= */}

              <div
                className="absolute left-[4%] top-[17%] z-30 flex items-center gap-2 rounded-xl border border-white/80 bg-white/85 px-3 py-2 shadow-lg backdrop-blur-md"
                style={{
                  animation:
                    "heroFloat 6s ease-in-out infinite",
                  animationDelay: "-2s",
                }}
              >
                <MapPin
                  size={16}
                  className="text-[#C6863A]"
                />

                <div>
                  <p className="text-[10px] text-[#6B7A6E]">
                    Farm Location
                  </p>

                  <p className="text-xs font-semibold text-[#16241C]">
                    Your Farm
                  </p>
                </div>
              </div>

              {/* =================================================
                  CROP HEALTH CARD
              ================================================= */}

              <div
                className="absolute bottom-[9%] left-[0%] z-40 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-[0_20px_40px_-20px_rgba(31,61,43,0.5)] backdrop-blur-xl"
                style={{
                  animation:
                    "heroFloat 5.5s ease-in-out infinite",
                  animationDelay: "-1s",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF0E8] text-[#2F5943]">
                    <Wheat size={20} />
                  </div>

                  <div>
                    <p className="text-[11px] text-[#6B7A6E]">
                      Crop Health
                    </p>

                    <p className="text-sm font-semibold text-[#1F3D2B]">
                      Excellent
                    </p>
                  </div>
                </div>

                <div className="mt-3 h-1.5 w-36 overflow-hidden rounded-full bg-[#EAF0E8]">
                  <div className="h-full w-[91%] rounded-full bg-[#2F5943]" />
                </div>

                <div className="mt-1 flex justify-between text-[10px] text-[#6B7A6E]">
                  <span>Health score</span>
                  <span>91%</span>
                </div>
              </div>

              {/* =================================================
                  SOIL CARD
              ================================================= */}

              <div
                className="absolute bottom-[2%] right-[4%] z-40 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-xl"
                style={{
                  animation:
                    "heroFloat 6s ease-in-out infinite",
                  animationDelay: "-3s",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF0E8] text-[#2F5943]">
                    <Droplets size={17} />
                  </div>

                  <div>
                    <p className="text-[10px] text-[#6B7A6E]">
                      Soil Moisture
                    </p>

                    <p className="text-sm font-semibold text-[#16241C]">
                      74%
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  AI BADGE
              ================================================= */}

              <div
                className="absolute bottom-[23%] right-[0%] z-40 flex items-center gap-2 rounded-full border border-[#E4DFD1] bg-white/90 px-3 py-2 shadow-lg backdrop-blur-xl"
                style={{
                  animation:
                    "heroFloat 4.5s ease-in-out infinite",
                  animationDelay: "-1.5s",
                }}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1F3D2B] text-[#E0A458]">
                  <Bot size={14} />
                </span>

                <span className="text-xs font-semibold text-[#1F3D2B]">
                  AI Monitoring
                </span>

                <span className="h-2 w-2 rounded-full bg-[#4D9B68]" />
              </div>

              {/* =================================================
                  SUN
              ================================================= */}

              <div
                className="absolute left-[15%] top-[8%] flex h-14 w-14 items-center justify-center rounded-full bg-[#E0A458]/15 text-[#C6863A]"
                style={{
                  boxShadow:
                    "0 0 45px rgba(224,164,88,0.2)",
                  animation:
                    "heroPulse 4s ease-in-out infinite",
                }}
              >
                <SunMedium size={25} />
              </div>

              {/* =================================================
                  TREND
              ================================================= */}

              <div
                className="absolute right-[11%] bottom-[36%] z-30 hidden items-center gap-2 rounded-xl border border-white/80 bg-white/85 px-3 py-2 shadow-md backdrop-blur-md sm:flex"
                style={{
                  animation:
                    "heroFloat 5s ease-in-out infinite",
                  animationDelay: "-2.5s",
                }}
              >
                <TrendingUp
                  size={16}
                  className="text-[#2F5943]"
                />

                <div>
                  <p className="text-[10px] text-[#6B7A6E]">
                    Yield Forecast
                  </p>

                  <p className="text-xs font-semibold text-[#1F3D2B]">
                    +18.4%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM FEATURE STRIP
      ===================================================== */}

      <section className="relative border-t border-[#E4DFD1] bg-white/55">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[#E4DFD1] px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-10">
          <MiniFeature
            icon={<Sprout size={18} />}
            title="Smart Crop Management"
            description="Track crops and make better decisions."
          />

          <MiniFeature
            icon={<CloudSun size={18} />}
            title="Weather Intelligence"
            description="Understand conditions before they change."
          />

          <MiniFeature
            icon={<Bot size={18} />}
            title="AI Farm Assistant"
            description="Get intelligent farming guidance anytime."
          />
        </div>
      </section>

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style jsx>{`
        @keyframes heroFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-9px);
          }
        }

        @keyframes heroPulse {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.08);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </main>
  );
}

/* =========================================================
   HERO STAT
========================================================= */

function HeroStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="px-3 text-center">
      <p className="text-lg font-bold tracking-tight text-[#1F3D2B] sm:text-xl">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-[#6B7A6E] sm:text-xs">
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   MINI FEATURE
========================================================= */

function MiniFeature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4 px-2 py-6 sm:px-8 lg:py-7">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF0E8] text-[#2F5943]">
        {icon}
      </div>

      <div>
        <h2 className="text-sm font-semibold text-[#1F3D2B]">
          {title}
        </h2>

        <p className="mt-1 text-xs leading-5 text-[#6B7A6E]">
          {description}
        </p>
      </div>
    </div>
  );
}