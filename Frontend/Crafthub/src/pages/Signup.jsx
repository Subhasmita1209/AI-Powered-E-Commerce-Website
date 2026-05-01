import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import google from "../assets/Google.webp";
import photo2 from "../assets/about.jpg"; // ✅ same image as login
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import axios from "axios";
import { AuthContextData } from "../context/Authcontext";
import { UserDataContext } from "../context/Usercontext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { getCurrentUser } = useContext(UserDataContext);
  const { serverUrl } = useContext(AuthContextData);

  // ----------------- HANDLE SIGNUP -----------------
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setLoading(false);
      return setError("Please enter a valid name");
    }

    if (!email.includes("@") || !email.includes(".")) {
      setLoading(false);
      return setError("Enter a valid email");
    }

    if (password.length < 8) {
      setLoading(false);
      return setError("Password must be at least 8 characters long");
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );

      await getCurrentUser();

      console.log(result.data);
      toast.success("Signup Successful");
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        setError("Something went wrong. Try again.");
        toast.error("Signup Failed");
      }
    }
  };

  // ----------------- GOOGLE SIGNUP -----------------
  const googleSignup = async () => {
    setError("");
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const result = await axios.post(
        `${serverUrl}/api/auth/googlesignup`,
        { name: user.displayName, email: user.email },
        { withCredentials: true }
      );

      console.log(result.data);
      toast.success("Signup Successful");
      window.location.reload();
      navigate("/");
    } catch (err) {
      setError("Google signup failed. Try again.");
      toast.error("Google Signup Failed");
    }
  };

  return (
    <div className="w-screen h-screen flex font-[Poppins] overflow-hidden bg-[#fdf8f3]">

      {/* ✅ LEFT FORM SIDE */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-20 relative z-20 mt-14 mb-10">

        {/* LOGO */}
        <div
          className="flex items-center gap-3 mb-10 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="logo" className="w-[50px] " />
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
            px-12 py-14
            border border-[#e7d6c7]
            max-w-[550px]
            relative
            md:translate-x-[70px]
           mb-[20px]
            mr-[70px]
          "
        >
          {/* TITLE */}
          <h2 className="text-3xl font-bold text-[#3b1f0f] mb-2">
            Create Account 
          </h2>

          <p className="text-gray-500 mb-6">
            Join OneCart & start shopping smarter
          </p>

          {/* ERROR */}
          {error && (
            <div className="text-red-600 bg-red-100 py-2 px-4 rounded-lg mb-5 text-sm">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* GOOGLE SIGNUP */}
            <div
              onClick={googleSignup}
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
                Signup with Google
              </span>
            </div>

            {/* OR */}
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <div className="flex-1 h-[1px] bg-gray-300"></div>
              OR
              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>

            {/* NAME */}
            <input
              type="text"
              placeholder="Full Name"
              className="
                w-full h-[50px]
                rounded-xl px-4
                border border-gray-300
                focus:border-[#8b4513]
                outline-none
              "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

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

            {/* SIGNUP BUTTON */}
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
              {loading ? "Creating..." : "Signup"}
            </button>

            {/* LOGIN LINK */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <span
                className="text-[#8b4513] font-bold cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>

      <div className="hidden md:block w-1/2 relative">

        {/* Background Image */}
        <img
          src={photo2}
          alt="signup background"
          className="w-full h-full object-cover"
        />

        {/* Brown Overlay */}
        <div className="absolute inset-0 bg-[#3b1f0f]/50"></div>

        {/* Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
          <h2 className="text-white text-4xl font-bold leading-snug">
            Become a OneCart Member 
          </h2>
          <p className="text-white/80 mt-4 text-lg max-w-[400px]">
            Signup today and enjoy premium ecommerce experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
