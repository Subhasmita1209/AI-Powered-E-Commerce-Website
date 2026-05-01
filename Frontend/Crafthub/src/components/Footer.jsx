import React from 'react'
import logo from '../assets/logo.png'


function Footer() {
  return (
    <footer className="w-full 
      bg-white
      px-6 md:px-20 pt-16 pb-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-14">

        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center 
              shadow-lg border border-[#e3b98c]">
              <img
                src={logo}
                alt="OneCart Logo"
                className="w-7 h-7 object-contain"
              />
            </div>

            <h2 className="text-[26px] font-extrabold tracking-wide text-[#5b3a2c]">
              OneCart
            </h2>
          </div>

          <p className="text-[#704c36] text-[15px] font-semibold leading-relaxed max-w-[420px]">
            OneCart is your all-in-one online shopping destination, offering 
            top-quality products, unbeatable deals, and fast delivery — 
            all backed by trusted service designed to make your shopping 
            experience smooth and enjoyable.
          </p>
        </div>

        {/* Company Links */}
        <div className="md:text-center">
          <h3 className="text-[15px] font-bold text-[#5b3a2c] mb-5 tracking-[1px] uppercase">
            Company
          </h3>

          <ul className="space-y-3 text-[#704c36]  font-semibold text-[15px]">
            {["Home", "About Us", "Delivery", "Privacy Policy"].map((item) => (
              <li
                key={item}
                className="cursor-pointer hover:text-[#a77044] transition-all duration-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:text-right">
          <h3 className="text-[15px] font-bold text-[#5b3a2c]  mb-5 tracking-[1px] uppercase">
            Get in Touch
          </h3>

          <div className="space-y-2 text-[#704c36] text-[15px] font-semibold">
            <p className="hover:text-[#a77044] transition cursor-pointer">
              +91-9876543210
            </p>
            <p className="hover:text-[#a77044] transition cursor-pointer">
              contact@onecart.com
            </p>
            <p className="mt-2 hover:text-[#a77044] transition cursor-pointer">
              +1-123-456-7890
            </p>
            <p className="hover:text-[#a77044] transition cursor-pointer">
              admin@onecart.com
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="mt-14 border-t border-[#e6bd93] pt-5 text-center 
        text-[#704c36] text-[14px] tracking-wide font-semibold">
        © 2025 OneCart. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
