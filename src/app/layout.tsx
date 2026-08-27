import type { Metadata } from "next";
import { Noto_Sans_Bengali, Inter } from "next/font/google";
import "./globals.css";
import AgriTechNavbar from "../Component/Navber";

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AgriTech - Smart Agriculture Platform",
  description: "Smart Agriculture Platform for Bangladeshi Farmers - Market Prices, Crop Management, & Farm Intelligence",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`${notoSansBengali.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#16241C]">
        <AgriTechNavbar />
        <main className="flex-1 w-full">{children}</main>
      </body>
    </html>
  );
}
