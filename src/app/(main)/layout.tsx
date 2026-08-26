import type { Metadata } from "next";
import "./globals.css";
import AgriTechNavbar from "../../components/navbar/Navbar";

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
    <html lang="en">
      <body>
        <AgriTechNavbar />

        <main>{children}</main>
      </body>
    </html>
  );
}