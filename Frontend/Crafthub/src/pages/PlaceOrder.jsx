import React, { useContext, useState } from "react";
import { ShopcontextData } from "../context/Shopcontext.jsx";
import paypalImg from "../assets/paypalLogo.png";
import { AuthContextData } from "../context/Authcontext.jsx";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const {
    currency,
    delivery_fee,
    getCartAmount,
    cartItem,
    setCartItem,
    products,
  } = useContext(ShopcontextData);

  const { serverUrl } = useContext(AuthContextData);
  const navigate = useNavigate();

  const [method, setMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  /* ---------------- TOTAL ---------------- */
  const totalAmount = getCartAmount() + delivery_fee;
  const USD_RATE = 83;
  const totalAmountUSD = (totalAmount / USD_RATE).toFixed(2);

  /* ---------------- BUILD ITEMS ---------------- */
  const buildOrderItems = () => {
    let orderItems = [];
    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        if (cartItem[productId][size] > 0) {
          const product = structuredClone(
            products.find((p) => p._id === productId)
          );
          if (product) {
            product.size = size;
            product.quantity = cartItem[productId][size];
            orderItems.push(product);
          }
        }
      }
    }
    return orderItems;
  };

  /* ---------------- COD ---------------- */
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (method !== "cod") return;

    try {
      const orderData = {
        amount: totalAmount,
        items: buildOrderItems(),
        address: formData,
        paymentMethod: "COD",
      };

      const res = await axios.post(
        `${serverUrl}/api/order/placeorder`,
        orderData,
        { withCredentials: true }
      );

      if (res.data) {
        setCartItem({});
        navigate("/order");
      }
    } catch (err) {
      console.error("COD error:", err);
    }
  };

  /* ---------------- PAYPAL SUCCESS ---------------- */
  const handlePaypalSuccess = async (orderID) => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/order/paypal/capture`,
        {
          orderID,
          items: buildOrderItems(),
          address: formData,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setCartItem({});
        navigate("/order");
      }
    } catch (err) {
      console.error("PayPal error:", err);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#f5e2cd] to-[#e7c3a0] py-20 px-4 md:px-16">
      <h1 className="text-center text-[28px] md:text-[36px] font-extrabold text-[#5b3a2c] mb-10">
        PLACE ORDER
      </h1>

      <form onSubmit={onSubmitHandler}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* DELIVERY */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 md:p-10">
            <h2 className="text-xl font-semibold mb-6">Delivery Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input name="firstName" placeholder="First name" onChange={handleChange} className="input-style" />
              <input name="lastName" placeholder="Last name" onChange={handleChange} className="input-style" />
            </div>

            <input name="email" placeholder="Email" onChange={handleChange} className="input-style mt-5" />
            <input name="street" placeholder="Street" onChange={handleChange} className="input-style mt-5" />

            <div className="grid grid-cols-2 gap-5 mt-5">
              <input name="city" placeholder="City" onChange={handleChange} className="input-style" />
              <input name="state" placeholder="State" onChange={handleChange} className="input-style" />
            </div>

            <div className="grid grid-cols-2 gap-5 mt-5">
              <input name="pincode" placeholder="Pincode" onChange={handleChange} className="input-style" />
              <input name="country" placeholder="Country" onChange={handleChange} className="input-style" />
            </div>

            <input name="phone" placeholder="Phone" onChange={handleChange} className="input-style mt-5" />
          </div>

          {/* PAYMENT */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Cart Total</h2>
              <div className="flex justify-between">
                <span>Total</span>
                <span>{currency}{totalAmount}</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

              <div className="flex gap-4 mb-6">
               <button
  type="button"
  onClick={() => setMethod("paypal")}
  className={`payment-btn ${
    method === "paypal" ? "payment-active" : "payment-inactive"
  }`}
>
  <img src={paypalImg} alt="paypal" className="paypal-logo" />
</button>


                <button type="button" onClick={() => setMethod("cod")}
                  className={`px-6 rounded-xl ${method === "cod" ? "bg-[#c58b5a] text-white" : "border"}`}>
                  CASH ON DELIVERY
                </button>
              </div>

              {method === "cod" && (
                <button type="submit"
                  className="w-full py-3 rounded-xl bg-[#c58b5a] text-white">
                  PLACE ORDER
                </button>
              )}

              {method === "paypal" && (
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={async () => {
                    const res = await axios.post(
                      `${serverUrl}/api/order/paypal/create`,
                      { amount: totalAmountUSD },
                      { withCredentials: true }
                    );
                    return res.data.id;
                  }}
                  onApprove={(data) => handlePaypalSuccess(data.orderID)}
                />
              )}
            </div>
          </div>
        </div>
      </form>

     <style>{`
  .input-style {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid #e0c9a6;
    background: #fffaf3;
  }

  .payment-btn {
    width: 70%;
    height: 60px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .payment-inactive {
    border: 2px solid #e5e5e5;
    background: #ffffff;
  }

  .payment-active {
    border: 3px solid #5b8cff;
    background: #f0f5ff;
    box-shadow: 0 6px 18px rgba(91, 140, 255, 0.3);
  }

  .payment-active-cod {
    background: #c58b5a;
    color: white;
    box-shadow: 0 6px 18px rgba(197, 139, 90, 0.35);
  }

  .paypal-logo {
    height: 60px;
    width: 110px;
    object-fit: contain;
  }

  .payment-btn:hover {
    transform: translateY(-1px);
  }

  .payment-btn:active {
    transform: scale(0.98);
  }
`}</style>

    </div>
  );
}

export default PlaceOrder;
