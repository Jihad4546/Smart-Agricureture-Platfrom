import type { Metadata } from "next";
<<<<<<< HEAD:src/app/auth/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "../(main)/globals.css";
import { LanguageProvider } from "../../contexts/LanguageContext";
=======
import { Noto_Sans_Bengali, Inter } from "next/font/google";
import "./globals.css";
import AgriTechNavbar from "../Component/Navber";
>>>>>>> origin/Dev:src/app/layout.tsx

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
<<<<<<< HEAD:src/app/auth/layout.tsx
  title: "AgriTech - Authentication",
  description: "Login or Register to AgriTech",
};

export default function AuthLayout({
=======
  title: "AgriTech - Smart Agriculture Platform",
  description: "Smart Agriculture Platform for Bangladeshi Farmers - Market Prices, Crop Management, & Farm Intelligence",
};

export default function RootLayout({
>>>>>>> origin/Dev:src/app/layout.tsx
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`${notoSansBengali.variable} ${inter.variable} h-full antialiased`}
    >
<<<<<<< HEAD:src/app/auth/layout.tsx
      <body className="min-h-full flex flex-col bg-[#FAF8F3]">
        <LanguageProvider>{children}</LanguageProvider>
=======
      <body className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#16241C]">
        <AgriTechNavbar />
        <main className="flex-1 w-full">{children}</main>
>>>>>>> origin/Dev:src/app/layout.tsx
      </body>
    </html>
  );
}
