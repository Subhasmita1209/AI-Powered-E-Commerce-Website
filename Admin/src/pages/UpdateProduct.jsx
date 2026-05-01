import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import Sidebar from "../components/Sidebar.jsx";
import axios from "axios";
import { AuthContextData } from "../context/AuthContext.jsx";

function UpdateProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { serverUrl } = useContext(AuthContextData);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    sizes: [],
    bestSeller: false,
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories] = useState([
    "Women's Wear",
    "Men's Wear",
    "Kid's Wear",
    "Accessories",

  ]);
  
  const [sizes] = useState([ "S", "M", "L", "XL", "XXL"]);
  const [subCategories, setSubCategories] = useState([]);

  // Category to subcategory mapping
  const categorySubMap = {
    "Women's Wear": ["Dresses", "Tops", "Bottoms"],
    "Men's Wear": ["Shirts", "Pants", "Jackets", "Suits"],
    "Kid's Wear": ["Baby", "Toddler", "Children"],
    "Accessories": ["Jewelry", "Bags", "Watches", "Belts"],
   
  };

  // Fetch product details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${serverUrl}/api/product/list`);
        const current = res.data.find((p) => p._id === productId);
        if (current) {
          setProduct(current);
          
          // If product has category, update subcategories
          if (current.category && categorySubMap[current.category]) {
            setSubCategories(categorySubMap[current.category]);
          }
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [productId, serverUrl]);

  // Update subcategories when category changes
  useEffect(() => {
    if (product.category && categorySubMap[product.category]) {
      setSubCategories(categorySubMap[product.category]);
    } else {
      setSubCategories([]);
    }
  }, [product.category]);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle size selection
  const handleSizeToggle = (size) => {
    setProduct(prev => {
      const newSizes = prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: newSizes };
    });
  };

  // Submit update
 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("subCategory", product.subCategory);
    formData.append("sizes", JSON.stringify(product.sizes));
    formData.append("bestSeller", product.bestSeller);

    // ⚠ Only append images if user selected new ones
    if (product.image1) formData.append("image1", product.image1);
    if (product.image2) formData.append("image2", product.image2);
    if (product.image3) formData.append("image3", product.image3);
    if (product.image4) formData.append("image4", product.image4);

    await axios.put(
      `${serverUrl}/api/product/update/${productId}`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
      console.log("Update Success:");
    console.log("Updated Product:", product);
    navigate("/lists");

  } catch (err) {
    console.error("Update error:", err.response?.data || err.message);
    setIsSubmitting(false);
  }
};

   if (loading) {
    return (
      <div className="w-[100vw] min-h-[100vh] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

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
            mb-[30px]
          "
        >
          Update Product
        </h1>

        {/* Form Container */}
        <div
          className="
            w-[95%] md:w-[90%]
            bg-white
            rounded-xl
            shadow-[0_2px_10px_rgba(0,0,0,0.1)]
            border border-[#E5E5E5]
            p-[25px]
            hover:shadow-[0_4px_15px_rgba(139,69,19,0.25)]
            hover:border-[#D2691E]
            transition
          "
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div className="space-y-2">
              <label className="text-[18px] font-semibold text-gray-800">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="
                  w-full p-3
                  border border-[#E5E5E5] rounded-lg
                  focus:border-[#D2691E] focus:ring-2 focus:ring-[#D2691E]/20
                  focus:outline-none transition
                "
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-[18px] font-semibold text-gray-800">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="0"
                step="0.01"
                className="
                  w-full p-3
                  border border-[#E5E5E5] rounded-lg
                  focus:border-[#D2691E] focus:ring-2 focus:ring-[#D2691E]/20
                  focus:outline-none transition
                "
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-[18px] font-semibold text-gray-800">
                Description
              </label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Describe your product..."
                rows="4"
                className="
                  w-full p-3
                  border border-[#E5E5E5] rounded-lg
                  focus:border-[#D2691E] focus:ring-2 focus:ring-[#D2691E]/20
                  focus:outline-none transition resize-none
                "
              />
            </div>

            {/* Category & Subcategory */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div className="space-y-2">
                <label className="text-[18px] font-semibold text-gray-800">
                  Category
                </label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="
                    w-full p-3
                    border border-[#E5E5E5] rounded-lg
                    focus:border-[#D2691E] focus:ring-2 focus:ring-[#D2691E]/20
                    focus:outline-none transition bg-white
                  "
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {product.category && (
                  <p className="text-sm text-[#D2691E] font-medium">
                    Currently selected: <span className="font-bold">{product.category}</span>
                  </p>
                )}
              </div>

              {/* Subcategory */}
              <div className="space-y-2">
                <label className="text-[18px] font-semibold text-gray-800">
                  Subcategory
                </label>
                <select
                  name="subCategory"
                  value={product.subCategory}
                  onChange={handleChange}
                  disabled={!product.category}
                  className="
                    w-full p-3
                    border border-[#E5E5E5] rounded-lg
                    focus:border-[#D2691E] focus:ring-2 focus:ring-[#D2691E]/20
                    focus:outline-none transition bg-white
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  <option value="">Select Subcategory</option>
                  {subCategories.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
                {product.subCategory && (
                  <p className="text-sm text-[#D2691E] font-medium">
                    Currently selected: <span className="font-bold">{product.subCategory}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-3">
              <label className="text-[18px] font-semibold text-gray-800">
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={`
                      px-5 py-2 rounded-lg font-semibold transition
                      ${product.sizes.includes(size)
                        ? 'bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {product.sizes.length > 0 && (
                <p className="text-sm text-[#D2691E] font-medium">
                  Selected sizes: <span className="font-bold">{product.sizes.join(", ")}</span>
                </p>
              )}
            </div>

            {/* Bestseller Checkbox */}
            <div className="flex items-center gap-3 p-3 border border-[#E5E5E5] rounded-lg">
              <input
                type="checkbox"
                name="bestSeller"
                id="bestSeller"
                checked={product.bestSeller}
                onChange={handleChange}
                className="
                  w-5 h-5
                  text-[#D2691E]
                  border-gray-300 rounded
                  focus:ring-[#D2691E]
                  focus:ring-2
                "
              />
              <label htmlFor="bestseller" className="text-[16px] font-semibold text-gray-800">
                Mark as Bestseller
              </label>
              {product.bestSeller && (
                <span className="ml-auto text-sm text-[#D2691E] font-medium">
                  ★ Currently marked as bestseller
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#E5E5E5]">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  flex-1 py-3 px-6 rounded-lg font-bold text-lg transition
                  ${isSubmitting 
                    ? 'bg-gradient-to-r from-[#8B4513]/80 to-[#D2691E]/80 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#8B4513] to-[#D2691E] hover:shadow-md'
                  }
                  text-white
                `}
              >
                {isSubmitting ? 'Updating...' : 'Update Product'}
              </button>

              <button
                type="button"
                onClick={() => navigate("/lists")}
                className="
                  flex-1 py-3 px-6
                  border border-gray-300
                  text-gray-700 rounded-lg
                  font-bold text-lg
                  hover:bg-gray-50 transition
                "
              >
                Cancel
              </button>
            </div>
          </form>

         
         
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;