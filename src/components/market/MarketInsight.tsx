import React from "react";
import { Sparkles, Bot, AlertCircle } from "lucide-react";

export default function MarketInsight() {
  return (
    <section aria-label="Market AI Insight" className="bg-emerald-950 text-white rounded-xl p-5 md:p-6 shadow-md relative overflow-hidden border border-emerald-800">
      {/* Background Subtle Pattern Overlay */}
      <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
        <Sparkles className="w-48 h-48 text-emerald-400" />
      </div>

      <div className="relative z-10 space-y-3">
        {/* Header Badge */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E0A458] text-[#1F3D2B]">
              <Sparkles className="w-3.5 h-3.5" />
              AI Insight
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white">
              বাজারের গুরুত্বপূর্ণ তথ্য
            </h2>
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-300 bg-emerald-900/60 px-2.5 py-1 rounded-md border border-emerald-700/50">
            <AlertCircle className="w-3 h-3 text-amber-400" />
            ডেমো কন্টেন্ট (ভবিষ্যৎ AI ইন্টিগ্রেশনের সুবিধার্থে)
          </span>
        </div>

        {/* Insight Content */}
        <div className="bg-emerald-900/40 rounded-lg p-4 border border-emerald-800/80 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E0A458]/20 flex items-center justify-center shrink-0 mt-0.5">
            <Bot className="w-4 h-4 text-[#E0A458]" />
          </div>
          <div className="space-y-1">
            <p className="text-sm md:text-base font-medium text-emerald-100 leading-relaxed">
              ধানের দাম গত ৭ দিনে বৃদ্ধি পেয়েছে। নির্বাচিত বাজারগুলোর মধ্যে বর্তমানে ঢাকায় ধানের তালিকাভুক্ত দাম সবচেয়ে বেশি।
            </p>
            <p className="text-xs text-emerald-400">
              * Note: Data generated for simulation. Next release will integrate live AI prediction service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
