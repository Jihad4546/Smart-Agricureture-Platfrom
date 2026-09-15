import type { Metadata } from "next";
import "../globals.css";
import AgriTechNavbar from "../../components/navbar/Navbar";
import BottomNav from "../../components/navbar/BottomNav";
import { LanguageProvider } from "../../contexts/LanguageContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "AgriTech | Smart Agriculture Platform",
  description:
    "AI-powered smart agriculture platform for modern farmers.",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <AgriTechNavbar />
      <main className="pb-16 lg:pb-0">{children}</main>
      <Toaster position="top-center" />
      <BottomNav />
    </LanguageProvider>
      
  );
}