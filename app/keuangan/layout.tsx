// app/(dashboard)/layout.tsx
import Sidebar from "../component/sidebar";
import Header from "../component/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-white text-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
