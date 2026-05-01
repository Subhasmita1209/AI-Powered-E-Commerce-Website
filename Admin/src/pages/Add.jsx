import React, { useContext, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Nav from '../components/Nav.jsx';
import upload from '../assets/Uploadimg.png';
import { AuthContextData } from '../context/AuthContext.jsx';
import axios from 'axios';
import { FiUpload, FiTag, FiFileText, FiDollarSign, FiCheck, FiPlus, FiBox } from 'react-icons/fi';
import { BiCategory } from 'react-icons/bi';
import { BsStarFill } from 'react-icons/bs';
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { toast } from 'react-toastify';
import Loading from '../components/Loading.jsx';

export default function Add() {
  let [image1, setImage1] = useState(false);
  let [image2, setImage2] = useState(false);
  let [image3, setImage3] = useState(false);
  let [image4, setImage4] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [price, setPrice] = useState('');
  const[bestSeller,setBestSeller]=useState(false);
  const [sizes, setSizes] = useState([]);
  const[loading,setLoading]=useState(false);
  let {serverUrl}=useContext(AuthContextData);

  const handleAddProduct = async(e) => {
    setLoading(true);
    e.preventDefault();
    try{
    const form = new FormData();
    form.append('name', name);
    form.append('description', description);
    form.append('category', category);
    form.append('subCategory', subcategory);
    form.append('price', price);
    form.append('bestSeller', bestSeller);
    form.append('sizes', JSON.stringify(sizes));
    form.append('date', Date.now());
      form.append('image1', image1);
     form.append('image2', image2);
    form.append('image3', image3);
   form.append('image4', image4);

   let result=await axios.post(serverUrl + "/api/product/addproduct", form, {
      withCredentials: true,
    
    });
    console.log(result.data);
    toast.success("Product Added Successfully");
     setLoading(false);
    if(result.data.success){
    
      
      setName('');
      setDescription('');
      setCategory('');
      setSubcategory('');
      setPrice('');
      setBestSeller(false);
      setSizes([]);
      setImage1(false);
      setImage2(false);
      setImage3(false);
      setImage4(false);

       
     
    }

    }catch(err){
      console.log(err);
        setLoading(false)
        toast.error("Adding Product Failed");
   
    }
  }

  const subCategoriesData = {
  Men: ["TopWear", "BottomWear", "WinterWear", "Ethnic Wear"],
  Women: ["TopWear", "BottomWear", "WinterWear", "Ethnic Wear"],
  Kids: ["TopWear", "BottomWear", "WinterWear"],
  SkinCare: ["Face Care", "Hair Care", "Body Lotion", "Serum"],
  Accessories: ["Bags", "Watches", "Jewellery", "Belts"]
};

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-br from-[#FFFCF7] via-[#FEF9F3] to-[#FDF6EE] text-black overflow-x-hidden relative">

      <Nav />
      <Sidebar />

      <div className="w-[82%] min-h-[100vh] flex items-start justify-start absolute right-0 pt-20 pl-8 pr-8">

        <form onSubmit={handleAddProduct} className="w-full max-w1-[100%] flex flex-col gap-10 py-8">

          {/* Beautiful Page Header */}
          <div className="relative mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Left Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#D2691E] rounded-2xl flex items-center justify-center shadow-lg shadow-[#8B4513]/20">
                      <FiPlus className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full flex items-center justify-center shadow-md">
                      <TbLayoutDashboardFilled className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-[32px] md:text-[40px] font-bold text-[#3A2F28] tracking-tight leading-tight">
                      Add New Product
                    </h1>
                    <p className="text-[16px] text-[#8B7D6B] font-medium mt-1">
                      Expand your catalog with premium products
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Section - Stats/Info */}
              <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-4">
                  <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#E6D9C8] to-transparent"></div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full animate-pulse"></div>
                      <span className="text-[14px] font-semibold text-[#8B4513] uppercase tracking-wider">Live Dashboard</span>
                    </div>
                    <p className="text-[13px] text-[#8B7D6B] mt-1">
                      Fill all fields to continue
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-[#8B4513]/5 to-transparent rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-6 w-20 h-20 bg-gradient-to-tr from-[#D2691E]/5 to-transparent rounded-full blur-xl"></div>
          </div>

          {/* Main Form Container */}
          <div className="bg-white rounded-2xl shadow-xl shadow-[#8B4513]/5 p-8 border border-[#F0E6DB] backdrop-blur-sm">

            {/* Image Upload Section */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-[#8B4513] to-[#D2691E] rounded-xl flex items-center justify-center shadow-md">
                  <FiUpload className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-[22px] font-bold text-[#3A2F28]">Product Gallery</h2>
                  <p className="text-[14px] text-[#8B7D6B] mt-1">
                    Upload high-quality images to showcase your product (PNG, JPG, WEBP up to 5MB each)
                  </p>
                </div>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex flex-col items-center">
                    <label
                      htmlFor={`image${num}`}
                      className="w-full aspect-square rounded-xl border-3 border-dashed border-[#F0E6DB] hover:border-[#8B4513] hover:bg-gradient-to-br hover:from-[#FFF8ED] hover:to-[#FDF6EE] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center group relative overflow-hidden"
                    >
                      {eval(`image${num}`) ? (
                        <>
                          <img
                            src={URL.createObjectURL(eval(`image${num}`))}
                            alt={`Preview ${num}`}
                            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <FiUpload className="w-8 h-8 text-white" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-gradient-to-br from-[#F5E9D9] to-[#F0E6DB] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                            <FiUpload className="w-8 h-8 text-[#8B4513]" />
                          </div>
                          <span className="text-[15px] font-semibold text-[#3A2F28]">Image {num}</span>
                          <span className="text-[12px] text-[#8B7D6B] mt-2 px-4 text-center">
                            {num === 1 ? "Main Image*" : "Additional Image"}
                          </span>
                        </>
                      )}
                    </label>
                    <input
                      type="file"
                      id={`image${num}`}
                      className="hidden"
                      onChange={(e) => eval(`setImage${num}`)(e.target.files[0])}
                    />
                    {eval(`image${num}`) && (
                      <button
                        type="button"
                        onClick={() => eval(`setImage${num}`)(false)}
                        className="mt-3 px-4 py-1.5 text-[12px] font-medium text-white bg-gradient-to-r from-red-500 to-rose-500 rounded-lg hover:shadow-md transition-all"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">

              {/* Product Name */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#F5E9D9] to-[#F0E6DB] rounded-xl flex items-center justify-center shadow-sm">
                    <FiTag className="w-5 h-5 text-[#8B4513]" />
                  </div>
                  <div>
                    <label className="text-[17px] font-semibold text-[#3A2F28] block">Product Name</label>
                    <p className="text-[13px] text-[#8B7D6B] mt-1">Enter a descriptive name for your product</p>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="e.g., Premium Leather Jacket"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full h-[52px] bg-white border-2 border-[#F0E6DB] rounded-xl px-5 text-[15px] text-[#3A2F28] placeholder-[#B8A99A] focus:outline-none focus:border-[#8B4513] focus:ring-2 focus:ring-[#8B4513]/20 transition-all duration-300 shadow-sm"
                />
              </div>

              {/* Product Price */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#F5E9D9] to-[#F0E6DB] rounded-xl flex items-center justify-center shadow-sm">
                    <FiDollarSign className="w-5 h-5 text-[#8B4513]" />
                  </div>
                  <div>
                    <label className="text-[17px] font-semibold text-[#3A2F28] block">Price (₹)</label>
                    <p className="text-[13px] text-[#8B7D6B] mt-1">Set the retail price for this product</p>
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[18px] font-bold text-[#8B4513]">₹</span>
                  <input
                    type="number"
                    placeholder="1999"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full h-[52px] bg-white border-2 border-[#F0E6DB] rounded-xl pl-12 pr-5 text-[15px] text-[#3A2F28] placeholder-[#B8A99A] focus:outline-none focus:border-[#8B4513] focus:ring-2 focus:ring-[#8B4513]/20 transition-all duration-300 shadow-sm"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#F5E9D9] to-[#F0E6DB] rounded-xl flex items-center justify-center shadow-sm">
                    <BiCategory className="w-5 h-5 text-[#8B4513]" />
                  </div>
                  <div>
                    <label className="text-[17px] font-semibold text-[#3A2F28] block">Category</label>
                    <p className="text-[13px] text-[#8B7D6B] mt-1">Select the main category for this product</p>
                  </div>
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full h-[52px] bg-white border-2 border-[#F0E6DB] rounded-xl px-5 text-[15px] text-[#3A2F28] focus:outline-none focus:border-[#8B4513] focus:ring-2 focus:ring-[#8B4513]/20 transition-all duration-300 shadow-sm appearance-none cursor-pointer"
                >
                  <option value="">Select Category</option>
                  <option value="Men">Men's Fashion</option>
                  <option value="Women">Women's Fashion</option>
                  <option value="Kids">Kids & Babies</option>
                  <option value="SkinCare">Skin Care</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              {/* Sub-category */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#F5E9D9] to-[#F0E6DB] rounded-xl flex items-center justify-center shadow-sm">
                    <FiBox className="w-5 h-5 text-[#8B4513]" />
                  </div>
                  <div>
                    <label className="text-[17px] font-semibold text-[#3A2F28] block">Sub-category</label>
                    <p className="text-[13px] text-[#8B7D6B] mt-1">Choose a specific sub-category</p>
                  </div>
                </div>
                <select
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  required
                  disabled={!category}
                  className={`w-full h-[52px] bg-white border-2 border-[#F0E6DB] rounded-xl px-5 text-[15px] text-[#3A2F28] focus:outline-none focus:border-[#8B4513] focus:ring-2 focus:ring-[#8B4513]/20 transition-all duration-300 shadow-sm appearance-none cursor-pointer ${!category ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <option value="">{category ? "Select Sub-category" : "Select category first"}</option>
                  {category && subCategoriesData[category]?.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Description */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F5E9D9] to-[#F0E6DB] rounded-xl flex items-center justify-center shadow-sm">
                  <FiFileText className="w-6 h-6 text-[#8B4513]" />
                </div>
                <div>
                  <h3 className="text-[18px] font-semibold text-[#3A2F28]">Product Description</h3>
                  <p className="text-[13px] text-[#8B7D6B] mt-1">
                    Describe features, benefits, and specifications in detail
                  </p>
                </div>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your product... Include features, materials, care instructions, etc."
                required
                rows="5"
                className="w-full bg-white border-2 border-[#F0E6DB] rounded-xl px-5 py-4 text-[15px] text-[#3A2F28] placeholder-[#B8A99A] focus:outline-none focus:border-[#8B4513] focus:ring-2 focus:ring-[#8B4513]/20 transition-all duration-300 shadow-sm resize-none"
              />
              <div className="flex justify-end mt-2">
                <span className="text-[12px] text-[#8B7D6B]">
                  {description.length}/500 characters
                </span>
              </div>
            </div>

            {/* Sizes (Conditional) */}
            {(category === "Men" || category === "Women" || category === "Kids") && (
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F5E9D9] to-[#F0E6DB] rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-[18px] font-bold text-[#8B4513]">S</span>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-semibold text-[#3A2F28]">Available Sizes</h3>
                    <p className="text-[13px] text-[#8B7D6B] mt-1">
                      Select all sizes available for this product
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setSizes((prev) =>
                          prev.includes(size)
                            ? prev.filter((s) => s !== size)
                            : [...prev, size]
                        );
                      }}
                      className={`
                        px-8 py-3 rounded-xl text-[15px] font-semibold border-2 transition-all duration-300
                        flex items-center gap-3 min-w-[80px] justify-center
                        ${sizes.includes(size)
                          ? "bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white border-transparent shadow-lg transform scale-105"
                          : "bg-white text-[#3A2F28] border-[#F0E6DB] hover:border-[#8B4513] hover:shadow-md hover:scale-[1.02]"
                        }
                      `}
                    >
                      {sizes.includes(size) && <FiCheck className="w-5 h-5" />}
                      {size}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-6 p-4 bg-[#FFF8ED] rounded-xl border border-[#F0E6DB]">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${sizes.length > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></div>
                    <span className="text-[14px] font-medium text-[#3A2F28]">
                      {sizes.length > 0 ? `${sizes.length} size${sizes.length > 1 ? 's' : ''} selected` : 'No sizes selected'}
                    </span>
                  </div>
                  {sizes.length > 0 && (
                    <span className="text-[14px] font-medium text-[#8B4513]">
                      {sizes.join(" • ")}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Best Seller Checkbox */}
            <div className="mb-12 p-6 bg-gradient-to-r from-[#FFF8ED] to-[#FDF6EE] rounded-xl border-2 border-[#F0E6DB] hover:border-[#8B4513] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="bestSeller"
                    checked={bestSeller}
                    onChange={(e) => setBestSeller(e.target.checked)}
                    className="absolute opacity-0 w-0 h-0"
                  />
                  <label
                    htmlFor="bestSeller"
                    className={`
                      flex items-center justify-center w-7 h-7 rounded-lg border-2 cursor-pointer transition-all duration-300
                      ${bestSeller 
                        ? 'bg-gradient-to-r from-[#8B4513] to-[#D2691E] border-transparent shadow-md' 
                        : 'bg-white border-[#E6D9C8] hover:border-[#8B4513]'
                      }
                    `}
                  >
                    {bestSeller && <FiCheck className="w-4 h-4 text-white" />}
                  </label>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <BsStarFill className="w-6 h-6 text-yellow-500 animate-pulse" />
                    <label htmlFor="bestSeller" className="text-[18px] font-bold text-[#3A2F28] cursor-pointer">
                      Mark as Best Seller
                    </label>
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-[11px] font-bold rounded-full">
                      FEATURED
                    </span>
                  </div>
                  <p className="text-[14px] text-[#8B7D6B]">
                    Best sellers get premium placement on homepage, featured sections, and promotional emails.
                    This product will be highlighted across the store for maximum visibility.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-between items-center pt-8 border-t border-[#F0E6DB]">
              <div className="text-[13px] text-[#8B7D6B]">
                <span className="font-medium text-[#3A2F28]">Note:</span> All fields marked with * are required
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setName('');
                    setDescription('');
                    setCategory('');
                    setSubcategory('');
                    setPrice('');
                    setBestSeller(false);
                    setSizes([]);
                    setImage1(false);
                    setImage2(false);
                    setImage3(false);
                    setImage4(false);
                  }}
                  className="px-6 py-3 rounded-xl text-[15px] font-medium text-[#8B4513] border-2 border-[#F0E6DB] hover:border-[#8B4513] hover:bg-[#FFF8ED] transition-all duration-300"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  className="
                    px-10 py-4 rounded-xl
                    bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#D2691E]
                    text-white font-bold text-[16px]
                    shadow-xl hover:shadow-2xl hover:shadow-[#8B4513]/30
                    hover:scale-[1.03]
                    active:scale-[0.98]
                    transition-all duration-300
                    flex items-center gap-3
                    group relative overflow-hidden
                  "
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  <span className="relative">{loading?<Loading/>:"Add Product to Store"}</span>
                </button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}