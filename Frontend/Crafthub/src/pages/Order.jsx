import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopcontextData } from "../context/Shopcontext.jsx";
import { AuthContextData } from "../context/Authcontext.jsx";

function Order() {
  const [orderData, setOrderData] = useState([]);
  const { currency } = useContext(ShopcontextData);
  const { serverUrl } = useContext(AuthContextData);

  const loadOrderData = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/userorder`,
        {},
        { withCredentials: true }
      );

      if (result.data) {
        let allOrdersItem = [];

        result.data.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#f6e3cd] to-[#efd0ae] py-20 px-4 md:px-16">
      <h1 className="text-center text-[28px] md:text-[36px] font-bold tracking-widest text-[#6b3f24] mb-14">
        MY ORDERS
      </h1>

      <div className="max-w-6xl mx-auto space-y-8">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="
              flex flex-col md:flex-row items-center gap-6
              bg-white rounded-2xl p-6
              shadow-[0_8px_30px_rgba(0,0,0,0.08)]
            "
          >
            {/* Product Image */}
            <img
              src={item.image1}
              alt={item.name}
              className="w-[90px] h-[110px] object-cover rounded-xl bg-[#f4f4f4]"
            />

            {/* Product Details */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-[#4a2e1a] mb-1">
                {item.name}
              </h2>

              <p className="text-sm text-[#8a5a3c] mb-2">
                Size: {item.size}
              </p>

              <div className="flex flex-wrap gap-6 text-sm font-medium text-[#4a2e1a] mb-2">
                <span>
                  {currency}
                  {item.price}
                </span>
                <span>Qty: {item.quantity}</span>
              </div>

              <p className="text-sm text-[#8a5a3c]">
                Date:
                <span className="pl-1">
                  {new Date(item.date).toDateString()}
                </span>
              </p>

              <p className="text-sm text-[#8a5a3c]">
                Payment: {item.paymentMethod.toUpperCase()}
              </p>
            </div>

<div className="flex flex-col items-end justify-between h-full pr-6 md:pr-8">
  {/* Status */}
  <div className="flex items-center gap-2">
    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
    <span className="text-sm font-medium text-[#4a2e1a]">
      {item.status}
    </span>
  </div>

  {/* Button */}
  <button
    onClick={loadOrderData}
    className="
      mt-6
      px-7 py-2.5
      rounded-lg
      bg-[#c78f5c]
      text-white
      text-sm font-medium
      hover:bg-[#b57c4a]
      active:scale-95
      transition-all
    "
  >
    Track Order
  </button>
</div>


          </div>
        ))}

        {/* Empty State */}
        {orderData.length === 0 && (
          <p className="text-center text-[#6b3f24] mt-20 text-lg">
            No orders found
          </p>
        )}
      </div>
    </div>
  );
}

export default Order;
