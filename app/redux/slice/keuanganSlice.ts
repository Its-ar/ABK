// app/redux/keuanganSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const keuanganSlice = createSlice({
  name: "keuangan",
  initialState,
  reducers: {
    setKeuangan: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setKeuangan } = keuanganSlice.actions;
export default keuanganSlice.reducer;
