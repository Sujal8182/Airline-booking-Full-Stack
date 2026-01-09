import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./Reducers/adminSlice"

export const store = configureStore({
    reducer : {
        admin : adminReducer
    }
})