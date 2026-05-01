import React from 'react'
import Title from './Title.jsx' 
import { useContext,useState,useEffect } from 'react'
import {ShopcontextData} from '../context/Shopcontext.jsx'
import Card from './Card.jsx'
function LatestCollection() {
    let {products}=useContext(ShopcontextData);
    let [latestProducts,setLatestProducts]=useState([]);
    useEffect(()=>{
        setLatestProducts(products.slice(0,8));
    },[products])
  return (
    <div>
         <div className='h-[8%] w-[100%] text-center md:mt-[30px]'>
        <Title text1={"LATEST"} text2={"COLLECTION"}/>
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-[#4B3B37]' >Step Into Style New Collections Dropping This Season!</p>
    </div>
    <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
        {
          latestProducts.map((item,index)=>(
            <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price}/>
          ))
        }

    </div>
    </div>
   
  )
}

export default LatestCollection