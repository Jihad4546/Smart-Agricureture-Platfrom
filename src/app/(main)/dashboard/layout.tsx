import SideBar from "@/components/SideBar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>      
      <main className="flex p-6 overflow-y-auto">
       <LanguageProvider>
        <SideBar />
          {children}
        </LanguageProvider>
      </main>
    </div>
  );
}