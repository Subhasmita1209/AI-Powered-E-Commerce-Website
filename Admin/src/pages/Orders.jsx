import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav.jsx";
import Sidebar from "../components/Sidebar.jsx";
import axios from "axios";
import { AuthContextData } from "../context/AuthContext.jsx";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { serverUrl } = useContext(AuthContextData);

  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/order/list`,
        {},
        { withCredentials: true }
      );
      setOrders(res.data.reverse());
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await axios.post(
        `${serverUrl}/api/order/status`,
        { orderId, status },
        { withCredentials: true }
      );
      await fetchOrders();
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-[100vw] min-h-screen bg-white text-black overflow-x-hidden relative">
      <Nav />
      <Sidebar />

      <div className="w-[82%] min-h-screen absolute right-0 top-0 mt-[45px] px-[40px] py-[30px]">
        <h1 className="text-[34px] md:text-[42px] font-bold text-[#9A4A14] mb-[30px]">
          All Orders
        </h1>

        {orders.length > 0 ? (
          orders.map((order, index) => {

            const orderItems =
              order.items?.length > 0
                ? order.items
                : order.cartItems?.length > 0
                  ? order.cartItems
                  : order.products?.length > 0
                    ? order.products
                    : [];


            if (orderItems.length === 0) return null;

            const totalItems = orderItems.reduce(
              (sum, item) => sum + (item.quantity || 1),
              0
            );

            return (
              <div
                key={order._id}
                className="
                  w-[95%]
                  bg-white
                  rounded-xl
                  border border-[#E8C9A8]
                  shadow-sm
                  p-[20px]
                  mb-[20px]
                  flex justify-between items-center
                  hover:shadow-md
                  transition
                "
              >
                {/* LEFT */}
                <div className="flex gap-[20px] items-center">
                  <div className="w-[60px] h-[60px] border rounded-lg flex items-center justify-center bg-[#FFF7ED]">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
                      alt="order"
                      className="w-[32px]"
                    />
                  </div>

                  <div className="space-y-[4px]">
                    {orderItems.map((item, i) => (
                      <p
                        key={i}
                        className="text-[15px] font-semibold text-gray-800"
                      >
                        {item.name} × {item.quantity || 1}
                        {item.size && (
                          <span className="text-gray-500 font-normal">
                            {" "}({item.size})
                          </span>
                        )}
                      </p>
                    ))}

                    <p className="text-[14px] text-gray-600">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p className="text-[14px] text-gray-500">
                      {order.address.city}, {order.address.state} –{" "}
                      {order.address.pincode}
                    </p>
                    <p className="text-[14px] text-gray-500">
                      {order.address.phone}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-[30px] min-w-[320px]">
                  <div className="text-right space-y-[8px] text-[14px] text-gray-700">
                    <p>
                      <span className="font-semibold">Items:</span>{" "}
                      {totalItems}
                    </p>
                    <p>
                      <span className="font-semibold">Method:</span>{" "}
                      {order.paymentMethod}
                    </p>

                    <p>
                      <span className="font-semibold">Payment:</span>{" "}
                      {order.paymentMethod?.toUpperCase() === "PAYPAL" ? (
                        <span className="text-green-600 font-semibold">Success</span>
                      ) : (
                        <span className="text-orange-600 font-semibold">Pending</span>
                      )}
                    </p>


                    <p className="text-gray-500">
                      <span className="font-semibold">Date:</span>{" "}
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                    <p className="text-[18px] font-semibold text-black">
                      {order.paymentMethod === "PAYPAL" ? `$${order.amount}` : `₹${order.amount}`}
                    </p>



                  </div>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="
                      px-[12px]
                      py-[8px]
                      bg-slate-100
                      rounded-lg
                      border border-[#E8C9A8]
                      text-[14px]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#D2691E]
                    "
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">
                      Out for delivery
                    </option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-600 text-lg">No Orders Found</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
