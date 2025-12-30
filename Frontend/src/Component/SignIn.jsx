import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../Redux/Reducers/userSlice'
import { toast } from 'react-toastify'
import './SignIn.css'

const SignIn = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { error, message } = useSelector((state) => state.user)

  const loginHandler = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  useEffect(() => {
    if (message) toast(message.message)
  }, [message])

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={loginHandler}>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to manage your flights</p>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@airline.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="auth-btn" type="submit">
          Sign In
        </button>

        <span className="auth-footer">
          Secure access · Global airline booking
        </span>
      </form>
    </div>
  )
}

export default SignIn