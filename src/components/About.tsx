"use client";

import React from "react";
import { Sprout, ShieldCheck, Leaf, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  // Context থেকে বর্তমান ভাষা পাওয়া যাচ্ছে
  const { lang } = useLanguage();
  const currentLang = (lang as "bn" | "en") || "bn";

  const features = [
    {
      icon: Sprout,
      title: {
        bn: "আধুনিক কৃষি প্রযুক্তি",
        en: "Modern Agri-Technology",
      },
      desc: {
        bn: "ড্রোন এবং এআই প্রযুক্তির মাধ্যমে সঠিক উপায়ে ফসলের যত্ন ও পর্যবেক্ষণ।",
        en: "Accurate crop care and monitoring using drones and AI technology.",
      },
    },
    {
      icon: ShieldCheck,
      title: {
        bn: "নিরাপদ ও জৈব খাদ্য",
        en: "Safe & Organic Food",
      },
      desc: {
        bn: "ক্ষতিকারক রাসায়নিক ছাড়াই বিষমুক্ত ও পুষ্টিকর ফসল উৎপাদনের নিশ্চয়তা।",
        en: "Ensuring poison-free, nutritious crop production without harmful chemicals.",
      },
    },
    {
      icon: Leaf,
      title: {
        bn: "পরিবেশবান্ধব চাষাবাদ",
        en: "Eco-Friendly Farming",
      },
      desc: {
        bn: "মাটির উর্বরতা রক্ষা করে প্রাকৃতিক নিয়মে দীর্ঘমেয়াদী কৃষিকাজ।",
        en: "Long-term farming using natural methods that preserve soil fertility.",
      },
    },
    {
      icon: HeartHandshake,
      title: {
        bn: "কৃষকদের সরাসরি সহযোগিতা",
        en: "Direct Farmer Support",
      },
      desc: {
        bn: "মধ্যস্বত্বভোগী ছাড়াই কৃষকদের ন্যায্য মূল্য পাওয়ার মাধ্যম তৈরি করা।",
        en: "Creating pathways for farmers to get fair prices without middlemen.",
      },
    },
  ];

  return (
    <section className="py-16 px-6 lg:px-12">
        <div className="mb-10 text-center sm:text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            {currentLang === "bn" ? "আমাদের সম্পর্কে" : "About Us"}
          </h2>
        </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* বাম পাশের টেক্সট কন্টেন্ট */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold">
            <Leaf className="w-4 h-4" />
            <span>
              {currentLang === "bn" ? "আমাদের লক্ষ্য ও উদ্দেশ্য" : "Our Mission & Vision"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            {currentLang === "bn" ? (
              <>
                কৃষি এবং কৃষকের সমৃদ্ধিতে <br className="hidden sm:inline" />
                <span className="text-emerald-600">আমরা সদা প্রস্তুত</span>
              </>
            ) : (
              <>
                Empowering Farmers & Agriculture <br className="hidden sm:inline" />
                <span className="text-emerald-600">We Are Always Ready</span>
              </>
            )}
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            {currentLang === "bn"
              ? "আমরা আধুনিক প্রযুক্তি ও টেকসই কৃষি পদ্ধতির সমন্বয়ে বাংলাদেশের কৃষি খাতকে সমৃদ্ধ করতে কাজ করছি। আমাদের মূল উদ্দেশ্য হলো কৃষকদের যথাযথ মর্যাদা, উন্নত প্রযুক্তি এবং সঠিক বাজার নিশ্চিত করা।"
              : "We work to enrich the agricultural sector by combining modern technology with sustainable farming practices. Our main goal is to ensure proper dignity, advanced technology, and fair market access for farmers."}
          </p>

          {/* কী-ফিচার গ্রিড */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-sm border border-emerald-100"
                >
                  <div className="p-2 rounded-lg bg-emerald-500 text-white shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {item.title[currentLang]}
                    </h4>
                    <p className="text-gray-500 text-xs mt-1">
                      {item.desc[currentLang]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ডান পাশের ইমেজ অ্যান্ড স্ট্যাটস কার্ড */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1000"
              alt="Agriculture"
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-emerald-950/20" />
          </div>

          {/* ওপরে ভাসমান স্ট্যাটাস কার্ড */}
          <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 hidden sm:flex">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xl">
              {currentLang === "bn" ? "১০+" : "10+"}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">
                {currentLang === "bn" ? "বছরের অভিজ্ঞতা" : "Years Experience"}
              </p>
              <p className="text-xs text-gray-500">
                {currentLang === "bn" ? "স্মার্ট কৃষি সেবায়" : "In Smart Agriculture"}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;