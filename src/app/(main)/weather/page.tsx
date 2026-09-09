"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Cloud,
  CloudRain,
  Droplets,
  Loader2,
  MapPin,
  Sun,
  Thermometer,
  Umbrella,
  Wind,
} from "lucide-react";
import { useLanguage } from "../../../contexts/LanguageContext";

// WeatherAPI এর জন্য ৬৪ জেলার স্থানাঙ্ক (Lat, Long) ও নাম
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
const translations = {
  en: {
    weather: "Weather",
    currentWeather: "Current Weather",
    forecast: "3-Day Forecast",
    farmingAdvice: "Farming Advisory",
    weatherAlerts: "Weather Alerts",
    noAlerts: "No active weather alerts",
    feelsLike: "Feels like",
    humidity: "Humidity",
    wind: "Wind",
    rainChance: "Rain Chance",
    rainfall: "Rainfall",
    loading: "Loading weather data...",
    error: "Failed to load weather data.",
    retry: "Try Again",
    today: "Today",
    tomorrow: "Tomorrow",
    max: "Max",
    min: "Min",
    uv: "UV",
    poweredBy: "Powered by",
    selectDistrict: "Select District",
  },

  bn: {
    weather: "আবহাওয়া",
    currentWeather: "বর্তমান আবহাওয়া",
    forecast: "৩ দিনের পূর্বাভাস",
    farmingAdvice: "কৃষি পরামর্শ",
    weatherAlerts: "আবহাওয়া সতর্কতা",
    noAlerts: "কোনো সক্রিয় আবহাওয়া সতর্কতা নেই",
    feelsLike: "অনুভূত হচ্ছে",
    humidity: "আর্দ্রতা",
    wind: "বাতাস",
    rainChance: "বৃষ্টির সম্ভাবনা",
    rainfall: "বৃষ্টিপাত",
    loading: "আবহাওয়ার তথ্য লোড হচ্ছে...",
    error: "আবহাওয়ার তথ্য লোড করা যায়নি।",
    retry: "আবার চেষ্টা করুন",
    today: "আজ",
    tomorrow: "আগামীকাল",
    max: "সর্বোচ্চ",
    min: "সর্বনিম্ন",
    uv: "UV",
    poweredBy: "তথ্য সরবরাহকারী",
    selectDistrict: "জেলা নির্বাচন করুন",
  },
} as const;

type Language = "en" | "bn";

type WeatherData = {
  current?: {
    humidity?: number;
    temp_c?: number;
    feelslike_c?: number;
    wind_kph?: number;
    uv?: number;
    condition?: {
      icon?: string;
      text?: string;
    };
  };

  location?: {
    name?: string;
    country?: string;
  };

  forecast?: {
    forecastday?: Array<{
      date: string;
      day?: {
        daily_chance_of_rain?: number;
        totalprecip_mm?: number;
        maxtemp_c?: number;
        mintemp_c?: number;
        condition?: {
          icon?: string;
          text?: string;
        };
      };
    }>;
  };

  alerts?: {
    alert?: Array<{
      headline?: string;
      event?: string;
      desc?: string;
    }>;
  };
};

const conditionTranslations: Record<string, string> = {
  Sunny: "রৌদ্রোজ্জ্বল",
  Clear: "পরিষ্কার আকাশ",
  Cloudy: "মেঘলা",
  "Partly cloudy": "আংশিক মেঘলা",
  Overcast: "ঘন মেঘলা",
  Mist: "কুয়াশাচ্ছন্ন",
  Fog: "কুয়াশা",
  Rain: "বৃষ্টি",
  "Light rain": "হালকা বৃষ্টি",
  "Moderate rain": "মাঝারি বৃষ্টি",
  "Heavy rain": "ভারী বৃষ্টি",
  "Light rain shower": "হালকা বৃষ্টির ঝরনা",
  "Moderate or heavy rain shower": "মাঝারি বা ভারী বৃষ্টি",
  Thunderstorm: "বজ্রঝড়",
};

function getConditionText(condition: string | undefined, lang: Language) {
  if (!condition) return "";

  if (lang === "bn") {
    return conditionTranslations[condition] || condition;
  }

  return condition;
}

function getDayName(dateString: string, lang: Language, index: number) {
  if (index === 0) {
    return lang === "bn" ? "আজ" : "Today";
  }

  if (index === 1) {
    return lang === "bn" ? "আগামীকাল" : "Tomorrow";
  }

  const date = new Date(`${dateString}T00:00:00`);

  return new Intl.DateTimeFormat(lang === "bn" ? "bn-BD" : "en-US", {
    weekday: "long",
  }).format(date);
}

