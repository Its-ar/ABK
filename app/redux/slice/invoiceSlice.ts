import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BiayaItem {
  id: string;
  nama: string;
  nominal: number;
}

interface InvoiceData {
  id: string;
  nama_pengirim: string;
  nama_penerima: string;
  alamat_penerima: string;
  jenis_pekerjaan: string;
  biaya_items: BiayaItem[];
  created_at: string;
}

interface InvoiceState {
  invoices: InvoiceData[];
}

const initialState: InvoiceState = {
  invoices: [],
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<InvoiceData>) => {
      state.invoices.push(action.payload);
    },
  },
});

export const { addInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
