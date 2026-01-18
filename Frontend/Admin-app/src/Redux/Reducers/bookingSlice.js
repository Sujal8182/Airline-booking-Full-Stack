import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5050/airline/admin/bookings";

export const fetchBookings = createAsyncThunk(
  "booking/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(API, { withCredentials: true });
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const cancelBooking = createAsyncThunk(
  "booking/cancel",
  async (id, thunkAPI) => {
    const res = await axios.patch(
      `${API}/${id}/cancel`,
      {},
      { withCredentials: true }
    );
    return res.data;
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: b => {
    b.addCase(fetchBookings.pending, s => {
      s.loading = true;
    });
    b.addCase(fetchBookings.fulfilled, (s, a) => {
      s.loading = false;
      s.list = a.payload;
    });
    b.addCase(cancelBooking.fulfilled, (s, a) => {
      const i = s.list.findIndex(b => b._id === a.payload._id);
      if (i !== -1) s.list[i] = a.payload;
    });
  }
});

export default bookingSlice.reducer;
