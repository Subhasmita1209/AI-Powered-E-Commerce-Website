import React, { useEffect, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopcontextData } from "../context/Shopcontext";
import ai from "../assets/ai.png";
import aiSound from "../assets/popup.mp3";

function Ai() {
  const navigate = useNavigate();
  const {
    setShowSearch, setSearch,
    setAiCategory, setAiSubCategory, setAiMaxPrice,
    setAiMinPrice, setAiBestSeller, setAiSize
  } = useContext(ShopcontextData);

  const recognitionRef = useRef(null);
  const isListening = useRef(false);
  const audioRef = useRef(null);

  const [active, setActive] = useState(false);
  const [introduced, setIntroduced] = useState(false);

  /* 🔊 TEXT TO SPEECH */
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-IN";
    window.speechSynthesis.speak(msg);
  };

  /* 😂 RANDOM JOKES */
  const jokes = [
    "I asked AI to make me smarter. It replied, hardware limitation detected.",
    "Why did the AI cross the road? To optimize the other side.",
    "I told my AI a joke. It replied, humor not found.",
    "Why do programmers love dark mode? Because light attracts bugs."
  ];

  useEffect(() => {
    audioRef.current = new Audio(aiSound);

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      isListening.current = true;
    };

    recognition.onend = () => {
      isListening.current = false;
      setActive(false);
    };

    recognition.onerror = () => {
      isListening.current = false;
      setActive(false);
      toast.error("Voice recognition failed");
    };

    recognition.onresult = async (e) => {
      let transcript = e.results[0][0].transcript.toLowerCase().trim();
      console.log("User said:", transcript);

      /* WAKE WORD SUPPORT */
      if (transcript.includes("arina")) {
        transcript = transcript.replace("arina", "").trim();
      }

      /* 🤖 INTRO QUESTION */
      if (transcript.includes("who are you")) {
        speak("I am your personal shopping assistant Arina.");
        return;
      }

      /* 🧠 SMART QUESTION */
      if (transcript.includes("smart")) {
        speak("Of course! I was trained by a very smart developer.");
        return;
      }

      /* 😂 JOKE */
      if (transcript.includes("joke") || transcript.includes("funny")) {
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(randomJoke);
        return;
      }

      /* 🎁 SURPRISE */
      if (transcript.includes("surprise")) {
        speak("Surprise! Opening our best collection.");
        navigate("/collection");
        return;
      }

      /* ❤️ WISHLIST */
      if (transcript.includes("wishlist") || transcript.includes("wish list")) {
        speak("Opening your wishlist");
        navigate("/wishlist");
        return;
      }

      /* 🛒 CART */
      if (transcript.includes("cart")) {
        speak("Opening cart");
        navigate("/cart");
        return;
      }

      /* 📦 ORDERS */
      if (transcript.includes("order")) {
        speak("Opening your orders");
        navigate("/order");
        return;
      }

      /* 💳 CHECKOUT */
      if (
        transcript.includes("checkout") ||
        transcript.includes("buy now") ||
        transcript.includes("place order")
      ) {
        speak("Opening checkout page");
        navigate("/placeorder");
        return;
      }

      /* 🧭 NAVIGATION */
      if (transcript.includes("home")) {
        speak("Opening home page");
        navigate("/");
        return;
      }

      if (transcript.includes("about")) {
        speak("Opening about page");
        navigate("/about");
        return;
      }

      if (transcript.includes("contact")) {
        speak("Opening contact page");
        navigate("/contact");
        return;
      }
       if (transcript.includes("collection")) {
        speak("Opening collection page");
        navigate("/collection");
        return;
      }

      /* 🔓 OPEN SEARCH BAR */
      if (
        transcript.includes("open search") ||
        transcript.includes("search bar") ||
        transcript.includes("show search")
      ) {
        speak("Opening search bar");
        setShowSearch(true);
        navigate("/collection");
        return;
      }

      /* 🤖 AI SMART FILTER */
      const shoppingKeywords = [
        "show", "find", "search", "cheap", "under", "price",
        "shirt", "dress", "shoes", "jeans", "jacket", "top", "bottom",
        "women", "men", "kids", "skincare", "accessories","jewellery",
        "red", "black", "blue", "white", "wear", "fashion",
        "give me", "suggest", "recommend", "looking for",
        "best seller", "bestseller", "size", "between"
      ];

      const isShoppingQuery = shoppingKeywords.some(k => transcript.includes(k));

      if (isShoppingQuery) {
        speak("Let me find that for you.");
        try {
          const res = await fetch("http://localhost:3000/api/ai/parse-filter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ transcript }),
          });

          const filters = await res.json();

          // Clear all previous AI filters first
          setAiCategory([]);
          setAiSubCategory([]);
          setAiMaxPrice(null);
          setAiMinPrice(null);
          setAiBestSeller(null);
          setAiSize(null);

          // Apply new filters from Claude's response
          if (filters.category)    setAiCategory([filters.category]);
          if (filters.subCategory) setAiSubCategory([filters.subCategory]);
          if (filters.maxPrice)    setAiMaxPrice(filters.maxPrice);
          if (filters.minPrice)    setAiMinPrice(filters.minPrice);
          if (filters.bestSeller)  setAiBestSeller(true);
          if (filters.size)        setAiSize(filters.size);

          // Color + search query goes into search bar
          if (filters.color || filters.searchQuery) {
            const q = [filters.color, filters.searchQuery].filter(Boolean).join(" ");
            setSearch(q);
            setShowSearch(true);
          }

          navigate("/collection");
          speak(filters.spokenReply || "Here are the results.");

        } catch (err) {
          console.error("AI filter error:", err);
          speak("Sorry, something went wrong.");
          toast.error("AI filter failed");
        }
        return;
      }

      /* ❌ FALLBACK */
      speak("Sorry, I did not understand. Please try again.");
      toast.error("Sorry, I did not understand");
    };

    recognitionRef.current = recognition;
  }, [navigate, setShowSearch, setSearch]);

  /* 🎤 START LISTENING */
  const startListening = () => {
    if (isListening.current) return;

    setActive(true);
    audioRef.current?.play();

    if (!introduced) {
      speak("Hello, I am Arina, your personal shopping assistant. How can I help you today?");
      setIntroduced(true);
    } else {
      speak("I'm listening.");
    }

    recognitionRef.current?.start();
  };

  return (
    <div
      className="fixed bottom-[10px] right-[30px] z-50"
      onClick={startListening}
    >
      <div
        className={`relative rounded-full transition-all duration-300 ${
          active ? "scale-110" : "scale-100"
        }`}
      >
        {active && (
          <span className="absolute inset-0 rounded-full animate-ping bg-[#c89b6d] opacity-40"></span>
        )}

        <img
          src={ai}
          alt="AI Assistant"
          title="Click and Speak"
          className="w-[130px] cursor-pointer rounded-full shadow-lg"
        />
      </div>
    </div>
  );
}

export default Ai;