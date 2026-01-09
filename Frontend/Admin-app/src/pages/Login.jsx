import React, { useEffect, useState } from 'react'
import Adminapi from '../component/axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../Redux/Reducers/adminSlice'
import { toast } from 'react-toastify'

const Login = () => {
    const [email , setEmail] = useState("")
    const [password,setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {error, message} = useSelector((state)=> state.admin)

    const handleLogin =async (e)=>{
        e.preventdefault()

        dispatch(adminLogin({email,password}))
    }

    useEffect(()=>{
        if(message) toast.success(message)

        if(error) toast.error(error)    
    },[message, error])

  return (
    <div>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
            <input type="text" name="" id="" placeholder='admin email' onChange={(e)=> setEmail(e.target.value)} value={email} required />

            <input type="password" name="" id="" placeholder='admin pass' onChange={(e)=> setPassword(e.target.value)} value={password} required/>

            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Login
