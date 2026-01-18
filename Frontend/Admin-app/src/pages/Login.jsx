import React, { useEffect, useState } from 'react'
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

    const handleLogin = (e)=>{
        e.preventDefault()

        dispatch(adminLogin({email,password}))
    }

    useEffect(()=>{
        if(message) return toast.success(message)

        if(error) return toast.error(error)    
    },[message, error])

  return (
    <div>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
            <input type={email} placeholder='admin email' onChange={(e)=> setEmail(e.target.value)} value={email} required />

            <input type={password}  placeholder='admin password' onChange={(e)=> setPassword(e.target.value)} value={password} required/>

            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Login
