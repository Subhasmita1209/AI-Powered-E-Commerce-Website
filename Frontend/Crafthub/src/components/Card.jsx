import React, { useContext, useEffect, useState } from 'react';
import { ShopcontextData } from "../context/Shopcontext.jsx";
import { FiShoppingBag, FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function Card({ name, image, id, price }) {
  const { currency, wishlist, addToWishlist, removeFromWishlist } =
  useContext(ShopcontextData);

  const [isHovered, setIsHovered] = useState(false);
  
  let navigate = useNavigate();
    const isLiked = wishlist.includes(id);

      const handleLikeToggle = (e) => {
    e.stopPropagation();
    isLiked ? removeFromWishlist(id) : addToWishlist(id);
  };
  
  return (
    <div 
      className="
        group relative
        w-[300px] max-w-[90%]
        bg-white
        rounded-2xl
        shadow-md hover:shadow-2xl
        transition-all duration-500
        overflow-hidden
        border border-gray-100
        hover:border-[#E6D9C8]
        cursor-pointer
        flex flex-col
      "
      
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/productdetail/${id}`)}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={name}
          className="
            w-full h-full
            object-cover
            group-hover:scale-110
            transition-transform duration-700
          "
        />
        
        {/* ✅ Functional Like Button */}
        <button
          onClick={handleLikeToggle}
          className="
            absolute top-4 right-4
            w-10 h-10
            bg-white/80 backdrop-blur-sm
            rounded-full
            flex items-center justify-center
            shadow-md
            hover:bg-white
            hover:scale-110
            transition-all duration-300
            z-0
          "
        >
          <FiHeart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Product Name */}
        <h3 className="
          text-[#3A2F28]
          text-lg font-bold
          mb-2
          line-clamp-2
          group-hover:text-[#8B4513]
          transition-colors duration-300
        ">
          {name}
        </h3>

        {/* Price Section */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="
              text-2xl font-bold
              text-[#8B4513]
            ">
              {currency}{price}
            </span>
          </div>

          {/* Add to Cart Button (UNCHANGED) */}
          <button
            className="
              px-4 py-2
              bg-[#8B4513]
              text-white
              rounded-lg
              hover:bg-[#A0522D]
              transition-all duration-300
              flex items-center gap-2
              font-medium
              hover:scale-105
              active:scale-95
            "
          >
            <FiShoppingBag className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
