import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
const baseURL = "http://localhost:5050"

export const fetchAirports = createAsyncThunk(
    "airport/fetchAll",
    async (_, thunkAPI)=>{
        try {
            const res = await axios.get(`${baseURL}/airline/admin/airport`,{
                withCredentials : true
            })
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.res?.data?.message
            )
        }
    }
)

export const createAirport = createAsyncThunk(
    "airlport/create",
    async (data, thunkAPI)=>{
        try {
            const res = await axios.post(`${baseURL}/airline/admin/addAirport`,data, {
                withCredentials : true
            })
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.res?.data?.message
            )
        }
    }
)

const airportSlice = createSlice({
    name : "airport",
    initialState : {
        airports : [],
        loading : false,
        error : null,
        message : null
    },
    reducers : {
        clearStatus : (state)=>{
            state.error = null;
            state.message = null
        }
    },
    extraReducers :(builder)=> {
        builder
            .addCase(fetchAirports.pending, state => { 
                state.loading = true ;
                state.error = null
                state.message
            })
            .addCase(fetchAirports.fulfilled, (state , action)=>{
                state.loading = false;
                state.airports = action.payload
                state.message = action.payload
            })
            .addCase(fetchAirports.rejected, (state, action)=>{
                state.airports = push(action.payload)
                state.message = action.payload
                state.error = action.payload
            })
            .addCase(createAirport.pending, state => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(createAirport.fulfilled, (state, action) => {
                state.loading = false;
                state.airports.push(action.payload);
                state.message = "Airport added successfully";
            })
            .addCase(createAirport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = action.payload
            });
    }
})

export default airportSlice.reducer