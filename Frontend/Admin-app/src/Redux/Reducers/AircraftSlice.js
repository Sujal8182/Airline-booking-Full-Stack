import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API = "http://localhost:5050/airline/admin/aircraft";

export const fetchAircrafts = createAsyncThunk(
  "aircraft/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(API, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const createAircraft = createAsyncThunk(
  "aircraft/create",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/add`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const toggleAircraft = createAsyncThunk(
  "aircraft/toggle",
  async (id, thunkAPI) => {
    const res = await axios.patch(
      `${API}/${id}`,
      {},
      { withCredentials: true },
    );
    return res.data;
  },
);

const aircraftSlice = createSlice({
  name: "aircraft",
  initialState: {
    list: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAircrafts.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(fetchAircrafts.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.list = action.payload),
          (state.error = null));
        state.message = action.payload;
      })
      .addCase(fetchAircrafts.rejected, (state, action) => {
        ((state.loading = false),
          (state.list = null),
          (state.error = action.payload.error));
      })
      .addCase(createAircraft.pending, (state) => {
        ((state.loading = false), (state.error = null));
      })
      .addCase(createAircraft.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.error = null),
          state.list.unshift(action.payload));
        state.message = action.payload;
      })
      .addCase(createAircraft.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(toggleAircraft.fulfilled, (state, action) => {
      const i = state.list.findIndex((x) => x._id === action.payload._id);
      if (i !== -1) state.list[i] = action.payload;
    });
  },
});

export default aircraftSlice.reducer
