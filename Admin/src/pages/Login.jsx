import React, { useState, useContext } from "react";
import Logo from "../assets/logo.png";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import axios from "axios";
import { AuthContextData } from "../context/AuthContext";
import { AdminContextData } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminLogin() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { serverUrl } = useContext(AuthContextData);
  const { getAdmin } = useContext(AdminContextData);
  const navigate = useNavigate();

  const AdminLoginFunction = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/adminlogin`,
        { email, password },
        { withCredentials: true }
      );

      console.log(result.data);
      toast.success("AdminLogin Successful");
      await getAdmin();
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("AdminLogin Failed");
      
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-[#EEEDE9] text-black flex flex-col items-center">

      {/* HEADER */}
      <div className="w-full h-[80px] flex items-center px-[30px] gap-[10px] cursor-pointer">
        <img src={Logo} alt="Logo" className="w-[45px] h-[45px]" />
        <span className="text-[30px] font-sans">OneCart</span>
      </div>

      {/* TITLE */}
      <div className="w-full flex flex-col items-center mt-[10px] mb-[20px]">
        <span className="text-[28px] font-semibold">Admin Login</span>
        <span className="text-[15px] text-gray-700">
          Secure Access — OneCart Admin Dashboard
        </span>
      </div>

      {/* CARD */}
      <div
        className="
          max-w-[480px] w-[90%] min-h-[350px]
          bg-gradient-to-br from-[#f9f4f0] to-[#ece6df]
          border border-[#8B451330]
          rounded-2xl
          shadow-[0_12px_32px_rgba(139,69,19,0.45),0_0_22px_rgba(210,105,30,0.35)]
          p-8
          flex flex-col items-center
        "
      >
        <form
          onSubmit={AdminLoginFunction}
          className="w-full flex flex-col items-center gap-6"
        >
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter admin email"
            className="
              w-full h-[52px]
              bg-transparent backdrop-blur-sm
              border-[2px] border-[#b6b6b640]
              px-4 font-semibold rounded-md
              focus:border-[#8B4513] outline-none
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <div className="w-full relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Enter admin password"
              className="
                w-full h-[52px]
                bg-transparent backdrop-blur-sm
                border-[2px] border-[#b6b6b640]
                px-4 font-semibold rounded-md
                focus:border-[#8B4513] outline-none
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {!show ? (
              <FaEye
                onClick={() => setShow(true)}
                className="absolute right-[14px] top-[15px] cursor-pointer text-[18px] text-gray-700"
              />
            ) : (
              <IoEyeOffSharp
                onClick={() => setShow(false)}
                className="absolute right-[14px] top-[15px] cursor-pointer text-[18px] text-gray-700"
              />
            )}
          </div>

          {/* BUTTON */}
          <button
            className="
              w-full py-3 rounded-xl font-semibold text-white text-[18px]
              bg-gradient-to-r from-[#8B4513] to-[#D2691E]
              shadow-[0_8px_22px_rgba(139,69,19,0.50),0_0_22px_rgba(210,105,30,0.50)]
              hover:-translate-y-[2px]
              hover:shadow-[0_10px_26px_rgba(139,69,19,0.55),0_0_26px_rgba(210,105,30,0.55)]
              active:translate-y-[2px]
              transition-all duration-200 cursor-pointer
            "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
