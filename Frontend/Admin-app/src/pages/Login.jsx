import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../Redux/Reducers/adminSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, message, loading } = useSelector(state => state.admin);

  const handleLogin = e => {
    e.preventDefault();
    dispatch(adminLogin({ email, password }));
    console.log(message)
  };

  useEffect(() => {
    if (error) toast.error(error);
    if (message) {
      if ( message == "Login Successfully."){
        toast.success(message)
        navigate("/admin/dashboard");
      }
      else{
        toast.error(message)
      }
    }

  }, [message, error, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F6F8] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Admin Login
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to manage the airline system
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="admin@airline.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-400">
          Airline Management System – Admin Panel
        </div>
      </div>
    </div>
  );
};

export default Login;
