import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response=await axios.post(`${import.meta.env.VITE_API_URL}/user/login`,{
            email,password
        },{ withCredentials: true })
        
        if(response.data.status=='success'){
            localStorage.setItem('token', response.data.token);
            navigate('/Home')
        }
        else{
            console.log("Login failed:", response.data.message);
        }
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#101828] text-white relative overflow-hidden">
    
      <div className="absolute inset-0 bg-linear-to-br from-[#1E293B]/60 via-[#101828]/80 to-[#0F172A]/90"></div>
      <div className="absolute top-20 left-20 w-60 h-60 bg-blue-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>

      <div className="relative backdrop-blur-lg bg-white/10 border border-white/10 shadow-2xl rounded-3xl p-10 w-[360px] text-center animate-fadeIn">
        <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-md">
          Welcome Back
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="text-left">
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="text-left">
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 font-semibold text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer transition-all duration-200"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
