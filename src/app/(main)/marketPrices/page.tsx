"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

type MarketPrice = {
  id: string | number;
  commodity: string;
  min_price: number;
  max_price: number;
};

export default function MarketPrices() {
  const [prices, setPrices] = useState<MarketPrice[]>([]);

  useEffect(() => {
    socket.on("market_prices", (data) => {
      console.log("Market Prices:", data);

      setPrices(data);
    });

    return () => {
      socket.off("market_prices");
    };
  }, []);
   const {lang} = useLanguage();
  return (
    <div>
<h2 className="max-w-xl mx-auto mb-4 mt-2 text-[#2F5943] text-3xl font-bold">
  {lang === 'bn' ? 'আজকের বাজারদর' : "Today's Market Prices"}</h2>

      {prices.map((item) => (
        <div className="max-w-xl mx-auto" key={item.id}>

          <p className="mb-2 text-[#2F5943]">
        {item.commodity}: {item.min_price} - {item.max_price} টাকা
          </p>
        </div>
      ))}
    </div>
  );
}