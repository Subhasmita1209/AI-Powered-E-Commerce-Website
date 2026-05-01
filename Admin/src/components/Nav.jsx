import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { AuthContextData } from '../context/AuthContext';
import { useContext } from 'react';
import {AdminContextData} from '../context/AdminContext.jsx';
import { toast } from 'react-toastify';
function Nav() {
    const navigate=useNavigate();
    let{serverUrl}=useContext(AuthContextData);
    let {getAdmin}=useContext(AdminContextData);
    const logOut=async()=>{
      try{
        const result=await axios.get(serverUrl + "/api/auth/logout",{withCredentials:true});
        console.log(result.data);
         toast.success("Logged Out Successfully");
          getAdmin();
          navigate("/login");
      
        }catch(err){
            console.log(err);
            toast.error("Logout Failed");
        }
    }
  return (
   <div className="w-[100vw] h-[70px] bg-[#FFF3E0] z-10 fixed top-0 
     flex items-center justify-between px-[30px] overflow-x-hidden 
     shadow-md ">

  <div className="w-[30%] flex items-center justify-start gap-[10px] 
       cursor-pointer"
       onClick={() => navigate("/")}>
       
    <img src={logo} alt="" className="w-[30px]" />

    <h1 className="text-[25px] text-[#2C2C2C] font-sans">
      OneCart
    </h1>
  </div>
  <button
    className="bg-gradient-to-r from-[#8B4513] to-[#D2691E]
    text-white font-medium text-[18px] h-[40px] w-[100px]
    shadow-[0_2px_4px_rgba(0,0,0,0.15)]
    hover:brightness-110
    transition-all duration-200
    cursor-pointer
      rounded-2xl " onClick={logOut}>LogOut</button>

</div>

  )
}

export default Nav