"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Cloud, MapPin, AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const BANGLADESH_DISTRICTS = [
  { en: "Dhaka", bn: "ঢাকা", coords: "23.8103,90.4125" },
  { en: "Faridpur", bn: "ফরিদপুর", coords: "23.6071,89.8425" },
  { en: "Gazipur", bn: "গাজীপুর", coords: "23.9984,90.4223" },
  { en: "Gopalganj", bn: "গোপালগঞ্জ", coords: "23.0059,89.8266" },
  { en: "Kishoreganj", bn: "কিশোরগঞ্জ", coords: "24.4260,90.9821" },
  { en: "Madaripur", bn: "মাদারীপুর", coords: "23.2393,90.1870" },
  { en: "Manikganj", bn: "মানিকগঞ্জ", coords: "23.8617,90.0003" },
  { en: "Munshiganj", bn: "মুন্সীগঞ্জ", coords: "23.4981,90.4127" },
  { en: "Narayanganj", bn: "নারায়ণগঞ্জ", coords: "23.6226,90.4998" },
  { en: "Narsingdi", bn: "নরসিংদী", coords: "24.1344,90.7860" },
  { en: "Rajbari", bn: "রাজবাড়ী", coords: "23.7151,89.5875" },
  { en: "Shariatpur", bn: "শরীয়তপুর", coords: "23.2423,90.4348" },
  { en: "Tangail", bn: "টাঙ্গাইল", coords: "24.2450,89.9113" },
  { en: "Chattogram", bn: "চট্টগ্রাম", coords: "22.3475,91.8123" },
  { en: "Bandarban", bn: "বান্দরবান", coords: "21.8311,92.3686" },
  { en: "Brahmanbaria", bn: "ব্রাহ্মণবাড়িয়া", coords: "23.9608,91.1115" },
  { en: "Chandpur", bn: "চাঁদপুর", coords: "23.2513,90.8518" },
  { en: "Cumilla", bn: "কুমিল্লা", coords: "23.4619,91.1869" },
  { en: "Cox's Bazar", bn: "কক্সবাজার", coords: "21.4395,92.0077" },
  { en: "Feni", bn: "ফেনী", coords: "23.0159,91.3976" },
  { en: "Khagrachhari", bn: "খাগড়াছড়ি", coords: "23.1322,91.9490" },
  { en: "Lakshmipur", bn: "লক্ষ্মীপুর", coords: "22.9447,90.8282" },
  { en: "Noakhali", bn: "নোয়াখালী", coords: "22.8724,91.0973" },
  { en: "Rangamati", bn: "রাঙ্গামাটি", coords: "22.7324,92.2985" },
  { en: "Barishal", bn: "বরিশাল", coords: "22.7029,90.3466" },
  { en: "Barguna", bn: "বরগুনা", coords: "22.0953,90.1121" },
  { en: "Bhola", bn: "ভোলা", coords: "22.1785,90.7101" },
  { en: "Jhalokati", bn: "ঝালকাঠি", coords: "22.5721,90.1870" },
  { en: "Patuakhali", bn: "পটুয়াখালী", coords: "22.2249,90.4548" },
  { en: "Pirojpur", bn: "পিরোজপুর", coords: "22.5791,89.9759" },
  { en: "Khulna", bn: "খুলনা", coords: "22.8456,89.5403" },
  { en: "Bagerhat", bn: "বাগেরহাট", coords: "22.6602,89.7895" },
  { en: "Chuadanga", bn: "চুয়াডাঙ্গা", coords: "23.6161,88.8263" },
  { en: "Jashore", bn: "যশোর", coords: "23.1634,89.2182" },
  { en: "Jhenaidah", bn: "ঝিনাইদহ", coords: "23.5450,89.1726" },
  { en: "Kushtia", bn: "কুষ্টিয়া", coords: "23.8907,89.1100" },
  { en: "Magura", bn: "মাগুরা", coords: "23.4855,89.4198" },
  { en: "Meherpur", bn: "মেহেরপুর", coords: "23.8052,88.6724" },
  { en: "Narail", bn: "নড়াইল", coords: "23.1657,89.4990" },
  { en: "Satkhira", bn: "সাতক্ষীরা", coords: "22.3155,89.1115" },
  { en: "Rajshahi", bn: "রাজশাহী", coords: "24.3636,88.6241" },
  { en: "Bogra", bn: "বগুড়া", coords: "24.8436,89.3701" },
  { en: "Joypurhat", bn: "জয়পুরহাট", coords: "25.0947,89.0945" },
  { en: "Naogaon", bn: "নওগাঁ", coords: "24.9132,88.7531" },
  { en: "Natore", bn: "নাটোর", coords: "24.4102,89.0076" },
  { en: "Chapainawabganj", bn: "চাঁপাইনবাবগঞ্জ", coords: "24.5965,88.2775" },
  { en: "Pabna", bn: "পাবনা", coords: "24.0113,89.2562" },
  { en: "Sirajganj", bn: "সিরাজগঞ্জ", coords: "24.3141,89.5700" },
  { en: "Rangpur", bn: "রংপুর", coords: "25.7439,89.2752" },
  { en: "Dinajpur", bn: "দিনাজপুর", coords: "25.6279,88.6332" },
  { en: "Gaibandha", bn: "গাইবান্ধা", coords: "25.3297,89.5430" },
  { en: "Kurigram", bn: "কুড়িগ্রাম", coords: "25.8072,89.6295" },
  { en: "Lalmonirhat", bn: "লালমনিরহাট", coords: "25.9923,89.2847" },
  { en: "Nilphamari", bn: "নীলফামারী", coords: "25.8483,88.9414" },
  { en: "Panchagarh", bn: "পঞ্চগড়", coords: "26.2709,88.5952" },
  { en: "Thakurgaon", bn: "ঠাকুরগাঁও", coords: "26.0418,88.4283" },
  { en: "Sylhet", bn: "সিলেট", coords: "24.9045,91.8611" },
  { en: "Habiganj", bn: "হবিগঞ্জ", coords: "24.4771,91.4507" },
  { en: "Moulvibazar", bn: "মৌলভীবাজার", coords: "24.3095,91.7315" },
  { en: "Sunamganj", bn: "সুনামগঞ্জ", coords: "25.0715,91.3992" },
  { en: "Mymensingh", bn: "ময়মনসিংহ", coords: "24.7434,90.3984" },
  { en: "Jamalpur", bn: "জামালপুর", coords: "24.9200,89.9500" },
  { en: "Netrokona", bn: "নেত্রকোণা", coords: "24.8103,90.8656" },
  { en: "Sherpur", bn: "শেরপুর", coords: "25.0746,90.1495" },
];

