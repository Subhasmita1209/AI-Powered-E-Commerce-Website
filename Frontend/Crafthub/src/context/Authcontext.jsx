import React from "react";
import { createContext } from "react";

export const AuthContextData = createContext();
function Authcontext({ children }) {
   let serverUrl = "http://localhost:3000"
    let value = {
        serverUrl
    }
    return (
        <div>
            <AuthContextData.Provider value={value}>
                {children}
            </AuthContextData.Provider>
        </div>

    )
}  
export default Authcontext; 