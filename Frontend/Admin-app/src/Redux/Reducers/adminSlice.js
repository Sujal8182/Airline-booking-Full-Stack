import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
const baseURL = "http://localhost:5050"

export const adminLogin = createAsyncThunk(
    "admin/login",
    async ({email, password}, thunkAPI)=>{
        try {
            const response = await axios.post(
                `${baseURL}/airline/admin/login`,
                {email, password},
                {
                    withCredentials : true,
                    headers : {
                        "Content-Type" : "application/json"
                    }
                }
            )
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Login Failed"
            )
        }
    }
)

const adminSlice = createSlice({
    name : "admin",
    initialState : {
        loading : false,
        isAuth : false,
        error : null,
        admin : null,
        message : null,
        token : null
    },
    reducers : {
        adminLogout(state){
            (state.admin = null),(state.error = null),(state.isAuth = false)
        }
    },
    extraReducers : (builder)=> {
        builder
            .addCase(adminLogin.pending, (state)=>{
                state.loading = true,
                state.error = null,
                state.isAuth = false
            })
            .addCase(adminLogin.fulfilled, (state,action)=>{
                state.loading = false,
                state.admin = action.payload.admin
                state.token = action.payload.token
                state.message = action.payload.message
                state.isAuth = true
                state.error = null
            })
            .addCase(adminLogin.rejected, (state, action)=>{
                state.loading = false,
                state.error = action.payload.error
                state.message = action.payload.message
                state.admin = null
            })
    }
})

export const { adminLogout } = adminSlice.actions;
export default adminSlice.reducer