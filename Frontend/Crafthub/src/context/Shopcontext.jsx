import React, { useEffect } from 'react'
import { createContext } from 'react';
import { useState,useContext } from 'react';
import {UserDataContext} from './Usercontext.jsx';
import { AuthContextData } from './Authcontext.jsx';
import axios from 'axios';

export const ShopcontextData= createContext();

function Shopcontext({children}) {
let [products,setProducts]=useState([])
let [search,setSearch]=useState('')
let [showSearch,setShowSearch]=useState(false);
let {serverUrl}=useContext(AuthContextData)
const [cartItem, setCartItem] = useState({});
const [wishlist, setWishlist] = useState([]);
const [aiCategory, setAiCategory] = useState([]);
const [aiSubCategory, setAiSubCategory] = useState([]);
const [aiMaxPrice, setAiMaxPrice] = useState(null);
const [aiMinPrice, setAiMinPrice] = useState(null);
const [aiBestSeller, setAiBestSeller] = useState(null);
const [aiSize, setAiSize] = useState(null);

const { userData } = useContext(UserDataContext);

let currency="₹";
let delivery_fee=50;
const resetAiFilters = () => {
  setAiCategory([]);
  setAiSubCategory([]);
  setAiMaxPrice(null);
};

const getWishlist = async () => {
  try {
    const res = await axios.get(
      `${serverUrl}/api/wishlist`,
      { withCredentials: true }
    );
     const ids = res.data.wishlist.map(item => item._id);
    setWishlist(ids);
  } catch (err) {
    console.error("Failed to fetch wishlist", err);
  }
};
 
const addToWishlist = async (productId) => {
     if (!userData) {
    console.log("User not logged in");
    return;
  }
  
  try {
    const res = await axios.post(
      `${serverUrl}/api/wishlist/add`,
      { productId },
      { withCredentials: true }
    );
  getWishlist();
  } catch (err) {
    console.error("Add wishlist error", err);
  }
};

const removeFromWishlist = async (productId) => {
  try {
    const res = await axios.delete(
      `${serverUrl}/api/wishlist/remove/${productId}`,
     
      { withCredentials: true }
    );
    getWishlist();
  } catch (err) {
    console.error("Remove wishlist error", err);
  }
};

const getWishlistCount = () =>{
  return Array.isArray(wishlist) ? wishlist.length : 0;
}


const getAllProducts=async()=>{
  try{
    let response=await axios.get(`${serverUrl}/api/product/list`); 
      console.log(response.data);
    setProducts(response.data);
  
    }catch(err){ 
  console.log(err);
    }
} 

const addToCart = async (itemId, size = null) => {
  console.log("✅ Add to Cart Clicked");
  console.log("Product ID:", itemId);
  console.log("Size:", size ? size : "NO SIZE");
  // Clone cart safely
  let cartData = structuredClone(cartItem);

  // If product already exists
  if (cartData[itemId]) {

    // ✅ If product has sizes
    if (size) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } 
    // ✅ If product has NO sizes
    else {
      if (cartData[itemId]["nosize"]) {
        cartData[itemId]["nosize"] += 1;
      } else {
        cartData[itemId]["nosize"] = 1;
      }
    }

  } 
  // If product not in cart
  else {
    cartData[itemId] = {};

    if (size) {
      cartData[itemId][size] = 1;
    } else {
      cartData[itemId]["nosize"] = 1;
    }
  }
  
  setCartItem(cartData);
  if(userData){
    try {
      await axios.post(
        `${serverUrl}/api/cart/add`,
        { itemId, size },
        { withCredentials: true }
      );
      console.log("Cart updated on server");
    } catch (error) {
      console.error(" Error updating cart on server:", error);
    } 
  }
  else{
    console.log(" User not logged in. Cart not synced to server.");
  }
};

const removeFromCart = (itemId, size = null) => {
  let cartData = structuredClone(cartItem);

  const key = size ? size : "nosize";

  if (cartData[itemId] && cartData[itemId][key]) {
    cartData[itemId][key] -= 1;

    if (cartData[itemId][key] <= 0) {
      delete cartData[itemId][key];
    }

    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }
  }

  setCartItem(cartData);
};
const getUserCart = async () => {
  try {
    let response = await axios.post(  
      `${serverUrl}/api/cart/get`,
      {},
      { withCredentials: true }
    );
    setCartItem(response.data);
  } catch (error) {
    console.error(" Error fetching cart from server:", error);
    // toast.error(error.message);
  }
};

const updateQuantity = async (itemId, size = null, quantity) => {
  let cartData = structuredClone(cartItem);

  const key = size ? size : "nosize";

  // If quantity is 0 or less → remove item
  if (quantity <= 0) {
    if (cartData[itemId] && cartData[itemId][key]) {
      delete cartData[itemId][key];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }
  } 
  // Update quantity
  else {
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    cartData[itemId][key] = quantity;
  }

  setCartItem(cartData);

  // Sync with server if user is logged in
  if (userData) {
    try {
      await axios.post(
        `${serverUrl}/api/cart/update`,
        { itemId, size, quantity },
        { withCredentials: true }
      );
      console.log("Cart quantity updated on server");
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }
};


const getCartCount = () => {
  let totalCount = 0;

  for (const itemId in cartItem) {
    for (const key in cartItem[itemId]) {
      totalCount += cartItem[itemId][key];
    }
  }

  return totalCount;
};
const getCartAmount = () => {
  let totalAmount = 0;

  for (const itemId in cartItem) {
    const itemInfo = products.find(
      (product) => product._id === itemId
    );

    if (!itemInfo) continue;

    for (const key in cartItem[itemId]) {
      const quantity = cartItem[itemId][key];

      if (quantity > 0) {
        totalAmount += itemInfo.price * quantity;
      }
    }
  }

  return totalAmount;
};





useEffect(()=>{
  getAllProducts(); 
},[])
useEffect(()=>{
   if (userData) {
    getUserCart();
  }

},[userData])

useEffect(() => {
  if (userData) {
    getWishlist();
  } else {
    setWishlist([]);
  }
}, [userData]);





let value = { 
  products,
  currency,
  delivery_fee,
  getAllProducts,
  search,
  setSearch,
  showSearch,
  setShowSearch,
  cartItem,
  setCartItem,
  addToCart,
  removeFromCart,
   updateQuantity,
   getCartAmount,
  getCartCount,
  wishlist,
addToWishlist,
removeFromWishlist,
getWishlistCount,
 aiCategory, setAiCategory,
  aiSubCategory, setAiSubCategory,
  aiMaxPrice, setAiMaxPrice,
   aiMinPrice, setAiMinPrice,
  aiBestSeller, setAiBestSeller,
  aiSize, setAiSize,
  resetAiFilters,


};


  return (
    <div>
        <ShopcontextData.Provider value={value}>
            {children}
        </ShopcontextData.Provider>
       
    </div>
  )
}

export default Shopcontext