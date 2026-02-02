import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = "http://localhost:5050";

export const adminLogin = createAsyncThunk(
  "admin/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseURL}/airline/admin/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Login Failed",
      );
    }
  },
);

export const loadUser = createAsyncThunk("admin/loadUser", async () => {
  const token = localStorage.getItem("token");
  const admin = localStorage.getItem("admin");

  if (!token || !admin) return null;

  return {
    token,
    admin: JSON.parse(admin),
  };
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    error: null,
    admin: null,
    message: null,
    token: null,
    isAuth: false,
  },
  reducers: {
    adminLogout(state) {
      ((state.admin = null),
        (state.error = null),
        (state.isAuth = false),
        (state.token = null));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        ((state.loading = true), (state.error = null), (state.isAuth = false));
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        ((state.loading = false), (state.admin = action.payload.admin));
        state.token = action.payload.token;
        state.message = action.payload.message;
        state.error = null;
        state.isAuth = true;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("admin", JSON.stringify(action.payload.admin));
      })
      .addCase(adminLogin.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload.error));
        state.message = action.payload;
        state.admin = null;
      });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.token = action.payload.token;
        state.admin = action.payload.admin;
        state.isAuth = true;
      }
    });
  },
});

export const { adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
