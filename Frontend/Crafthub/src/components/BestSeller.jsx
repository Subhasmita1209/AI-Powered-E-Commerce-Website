import React, {useContext, useState, useEffect} from 'react'
import Title from './Title.jsx'
import { ShopcontextData } from '../context/Shopcontext.jsx';
import Card from './Card.jsx'


function BestSeller() {
    let {products} = useContext(ShopcontextData);
    let [bestSeller,setBestSeller] = useState([]); 

   useEffect(() => {
    let filterProduct = products.filter((item)=> item.bestSeller);
    setBestSeller(filterProduct.slice(0, 4));
}, [products]);

    
  return (
    <div>
          
         <div className='h-[8%] w-[100%] text-center mt-[35px] md:mt-[30px]'>
        <Title text1={"BEST"} text2={"SELLER"}/>
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-[#4B3B37]' >Tried,Tested,Loved Discover Our All-time Best Sellers.</p>
    </div>
    <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
        {
            bestSeller.map((item,index)=>(
            <Card key={index} name={item.name}   id={item._id} price={item.price} image={item.image1} />
          ))
        }
        </div>
    </div>
  )
}

export default BestSeller