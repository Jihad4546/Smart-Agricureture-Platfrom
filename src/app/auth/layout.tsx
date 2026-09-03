import type { Metadata } from "next";
import { Noto_Sans_Bengali, Inter } from "next/font/google";
import "../globals.css";
import { LanguageProvider } from "../../contexts/LanguageContext";

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
  title: "AgriTech - Authentication",
  description: "Login or Register to AgriTech",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`${notoSansBengali.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF8F3]">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
