import React from 'react'
import SignIn from './Component/SignIn'
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Register from './Component/Register';
import Home from './Component/Home/Home';
import FlightResults from './Component/FlightResults';
import Booking from './Component/Booking';

const App = () => {
  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<SignIn/>} />
      <Route path='/register' element={<Register />} />
      <Route path="/flights" element={<FlightResults />} />
      <Route path="/booking/:id" element={<Booking />} />
    </Routes>
    <ToastContainer />
   </BrowserRouter>

   </>
  )
}

export default App
