// app/keuangan/components/KeuanganSummary.tsx
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function KeuanganSummary() {
  const [masuk, setMasuk] = useState(0);
  const [keluar, setKeluar] = useState(0);

  const fetchData = async () => {
    const { data } = await supabase.from("keuangan").select("*");
    const totalMasuk = data?.filter((d) => d.jenis === "masuk").reduce((a, b) => a + Number(b.nominal), 0) || 0;
    const totalKeluar = data?.filter((d) => d.jenis === "keluar").reduce((a, b) => a + Number(b.nominal), 0) || 0;
    setMasuk(totalMasuk);
    setKeluar(totalKeluar);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 mt-6 bg-white text-gray-900">
      <div>Total Masuk: {masuk.toLocaleString()}</div>
      <div>Total Keluar: {keluar.toLocaleString()}</div>
      <div>Keuntungan: {(masuk - keluar).toLocaleString()}</div>
    </div>
  );
}
