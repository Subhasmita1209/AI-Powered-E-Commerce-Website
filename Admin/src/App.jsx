import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Orders from './pages/Orders.jsx'
import Lists from './pages/Lists.jsx'
import Login from './pages/Login.jsx'
  import { ToastContainer, toast } from 'react-toastify';
import Add from './pages/Add.jsx' 
import { AdminContextData } from './context/AdminContext.jsx'
import UpdateProduct from "./pages/UpdateProduct.jsx";

function App() {
  const { adminData } = useContext(AdminContextData);

  return (
    <>
       <ToastContainer />
      {!adminData ? (
        <Login />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/update/:productId" element={<UpdateProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          {/* Redirect to home if route doesn't exist */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
  )
}

export default App