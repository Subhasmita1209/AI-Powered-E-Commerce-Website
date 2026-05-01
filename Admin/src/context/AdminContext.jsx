import React from 'react'
import{AuthContextData } from './AuthContext.jsx'
import { createContext,useContext,useState,useEffect } from 'react';
import axios from 'axios';

export const AdminContextData=createContext();
function AdminContext({children}) {
    let [adminData,setAdminData]=useState(null);
    let {serverUrl}=useContext(AuthContextData);
      
    let getAdmin=async()=>{
        try{
           let result=await axios.get(`${serverUrl}/api/user/getadmin`,{withCredentials:true});
           setAdminData(result.data);
           console.log("admin data:",result.data);
        }catch(err){
            setAdminData(null);
            console.log("get admin error:",err);
        }
    }

    useEffect(()=>{
        getAdmin();
    },[])


    let value={adminData,setAdminData,getAdmin};
  return (
    <div>
        <AdminContextData.Provider value={value}>
            {children}
        </AdminContextData.Provider>
    </div>
  )
}

export default AdminContext