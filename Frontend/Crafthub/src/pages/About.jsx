import React from "react";
import { FiTruck, FiStar, FiDollarSign, FiHeadphones } from "react-icons/fi";
import aboutImg from "../assets/about.jpg";


function About() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#f5e2cd] to-[#e7c3a0] py-16 px-4 sm:px-10 md:px-20 lg:px-32">

      {/* Title */}
      <h1 className="text-center text-[24px] sm:text-[28px] md:text-[36px] font-extrabold tracking-widest text-[#5b3a2c] mb-12 mt-2 sm:mb-16">
        ABOUT US
      </h1>

      {/* Main Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-center mb-16 sm:mb-20">

        {/* Left Image Card */}
        <div className="w-full md:w-[45%] bg-[#5b3a2c] p-3 sm:p-4 rounded-2xl shadow-xl">
          <div className="bg-[#e8d1b5] rounded-xl relative flex items-center justify-center p-2 sm:p-3">

            <img
              src={aboutImg}
              alt="OneCart"
              className="w-full max-h-[350px] sm:max-h-[400px] md:max-h-[450px] object-contain rounded-lg"
            />

            {/* Overlay Text */}
            <div className="absolute bottom-0 w-full bg-[#5b3a2c]/90 text-white p-4 sm:p-5 rounded-b-xl">
              <h2 className="text-lg sm:text-xl font-bold tracking-wider">ONECART</h2>
              <p className="text-xs sm:text-sm mt-1 opacity-90">
                Premium fashion, effortless comfort, trusted quality.
              </p>

              {/* Discount Badge */}
              <div className="absolute -top-8 sm:-top-10 right-3 sm:right-4 bg-white text-[#5b3a2c] 
                w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center rounded-full font-bold shadow-lg">
                <span className="text-[10px] sm:text-[12px]">SPECIAL</span>
                <span className="text-[14px] sm:text-[18px]">30%</span>
                <span className="text-[10px] sm:text-[12px]">OFF</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-[55%] text-[#5b3a2c] font-[500] tracking-wide leading-relaxed">
          <p className="text-[14px] sm:text-[16px] leading-[1.8] mb-4 sm:mb-6">
            OneCart is built for smart, seamless shopping — created to deliver quality
            products, trending styles, and everyday essentials all in one place.
          </p>

          <p className="text-[14px] sm:text-[16px] leading-[1.8] mb-6 sm:mb-8">
            Designed for modern shoppers, OneCart blends convenience, affordability,
            and style with fast delivery and customer-first service.
          </p>

          <h3 className="font-extrabold text-[18px] sm:text-[20px] mb-2 sm:mb-3 tracking-wide">
            Our Mission
          </h3>

          <p className="text-[14px] sm:text-[16px] leading-[1.8]">
            To make online shopping simple, affordable, and enjoyable for everyone.
          </p>
        </div>

      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto mt-10 mb-16 sm:mb-20 px-2 sm:px-0">
        <h2 className="text-center text-[22px] sm:text-[26px] md:text-[30px] font-extrabold text-[#5b3a2c] tracking-wide mb-8 sm:mb-12">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[
            { icon: <FiStar />, title: "Premium Quality", desc: "Carefully curated, high-quality products." },
            { icon: <FiTruck />, title: "Fast Delivery", desc: "Quick and reliable shipping service." },
            { icon: <FiDollarSign />, title: "Best Prices", desc: "Affordable deals and exclusive offers." },
            { icon: <FiHeadphones />, title: "24/7 Support", desc: "Friendly customer support always ready." },
          ].map((item, index) => (
            <div
              key={index}
              className="group bg-white/70 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-md 
              hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full 
                bg-[#5b3a2c] text-white text-[22px] sm:text-[26px] mb-3 sm:mb-4 
                group-hover:scale-105 sm:group-hover:scale-110 transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="font-bold text-[#5b3a2c] text-[15px] sm:text-[17px] mb-2 sm:mb-3">{item.title}</h3>
              <p className="text-[#704c36] text-[13px] sm:text-[14px] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="w-full flex flex-col items-center justify-center 
        pt-10 sm:pt-12 pb-20 sm:pb-24 px-4 sm:px-10
        bg-gradient-to-b from-[#e7c3a0] to-[#d9ad86] rounded-3xl shadow-xl">

        {/* Title */}
        <p className="text-[20px] sm:text-[26px] md:text-[32px] font-bold 
          text-[#5e3d2c] tracking-wide text-center mb-2 sm:mb-3">
          Subscribe Now & Get 20% OFF
        </p>

        {/* Subtitle */}
        <p className="text-[12px] sm:text-[15px] md:text-[18px] 
          text-[#6a4937] text-center max-w-[750px] font-medium 
          mb-4 sm:mb-6 px-2 sm:px-6">
          Join our newsletter to enjoy exclusive savings, special deals, 
          and early access to new collections.
        </p>

        {/* Card Container */}
        <div className="w-full max-w-[680px] bg-white bg-opacity-80 backdrop-blur-md 
          rounded-2xl shadow-[0_6px_22px_rgba(0,0,0,0.14)] 
          p-4 sm:p-6">

          <form className="flex flex-col sm:flex-row w-full items-center gap-3 sm:gap-4">
            
            <input
              type="email"
              placeholder="Enter Your Email"
              required
              className="flex-1 h-[42px] sm:h-[48px] 
              px-3 sm:px-4 text-[14px]
              rounded-xl bg-[#f3f3f3] text-black placeholder:text-gray-600
              shadow-sm border border-[#d1b59b]
              focus:outline-none focus:ring-2 focus:ring-[#c99369]"
            />

            <button
              type="submit"
              className="w-full sm:w-auto h-[42px] sm:h-[48px] px-4 sm:px-6
              text-[13px] sm:text-[14px] font-semibold 
              bg-gradient-to-r from-[#c99369] to-[#a77044]
              text-white rounded-xl shadow-md whitespace-nowrap
              hover:opacity-90 active:scale-[0.97] transition-all duration-200"
            >
              Subscribe
            </button>
          </form>
          
        </div>
      </div>
      
    </div>
    
  );
}

export default About;
