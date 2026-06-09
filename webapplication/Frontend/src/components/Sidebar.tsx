"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Refer Patient", path: "/dashboard/refer", icon: "📝" },
  ];

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-secondary border-b md:border-r md:border-b-0 border-gray-200 dark:border-gray-700 h-auto md:h-[calc(100vh-2rem)] md:rounded-lg shadow-sm flex flex-col md:m-4 sticky top-0 md:top-4 z-20">
      <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center md:block">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏥</span>
          <h2 className="text-xl font-bold text-foreground">Saptgiri PR</h2>
        </div>
        <button 
          onClick={handleLogout}
          className="md:hidden flex items-center p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
          title="Logout"
        >
          <span className="text-xl">🚪</span>
        </button>
      </div>
      
      <div className="flex-1 px-4 py-2 md:py-6 flex flex-row md:flex-col gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors font-medium ${
                isActive 
                  ? "bg-blue-50 text-primary dark:bg-blue-900/30 dark:text-blue-400" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="hidden md:block p-4 border-t border-gray-200 dark:border-gray-700">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors font-medium"
        >
          <span>🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
