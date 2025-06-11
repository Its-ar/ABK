// app/keuangan/components/KeuanganTable.tsx
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import KeuanganForm from "./KeuanganForm";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function KeuanganTable() {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const { data } = await supabase.from("keuangan").select("*").order("tanggal", { ascending: false });
    setData(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = (newData: any) => {
    // prepend biar data baru di atas
    setData((prev) => [newData, ...prev]);
  };

  return (
    <div className="p-4">
      <KeuanganForm onAdd={handleAdd} />

      <table className="w-full border mt-6 bg-white text-gray-900 text-sm rounded overflow-hidden shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Tanggal</th>
            <th className="p-2 border">Jenis</th>
            <th className="p-2 border">Deskripsi</th>
            <th className="p-2 border">Nominal</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="p-2 border">{item.tanggal}</td>
              <td className="p-2 border">{item.jenis}</td>
              <td className="p-2 border">{item.deskripsi}</td>
              <td className="p-2 border">{Number(item.nominal).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
