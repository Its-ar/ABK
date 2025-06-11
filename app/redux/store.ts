import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./slice/invoiceSlice";
import authReducer from "./slice/authslice";

export const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
