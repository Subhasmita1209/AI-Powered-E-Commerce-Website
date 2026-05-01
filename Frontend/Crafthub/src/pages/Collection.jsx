import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopcontextData } from '../context/Shopcontext'
import Card from '../components/Card.jsx'

function Collection() {
  let [showFilter, setShowFilter] = useState(false)
  
  const { 
    products, search, showSearch,
    aiCategory, setAiCategory,       // ← new
    aiSubCategory, setAiSubCategory, // ← new
    aiMaxPrice, setAiMaxPrice,
    aiMinPrice, setAiMinPrice,
  aiBestSeller, setAiBestSeller,
  aiSize, setAiSize,        // ← new
  } = useContext(ShopcontextData)

  let [filterProduct, setFilterProduct] = useState([])
  let [category, setCategory] = useState([])
  let [subCategory, setSubCategory] = useState([])
  let [sortType, setSortType] = useState("relevant")

  const subCategoriesData = {
    Men: ["TopWear", "BottomWear", "WinterWear", "Ethnic Wear"],
    Women: ["TopWear", "BottomWear", "WinterWear", "Ethnic Wear"],
    Kids: ["TopWear", "BottomWear", "WinterWear"],
    SkinCare: ["Face Care", "Hair Care", "Body Lotion", "Serum"],
    Accessories: ["Bags", "Watches", "Jewellery", "Belts"]
  }

  const toggleCategory = (e) => {
    setAiCategory([]) // clear AI filters when user manually filters
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    setAiSubCategory([]) // clear AI filters when user manually filters
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    if (!products) return
    let productCopy = [...products]

    // Search filter
    if (showSearch && search) {
  const words = search.toLowerCase().split(" ");

  productCopy = productCopy.filter(item => {
    const text = (item.name + " " + item.description).toLowerCase();

    return words.every(word => text.includes(word));
  });
}
    

    // Use AI category if set, else use manual checkbox category
    const activeCategory = aiCategory.length > 0 ? aiCategory : category
    if (activeCategory.length > 0) {
      productCopy = productCopy.filter(item =>
        activeCategory.includes(item.category)
      )
    }

    // Use AI subCategory if set, else use manual checkbox subCategory
    const activeSubCategory = aiSubCategory.length > 0 ? aiSubCategory : subCategory
    if (activeSubCategory.length > 0) {
      productCopy = productCopy.filter(item =>
        activeSubCategory.includes(item.subCategory)
      )
    }

    // AI price filter (only from voice)
    if (aiMaxPrice) {
      productCopy = productCopy.filter(item => item.price <= aiMaxPrice)
    }

  // Min price
  if (aiMinPrice) {
    productCopy = productCopy.filter(item => item.price >= aiMinPrice)
  }

  // Best seller
  if (aiBestSeller) {
    productCopy = productCopy.filter(item => item.bestSeller === true)
  }

  // Size
  if (aiSize) {
    productCopy = productCopy.filter(item =>
      item.sizes.includes(aiSize)
    )
  }

    setFilterProduct(productCopy)
  }

  useEffect(() => {
    if (products) setFilterProduct(products)
  }, [products])

  // Re-run filter whenever any filter changes — including AI ones
  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch, aiCategory, aiSubCategory, aiMaxPrice,aiMinPrice, aiBestSeller, aiSize])

  const sortProducts = () => {
    let fbcopy = filterProduct.slice()
    switch (sortType) {
      case 'low-high':
        setFilterProduct(fbcopy.sort((a, b) => a.price - b.price))
        break
      case 'high-low':
        setFilterProduct(fbcopy.sort((a, b) => b.price - a.price))
        break
      default:
        applyFilter()
        break
    }
  }

  useEffect(() => {
    sortProducts()
  }, [sortType])

  return (
    <div className='w-[99vw] min-h-[100vh] bg-white flex flex-col md:flex-row justify-start overflow-x-hidden z-[2] pb-[100px]'>

      {/* SIDEBAR */}
      <div className='md:w-[28vw] lg:w-[20vw] w-[100vw] h-auto md:h-[100vh] overflow-y-auto scrollbar-thumb-[#8B4513]/40 scrollbar-track-[#F7EEDC] p-6 border-r bg-[#F7EEDC] shadow-xl text-[#5A4632] lg:fixed top-0 mt-[70px] md:mt-0'>

        <button
          className='md:hidden w-full bg-[#8B572A] text-white py-3 px-4 rounded-lg shadow-lg text-[18px] font-semibold'
          onClick={() => setShowFilter(prev => !prev)}
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>

        <p className='text-[30px] font-semibold tracking-wide gap-2 items-center mt-18 ml-15 hidden md:flex'
          onClick={() => setShowFilter(prev => !prev)}>
          FILTERS
        </p>

        {/* ✅ Show active AI filter badge */}
        {(aiCategory.length > 0 || aiSubCategory.length > 0 || aiMaxPrice) && (
          <div className='mt-3 px-3 py-2 bg-[#8B572A]/10 border border-[#8B572A]/30 rounded-lg flex items-center justify-between'>
            <span className='text-[13px] text-[#8B572A] font-medium'>
              🎙️ Arina filtered: {[...aiCategory, ...aiSubCategory, aiMaxPrice ? `under ₹${aiMaxPrice}` : ''].filter(Boolean).join(', ')}
            </span>
            <button
              className='text-[12px] text-[#8B4513] underline ml-2'
              onClick={() => { setAiCategory([]); setAiSubCategory([]); setAiMaxPrice(null) }}
            >
              Clear
            </button>
          </div>
        )}

        {/* CATEGORIES */}
        <div className={`px-5 py-4 mt-6 rounded-xl bg-[#FFF7EB] border border-[#E4D4BC] shadow-md ${showFilter ? "" : "hidden"} md:block`}>
          <p className='text-[18px] font-semibold mb-3 text-[#4A3B2E]'>CATEGORIES</p>
          <div className='w-full flex flex-col gap-3'>
            {['Men', 'Women', 'Kids', 'SkinCare', 'Accessories'].map((cat, i) => (
              <p key={cat} className='flex items-center gap-3 text-[15px] text-[#5A4632]'>
                <input
                  type="checkbox"
                  value={cat}
                  className='w-4 h-4 accent-[#8B4513]'
                  onChange={toggleCategory}
                  // ✅ visually check if AI selected this
                  checked={category.includes(cat) || aiCategory.includes(cat)}
                  readOnly={aiCategory.includes(cat)}
                />
                {['Men\'s Fashion', 'Women\'s Fashion', 'Kids & Babies', 'Skin Care', 'Accessories'][i]}
              </p>
            ))}
          </div>
        </div>

        {/* SUB-CATEGORIES */}
        <div className={`px-5 py-4 mt-6 rounded-xl bg-[#FFF7EB] border border-[#E4D4BC] shadow-md ${showFilter ? "" : "hidden"} md:block`}>
          <p className='text-[18px] font-semibold mb-3 text-[#4A3B2E]'>SUB-CATEGORIES</p>
          <div className='w-full flex flex-col gap-3'>
            {(category.length === 0 && aiCategory.length === 0) && (
              <p className="text-[14px] text-[#8B7D6B]">Select a category first</p>
            )}
            {[...category, ...aiCategory].filter((v, i, a) => a.indexOf(v) === i).map(cat =>
              subCategoriesData[cat]?.map(sub => (
                <p key={sub} className='flex items-center gap-3 text-[15px] text-[#5A4632]'>
                  <input
                    type="checkbox"
                    value={sub}
                    className='w-4 h-4 accent-[#8B4513]'
                    onChange={toggleSubCategory}
                    checked={subCategory.includes(sub) || aiSubCategory.includes(sub)}
                    readOnly={aiSubCategory.includes(sub)}
                  />
                  {sub}
                </p>
              ))
            )}
          </div>
        </div>
      </div>

      {/* PRODUCTS SECTION — unchanged */}
      <div className='lg:pl-[20%] md:py-[10px]'>
        <div className='md:w-[80vw] w-[100vw] p-[20px] flex justify-between flex-col lg:flex-row lg:px-[50px] mt-10 justify-content:[center]'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            className="w-[60%] md:w-[220px] h-[50px] px-4 mt-5 rounded-xl outline-none cursor-pointer bg-gradient-to-r from-[#A0522D] to-[#D2691E] text-white font-medium border border-[#8B4513] shadow-lg shadow-[#8B4513]/20 hover:from-[#8B4513] hover:to-[#CD853F] transition-all duration-300"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant" className="text-black">Sort By: Relevant</option>
            <option value="low-high" className="text-black">Sort By: Low to High</option>
            <option value="high-low" className="text-black">Sort By: High to Low</option>
          </select>
        </div>

        <div className='lg:w-[80vw] md:w-[60vw] w-[100vw] min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px]'>
          {filterProduct?.map((item, index) => (
            <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection