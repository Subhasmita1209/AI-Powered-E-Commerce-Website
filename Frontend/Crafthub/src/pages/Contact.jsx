import React from "react";
import contactImg from "../assets/contact.jpg"; // <-- replace with your image

function Contact() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#f5e2cd] to-[#e7c3a0] py-16 px-4 sm:px-10 md:px-20 lg:px-32">

      {/* Title */}
      <h1 className="text-center text-[24px] sm:text-[28px] md:text-[36px] font-extrabold tracking-widest text-[#5b3a2c] mb-12 mt-2 sm:mb-16">
        CONTACT US
      </h1>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10 md:gap-16">

        {/* LEFT IMAGE */}
        <div className="w-full md:w-[45%] bg-[#5b3a2c] p-3 rounded-2xl shadow-xl">
          <div className="bg-[#e8d1b5] rounded-xl p-3 relative">
            <img
              src={contactImg}
              alt="Contact"
              className="w-full max-h-[420px] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-[55%] text-[#5b3a2c] space-y-10 tracking-wide">

          {/* Our Store */}
          <div>
            <h3 className="font-extrabold text-[20px] mb-3">Our Store</h3>
            <p className="text-[15px] leading-relaxed">12345 Random Station</p>
            <p className="text-[15px] leading-relaxed">Random City, State, India</p>
            <p className="text-[15px] leading-relaxed mt-2">
              <strong>Tel:</strong> +91-9876543210
            </p>
            <p className="text-[15px] leading-relaxed">
              <strong>Email:</strong> admin@onecart.com
            </p>
          </div>

          {/* Careers */}
          <div>
            <h3 className="font-extrabold text-[20px] mb-3">Careers at OneCart</h3>
            <p className="text-[15px] leading-relaxed mb-4">
              Learn more about our teams and job openings.
            </p>

            <button className="px-5 py-2 border-2 border-[#5b3a2c] rounded-xl text-[#5b3a2c] font-semibold hover:bg-[#d6a27a] hover:text-white transition-all duration-300">
              Explore Jobs
            </button>
          </div>

        </div>
      </div>

      {/* SUBSCRIBE BOX */}
      <div className="w-full flex flex-col items-center justify-center 
        pt-12 pb-20 mt-20 bg-gradient-to-b from-[#e7c3a0] to-[#d9ad86] 
        rounded-3xl shadow-xl px-4">

        {/* Heading */}
        <p className="text-[22px] sm:text-[28px] md:text-[32px] font-bold text-[#5e3d2c] text-center mb-2">
          Subscribe Now & Get 20% OFF
        </p>

        {/* Subtitle */}
        <p className="text-[13px] sm:text-[15px] md:text-[18px] text-[#6a4937] text-center max-w-[720px] mb-6">
          Stay updated with exclusive offers, new arrivals, and early-access deals.
        </p>

        {/* EMAIL CARD */}
        <div className="w-full max-w-[680px] bg-white/80 backdrop-blur-md p-5 sm:p-6 rounded-2xl shadow-lg">

          <form className="flex flex-col sm:flex-row gap-4 items-center">
            <input
              type="email"
              required
              placeholder="Enter Your Email"
              className="flex-1 h-[45px] px-4 rounded-xl bg-[#f3f3f3] text-black 
              border border-[#d1b59b] placeholder:text-gray-600 focus:ring-2 focus:ring-[#c99369] focus:outline-none"
            />

            <button
              type="submit"
              className="w-full sm:w-auto h-[45px] px-6 rounded-xl font-semibold text-white 
              bg-gradient-to-r from-[#c99369] to-[#a77044] shadow-md hover:opacity-90 transition-all"
            >
              Subscribe
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}

export default Contact;
