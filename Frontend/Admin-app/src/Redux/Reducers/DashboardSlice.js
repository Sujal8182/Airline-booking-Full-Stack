import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDashboardstats = createAsyncThunk(
    "dashboard/fetchstats",
    async (_, thunkAPI) =>{
        try {
            const res = await axios.get("http://localhost:5050/airline/admin/dashboard", {
                withCredentials : true
            })
            return res.data
        } catch (error) {
            thunkAPI.rejectWithValue(
                error?.res?.data?.message 
            )            
        }
    }
)

const dashboardSlice = createSlice({
    name : "dashboard",
    initialState : {
        stats : null,
        loading : false,
        error : null,
        message : null
    },
    reducers : {},
    extraReducers : (builders)=>{
        builders
            .addCase(fetchDashboardstats.pending, (state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(fetchDashboardstats.fulfilled , (state,action)=>{
                state.loading = false,
                state.stats = action.payload,
                state.error = null,
                state.message = action.payload
            })
            .addCase(fetchDashboardstats.rejected, (state,action)=>{
                state.loading = false,
                state.error = action.payload                
            })
    }
})

export default dashboardSlice.reducer