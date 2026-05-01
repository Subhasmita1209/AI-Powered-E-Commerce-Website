import React from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaListAlt } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { FaShoppingCart } from "react-icons/fa"; // For the store logo
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-[18%] min-h-[100vh] bg-[#FFF8ED] border-r-[2px] border-[#E6D9C8] fixed left-0 top-0 pt-6">

      {/* ======= STORE LOGO/HEADER (Like "E-store" in first image) ======== */}
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#8B4513] text-white flex items-center justify-center rounded-xl shadow-sm">
          <FaShoppingCart className="w-5 h-5" />
        </div>
        <h1 className="text-[22px] font-bold text-[#3A2F28] tracking-wide">
          OneCart
        </h1>
      </div>

      {/* ======= DASHBOARD SECTION WITH ICON (Like first image) ======== */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#FFF9F3] shadow-sm border border-[#EADCCB]">
          <div className="w-8 h-8 bg-[#8B4513] text-white flex items-center justify-center rounded-lg">
            <RxDashboard className="w-4 h-4" />
          </div>
          <h2 className="text-[16px] font-semibold text-[#3A2F28]  cursor-pointer" onClick={() => navigate("/")} >Dashboard</h2>
        </div>
      </div>

      {/* ======= MENU CATEGORY HEADER ======= */}
      <div className="px-6 mb-4">
        <h3 className="text-[13px] font-medium text-[#8B7D6B] uppercase tracking-wider">
          Management
        </h3>
      </div>

      {/* ======= MENU ITEMS ======= */}
      <div className="flex flex-col gap-2 px-6 text-[#3A2F28]">

        {/* Add Items */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer group
          transition-all duration-300 hover:bg-[#8B4513] hover:text-white hover:shadow-md"
          onClick={() => navigate('/add')}
        >
          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#F5E9D9] group-hover:bg-white/20">
            <IoIosAddCircleOutline className="w-[16px] h-[16px] transition-all group-hover:scale-110" />
          </div>
          <p className="text-[15px] font-medium">Add Items</p>
        </div>

        {/* List Items */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer group
          transition-all duration-300 hover:bg-[#8B4513] hover:text-white hover:shadow-md"
          onClick={() => navigate('/lists')}
        >
          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#F5E9D9] group-hover:bg-white/20">
            <FaListAlt className="w-[16px] h-[16px] transition-all group-hover:scale-110" />
          </div>
          <p className="text-[15px] font-medium">List Items</p>
        </div>

        {/* View Orders */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer group
          transition-all duration-300 hover:bg-[#8B4513] hover:text-white hover:shadow-md"
          onClick={() => navigate('/orders')}
        >
          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#F5E9D9] group-hover:bg-white/20">
            <FiPackage className="w-[16px] h-[16px] transition-all group-hover:scale-110" />
          </div>
          <p className="text-[15px] font-medium">View Orders</p>
        </div>

      </div>

      {/* ======= ADDITIONAL MENU ITEMS (Like first image structure) ======= */}
      <div className="mt-8">
        {/* Another category header */}
        <div className="px-6 mb-4">
          <h3 className="text-[13px] font-medium text-[#8B7D6B] uppercase tracking-wider">
            Analytics
          </h3>
        </div>

        {/* Additional menu items */}
        <div className="flex flex-col gap-2 px-6 text-[#3A2F28]">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer group transition-all duration-300 hover:bg-[#8B4513] hover:text-white hover:shadow-md">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#F5E9D9] group-hover:bg-white/20">
              <span className="text-[14px] font-bold">★</span>
            </div>
            <p className="text-[15px] font-medium">Rating & Review</p>
          </div>

         
        </div>
      </div>
    </div>
  );
}

export default Sidebar;