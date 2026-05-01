import React, { useContext } from "react";
import { ShopcontextData } from "../context/Shopcontext.jsx";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


function Cart() {
     const navigate = useNavigate();
  const {
    cartItem,
    products,
    currency,
    delivery_fee,
    updateQuantity,
    getCartAmount,
    
  } = useContext(ShopcontextData);

  const cartProducts = Object.keys(cartItem);
 


  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#f5e2cd] to-[#e7c3a0] py-20 px-4 md:px-16">
      {/* Page Title */}
       <h1 className="text-center text-[24px] sm:text-[28px] md:text-[36px] font-extrabold tracking-widest text-[#5b3a2c] mb-12 mt-2 sm:mb-16">
        YOUR CART
      </h1>

      {cartProducts.length === 0 ? (
        <p className="text-center text-lg text-gray-600">Your cart is empty 🛒</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartProducts.map((itemId) => {
              const product = products.find((p) => p._id === itemId);
              if (!product) return null;

              return Object.keys(cartItem[itemId]).map((key) => {
                const quantity = cartItem[itemId][key];
                const sizeLabel = key === "nosize" ? "" : `Size: ${key}`;

                return (
                  <div
                    key={itemId + key}
                    className="bg-white rounded-2xl shadow-md p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center"
                  >
                    {/* Product Image */}
                    <img
                      src={product.image1}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />

                    {/* Product Info */}
                    <div className="flex-1 w-full">
                      <h2 className="text-lg font-semibold text-[#4a2f16]">
                        {product.name}
                      </h2>
                      {sizeLabel && (
                        <p className="text-sm text-gray-500 mt-1">{sizeLabel}</p>
                      )}
                      <p className="text-md font-medium mt-2">
                        {currency}{product.price}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(itemId, key === "nosize" ? null : key, quantity - 1)
                        }
                        className="p-2 rounded-full bg-[#f3e0c7] hover:bg-[#e8c9a3]"
                      >
                        <FiMinus />
                      </button>
                      <span className="font-semibold w-6 text-center">{quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(itemId, key === "nosize" ? null : key, quantity + 1)
                        }
                        className="p-2 rounded-full bg-[#f3e0c7] hover:bg-[#e8c9a3]"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        updateQuantity(itemId, key === "nosize" ? null : key, 0)
                      }
                      className="text-red-500 hover:text-red-600"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                );
              });
            })}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
            <h2 className="text-xl font-semibold text-[#4a2f16] mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-3 text-gray-700">
              <span>Subtotal</span>
              <span>{currency}{getCartAmount()}</span>
            </div>

            <div className="flex justify-between mb-3 text-gray-700">
              <span>Delivery Fee</span>
              <span>{currency}{delivery_fee}</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-lg font-semibold text-[#4a2f16]">
              <span>Total</span>
              <span>{currency}{getCartAmount() + delivery_fee}</span>
            </div>

           <button
  className="w-full mt-6 py-3 rounded-xl bg-[#c58b5a] text-white font-medium hover:bg-[#b1794a] transition"
  onClick={() => {
    if (Object.keys(cartItem).length > 0) {
      navigate("/placeorder");
    } else {
      console.log("Your cart is empty!");
    }
  }}
>
  Proceed to Checkout
</button>

          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
