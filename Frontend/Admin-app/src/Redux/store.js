import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./Reducers/adminSlice"
import airportReducer from './Reducers/airportSlice'
import dashboardreducer from "./Reducers/DashboardSlice"
import Aircraftreducer from './Reducers/AircraftSlice'
import flightreducer from './Reducers/flightSlice'
import bookingreducer from './Reducers/bookingSlice'

export const store = configureStore({
    reducer : {
        admin : adminReducer,
        airport : airportReducer,
        Aircraft : Aircraftreducer,
        Dashboard : dashboardreducer,
        flight : flightreducer,
        booking : bookingreducer
    }
})