"use client";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const pageTitles: { [key: string]: string } = {
  "/dashboard": "Dashboard",
  "/invoice": "Invoice",
  "/keuangan": "Keuangan",
  "/user": "Manajemen User",
};

export default function Header({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Dashboard";

  return (
    <header className="w-full bg-gray-900 shadow-md px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 ">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-3">
          <button onClick={onToggleSidebar} className="lg:hidden">
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 text-white">{title}</h1>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:justify-end">
        <div className="text-sm text-right">
          <p className="font-medium text-white">Halo, Arman</p>
          <p className="text-blue-500">Super Admin</p>
        </div>
        <img src="https://ui-avatars.com/api/?name=Arman+G" className="w-10 h-10 rounded-full" alt="Avatar" />
      </div>
    </header>
  );
}
