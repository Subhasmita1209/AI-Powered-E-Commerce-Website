import React, { useState, useEffect } from 'react';
import Logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import Product from '../pages/Product.jsx';
import OurPolicy from '../components/OurPolicy.jsx';
import NewLetterBox from '../components/NewLatterBox.jsx';
// HD Images
import Photo2 from '../assets/photo2.png';
import Photo1 from '../assets/photo1.png';
import Photo9 from '../assets/photo9.jpg';
import Photo7 from '../assets/photo7.png';
import Photo3 from '../assets/photo3.png';
import Photo6 from '../assets/photo6.png';
import Footer from '../components/Footer.jsx';
import CustomerReviewPage from './CustomerReviewPage.jsx';



const CraftHub = () => {

  const heroImages = [Photo7, Photo1, Photo3, Photo9, Photo2, Photo6];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide every 3 seconds (faster)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ---------------- HERO SECTION ---------------- */}
      <div className="relative overflow-hidden h-[60vh] md:h-[70vh] lg:h-[80vh] mt-[60px]">

        {/* SLIDER WRAPPER */}
        <div
          className="flex h-full transition-transform duration-[900ms] ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroImages.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full relative">
              <img
                src={image}
                className="w-full h-full object-cover"
                alt="Slide"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          ))}
        </div>

        {/* PREV BUTTON */}
        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-3 rounded-full text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* NEXT BUTTON */}
        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-3 rounded-full text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* INDICATORS */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
          {heroImages.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all 
              ${currentSlide === index ? "bg-white scale-125" : "bg-white/50"}`}
            ></div>
          ))}
        </div>
      </div>
      <Product />
      <OurPolicy/>
      <NewLetterBox/>
      <CustomerReviewPage/>
      <Footer/>
    </div>
  );
};

export default CraftHub;
