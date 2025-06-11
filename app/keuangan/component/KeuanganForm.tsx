"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function KeuanganForm({ onAdd }: { onAdd: (data: any) => void }) {
  const [tanggal, setTanggal] = useState("");
  const [jenis, setJenis] = useState("masuk");
  const [deskripsi, setDeskripsi] = useState("");
  const [nominal, setNominal] = useState("");

  // Fungsi untuk menangani perubahan pada input nominal
  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Menghapus titik yang digunakan sebagai pemisah ribuan
    const cleanedValue = e.target.value.replace(/\./g, "");
    setNominal(cleanedValue);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Mengonversi nominal yang sudah dibersihkan menjadi angka
    const newData = {
      id: uuidv4(),
      tanggal,
      jenis,
      deskripsi,
      nominal: parseFloat(nominal), // Mengonversi ke float setelah menghapus titik
    };

    const { error } = await supabase.from("keuangan").insert([newData]);
    if (!error) {
      onAdd(newData); // langsung lempar ke tabel
      setTanggal("");
      setJenis("masuk");
      setDeskripsi("");
      setNominal("");
    } else {
      alert("Gagal simpan data");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-5 bg-white text-gray-900 p-4 rounded shadow">
      <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required className="border p-2 rounded" />
      <select value={jenis} onChange={(e) => setJenis(e.target.value)} className="border p-2 rounded">
        <option value="masuk">Uang Masuk</option>
        <option value="keluar">Uang Keluar</option>
      </select>
      <input type="text" placeholder="Deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className="border p-2 rounded" />
      <input
        type="text" // Menggunakan type="text" agar bisa menangani titik
        placeholder="Nominal"
        value={nominal}
        onChange={handleNominalChange}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Simpan
      </button>
    </form>
  );
}
