import { useContext } from "react";
import { ShopcontextData } from "../context/Shopcontext";
import { FaHeart } from "react-icons/fa";

function Wishlist() {
  const { wishlist, products, addToCart, removeFromWishlist } =
    useContext(ShopcontextData);

  const wishProducts = products.filter((p) => wishlist.includes(p._id));

  return (
    
    <div className="min-h-screen bg-gradient-to-b from-[#fdf6ee] to-[#f3dcc2] pt-28 px-6 md:px-16 pb-16">
      
   

      {/* Empty state */}
      {wishProducts.length === 0 ? (
        <div className="flex justify-center items-center h-[50vh]">
          <p className="text-lg text-gray-600">
            Your wishlist is empty ❤️
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishProducts.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 relative overflow-hidden"
            >
              {/* ❤️ Heart */}
              <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
                <FaHeart className="text-red-500" />
              </div>

              {/* Image */}
              <img
                src={item.image1}
                alt={item.name}
                className="h-60 w-full object-cover"
              />

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-lg line-clamp-1">
                  {item.name}
                </h3>

                <p className="font-bold mt-2 text-[#7B3F00] text-lg">
                  ₹{item.price}
                </p>

                <div className="flex justify-between items-center mt-5">
                  <button
                    onClick={() => addToCart(item._id)}
                    className="bg-[#7B3F00] text-white px-4 py-2 rounded-lg hover:bg-[#633200] transition"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="text-red-500 font-medium hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
