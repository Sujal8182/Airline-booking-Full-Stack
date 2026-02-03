import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProtectedRoutes = () => {

    const {admin , isAuth} = useSelector(state => state.admin)

    if(!isAuth){
        toast("Login first")
        return <Navigate to='/' />
    }

  return <Outlet />
}

export default ProtectedRoutes