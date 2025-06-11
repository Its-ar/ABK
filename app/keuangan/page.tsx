// app/keuangan/page.tsx
"use client";
import KeuanganForm from "./component/KeuanganForm";
import KeuanganTable from "./component/KeuanganTable";
import KeuanganSummary from "./component/KeuanganSummary";
import KeuanganDashboard from "./component/keuanganDashboard";

export default function KeuanganPage() {
  return (
    <div className="p-6 space-y-6 bg-white text-gray-900">
      <h1 className="text-2xl font-bold">Manajemen Keuangan</h1>
      <KeuanganDashboard />
    </div>
  );
}
