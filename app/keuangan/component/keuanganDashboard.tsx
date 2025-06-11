"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import KeuanganForm from "./KeuanganForm";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function KeuanganDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [masuk, setMasuk] = useState(0);
  const [keluar, setKeluar] = useState(0);

  const fetchData = async () => {
    const { data } = await supabase.from("keuangan").select("*").order("tanggal", { ascending: false });
    setData(data || []);

    // Menghitung total masuk dan keluar
    const totalMasuk = data?.filter((d) => d.jenis === "masuk").reduce((a, b) => a + Number(b.nominal), 0) || 0;
    const totalKeluar = data?.filter((d) => d.jenis === "keluar").reduce((a, b) => a + Number(b.nominal), 0) || 0;
    setMasuk(totalMasuk);
    setKeluar(totalKeluar);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = (newData: any) => {
    // prepend biar data baru di atas
    setData((prev) => [newData, ...prev]);

    // Update total masuk dan keluar setelah menambah data baru
    if (newData.jenis === "masuk") {
      setMasuk((prev) => prev + Number(newData.nominal));
    } else {
      setKeluar((prev) => prev + Number(newData.nominal));
    }
  };

  return (
    <div className="p-4">
      {/* Form untuk menambah data */}
      <KeuanganForm onAdd={handleAdd} />

      {/* Summary Keuangan */}
      <div className="grid grid-cols-3 gap-4 mt-6 bg-white text-gray-900">
        <div>Total Masuk: {masuk.toLocaleString()}</div>
        <div>Total Keluar: {keluar.toLocaleString()}</div>
        <div>Keuntungan: {(masuk - keluar).toLocaleString()}</div>
      </div>

      {/* Tabel data keuangan */}
      <table className="w-full border mt-6 bg-white text-gray-900 text-sm rounded overflow-hidden shadow">
        <thead className="bg-blue-300 border-2">
          <tr>
            <th className="p-2 border">Tanggal</th>
            <th className="p-2 border">Masuk</th>
            <th className="p-2 border">Keluar</th>
            <th className="p-2 border">Deskripsi</th>
          </tr>
        </thead>
        <tbody className="border-2 bg-blue-100">
          {data.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="p-2 border">
                {new Date(item.tanggal).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </td>
              <td className="p-2 border text-right">{item.jenis === "masuk" ? `Rp ${Number(item.nominal).toLocaleString()}` : "-"}</td>
              <td className="p-2 border text-right">{item.jenis === "keluar" ? `Rp ${Number(item.nominal).toLocaleString()}` : "-"}</td>
              <td className="p-2 border">{item.deskripsi}</td>
            </tr>
          ))}
        </tbody>

        {/* Tambahkan total di bawah tabel */}
        <tfoot className="bg-blue-100 font-semibold border-2">
          <tr>
            <td className="p-2 border text-center" colSpan={3}>
              Total Masuk
            </td>
            <td className="p-2 border text-right text-green-600">Rp {masuk.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="p-2 border text-center" colSpan={3}>
              Total Keluar
            </td>
            <td className="p-2 border text-right text-red-500">Rp {keluar.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="p-2 border text-center" colSpan={3}>
              Total Keseluruhan
            </td>
            <td className="p-2 border text-right text-blue-600">Rp {(masuk - keluar).toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
