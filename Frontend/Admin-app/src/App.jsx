import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Airportlist from "./pages/Airports/Airportlist";
import AddAirport from "./pages/Airports/AddAirport";
import Dashboard from "./pages/Dashboard";
import Aircraft from "./pages/Aircraft";
import AddAircraft from "./pages/AddAircraft";
import Flights from "./pages/Flights";
import Addflight from "./pages/Addflight";
import Bookings from "./pages/Bookings";
import Adminlayout from "./component/Adminlayout";
import ProtectedRoutes from "./ProtectedRoutes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin/airports"
            element={
              <Adminlayout>
                <Airportlist />
              </Adminlayout>
            }
          />
          <Route element={<ProtectedRoutes />}>
          <Route
            path="/admin/airports/add"
            element={
              <Adminlayout>
                <AddAirport />
              </Adminlayout>
            }
          />
          <Route path="/admin/dashboard" element={
            <Adminlayout >

              <Dashboard />
            </Adminlayout>
            } />
          <Route path="/admin/aircraft" element={
            <Adminlayout >
              
              <Aircraft />
            </Adminlayout>
            } />
          <Route path="/admin/aircraft/add" element={
            <Adminlayout >
              
              <AddAircraft />
            </Adminlayout>
            } />
          <Route path="/admin/flight" element={
            <Adminlayout >
              
              <Flights />
            </Adminlayout>
            } />
          <Route path="/admin/flight/add" element={
            <Adminlayout >
              
              <Addflight />
            </Adminlayout>
            } />
          <Route path="/admin/booking" element={
            <Adminlayout >
              
              <Bookings />
            </Adminlayout>
            } />

            </Route>
        </Routes>
        
      </BrowserRouter>
    </>
  );
};

export default App;
