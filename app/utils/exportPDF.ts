// app/utils/exportPDF.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (data: any[]) => {
  const doc = new jsPDF();
  doc.text("Laporan Keuangan", 14, 10);
  autoTable(doc, {
    startY: 20,
    head: [["Tanggal", "Jenis", "Deskripsi", "Nominal"]],
    body: data.map((d) => [d.tanggal, d.jenis, d.deskripsi, Number(d.nominal).toLocaleString()]),
  });
  doc.save("laporan-keuangan.pdf");
};
