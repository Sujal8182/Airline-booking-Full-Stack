import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>

      <Route path='/' element={<Login />} />      

      </Routes>
      <ToastContainer />
    </BrowserRouter>
    </>
  )
}

export default App
