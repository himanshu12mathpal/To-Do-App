import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  useEffect(()=>{
  const token=localStorage.getItem('token')
  if(token){
    navigate('/Home')
  }
  })

  return (
    <div className="h-screen flex items-center justify-center bg-[#101828] text-white relative overflow-hidden">
      {/* Subtle background gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-[#1E293B]/60 via-[#101828]/80 to-[#0F172A]/90"></div>

      {/* Decorative blur glows */}
      <div className="absolute top-20 left-20 w-60 h-60 bg-blue-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>

      {/* Main Card */}
      <div className="relative backdrop-blur-lg bg-white/10 border border-white/10 shadow-2xl rounded-3xl p-10 w-[360px] text-center animate-fadeIn">
        <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-md">
          Notes App
        </h1>
        <p className="text-gray-300 mb-10 text-sm">
          Write, organize, and store your thoughts in one beautiful place.
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 font-semibold text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="w-full py-3 rounded-xl border border-gray-600 bg-transparent text-gray-300 font-semibold hover:bg-white/10 hover:text-white hover:border-gray-400 transition-all duration-200"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
