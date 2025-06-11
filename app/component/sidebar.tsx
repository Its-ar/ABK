"use client";
import { Home, FileText, BarChart2, Users, LogOut, X } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { name: "Dashboard", icon: <Home size={20} />, href: "/dashboard" },
  { name: "Invoice", icon: <FileText size={20} />, href: "/invoice" },
  { name: "Keuangan", icon: <BarChart2 size={20} />, href: "/keuangan" },
  { name: "User", icon: <Users size={20} />, href: "/user" },
];

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      {/* Backdrop (mobile only) */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? "block" : "hidden"} lg:hidden`} onClick={onClose} />

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:block`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Brand & Close Button */}
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold">Anta Berkah Kargo</span>
            <button className="lg:hidden" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href} className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors">
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <button className="flex items-center gap-3 p-2 mt-4 rounded hover:bg-red-600 transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
