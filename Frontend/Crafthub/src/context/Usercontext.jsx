import React from "react";
import { createContext } from "react";
import { AuthContextData } from "./Authcontext";
import {useState} from "react";
import { useContext } from "react";
import { useEffect } from "react";
import axios from "axios";



export const UserDataContext = createContext();
function Usercontext({ children }) {
    let [userData,setUserData]=useState("");
    let {serverUrl} = useContext(AuthContextData);
     const getCurrentUser = async() =>{
        try{
           let result = await axios.get(`${serverUrl}/api/user/getcurrentuser`,{withCredentials:true});
           setUserData(result.data);
        }catch(err){
            setUserData(null);
            console.log(err);
        }
    }

    useEffect(()=>{
        getCurrentUser();
    },[])

    let value = {
       userData,setUserData,getCurrentUser
    }
   
    return (
        <div>
            <UserDataContext.Provider value={value}>
                {children}
            </UserDataContext.Provider>
        </div>

    )
}  
export default Usercontext; 