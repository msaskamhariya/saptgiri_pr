"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/";
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-[#0b1120]">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
