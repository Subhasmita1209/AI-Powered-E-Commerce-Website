import React from 'react'
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
function Product() {
  return (
    <div
      className="
        w-[100vw] 
        min-h-[100vh] 
        bg-gradient-to-l 
        from-[#FFF3E0] 
        via-[#FFE6C7] 
        to-[#FDE8D0]
        flex items-center justify-start 
        flex-col 
        py-[20px] pb-[90px]
      "
    >
        <div className="w-[100%] min-h-[70px] flex items-center justify-center gap-[10px]flex-col ">
         <LatestCollection/>
        </div>
        <div className="w-[100%] min-h-[70px] flex items-center justify-center gap-[10px]flex-col ">
         <BestSeller/>
        </div>

    
    </div>
  );
}

export default Product;
