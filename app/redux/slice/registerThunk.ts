import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../lib/supabese";
import API from "@/lib/api";

export const registerUser = createAsyncThunk("auth/registerUser", async ({ name, email, password, role }: { name: string; email: string; password: string; role: string }, { rejectWithValue }) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError || !authData.user) {
    return rejectWithValue(authError?.message || "Gagal membuat user auth");
  }

  try {
    await API.post("/users", {
      id: authData.user.id,
      name,
      email,
      password,
      role,
      created_at: new Date().toISOString(),
    });
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Gagal menyimpan data user ke database");
  }

  return authData.user;
});
