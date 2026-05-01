import React from "react";
import Logo from "../assets/logo.png";
import photo2 from "../assets/about.jpg";
import { useNavigate } from "react-router-dom";
import google from "../assets/Google.webp";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import { useState, useContext } from "react";
import { AuthContextData } from "../context/Authcontext";
import { UserDataContext } from "../context/Usercontext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  let [show, setShow] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);

  const { serverUrl } = useContext(AuthContextData);
  let { getCurrentUser } = useContext(UserDataContext);

  // ✅ LOGIN FUNCTION (UNCHANGED)
  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      toast.success("Login Successful");
      setLoading(false);
      getCurrentUser();
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
      toast.error("Login Failed");
    }
  };

  // ✅ GOOGLE LOGIN FUNCTION (UNCHANGED)
  const googleLogin = async () => {
    try {
      let response = await signInWithPopup(auth, provider);
      let user = response.user;

      await axios.post(
        `${serverUrl}/api/auth/googlesignup`,
        { name: user.displayName, email: user.email },
        { withCredentials: true }
      );

      window.location.reload();
      toast.success("Login Successful");
      navigate("/");
    } catch (err) {
      toast.error("Google Login Failed");
    }
  };

  return (
    <div className="w-screen h-screen flex font-[Poppins] overflow-hidden bg-[#fdf8f3]">

      {/* ✅ LEFT SIDE FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-20 relative z-20">

        {/* LOGO */}
        <div
          className="flex items-center gap-3 mb-10 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="logo" className="w-[50px]" />
          <h1 className="text-3xl font-bold text-[#5a2e15]">
            OneCart
          </h1>
        </div>

        {/* ✅ CARD WITH CROSS EFFECT */}
        <div
          className="
            bg-white/95
            shadow-2xl
            rounded-[2rem] 
            px-10 py-12
            border border-[#e7d6c7]
            max-w-[500px]
            relative

              
            md:translate-x-[70px]
          "
        >
          {/* TITLE */}
          <h2 className="text-3xl font-bold text-[#3b1f0f] mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mb-8">
            Login to continue shopping with OneCart
          </p>

          {/* ERROR */}
          {error && (
            <div className="text-red-600 bg-red-100 py-2 px-4 rounded-lg mb-5 text-sm">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email Address"
              className="
                w-full h-[50px]
                rounded-xl px-4
                border border-gray-300
                focus:border-[#8b4513]
                outline-none
              "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="
                  w-full h-[50px]
                  rounded-xl px-4
                  border border-gray-300
                  focus:border-[#8b4513]
                  outline-none
                "
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Eye Icon */}
              {show ? (
                <IoEyeOffSharp
                  className="absolute right-4 top-4 text-gray-500 cursor-pointer"
                  onClick={() => setShow(false)}
                />
              ) : (
                <FaEye
                  className="absolute right-4 top-4 text-gray-500 cursor-pointer"
                  onClick={() => setShow(true)}
                />
              )}
            </div>

            {/* BUTTON */}
            <button
              className="
                w-full py-3 rounded-xl
                font-semibold text-lg
                bg-[#8b4513]
                text-white
                hover:bg-[#5a2e15]
                transition
              "
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* OR */}
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <div className="flex-1 h-[1px] bg-gray-300"></div>
              OR
              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>

            {/* GOOGLE */}
            <div
              onClick={googleLogin}
              className="
                w-full h-[50px]
                flex items-center justify-center gap-3
                bg-gray-100 hover:bg-gray-200
                rounded-xl cursor-pointer
                transition
              "
            >
              <img src={google} alt="google" className="w-[22px]" />
              <span className="text-gray-700 font-medium">
                Continue with Google
              </span>
            </div>

            {/* SIGNUP */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Don’t have an account?{" "}
              <span
                className="text-[#8b4513] font-bold cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* ✅ RIGHT IMAGE SIDE */}
      <div className="hidden md:block w-1/2 relative">

        {/* Background Image */}
        <img
          src={photo2}
          alt="login background"
          className="w-full h-full object-cover"
        />

        {/* Brown Overlay */}
        <div className="absolute inset-0 bg-[#3b1f0f]/50"></div>

        {/* Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
          <h2 className="text-white text-4xl font-bold leading-snug">
            Shop Smart. Shop OneCart ✨
          </h2>
          <p className="text-white/80 mt-4 text-lg max-w-[400px]">
            Premium ecommerce experience with secure login & stylish design.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
