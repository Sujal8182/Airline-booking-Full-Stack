import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";
const baseURL = "http://localhost:5050";

export const login = createAsyncThunk(
    "user/login",
    async ({ email, password},thunkAPI)=>{
        try {
            const response = await axios.post(
                `${baseURL}/airline/users/login`,
                { email, password},
                {
                    withCredentials : true,
                    headers : {"Content-Type" : "application/json"}
                }
            )
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Login failed"
            )
        }
    }
)

export const register = createAsyncThunk(
    "user/register",
    async ({name, email, password}, thunkAPI)=>{
        try {
            const response = await axios.post(
                `${baseURL}/airline/users/register`,
                {name, email, password},
                {
                    withCredentials : true,
                    headers : {"Content-Type" : "application/json"}
                }
            )
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Registration failed"
            )
        }
    }
)

const userSlice = createSlice({
    name : "user",
    initialState : {
        loading : false,
        error : null,
        isAuth : false,
        user : null,
        message : null
    },
    reducers : {
        logout(state){
            (state.user = null), (state.error = null)
        }
    },
    extraReducers : (builder)=>{
        builder
            .addCase(login.pending, (state)=>{
                (state.loading = true),
                (state.isAuth = false),
                (state.user = null),
                (state.error = null)
            })
            .addCase(register.pending, (state)=>{
                (state.loading = true),
                (state.user = null),
                (state.error = null)
            })
            .addCase(login.fulfilled, (state, action)=>{
                (state.loading = false),
                (state.isAuth = true),
                (state.user = action.payload.user),
                (state.message = action.payload.message),
                (state.error = null)
            })
            .addCase(register.fulfilled, (state, action)=>{
                (state.loading = false),
                (state.user = action.payload.user),
                (state.message = action.payload.message),
                (state.error = null)
            })
            .addCase(login.rejected, (state, action)=>{
                (state.loading = false),
                (state.isAuth = false),
                (state.user = null),
                (state.error = action.payload),
                (state.message = action.payload.message)
            })
            .addCase(register.rejected, (state, action)=>{
                (state.loading = false),
                (state.user = null),
                (state.error = action.payload),
                (state.message = action.payload.message)  
            })

    }
})

export const {logout} = userSlice.actions;
export default userSlice.reducer