"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
Sprout,
Calendar,
MapPin,
Layers,
DollarSign,
Upload,
CheckCircle2,
FileText,
} from "lucide-react";

interface CropFormData {
cropName: string;
variety: string;
category: string;
fieldLocation: string;
landArea: string;
plantingDate: string;
estimatedHarvestDate: string;
currentStage: string;
soilType: string;
irrigationType: string;
estimatedBudget: string;
expectedYield: string;
notes: string;
}

export default function AddCropPage() {
const [formData, setFormData] = useState({
cropName: "",
variety: "",
category: "Cereal",
fieldLocation: "Plot-A",
landArea: "",
plantingDate: "",
estimatedHarvestDate: "",
currentStage: "Germination",
soilType: "Loamy (দোঁয়াশ)",
irrigationType: "Canal/Surface",
estimatedBudget: "",
expectedYield: "",
notes: "",
});

const [isSubmitted, setIsSubmitted] = useState(false);
const [selectedFile, setSelectedFile] = useState<File | null>(null);

const handleChange = (
e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
const { name, value } = e.target;
setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
if (e.target.files && e.target.files[0]) {
setSelectedFile(e.target.files[0]);
}
};

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
// Logic for API integration goes here
setIsSubmitted(true);
};

if (isSubmitted) {
return (
<>
  <main className="min-h-screen bg-slate-50 p-6">
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 text-center shadow-sm">
      <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-emerald-600" />
      <h1 className="text-2xl font-bold text-slate-900">ফসল সফলভাবে যুক্ত হয়েছে!</h1>
      <p className="mt-3 text-slate-600">
        আপনার নতুন ফসল {formData.cropName || "নতুন ফসল"} সফলভাবে এগ্রিটেক ক্রপ ম্যানেজমেন্টে নিবন্ধিত হয়েছে।
      </p>
      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          aria-label="Add another crop"
          className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
        >
          + আরো একটি ফসল যোগ করুন
        </button>
        <Link
          href="/crop-management"
          className="block w-full rounded-lg border border-slate-300 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          ক্রপ ড্যাশবোর্ডে ফিরে যান
        </Link>
      </div>
    </div>
  </main>
  </>
);
}

