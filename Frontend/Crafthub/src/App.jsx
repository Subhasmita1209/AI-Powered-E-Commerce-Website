import React,{useContext}from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Signup from "./pages/signup.jsx";
import Login from "./pages/Login.jsx";
import Hero from "./pages/Hero.jsx";
import Nav from "./pages/Navbar.jsx";
import Contact from "./pages/Contact.jsx";
import Collection from "./pages/Collection.jsx";
import About from "./pages/About.jsx";
import Cart from "./pages/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Order from "./pages/Order.jsx";
  import { ToastContainer, toast } from 'react-toastify';
import { UserDataContext } from "./context/Usercontext.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import NotFound from "./pages/Notfound.jsx";
import Ai from "./pages/Ai.jsx";
import Footer from "./components/Footer.jsx";
import Wishlist from "./pages/Wishlist.jsx";
function App() {
  const { userData } = useContext(UserDataContext);
  const location = useLocation();

  return (
    <>
     <ToastContainer />
      {userData && <Nav />}

      <Routes>

        {/* ---- SIGNUP ---- */}
        <Route
          path="/signup"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Signup />
            )
          }
        />
      
        {/* ---- LOGIN ---- */}
        <Route
          path="/login"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Login />
            )
          }
        />

        {/* ---- HOME (PROTECTED) ---- */}
        <Route
          path="/"
          element={
            userData ? (
              <Hero />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
         {/* ---- HERO(PROTECTED) ---- */}
            <Route
          path="/hero"
          element={
            userData ? (
              <Hero />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        {/* ---- ABOUT (PROTECTED) ---- */}
        <Route
          path="/about"
          element={
            userData ? (
              <About />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        {/* ---- COLLECTION (PROTECTED) ---- */}
        <Route
          path="/collection"
          element={
            userData ? (
              <Collection />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        {/* ---- CONTACT (PROTECTED) ---- */}
        <Route
          path="/contact"
          element={
            userData ? (
              <Contact />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }

        />
         
         <Route
          path="/productdetail/:productId"
          element={
            userData ? (
              <ProductDetails />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

     
      <Route
          path="/wishlist"
          element={
            userData ? (
              <Wishlist />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

       <Route
          path="/cart"
          element={
            userData ? (
              <Cart />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        

           <Route
          path="/placeorder"
          element={
            userData ? (
              <PlaceOrder/>
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
       
       

     
        <Route
          path="/order"
          element={
            userData ? (
              <Order/>
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />


        <Route
          path="*"
          element={
          <NotFound />
          }
        />
       
       
       
      </Routes>
      <Ai/>
    
    </>
  );
}

export default App;