type WeatherAlert = {
  headline?: string;
  event?: string;
  desc?: string;
};

type WeatherNotification = {
  city: string;
  temp_c: number;
  condition: string;
  icon?: string;
  alerts?: WeatherAlert[];
  timestamp?: string;
};

export default function WeatherNotificationPage() {
  const { lang } = useLanguage();

  const [selectedDistrictEn, setSelectedDistrictEn] = useState<string>("Dhaka");
  const [notifications, setNotifications] = useState<WeatherNotification[]>([]);

  const currentDistrictObj = BANGLADESH_DISTRICTS.find(
    (d) => d.en.toLowerCase() === selectedDistrictEn.toLowerCase()
  );
  const selectedDistrictName =
    lang === "bn"
      ? currentDistrictObj?.bn || selectedDistrictEn
      : currentDistrictObj?.en || selectedDistrictEn;

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
    const socket: Socket = io(socketUrl);

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("weather_update", (data: WeatherNotification) => {
      console.log("Received weather update:", data);

      if (data.city.toLowerCase() === selectedDistrictEn.toLowerCase()) {
        setNotifications((prev) => [data, ...prev]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedDistrictEn]);

  const handleDistrictChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const chosenEnName = e.target.value;
    setSelectedDistrictEn(chosenEnName);
    setNotifications([]);

    const districtObj = BANGLADESH_DISTRICTS.find((d) => d.en === chosenEnName);
    const queryParam = districtObj ? districtObj.coords : chosenEnName;

    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      await fetch(
        `${serverUrl}/api/weather?city=${encodeURIComponent(queryParam)}&lang=${
          lang === "bn" ? "bn" : "en"
        }`
      );
    } catch (err) {
      console.error("API Fetch Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-4 py-8 md:px-8">
      <Link
        href={"/"}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#1F3D2B] transition hover:text-[#2F5943]"
      >
        <ArrowLeft size={16} />
        {lang === "bn" ? "ফিরে যান" : "Go Back"}
      </Link>
      <div className="max-w-4xl mx-auto">
        {/* Header & District Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-[#E4DFD1]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Cloud className="text-[#2F5943]" />
              <h1 className="text-2xl font-bold text-[#1F3D2B]">
                {lang === "bn" ? "আবহাওয়া নোটিফিকেশন" : "Weather Notifications"}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-[#6B7A6E] text-sm">
              <MapPin size={16} />
              <span>
                {lang === "bn" ? "নির্ধারিত জেলাঃ" : "Selected District:"}{" "}
                <strong>{selectedDistrictName}</strong>
              </span>
            </div>
          </div>

          {/* 64 District Dropdown */}
          <div className="w-full sm:w-64">
            <label
              htmlFor="district-select"
              className="block text-xs font-semibold text-[#2F5943] mb-1"
            >
              {lang === "bn" ? "নির্ধারিত জেলা" : "Selected District"}
            </label>
            <select
              id="district-select"
              value={selectedDistrictEn}
              onChange={handleDistrictChange}
              className="w-full bg-white border border-[#E4DFD1] text-[#1F3D2B] rounded-xl px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2F5943] transition cursor-pointer"
            >
              {BANGLADESH_DISTRICTS.map((district) => (
                <option key={district.en} value={district.en}>
                  {lang === "bn" ? district.bn : district.en}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notifications List with Alerts */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#1F3D2B]">
            {lang === "bn" ? "লাইভ আপডেট" : "Live Updates for"} {selectedDistrictName}
          </h2>

          {notifications.length === 0 ? (
            <div className="bg-white border border-[#E4DFD1] rounded-2xl p-8 text-center text-gray-500">
              <p>
                {lang === "bn"
                  ? "কোন নতুন তথ্য নেই"
                  : "No weather updates received yet for"}{" "}
                {selectedDistrictName}.
              </p>
            </div>
          ) : (
            notifications.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-[#E4DFD1] rounded-2xl p-5 shadow-sm space-y-4"
              >
                {/* Weather Main Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {item.icon && (
                      <img
                        src={`https:${item.icon}`}
                        alt={item.condition}
                        className="w-12 h-12"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-[#1F3D2B]">
                        📍 {selectedDistrictName}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Weather Alerts Section */}
                <div className="border-t border-gray-100 pt-3">
                  {item.alerts && item.alerts.length > 0 ? (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-800 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-red-700">
                        <AlertTriangle size={18} />
                        <span>
                          {lang === "bn" ? "আবহাওয়া সতর্কতাঃ" : "Weather Warnings:"}
                        </span>
                      </div>
                      {item.alerts.map((alert, alertIndex) => (
                        <div key={alertIndex} className="text-sm pl-6">
                          <p className="font-semibold">
                            {alert.headline || alert.event}
                          </p>
                          {alert.desc && (
                            <p className="text-xs text-red-600 mt-1">
                              {alert.desc}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 p-2.5 rounded-xl border border-green-200">
                      <CheckCircle size={15} />
                      <span>
                        {lang === "bn"
                          ? "কোনো বিশেষ আবহাওয়া সতর্কতা নেই"
                          : "No active weather alerts"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}