return (

  <main className="min-h-screen bg-slate-50 p-6">
    <div className="mx-auto max-w-5xl space-y-6">

{/* Navigation & Header */}


 ক্রপ ম্যানেজমেন্টে ফিরে যান







নতুন ফসল যুক্ত করুন (Add Crop)


আপনার চাষাবাদকৃত জমির তথ্য এবং ফসলের রোপণ সময়সূচি পূরণ করুন।





    {/* Form Container */}
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section 1: Basic Crop Details */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-slate-100">
          <Layers className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-bold text-slate-900">প্রাথমিক তথ্য (Basic Details)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Crop Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              ফসলের নাম *
            </label>
            <input
              type="text"
              name="cropName"
              required
              placeholder="যেমন: বিআর-২৮ ধান, ক্যাটিনাল আলু"
              value={formData.cropName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          {/* Crop Variety */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              জাত / Variety
            </label>
            <input
              type="text"
              name="variety"
              placeholder="যেমন: উফশী, হাইব্রিড, ব্রি-৮৯"
              value={formData.variety}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              ফসলের ধরণ (Category) *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
            >
              <option value="Cereal">দানাদার (Cereal - ধান, গম, ভুট্টা)</option>
              <option value="Vegetable">শাকসবজি (Vegetable - টমেটো, আলু)</option>
              <option value="Fruit">ফলমূল (Fruit - আম, কলা, পেঁপে)</option>
              <option value="Pulse">ডাল জাতীয় (Pulse - মসুর, মুগ)</option>
              <option value="Cash Crop">অর্থকরী ফসল (Cash Crop - পাট, আখ)</option>
            </select>
          </div>

          {/* Field/Plot Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              জমির প্লট / অবস্থান *
            </label>
            <div className="relative">
              <select
                name="fieldLocation"
                value={formData.fieldLocation}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
              >
                <option value="Plot-A">উত্তর মাঠ - প্লট A</option>
                <option value="Plot-B">দক্ষিণ মাঠ - প্লট B</option>
                <option value="Plot-C">নদীতীর জমি - প্লট C</option>
                <option value="Home-Garden">বাড়ির সংলগ্ন জমি</option>
              </select>
              <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Land Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              জমির পরিমাণ (একর/শতক) *
            </label>
            <input
              type="text"
              name="landArea"
              required
              placeholder="যেমন: ২.৫ একর বা ৫০ শতক"
              value={formData.landArea}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          {/* Soil Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              মাটির ধরণ (Soil Type)
            </label>
            <select
              name="soilType"
              value={formData.soilType}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
            >
              <option value="Loamy (দোঁয়াশ)">দোঁয়াশ মাটি (Loamy Soil)</option>
              <option value="Clay (এঁটেল)">এঁটেল মাটি (Clay Soil)</option>
              <option value="Sandy (বেলে)">বেলে মাটি (Sandy Soil)</option>
              <option value="Silt (পলি)">পলি মাটি (Silt Soil)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 2: Timeline & Growth Stage */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-slate-100">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-bold text-slate-900">সময়সূচি ও ধাপ (Timeline & Stage)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Planting Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              রোপণ / বীজ বপনের তারিখ *
            </label>
            <input
              type="date"
              name="plantingDate"
              required
              value={formData.plantingDate}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          {/* Estimated Harvest Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              সম্ভাব্য ফসল কাটার তারিখ
            </label>
            <input
              type="date"
              name="estimatedHarvestDate"
              value={formData.estimatedHarvestDate}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          {/* Growth Stage */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              বর্তমান বৃদ্ধির ধাপ (Current Stage)
            </label>
            <select
              name="currentStage"
              value={formData.currentStage}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
            >
              <option value="Germination">অঙ্কুরোদগম (Germination)</option>
              <option value="Vegetative">অঙ্গজ বৃদ্ধি (Vegetative Growth)</option>
              <option value="Flowering">ফুল ধরা (Flowering)</option>
              <option value="Maturity">পক্বতা / পাকা অবস্থা (Maturity)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 3: Financial & Resource Inputs */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-slate-100">
          <DollarSign className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-bold text-slate-900">বাজেট ও সেচ ব্যবস্থাপনা (Budget & Irrigation)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Estimated Budget */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              আনুমানিক বাজেট / খরচ (৳)
            </label>
            <div className="relative">
              <input
                type="number"
                name="estimatedBudget"
                placeholder="যেমন: ৩৫০০০"
                value={formData.estimatedBudget}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
              <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">৳</span>
            </div>
          </div>

          {/* Expected Yield */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              প্রত্যাশিত ফলন (মন / কেজি)
            </label>
            <input
              type="text"
              name="expectedYield"
              placeholder="যেমন: ১২০ মন"
              value={formData.expectedYield}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          {/* Irrigation Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              প্রধান সেচ ব্যবস্থা
            </label>
            <select
              name="irrigationType"
              value={formData.irrigationType}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
            >
              <option value="Canal/Surface">নালা / ভূপৃষ্ঠস্থ সেচ</option>
              <option value="Drip Irrigation">ড্রিপ সেচ (Drip Irrigation)</option>
              <option value="Sprinkler">স্প্রিংক্লার (Sprinkler)</option>
              <option value="Rainfed">বৃষ্টির পানি নির্ভর (Rainfed)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 4: Photo & Extra Notes */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-slate-100">
          <FileText className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-bold text-slate-900">ছবি ও অতিরিক্ত নোট (Image & Notes)</h2>
        </div>

        <div className="space-y-4">
          {/* Field/Crop Image Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              ক্ষেত বা ফসলের ছবি যোগ করুন
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-emerald-500 transition cursor-pointer bg-slate-50/50">
              <input
                type="file"
                id="crop-photo"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="crop-photo" className="cursor-pointer flex flex-col items-center">
                <Upload className="w-8 h-8 text-emerald-600 mb-2" />
                <span className="text-sm font-medium text-slate-700">
                  {selectedFile ? selectedFile.name : "ফাইল নির্বাচন করতে ক্লিক করুন"}
                </span>
                <span className="text-xs text-slate-400 mt-1">PNG, JPG বা WEBP (সর্বোচ্চ 5MB)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* Form Actions */}
      <div className="flex items-center justify-end gap-4 pt-2">
        <Link
          href="/crop-management"
          className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-100 transition"
        >
          বাতিল (Cancel)
        </Link>
        <button
          type="submit"
          className="px-8 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium shadow-sm transition flex items-center gap-2"
        >
          <Sprout className="w-4 h-4" /> ফসল সংরক্ষণ করুন (Save Crop)
        </button>
      </div>
    </form>
    </div>
  </main>
);
}