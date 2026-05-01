import React from "react";
import Title from "../components/Title";
import { FiRefreshCcw } from "react-icons/fi";
import { MdPayment } from "react-icons/md";
import { AiOutlineSafetyCertificate } from "react-icons/ai";

function OurPolicy() {
  return (
    <div className="
      w-full 
      bg-gradient-to-b from-[#FFF3E0] to-[#FFE0B2]
      flex flex-col items-center justify-start
      py-8 md:py-16 lg:py-20
    ">

      {/* Title Section */}
      <div className="w-full max-w-[1000px] text-center mb-12">
        <Title text1="OUR" text2="POLICY" />
        <p className="max-w-[620px] mx-auto  text-sm md:text-base text-[#5C4033]">
          Customer-Friendly Policies 🤎 Committed to Your Satisfaction and Safety.
        </p>
      </div>

      {/* Cards Wrapper (Controls Width & Spacing on Large Screens) */}
      <div className="
        w-full 
        max-w-[1100px] 
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
        gap-6 lg:gap-8
        px-4
      ">

        {/* Card 1 */}
        <div className="bg-white/90 border border-[#E6C7A2] rounded-3xl p-8 text-center
          shadow-[0_8px_25px_rgba(0,0,0,0.06)]
          hover:shadow-[0_16px_45px_rgba(0,0,0,0.12)]
          transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-14 h-14 mx-auto flex items-center justify-center
            bg-gradient-to-br from-[#D4A373] to-[#A0522D]
            text-white rounded-full mb-5 text-xl shadow-md"
          >
            <FiRefreshCcw />
          </div>
          <h2 className="text-[18px] font-semibold text-[#5C4033] mb-2">
            Easy Returns
          </h2>
          <p className="text-sm text-[#6B4F3A]">
            Hassle-free returns within 7 days of delivery for your peace of mind.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white/90 border border-[#E6C7A2] rounded-3xl p-8 text-center
          shadow-[0_8px_25px_rgba(0,0,0,0.06)]
          hover:shadow-[0_16px_45px_rgba(0,0,0,0.12)]
          transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-14 h-14 mx-auto flex items-center justify-center
            bg-gradient-to-br from-[#D4A373] to-[#A0522D]
            text-white rounded-full mb-5 text-xl shadow-md"
          >
            <MdPayment />
          </div>
          <h2 className="text-[18px] font-semibold text-[#5C4033] mb-2">
            Secure Payments
          </h2>
          <p className="text-sm text-[#6B4F3A]">
            100% encrypted and secure payment methods for safe checkout.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white/90 border border-[#E6C7A2] rounded-3xl p-8 text-center
          shadow-[0_8px_25px_rgba(0,0,0,0.06)]
          hover:shadow-[0_16px_45px_rgba(0,0,0,0.12)]
          transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-14 h-14 mx-auto flex items-center justify-center
            bg-gradient-to-br from-[#D4A373] to-[#A0522D]
            text-white rounded-full mb-5 text-xl shadow-md"
          >
            <AiOutlineSafetyCertificate />
          </div>
          <h2 className="text-[18px] font-semibold text-[#5C4033] mb-2">
            Quality Assurance
          </h2>
          <p className="text-sm text-[#6B4F3A]">
            Premium quality products carefully tested before delivery.
          </p>
        </div>

      </div>
    </div>
  );
}

export default OurPolicy;
