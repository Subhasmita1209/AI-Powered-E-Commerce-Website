function NewLetterBox() {
  return (
    <div
      className="w-full flex flex-col items-center justify-center 
      pt-[50px] pb-[100px] md:pb-[60px] lg:pb-[70px] 
      px-[14px] sm:px-[20px]
      bg-gradient-to-b from-[#f7e4cd] to-[#f2d7b8]"
    >
      {/* Title */}
      <p className="text-[20px] sm:text-[24px] md:text-[32px] font-bold 
        text-[#5e3d2c] tracking-wide text-center mb-[10px]">
        Subscribe Now & Get 20% OFF
      </p>

      {/* Subtitle */}
      <p className="text-[13px] sm:text-[14px] md:text-[18px] 
        text-[#6a4937] text-center max-w-[750px] font-medium 
        mb-[20px] px-[6px]">
        Join our newsletter to enjoy exclusive savings, special deals, 
        and early access to new collections.
      </p>

      {/* Card Container */}
      <div className="w-full max-w-[750px] bg-white bg-opacity-80 backdrop-blur-md 
        rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.12)] 
        p-[16px] sm:p-[25px]">

        <form className="flex flex-row w-full items-center gap-[10px]">
          
          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter Your Email"
            required
            className="flex-1 h-[45px] sm:h-[48px] 
              px-[14px] sm:px-[18px] text-[14px]
              rounded-xl bg-[#f3f3f3] text-black placeholder:text-gray-600
              shadow-sm border border-[#d9d9d9]
              focus:outline-none focus:ring-2 focus:ring-[#c99369]"
          />

          {/* Button beside input */}
          <button
            type="submit"
            className="h-[45px] sm:h-[48px] px-[20px] 
              text-[13px] sm:text-[14px] font-semibold 
              bg-gradient-to-r from-[#c99369] to-[#a77044]
              text-white rounded-xl shadow-md whitespace-nowrap
              hover:opacity-90 active:scale-[0.97] transition-all duration-200"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Safe Space for Bottom Navbar (Mobile Only) */}
      <div className="block md:hidden h-[90px] w-full"></div>
    </div>
  );
}

export default NewLetterBox;
