import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5050/airline/admin";

export const fetchFlights = createAsyncThunk(
  "flight/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/getflights`, {
        withCredentials: true,
      });
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  },
);

export const createFlight = createAsyncThunk(
  "flight/create",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/addflight`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  },
);

export const toggleFlight = createAsyncThunk(
  "flight/toggle",
  async (id) => {
    const res = await axios.patch(`${API}/${id}`, {}, { withCredentials: true });
    return res.data;
  }
);

const flightSlice = createSlice({
  name: "flight",
  initialState: {
    list: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchFlights.pending, (s) => {
      s.loading = true;
      ((s.error = null), (s.message = null));
    });
    b.addCase(fetchFlights.fulfilled, (s, a) => {
      s.loading = false;
      s.list = (a.payload.flights);
      s.error = null;
      s.message = a.payload;
    });
    b.addCase(fetchFlights.rejected, (s, a)=>{
      s.loading = false;
      s.error = a.payload
    })
    b.addCase(createFlight.pending, (s)=>{
      s.loading = true
      s.error = null
      s.message = null
    })
    b.addCase(createFlight.fulfilled, (s, a) => {
      s.list.unshift(a.payload);
      s.error = null
      s.message = a.payload
    });
    b.addCase(createFlight.rejected, (s, a)=>{
      s.loading = false
      s.error = a.payload
    })
    b.addCase(toggleFlight.fulfilled, (s, a) => {
      const i = s.list.findIndex(f => f._id === a.payload._id);
      if (i !== -1) s.list[i] = a.payload;
    });
  },
});

export default flightSlice.reducer;
