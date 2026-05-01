import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav.jsx";
import Sidebar from "../components/Sidebar.jsx";
import axios from "axios";
import { AuthContextData } from "../context/AuthContext.jsx";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Lists() {
  const [list, setList] = useState([]);
  const { serverUrl } = useContext(AuthContextData);
  const navigate = useNavigate();

  // Fetch Products
  const fetchProducts = async () => {
    try {
      let response = await axios.get(`${serverUrl}/api/product/list`);
      setList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Remove Product
  const removeProduct = async (productId) => {
    try {
      await axios.post(
        `${serverUrl}/api/product/remove/${productId}`,
        {},
        { withCredentials: true }
      );
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-white text-black overflow-x-hidden relative">
      <Nav />
      <Sidebar />

      <div className="w-[82%] min-h-[100vh] flex flex-col absolute right-0 top-0 mt-[45px] px-[40px] py-[30px]">

        {/* Page Heading */}
        <h1
          className="
            text-[32px] md:text-[42px]
            font-bold
            bg-gradient-to-r from-[#8B4513] to-[#D2691E]
            text-transparent bg-clip-text
            tracking-wide drop-shadow-sm
            mb-[20px]
          "
        >
          All Listed Products
        </h1>

        {/* Product List */}
        {list.length > 0 ? (
          list.map((item, index) => (
            <div
              key={index}
              className="
                w-[95%] md:w-[90%]
                bg-white
                rounded-xl
                shadow-[0_2px_10px_rgba(0,0,0,0.1)]
                border border-[#E5E5E5]
                flex items-center justify-between
                p-[15px]
                mb-[20px]
                hover:shadow-[0_4px_15px_rgba(139,69,19,0.25)]
                hover:border-[#D2691E]
                transition
              "
            >
              <div className="flex items-center gap-[20px]">
                <img
                  src={item.image1}
                  alt={item.name}
                  className="w-[90px] h-[90px] object-cover rounded-lg border"
                />

                <div className="flex flex-col">
                  <h2 className="text-[20px] font-semibold">{item.name}</h2>
                  <p className="text-[16px] text-gray-600">₹ {item.price}</p>
                  <p className="text-[14px] text-gray-500">
                    Category: {item.category}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-5 mr-[10px]">
                
                {/* Update Button */}
                <FiEdit
                  size={26}
                  className="
                    text-blue-600 cursor-pointer
                    hover:text-blue-800 transition
                  "
                  onClick={() => navigate(`/update/${item._id}`)}
                />

                {/* Delete Button */}
                <AiOutlineDelete
                  size={28}
                  className="
                    text-red-600 cursor-pointer
                    hover:text-red-800 transition
                  "
                  onClick={() => removeProduct(item._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-700 text-lg">No Products Listed Yet.</div>
        )}
      </div>
    </div>
  );
}

export default Lists;
