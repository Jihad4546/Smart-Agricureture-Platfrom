import React from "react";
import { Sprout, MapPin, Handshake } from "lucide-react";

export default function TrustSection() {
  return (
    <section aria-label="Farmer Trust & Benefits" className="bg-[#EAF0E8]/70 rounded-2xl p-6 md:p-8 border border-[#E4DFD1] space-y-6">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-1">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1F3D2B]">
          বিশ্বস্ত কৃষকের কাছ থেকে সরাসরি
        </h2>
        <p className="text-xs md:text-sm text-[#6B7A6E] font-medium">
          Buy directly from trusted local farmers.
        </p>
      </div>

      {/* 3 Benefit Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1 */}
        <div className="bg-white rounded-xl p-5 border border-[#E4DFD1] shadow-xs space-y-2 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="w-12 h-12 rounded-xl bg-[#EAF0E8] text-[#1F3D2B] flex items-center justify-center">
            <Sprout className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-[#16241C] text-base md:text-lg">
            🌱 সরাসরি কৃষকের কাছ থেকে
          </h3>
          <p className="text-xs md:text-sm text-[#6B7A6E] leading-relaxed">
            কম মধ্যস্বত্বভোগী এবং স্বচ্ছ মূল্য নিশ্চিত করে সরাসরি মাঠের সেরা পণ্য পান।
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl p-5 border border-[#E4DFD1] shadow-xs space-y-2 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="w-12 h-12 rounded-xl bg-[#EAF0E8] text-[#2F5943] flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-[#16241C] text-base md:text-lg">
            📍 স্থানীয় পণ্য
          </h3>
          <p className="text-xs md:text-sm text-[#6B7A6E] leading-relaxed">
            আপনার কাছাকাছি এলাকার কৃষকদের কাছ থেকে তাজা ও ফ্রেশ কৃষিপণ্য সংগ্রহ করুন।
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl p-5 border border-[#E4DFD1] shadow-xs space-y-2 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="w-12 h-12 rounded-xl bg-[#EAF0E8] text-[#1F3D2B] flex items-center justify-center">
            <Handshake className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-[#16241C] text-base md:text-lg">
            🤝 স্বচ্ছ তথ্য
          </h3>
          <p className="text-xs md:text-sm text-[#6B7A6E] leading-relaxed">
            পণ্যের সঠিক মূল্য, মজুদের পরিমাণ এবং কৃষকের সরাসরি পরিচয় ও যোগাযোগের তথ্য দেখুন।
          </p>
        </div>
      </div>
    </section>
  );
}
