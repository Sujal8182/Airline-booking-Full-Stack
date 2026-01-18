import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import { ToastContainer } from "react-toastify";
import Airportlist from './pages/Airports/Airportlist';
import AddAirport from './pages/Airports/AddAirport';
import Dashboard from './pages/Dashboard';
import Aircraft from './pages/Aircraft';
import AddAircraft from './pages/AddAircraft';
import Flights from './pages/Flights';
import Addflight from './pages/Addflight';
import Bookings from './pages/Bookings';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>

      <Route path='/' element={<Login />} />    
      <Route path='/admin/airports' element={<Airportlist />} />
      <Route path='/admin/airports/add' element = {<AddAirport />}/>  
      <Route path='/admin/dashboard' element = {<Dashboard />}/>
      <Route path="/admin/aircraft" element = {<Aircraft />}/>
      <Route path="/admin/aircraft/add" element = {<AddAircraft />}/>
      <Route path='/admin/flight' element={<Flights />}/>
      <Route path='/admin/flight/add' element={<Addflight/>}/>  
      <Route path='/admin/booking' element={<Bookings />}/>

      </Routes>
      <ToastContainer />
    </BrowserRouter>
    </>
  )
}

export default App
