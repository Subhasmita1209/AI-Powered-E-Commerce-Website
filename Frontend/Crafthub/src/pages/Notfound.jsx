import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#f5e2cd] to-[#e7c3a0] flex items-center justify-center px-6">
      
      <div className="max-w-3xl w-full bg-[#fff7ef] rounded-2xl shadow-lg p-10 md:p-14 text-center border border-[#e6c8a8]">
        
        {/* 404 Number */}
        <h1 className="text-[72px] md:text-[96px] font-extrabold text-[#5b3a2c] tracking-widest">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-[#5b3a2c] mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-[#7a5a48] text-lg leading-relaxed mb-8">
          Sorry, the page you are looking for doesn’t exist, has been removed,
          or the URL was entered incorrectly.
        </p>

        {/* Divider */}
        <div className="w-20 h-[2px] bg-[#5b3a2c] mx-auto mb-8"></div>

        {/* Action Button */}
        <button
          onClick={() => navigate("/login")}
          className="bg-[#5b3a2c] text-white px-10 py-3 rounded-xl text-lg font-medium tracking-wide hover:bg-[#4a2f24] transition cursor-pointer"
        >
         Login
        </button>
      </div>
    </div>
  );
}

export default NotFound;
