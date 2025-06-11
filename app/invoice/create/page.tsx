"use client";

import { useRef, useState } from "react";
import { Input } from "../../component/ui/input";
import { Textarea } from "../../component/ui/textarea";
import { Button } from "../../component/ui/button";
import { useDispatch } from "react-redux";
import { addInvoice } from "../../redux/slice/invoiceSlice";

interface BiayaItem {
  id: string;
  nama: string;
  nominal: number;
}

interface InvoiceData {
  nama_pengirim: string;
  nama_penerima: string;
  alamat_penerima: string;
  jenis_pekerjaan: string;
  biaya_items: BiayaItem[];
}

export default function InvoiceForm() {
  const dispatch = useDispatch();
  const printRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<InvoiceData>({
    nama_pengirim: "",
    nama_penerima: "",
    alamat_penerima: "",
    jenis_pekerjaan: "",
    biaya_items: [{ id: crypto.randomUUID(), nama: "", nominal: 0 }],
  });

  const handleChange = (field: keyof InvoiceData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBiayaChange = (index: number, field: "nama" | "nominal", value: any) => {
    const newItems = [...data.biaya_items];
    newItems[index][field] = field === "nominal" ? parseInt(value) : value;
    setData((prev) => ({ ...prev, biaya_items: newItems }));
  };

  const handleAddBiaya = () => {
    setData((prev) => ({
      ...prev,
      biaya_items: [...prev.biaya_items, { id: crypto.randomUUID(), nama: "", nominal: 0 }],
    }));
  };

  const handleSubmit = () => {
    const invoiceToSave = {
      ...data,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    };
    dispatch(addInvoice(invoiceToSave));
    console.log("Invoice saved to Redux:", invoiceToSave);
  };

  const handlePrint = () => {
    const style = document.createElement("style");
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        #print-area, #print-area * {
          visibility: visible;
        }
        #print-area {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          padding: 2rem;
        }
      }
    `;
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style); // bersihkan setelah cetak
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">🧾 Form Invoice</h1>
        <div className="space-y-4">
          <Input placeholder="Nama Pengirim" value={data.nama_pengirim} onChange={(e) => handleChange("nama_pengirim", e.target.value)} />
          <Input placeholder="Nama Penerima" value={data.nama_penerima} onChange={(e) => handleChange("nama_penerima", e.target.value)} />
          <Input placeholder="Alamat Penerima" value={data.alamat_penerima} onChange={(e) => handleChange("alamat_penerima", e.target.value)} />
          <Textarea placeholder="Jenis Pekerjaan" value={data.jenis_pekerjaan} onChange={(e) => handleChange("jenis_pekerjaan", e.target.value)} />
        </div>

        <div className="mt-6">
          <p className="font-semibold mb-2">💸 Biaya Pengiriman:</p>
          <div className="space-y-2">
            {data.biaya_items.map((item, idx) => (
              <div key={item.id} className="flex space-x-2">
                <Input placeholder="Nama Biaya" value={item.nama} onChange={(e) => handleBiayaChange(idx, "nama", e.target.value)} />
                <Input placeholder="Nominal" type="number" value={item.nominal} onChange={(e) => handleBiayaChange(idx, "nominal", e.target.value)} />
              </div>
            ))}
          </div>
          <Button className="mt-3" type="button" onClick={handleAddBiaya}>
            + Tambah Biaya
          </Button>
        </div>

        <div className="mt-6 flex space-x-3">
          <Button type="button" onClick={handleSubmit}>
            💾 Simpan Invoice
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            🖨️ Cetak PDF
          </Button>
        </div>
      </div>

      {/* Preview Invoice */}
      <div id="print-area" ref={printRef} className="bg-white mt-10 p-6 max-w-2xl mx-auto rounded-lg shadow print:shadow-none">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">🧾 Preview Invoice</h2>
        <p className="mb-1">
          <span className="font-medium">Dari:</span> {data.nama_pengirim}
        </p>
        <p className="mb-1">
          <span className="font-medium">Kepada:</span> {data.nama_penerima}
        </p>
        <p className="mb-1">
          <span className="font-medium">Alamat:</span> {data.alamat_penerima}
        </p>
        <p className="mb-4">
          <span className="font-medium">Pekerjaan:</span> {data.jenis_pekerjaan}
        </p>
        <div>
          <p className="font-semibold underline mb-2">Detail Biaya:</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-1">Nama Biaya</th>
                <th className="py-1">Nominal</th>
              </tr>
            </thead>
            <tbody>
              {data.biaya_items.map((item) => (
                <tr key={item.id}>
                  <td className="py-1">{item.nama}</td>
                  <td className="py-1">Rp{item.nominal.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="font-bold border-t">
                <td>Total</td>
                <td>
                  Rp
                  {data.biaya_items.reduce((total, item) => total + item.nominal, 0).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
