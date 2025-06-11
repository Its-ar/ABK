"use client";

import DashboardLayout from "../component/dashboardlayout";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import AuthCookieSetter from "../component/authCookieSetter";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function DashboardPage() {
  const [masuk, setMasuk] = useState(0);
  const [keluar, setKeluar] = useState(0);
  const [keuanganTerbaru, setKeuanganTerbaru] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth()); // Default: Bulan ini
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear()); // Default: Tahun ini

  // Fungsi untuk memformat bulan dan tahun menjadi format tanggal (mulai dan akhir bulan)
  const getMonthRange = (month: number, year: number) => {
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    return { startOfMonth, endOfMonth };
  };

  useEffect(() => {
    const fetchData = async () => {
      const { startOfMonth, endOfMonth } = getMonthRange(selectedMonth, selectedYear);

      const { data } = await supabase.from("keuangan").select("*").gte("tanggal", startOfMonth.toISOString()).lte("tanggal", endOfMonth.toISOString()).order("tanggal", { ascending: false });

      const totalMasuk = data?.filter((d) => d.jenis === "masuk").reduce((a, b) => a + Number(b.nominal), 0) || 0;
      const totalKeluar = data?.filter((d) => d.jenis === "keluar").reduce((a, b) => a + Number(b.nominal), 0) || 0;

      setMasuk(totalMasuk);
      setKeluar(totalKeluar);
      setKeuanganTerbaru(data || []);
    };

    fetchData();
  }, [selectedMonth, selectedYear]); // Trigger fetch ketika bulan atau tahun berubah

  const keuntungan = masuk - keluar;

  return (
    <DashboardLayout>
      <AuthCookieSetter/>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Selamat datang di Dashboard!</h1>
        <p className="text-gray-500">Pantau ringkasan keuangan dan invoice Anda di sini.</p>
      </div>

      {/* Filter Bulan dan Tahun */}
      <div className="mb-6 flex gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900">Pilih Bulan</label>
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))} className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900">
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index} value={index}>
                {new Date(0, index).toLocaleString("id-ID", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pilih Tahun</label>
          <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900">
            {/* Misalnya hanya menampilkan 5 tahun terakhir */}
            {Array.from({ length: 5 }, (_, index) => (
              <option key={index} value={new Date().getFullYear() - index}>
                {new Date().getFullYear() - index}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ringkasan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-2xl p-4">
          <p className="text-gray-500">Total Invoice</p>
          <h2 className="text-2xl font-bold text-blue-600">56</h2>
        </div>
        <div className="bg-white shadow rounded-2xl p-4">
          <p className="text-gray-500">Pendapatan Bulan Ini</p>
          <h2 className="text-xl font-bold text-blue-600">Rp {keuntungan.toLocaleString()}</h2>
        </div>
        <div className="bg-white shadow rounded-2xl p-4">
          <p className="text-gray-500">Invoice Belum Lunas</p>
          <h2 className="text-2xl font-bold text-red-600">12</h2>
        </div>
      </div>

      {/* Ringkasan Tambahan */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-2xl p-4">
          <p className="text-gray-500">Total Uang Masuk</p>
          <h2 className="text-xl font-bold text-green-600">Rp {masuk.toLocaleString()}</h2>
        </div>
        <div className="bg-white shadow rounded-2xl p-4">
          <p className="text-gray-500">Total Uang Keluar</p>
          <h2 className="text-xl font-bold text-red-600">Rp {keluar.toLocaleString()}</h2>
        </div>
        <div className="bg-white shadow rounded-2xl p-4">
          <p className="text-gray-500">Keuntungan</p>
          <h2 className="text-xl font-bold text-blue-600">Rp {keuntungan.toLocaleString()}</h2>
        </div>
      </div>

      {/* Tabel Keuangan Terbaru */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Keuangan Terbaru</h3>
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-2">Tanggal</th>
              <th className="px-4 py-2">Jenis</th>
              <th className="px-4 py-2">Keterangan</th>
              <th className="px-4 py-2">Nominal</th>
            </tr>
          </thead>
          <tbody>
            {keuanganTerbaru.map((item, idx) => (
              <tr key={idx} className="border-b">
                <td className="px-4 py-2">{new Date(item.tanggal).toLocaleDateString("id-ID")}</td>
                <td className={`px-4 py-2 font-medium ${item.jenis === "masuk" ? "text-green-600" : "text-red-500"}`}>{item.jenis}</td>
                <td className="px-4 py-2">{item.deskripsi}</td>
                <td className="px-4 py-2">Rp {Number(item.nominal).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
