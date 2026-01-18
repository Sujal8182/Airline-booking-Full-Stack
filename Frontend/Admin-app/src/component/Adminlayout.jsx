import React from 'react'
import Header from './Header'
import Sidebar from './sidebar'
import { Outlet } from "react-router-dom";


const Adminlayout = () => {
  return (
    <div className='admin-container'>
      <Sidebar />
      <div className="admin-main">
        <Header />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Adminlayout
