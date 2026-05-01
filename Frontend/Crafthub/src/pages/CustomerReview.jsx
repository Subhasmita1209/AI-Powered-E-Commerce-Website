import React from "react";
import { MdOutlineSms } from "react-icons/md";

function CustomerReview({ reviews }) {
  const star = (count) => "★".repeat(count) + "☆".repeat(5 - count);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#FFF4E6] via-[#F7E2CC] to-[#EED2B7] py-24 px-6 sm:px-12 lg:px-20">

      {/* Title */}
      <h1 className="text-center text-4xl sm:text-5xl font-extrabold text-[#4A2E1F] mb-16 tracking-wide">
        Customer <span className="text-[#B8860B]">Reviews</span>
      </h1>

      <div className="relative">

        {/* Horizontal Scroll */}
        <div className="flex gap-10 overflow-x-auto scroll-smooth pb-8 px-3 hide-scrollbar">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="min-w-[360px] sm:min-w-[400px] bg-white rounded-3xl p-10 shadow-lg border border-[#E8D8C8] hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-[#4A2E1F] mb-4">
                < MdOutlineSms size={30} />
              </div>

              <p className="text-[#4A2E1F] text-[15px] sm:text-[16px] leading-relaxed mb-6">
                {item.text}
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-[#4A2E1F]">{item.name}</h3>

              <div className="text-[#D4AF37] text-xl mt-2">
                {star(item.rating)}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {reviews.map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-[#C7A27A] rounded-full opacity-50"
            ></div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar utility */}
      <style>
        {`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}
      </style>
    </div>
  );
}

export default CustomerReview;
