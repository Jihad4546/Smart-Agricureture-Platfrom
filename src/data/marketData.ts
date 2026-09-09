import { CropPrice, CropTrendData, MarketComparisonRow, MarketSummaryData } from "../types/market";

export const DEMO_CROP_PRICES: CropPrice[] = [
  {
    id: 1,
    nameBn: "ধান",
    nameEn: "Rice",
    category: "শস্য",
    market: "গাজীপুর",
    price: 52,
    previousPrice: 49,
    unit: "কেজি",
  },
  {
    id: 2,
    nameBn: "আলু",
    nameEn: "Potato",
    category: "সবজি",
    market: "ঢাকা",
    price: 32,
    previousPrice: 35,
    unit: "কেজি",
  },
  {
    id: 3,
    nameBn: "টমেটো",
    nameEn: "Tomato",
    category: "সবজি",
    market: "গাজীপুর",
    price: 45,
    previousPrice: 40,
    unit: "কেজি",
  },
  {
    id: 4,
    nameBn: "পেঁয়াজ",
    nameEn: "Onion",
    category: "সবজি",
    market: "ঢাকা",
    price: 68,
    previousPrice: 68,
    unit: "কেজি",
  },
  {
    id: 5,
    nameBn: "গম",
    nameEn: "Wheat",
    category: "শস্য",
    market: "রাজশাহী",
    price: 48,
    previousPrice: 46,
    unit: "কেজি",
  },
  {
    id: 6,
    nameBn: "বেগুন",
    nameEn: "Eggplant",
    category: "সবজি",
    market: "রংপুর",
    price: 38,
    previousPrice: 41,
    unit: "কেজি",
  },
];

export const DEMO_SUMMARY_DATA: MarketSummaryData = {
  todayCropBn: "ধান",
  todayPrice: 52,
  todayUnit: "কেজি",
  topIncreaseCropBn: "টমেটো",
  topIncreaseCropEn: "Tomato",
  topDecreaseCropBn: "আলু",
  topDecreaseCropEn: "Potato",
  trackedCount: 12,
};

export const DEMO_PRICE_TRENDS: Record<number, CropTrendData> = {
  1: {
    cropId: 1,
    cropBn: "ধান",
    cropEn: "Rice",
    timeframes: {
      "7 দিন": [
        { label: "দিন ১", price: 48 },
        { label: "দিন ২", price: 49 },
        { label: "দিন ৩", price: 49 },
        { label: "দিন ৪", price: 50 },
        { label: "দিন ৫", price: 51 },
        { label: "দিন ৬", price: 51 },
        { label: "আজ", price: 52 },
      ],
      "৩০ দিন": [
        { label: "সপ্তাহ ১", price: 45 },
        { label: "সপ্তাহ ২", price: 47 },
        { label: "সপ্তাহ ৩", price: 49 },
        { label: "আজ", price: 52 },
      ],
      "৩ মাস": [
        { label: "জুন", price: 42 },
        { label: "জুলাই", price: 46 },
        { label: "আগস্ট", price: 52 },
      ],
    },
  },
  2: {
    cropId: 2,
    cropBn: "আলু",
    cropEn: "Potato",
    timeframes: {
      "7 দিন": [
        { label: "দিন ১", price: 38 },
        { label: "দিন ২", price: 37 },
        { label: "দিন ৩", price: 36 },
        { label: "দিন ৪", price: 35 },
        { label: "দিন ৫", price: 34 },
        { label: "দিন ৬", price: 33 },
        { label: "আজ", price: 32 },
      ],
      "৩০ দিন": [
        { label: "সপ্তাহ ১", price: 40 },
        { label: "সপ্তাহ ২", price: 38 },
        { label: "সপ্তাহ ৩", price: 35 },
        { label: "আজ", price: 32 },
      ],
      "৩ মাস": [
        { label: "জুন", price: 44 },
        { label: "জুলাই", price: 39 },
        { label: "আগস্ট", price: 32 },
      ],
    },
  },
  3: {
    cropId: 3,
    cropBn: "টমেটো",
    cropEn: "Tomato",
    timeframes: {
      "7 দিন": [
        { label: "দিন ১", price: 38 },
        { label: "দিন ২", price: 40 },
        { label: "দিন ৩", price: 41 },
        { label: "দিন ৪", price: 42 },
        { label: "দিন ৫", price: 43 },
        { label: "দিন ৬", price: 44 },
        { label: "আজ", price: 45 },
      ],
      "৩০ দিন": [
        { label: "সপ্তাহ ১", price: 32 },
        { label: "সপ্তাহ ২", price: 36 },
        { label: "সপ্তাহ ৩", price: 40 },
        { label: "আজ", price: 45 },
      ],
      "৩ মাস": [
        { label: "জুন", price: 30 },
        { label: "জুলাই", price: 37 },
        { label: "আগস্ট", price: 45 },
      ],
    },
  },
};

export const DEMO_MARKET_COMPARISON: MarketComparisonRow[] = [
  {
    market: "গাজীপুর",
    rice: 52,
    potato: 30,
    tomato: 45,
  },
  {
    market: "ঢাকা",
    rice: 55,
    potato: 32,
    tomato: 48,
  },
  {
    market: "রাজশাহী",
    rice: 54,
    potato: 28,
    tomato: 42,
  },
];
