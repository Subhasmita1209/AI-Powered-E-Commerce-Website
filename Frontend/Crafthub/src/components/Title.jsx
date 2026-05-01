import React from 'react'

function Title({ text1, text2 }) {
  return (
    <div className="inline-flex gap-2 items-center text-center mb-3
                  text-[35px] md:text-[44px] font-bold tracking-tight">

      <p className="text-[#4B3B37]">
        {text1}
      </p>
      <p className="text-[#B3865F]">
        {text2}
      </p>

    </div>
  );
}

export default Title;