export default function WeatherPage() {
  const { lang } = useLanguage();

  const currentLang: Language = lang === "bn" ? "bn" : "en";

  const t = translations[currentLang];

  const [selectedCity, setSelectedCity] = useState("23.8103,90.4125");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError("");

      if (!serverUrl) {
        throw new Error("Server URL configuration is missing.");
      }

      const response = await fetch(
        `${serverUrl}/api/weather?city=${encodeURIComponent(city)}&lang=${currentLang}`
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || t.error);
      }

      setWeather(result.data);
    } catch (err) {
      console.error("Weather fetch error:", err);

      setError(
        err instanceof Error ? err.message : t.error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchWeather(selectedCity);
  }, [currentLang, selectedCity]);

  const farmingAdvice = useMemo(() => {
    if (!weather?.current) {
      return [];
    }

    const current = weather.current;

    const advice: string[] = [];

    const rainChance =
      weather.forecast?.forecastday?.[0]?.day?.daily_chance_of_rain || 0;

    const humidity = current.humidity || 0;
    const temperature = current.temp_c || 0;
    const wind = current.wind_kph || 0;

    // Rain
    if (rainChance >= 60) {
      advice.push(
        currentLang === "bn"
          ? "আজ বৃষ্টির সম্ভাবনা বেশি। সেচ দেওয়ার আগে আবহাওয়ার পূর্বাভাস দেখে নিন।"
          : "High chance of rain today. Check the forecast before irrigation."
      );
    }

    // Humidity
    if (humidity >= 80) {
      advice.push(
        currentLang === "bn"
          ? "আর্দ্রতা বেশি। ছত্রাকজনিত রোগের ঝুঁকি বাড়তে পারে।"
          : "Humidity is high. Fungal disease risk may increase."
      );
    }

    // Temperature
    if (temperature >= 35) {
      advice.push(
        currentLang === "bn"
          ? "তাপমাত্রা বেশি। ফসলের জন্য পর্যাপ্ত পানি নিশ্চিত করুন।"
          : "Temperature is high. Ensure adequate water for crops."
      );
    }

    // Wind
    if (wind >= 30) {
      advice.push(
        currentLang === "bn"
          ? "বাতাসের গতি বেশি। দুর্বল গাছ ও চারা সুরক্ষিত রাখুন।"
          : "Strong winds are expected. Protect weak plants and seedlings."
      );
    }

    // Normal condition
    if (advice.length === 0) {
      advice.push(
        currentLang === "bn"
          ? "বর্তমান আবহাওয়া কৃষিকাজের জন্য মোটামুটি অনুকূল।"
          : "Current weather conditions are generally suitable for farming."
      );
    }

    return advice;
  }, [weather, currentLang]);

  if (loading && !weather) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F3]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-[#2F5943]" size={40} />

          <p className="text-[#1F3D2B]">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (error && !weather) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F3] px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center shadow-sm">
          <AlertTriangle size={45} className="mx-auto mb-4 text-red-500" />

          <h2 className="text-xl font-semibold text-[#1F3D2B] mb-2">
            {t.error}
          </h2>

          <p className="text-gray-500 mb-6">{error}</p>

          <button
            onClick={() => fetchWeather(selectedCity)}
            className="px-5 py-2.5 rounded-lg bg-[#2F5943] text-white hover:bg-[#1F3D2B] transition"
          >
            {t.retry}
          </button>
        </div>
      </div>
    );
  }

  const current = weather?.current;
  const location = weather?.location;

  const forecastDays = weather?.forecast?.forecastday?.slice(0, 3) || [];
  const alerts = weather?.alerts?.alert || [];

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Dropdown on Right */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Cloud className="text-[#2F5943]" />

              <h1 className="text-3xl md:text-4xl font-bold text-[#1F3D2B]">
                {t.weather}
              </h1>
            </div>

            <div className="flex items-center gap-2 text-[#6B7A6E]">
              <MapPin size={17} />

              <span>
                {location?.name}, {location?.country}
              </span>
            </div>
          </div>

          {/* District Select Dropdown */}
          <div className="w-full sm:w-64">
            <label
              htmlFor="district-select"
              className="block text-xs font-semibold text-[#2F5943] mb-1"
            >
              {t.selectDistrict}
            </label>
            <select
              id="district-select"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-white border border-[#E4DFD1] text-[#1F3D2B] rounded-xl px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2F5943] transition cursor-pointer"
            >
              {BANGLADESH_DISTRICTS.map((district) => (
                <option key={district.en} value={district.coords}>
                  {currentLang === "bn" ? district.bn : district.en}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Current Weather */}
        <section className="bg-[#EAF0E8] rounded-3xl p-6 md:p-8 mb-8 relative">
          {loading && (
            <div className="absolute inset-0 bg-[#EAF0E8]/70 backdrop-blur-[1px] rounded-3xl flex items-center justify-center z-10">
              <Loader2 className="animate-spin text-[#2F5943]" size={32} />
            </div>
          )}

          <h2 className="text-xl font-semibold text-[#1F3D2B] mb-6">
            {t.currentWeather}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Temperature */}
            <div className="flex items-center gap-5">
              {current?.condition?.icon && (
                <img
                  src={`https:${current.condition.icon}`}
                  alt={current.condition.text || "Weather"}
                  className="w-24 h-24"
                />
              )}

              <div>
                <div className="text-5xl font-bold text-[#16241C]">
                  {Math.round(current?.temp_c ?? 0)}°C
                </div>

                <p className="text-lg text-[#2F5943] mt-1">
                  {getConditionText(current?.condition?.text, currentLang)}
                </p>

                <p className="text-sm text-[#6B7A6E] mt-1">
                  {t.feelsLike}: {Math.round(current?.feelslike_c ?? 0)}°C
                </p>
              </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-4">
              {/* Humidity */}
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-2 text-[#6B7A6E] mb-2">
                  <Droplets size={18} />
                  {t.humidity}
                </div>

                <p className="text-2xl font-semibold text-[#1F3D2B]">
                  {current?.humidity ?? 0}%
                </p>
              </div>

              {/* Wind */}
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-2 text-[#6B7A6E] mb-2">
                  <Wind size={18} />
                  {t.wind}
                </div>

                <p className="text-2xl font-semibold text-[#1F3D2B]">
                  {Math.round(current?.wind_kph ?? 0)} km/h
                </p>
              </div>

              {/* Rain Chance */}
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-2 text-[#6B7A6E] mb-2">
                  <Umbrella size={18} />
                  {t.rainChance}
                </div>

                <p className="text-2xl font-semibold text-[#1F3D2B]">
                  {forecastDays?.[0]?.day?.daily_chance_of_rain ?? 0}%
                </p>
              </div>

              {/* UV */}
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-2 text-[#6B7A6E] mb-2">
                  <Thermometer size={18} />
                  {t.uv}
                </div>

                <p className="text-2xl font-semibold text-[#1F3D2B]">
                  {current?.uv ?? 0}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Day Forecast */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#1F3D2B] mb-5">
            {t.forecast}
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {forecastDays.map((day, index) => (
              <div
                key={day.date}
                className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4DFD1]"
              >
                {/* Date & Icon */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-semibold text-[#1F3D2B]">
                      {getDayName(day.date, currentLang, index)}
                    </h3>

                    <p className="text-sm text-[#6B7A6E]">{day.date}</p>
                  </div>

                  {day.day?.condition?.icon && (
                    <img
                      src={`https:${day.day.condition.icon}`}
                      alt={day.day?.condition?.text || "Weather"}
                      className="w-14 h-14"
                    />
                  )}
                </div>

                {/* Condition */}
                <p className="text-[#2F5943] mb-4">
                  {getConditionText(day.day?.condition?.text, currentLang)}
                </p>

                {/* Max / Min */}
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-xs text-[#6B7A6E]">{t.max}</p>

                    <p className="text-2xl font-bold text-[#1F3D2B]">
                      {Math.round(day.day?.maxtemp_c ?? 0)}°C
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#6B7A6E]">{t.min}</p>

                    <p className="text-2xl font-bold text-[#6B7A6E]">
                      {Math.round(day.day?.mintemp_c ?? 0)}°C
                    </p>
                  </div>
                </div>

                {/* Rain & Precipitation */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Umbrella size={15} />

                    <span>{day.day?.daily_chance_of_rain ?? 0}%</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Droplets size={15} />

                    <span>{day.day?.totalprecip_mm ?? 0} mm</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weather Alerts */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#1F3D2B] mb-5">
            {t.weatherAlerts}
          </h2>

          {alerts.length === 0 ? (
            <div className="bg-white border border-[#E4DFD1] rounded-2xl p-5">
              <div className="flex items-center gap-3 text-[#2F5943]">
                <AlertTriangle size={20} />

                <p>{t.noAlerts}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div
                  key={`${alert.headline}-${index}`}
                  className="bg-white border-l-4 border-red-500 rounded-xl p-5 shadow-sm"
                >
                  <div className="flex gap-3">
                    <AlertTriangle
                      className="text-red-500 shrink-0"
                      size={22}
                    />

                    <div>
                      <h3 className="font-semibold text-[#1F3D2B]">
                        {alert.headline}
                      </h3>

                      {alert.event && (
                        <p className="text-sm text-[#2F5943] mt-1">
                          {alert.event}
                        </p>
                      )}

                      {alert.desc && (
                        <p className="text-sm text-[#6B7A6E] mt-2">
                          {alert.desc}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Farming Advisory */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#1F3D2B] mb-5">
            {t.farmingAdvice}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {farmingAdvice.map((advice, index) => (
              <div
                key={index}
                className="bg-[#FAF8F3] bg-white rounded-2xl p-5 border border-[#E4DFD1]"
              >
                <div className="flex gap-3">
                  <div className="mt-1">
                    {index % 2 === 0 ? (
                      <Sun size={22} className="text-[#C6863A]" />
                    ) : (
                      <CloudRain size={22} className="text-[#2F5943]" />
                    )}
                  </div>

                  <p className="text-[#2F5943]">{advice}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}