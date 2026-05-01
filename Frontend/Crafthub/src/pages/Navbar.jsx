import React, { useState, useEffect, useRef } from 'react';
import Logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import { UserDataContext } from '../context/Usercontext';
import { AuthContextData } from '../context/Authcontext';
import axios from 'axios';
import { useContext } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { BsFillCollectionFill } from "react-icons/bs";
import { MdContacts } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { ShopcontextData } from '../context/Shopcontext';
import { FiHeart } from "react-icons/fi"; // ✅ ADDED

function Navbar() {
  let { getCurrentUser, userData } = useContext(UserDataContext);
  let { serverUrl } = useContext(AuthContextData);

  const navigate = useNavigate();

  let { showSearch, setShowSearch, search, setSearch, getCartCount, getWishlistCount } = useContext(ShopcontextData);
  let [showprofile, setShowprofile] = useState(false);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      setTimeout(() => {
        getCurrentUser();
      }, 300);
      console.log(result.data)
    } catch (err) {
      console.log(err);
    }
  }

  const profileRef = useRef(null);
  const searchRef = useRef(null);
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowprofile(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchClick = () => {
    setShowSearch(prev => !prev);
    navigate("/collection")
    setShowprofile(false);
  };

  const handleProfileClick = () => {
    setShowprofile(prev => !prev);
    setShowSearch(false);
  };

  const handleProfileAction = (action) => {
    setShowprofile(false);

    if (action === "orders") navigate("/order");
    if (action === "profile") navigate("/profile");
    if (action === "about") navigate("/about");
    if (action === "login") navigate("/login");
  };

  return (
    <div className="bg-gray-50">

      {/* TOP DESKTOP NAVBAR */}
      <header className="w-[100vw] h-[70px] bg-white z-50 fixed top-0 
        flex items-center justify-between px-[30px] shadow-md">

        <div className="container mx-auto px-4 py-3 flex justify-between items-center">

          {/* LEFT - Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <img className="w-[40px]" src={Logo} alt="logo" />
            <h1 className="text-[27px] text-[#2C2C2C] font-sans">OneCart</h1>
          </div>

          {/* DESKTOP NAV MENU */}
          <nav className="hidden lg:flex ml-10">
            <ul className="flex space-x-10 font-[Poppins] text-lg">

              <li className="cursor-pointer relative group" onClick={() => navigate("/")}>
                <span className="text-gray-800 font-semibold group-hover:text-[#8B4513]">Home</span>
                <div className="absolute left-0 -bottom-1 w-0 h-[3px] bg-[#8B4513] transition-all duration-300 group-hover:w-full"></div>
              </li>

              <li className="cursor-pointer relative group" onClick={() => navigate("/collection")}>
                <span className="text-gray-800 font-semibold group-hover:text-[#8B4513]">Collections</span>
                <div className="absolute left-0 -bottom-1 w-0 h-[3px] bg-[#8B4513] transition-all duration-300 group-hover:w-full"></div>
              </li>

              <li className="cursor-pointer relative group" onClick={() => navigate("/about")}>
                <span className="text-gray-800 font-semibold group-hover:text-[#8B4513]">About</span>
                <div className="absolute left-0 -bottom-1 w-0 h-[3px] bg-[#8B4513] transition-all duration-300 group-hover:w-full"></div>
              </li>

              <li className="cursor-pointer relative group" onClick={() => navigate("/contact")}>
                <span className="text-gray-800 font-semibold group-hover:text-[#8B4513]">Contact</span>
                <div className="absolute left-0 -bottom-1 w-0 h-[3px] bg-[#8B4513] transition-all duration-300 group-hover:w-full"></div>
              </li>
            </ul>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center space-x-5 relative">

            {/* Search Icon */}
            <div ref={searchRef}>
              <FaSearch className="w-[24px] h-[24px] cursor-pointer" onClick={handleSearchClick} />
            </div>

         
            {/* Profile Icon */}
            <div className="relative" ref={profileRef}>
              {!userData ? (
                <RiAccountCircleLine className="w-[30px] h-[30px] cursor-pointer" onClick={handleProfileClick} />
              ) : (
                <div
                  className="w-[32px] h-[32px] bg-black text-white rounded-full flex items-center justify-center cursor-pointer font-bold"
                  onClick={handleProfileClick}
                >
                  {userData?.name.slice(0, 1).toUpperCase()}
                </div>
              )}

              {showprofile && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border">
                  {userData ? (
                    <>
                      <p className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
                        Hello, {userData.name}
                      </p>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                        onClick={() => handleProfileAction("orders")}>My Orders</button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                        onClick={() => handleProfileAction("profile")}>My Profile</button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                        onClick={() => handleProfileAction("about")}>About</button>
                      <button className="w-full text-left px-4 py-2 text-red-600 font-semibold hover:bg-gray-100"
                        onClick={handleLogout}>Logout</button>
                    </>
                  ) : (
                    <>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                        onClick={() => handleProfileAction("login")}>Login</button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                        onClick={() => handleProfileAction("orders")}>Orders</button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                        onClick={() => handleProfileAction("about")}>About</button>
                    </>
                  )}
                </div>
              )}
            </div>
            {/* Wishlist Icon */}
<div
  className="relative cursor-pointer"
  onClick={() => navigate("/wishlist")}
>
  <FiHeart className="w-[26px] h-[26px]" />

  {getWishlistCount() > 0 && (
    <p className="absolute -top-2 -right-2 min-w-[18px] h-[18px]
      bg-red-500 text-white rounded-full text-[11px]
      font-bold flex items-center justify-center shadow-md">
      {getWishlistCount()}
    </p>
  )}
</div>

            {/* Cart Icon - DESKTOP UNCHANGED */}
            <div className="relative">
              <IoCartOutline
                onClick={() => navigate("/cart")}
                className="w-[30px] h-[30px] cursor-pointer hidden md:block"
              />

              {getCartCount() > 0 && (
                <p className="absolute -top-2 -right-2 min-w-[20px] h-[20px] px-[6px] bg-[#4A2E1F] text-white rounded-full text-[11px] font-bold flex items-center justify-center shadow-md  hidden md:block">
                  {getCartCount()}
                </p>
              )}
            </div>

          </div>
        </div>

        {/* SEARCH BAR (UNCHANGED) */}
        {showSearch && (
          <div className="absolute top-full left-0 right-0 w-full h-[90px] bg-[#FFF3E0] flex items-center justify-center shadow-md">
            <div className="relative w-[90%] sm:w-[60%] md:w-[50%]">
              <input
                type="text"
                placeholder="Search Here"
                autoFocus
                className="w-full h-[50px] px-[55px] text-[18px] text-[#4A3F35]
                  bg-gradient-to-r from-[#FFE7D1] to-[#FFD1A1] rounded-2xl shadow-md
                  placeholder:text-[#7A6F67] focus:ring-2 focus:ring-[#D68B40]"
                onChange={(e) => { setSearch(e.target.value) }}
                value={search}
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B4513] w-[22px] h-[22px]" />
            </div>
          </div>
        )}
      </header>

      {/* MOBILE BOTTOM NAVBAR (UNCHANGED) */}
      <header className="w-[100vw] h-[90px] flex items-center justify-between px-4 fixed bottom-0 left-0 bg-[#FFF8E7] z-50 md:hidden">

        <div className="flex w-full justify-around items-center relative">

          <button onClick={() => navigate("/")} className="text-black flex flex-col items-center gap-1">
            <IoMdHome className="text-[24px]" />
            <span className="text-[12px]">Home</span>
          </button>

          <button onClick={() => navigate("/collection")} className="text-black flex flex-col items-center gap-1">
            <BsFillCollectionFill className="text-[24px]" />
            <span className="text-[12px]">Collection</span>
          </button>

          <button onClick={() => navigate("/contact")} className="text-black flex flex-col items-center gap-1">
            <MdContacts className="text-[24px]" />
            <span className="text-[12px]">Contact</span>
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="text-black flex flex-col items-center gap-1 relative"
          >
            <FaShoppingCart className="text-[24px]" />
            <span className="text-[12px]">Cart</span>

            {getCartCount() > 0 && (
              <p className="absolute -top-1 -right-2 min-w-[18px] h-[18px] bg-[#4A2E1F] text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-md">
                {getCartCount()}
              </p>
            )}
          </button>

        </div>
      </header>

    </div>
  );
}

export default Navbar;
