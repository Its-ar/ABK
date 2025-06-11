import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk untuk register user
export const registerUser = createAsyncThunk("auth/registerUser", async (userData: { name: string; email: string; password: string; role: string }, thunkAPI) => {
  try {
    const response = await axios.post("/api/register", userData);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.response?.data || error.message || "An error occurred";
    return thunkAPI.rejectWithValue(message);
  }
});

// Thunk untuk login user
export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }: { email: string; password: string }, thunkAPI) => {
  try {
    const res = await axios.post("/api/login", { email, password });
    return res.data; // <--- pastikan ini berisi { id, email, role, token }
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data.message || "Login failed");
  }
});

// State slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
