import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopcontextData } from "../context/Shopcontext";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { toast } from "react-toastify";
import ReviewList from "../components/ReviewList";
import { AuthContextData } from "../context/Authcontext";
import { UserDataContext } from "../context/Usercontext";
import axios from "axios";


function ProductDetails() {
  let { productId } = useParams();
  let { products, currency, addToCart, wishlist,
  addToWishlist,
  removeFromWishlist } = useContext(ShopcontextData);
  const { user } = useContext(AuthContextData);

  let [productData, setProductData] = useState(false);

  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [size, setSize] = useState("");

  const { serverUrl } = useContext(AuthContextData);
  const{userData}=useContext(UserDataContext);

const [rating, setRating] = useState(5);
const [comment, setComment] = useState("");




  const fetchProductData = async () => {
    products.find((item) => {
      if (item._id === productId) {
        setProductData(item);

        const imageArray = [
          item.image1,
          item.image2,
          item.image3,
          item.image4,
        ].filter(Boolean);

        setImages(imageArray);
        setImage(imageArray[0] || "");

        if (item.sizes && item.sizes.length > 0) {
          setSize(item.sizes[0]);
        }

        return null;
      }
    });
  };

  const handleAddToCart = () => {
    console.log("🖱️ Add To Cart button clicked");

    if (!productData) {
      toast.error("Product not found");
      return;
    }

    if (productData.sizes?.length > 0 && !size) {
      toast.warning("Please select a size first 👕");
      return;
    }

    try {
      addToCart(productData._id, size || null);

      toast.success("Added to cart successfully ", {
        icon: "✅",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product ");
    }
  };


  const submitReview = async () => {
  if (!userData) {
    toast.error("Login required to review");
    return;
  }

  if (!comment.trim()) {
    toast.warning("Please write a comment");
    return;
  }

  try {
   await axios.post(
  `${serverUrl}/api/reviews/${productId}`,
  { rating, comment },
  {
   
    withCredentials: true
  }
);
    toast.success("Review submitted");
    setComment("");
  } catch (err) {
  console.error(err);

  if (err.response?.data?.message) {
    toast.error(err.response.data.message);
  } else {
    toast.error("Failed to submit review");
  }
}
};


const handleWishlistToggle = () => {
  if (!productData) return;

  try {
    if (wishlist.includes(productData._id)) {
      removeFromWishlist(productData._id);
      toast.info("Removed from wishlist ");
    } else {
      addToWishlist(productData._id);
      toast.success("Added to wishlist ");
    }
  } catch (error) {
    console.error(error);
    toast.error("Wishlist update failed");
  }
};


  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!productData) return null;

  return (
    <>
      {/* PRODUCT DETAILS */}
      <div className="w-full min-h-screen bg-gradient-to-b from-[#FFF4E6] via-[#F7E2CC] to-[#EED2B7] py-16 px-4 flex justify-center mt-10 sm:mt-16">
        <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">

          {/* LEFT IMAGE SECTION */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">

            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 order-2 md:order-1 justify-center">
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setImage(img)}
                  className={`p-1 rounded-xl cursor-pointer border-2 transition ${image === img ? "border-[#4A2E1F]" : "border-[#D6BFA6]"
                    }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] object-cover rounded-lg bg-white"
                  />
                </div>
              ))}
            </div>

            {/* Big Image */}
            <div className="flex-1 bg-white rounded-3xl shadow-2xl p-4 sm:p-6 flex items-center justify-center order-1 md:order-2">
              <div className="w-full max-w-[420px] h-[340px] sm:h-[520px] flex items-center justify-center overflow-hidden rounded-2xl bg-white">
                {image && (
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>
          </div>

          {/* RIGHT PRODUCT DETAILS */}
          <div className="text-[#4A2E1F] flex flex-col gap-6">

            {/* ADDED SPACING HERE */}
            <h1 className="text-[28px] sm:text-[34px] md:text-[38px] font-extrabold tracking-wide uppercase leading-tight mt-4 sm:mt-6">
              {productData.name}
            </h1>

            <div className="flex items-center gap-2 text-[18px] sm:text-[20px] font-semibold text-[#B8860B]">
              ★ ★ ★ ★ ☆
              <span className="text-sm text-[#7A5743]">(124 Reviews)</span>
            </div>

            <div className="flex items-center gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold">
                {currency}{productData.price}
              </h2>
              <span className="text-[#9C7A5F] line-through">
                {currency}{parseInt(productData.price) + 300}
              </span>
            </div>

            <p className="text-[#6B4A3A] text-[15px] leading-relaxed max-w-[500px]">
              {productData.description}
            </p>

            {/* SIZE OPTIONS */}
            {productData.sizes?.length > 0 && (
              <div>
                <p className="text-lg font-semibold mb-3">Select Size</p>

                <div className="flex gap-3 flex-wrap">
                  {productData.sizes.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setSize(item)}
                      className={`px-4 sm:px-5 py-2 rounded-xl font-semibold border transition-all duration-200 ${size === item
                          ? "bg-[#4A2E1F] text-white border-[#4A2E1F] scale-105"
                          : "bg-white text-[#4A2E1F] border-[#D6BFA6] hover:bg-[#F3E2C7]"
                        }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button className="flex items-center justify-center gap-2 px-8 py-3 bg-[#4A2E1F] text-white text-sm uppercase font-semibold rounded-xl shadow-lg hover:bg-[#3A2419] transition" onClick={handleAddToCart}>
                <FiShoppingCart size={18} />
                Add to Cart
              </button>

              <button className="flex items-center justify-center gap-2 px-8 py-3 border-2 border-[#4A2E1F] text-[#4A2E1F] text-sm uppercase font-semibold rounded-xl hover:bg-[#4A2E1F] hover:text-white transition" onClick={handleWishlistToggle}>
                <FiHeart size={18} />
                {wishlist.includes(productData._id)
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEW SECTION */}
      <div className="w-full flex justify-center px-4 py-20 bg-gradient-to-b from-[#FFF4E6] via-[#F7E2CC] to-[#EED2B7]">
        <div className="w-full max-w-[1200px] bg-white rounded-3xl shadow-xl p-6 sm:p-12 border border-[#E8D8C8]">

          <h2 className="text-2xl sm:text-3xl font-bold text-[#4A2E1F] border-b pb-5 mb-10">
            Rating & Reviews
          </h2>

          <div className="flex flex-col md:flex-row justify-between gap-12 mb-14">

            {/* Left Summary */}
            <div className="flex gap-8 items-start">
              <div className="text-center">
                <h1 className="text-6xl sm:text-7xl font-black text-[#4A2E1F]">5.0</h1>
                <div className="text-[#B8860B] text-xl sm:text-2xl mt-2">★★★★★</div>
                <p className="text-sm text-[#7A5743] mt-1">(01 Ratings)</p>
              </div>

              <div className="flex flex-col gap-3 mt-3">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-4">
                    <span className="text-sm text-[#4A2E1F] w-8">{star} ★</span>
                    <div className="w-[180px] sm:w-[220px] bg-[#EEDCC7] rounded-full h-2 overflow-hidden">
                      <div className="bg-[#D4AF37] h-full w-[80%] rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="flex items-center">
              <button className="px-8 sm:px-10 py-3 rounded-xl border-2 border-[#4A2E1F] text-[#4A2E1F] font-semibold hover:bg-[#4A2E1F] hover:text-white transition shadow-md">
                Write Review
              </button>
            </div>
          </div>

          {/* Review Form */}
<div className="bg-[#FFF8EF] rounded-2xl p-6 sm:p-10 shadow-lg border border-[#F0DEC5]">

  <h3 className="text-xl sm:text-2xl font-bold text-[#4A2E1F] mb-5">
    Write a Review
  </h3>

  {/* Star Selector */}
  <div className="flex gap-2 text-3xl mb-6 cursor-pointer">
    {[1,2,3,4,5].map((star) => (
      <span
        key={star}
        onClick={() => setRating(star)}
        className={star <= rating ? "text-[#D4AF37]" : "text-gray-300"}
      >
        ★
      </span>
    ))}
  </div>

  <textarea
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    placeholder="Share your experience about this product..."
    className="w-full h-[150px] rounded-xl border border-[#D6BFA6] p-4"
  />

  <div className="mt-6">
    <button
      onClick={submitReview}
      className="px-10 py-3 bg-[#4A2E1F] text-white rounded-xl font-semibold hover:bg-[#3A2419]"
    >
      Submit Review
    </button>
  </div>

</div>
<div className="mt-12">
  <ReviewList productId={productId} />
</div>


        </div>
      </div>
    </>
  );
}

export default ProductDetails;
