"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function InvoiceListPage() {
  const invoices = useSelector((state: RootState) => state.invoice.invoices);

  return (
    <div className="p-6 text-gray-800 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Daftar Invoice</h1>
        <Link href="/invoice/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">
          + Buat Invoice
        </Link>
      </div>

      <div className="space-y-4">
        {invoices.map((inv) => (
          <div key={inv.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
            <div className="font-semibold text-lg">{inv.nomor_invoice}</div>
            <div className="text-sm text-gray-600">Penerima: {inv.nama_penerima}</div>
            <div className="text-sm text-gray-600">Tanggal: {inv.tanggal}</div>
            <div className="text-sm mt-1">
              Status: <span className={`font-semibold ${inv.status === "Paid" ? "text-green-600" : "text-red-600"}`}>{inv.status}</span>
            </div>

            <Link href={`/invoice/${inv.id}`} className="text-blue-600 underline text-sm mt-2 inline-block">
              Lihat Detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
