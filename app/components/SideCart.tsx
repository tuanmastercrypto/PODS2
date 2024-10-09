
import React from "react";
// import { Product } from "../Types";

import { Badge } from "@/components/ui/badge";
import {  CartItem, removeItem } from "@/store/cartSlice";
import { RainbowButton } from "@/components/ui/rainbow-button";

import {CircleDollarSign} from "lucide-react"
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import Link from "next/link";
type  Props ={
    items:CartItem[];
}
const  SideCart=({items}: Props)=> {


 const dispatch = useDispatch()
//  const addCartHandler =(item:CartItem)=> dispatch(addItem(item))
 const removeCartHanlder =(id:number)=> dispatch(removeItem({id}))

  return (
    <>
            <div className="flex justify-center text-sm mb-2">
                   <Link href="/cart"> <RainbowButton >Cart</RainbowButton></Link> 
            </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2">

        {items.length >0 &&(
            <div>
                {items?.map((item)=>{
                    return<div key={item.id}>

                            <div  className='item shadow-xl hover:shadow-gray-800 focus:zoom-in rounded-bl-[5px] rounded-br-[5px] px-1 py-1     rounded-md'>
                                
                                <div className='relative z-0 w-full pt-full'>
                                
                                <div className='item-image ' >
                                    <img
                                    // loading='lazy'
                                    src={"/images/"+item.image}
                                    alt={item.title} 
                                    className="w-full h-auto object-cover  rounded-tr-md  rounded-tl-md" 
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40 vw"
                                    width={500} 
                                    height={500}
                                    style={{minHeight:"17rem", maxHeight:"18rem"}}
                                    />
                                </div>
                                
                                <div className='item-banner absolute top-0   right-8 rounded-md bg-background-gray-300'>
                                    <div className='status bg-gray-950 px-1 py-1 w-10 text-left rounded-md text-white text-sm opacity-80 '>
                                        {/* <Badge className="text-sm">{item.price_sale?-(((item.price_sale - item.price) /item.price_sale)*100).toFixed(1):""}%</Badge>  */}
                                    
                                    </div>
                                </div>
                                    
                                    
                                <div className='item-banner absolute top-3   left-1 rounded-md bg-background-gray-300'>
                                    <div className='status bg-gray-950 px-1 py-1 w-10 text-left rounded-md text-white text-sm opacity-80 '>
                                        <Badge className="text-sm">Sale</Badge> 
                                    
                                    </div>
                                </div>
                                
                                </div>
                                <div className='p-2 flex-1 flex flex-col justify-between bg-gray-100  rounded-bl-md rounded-br-md ' style={{minHeight:"11.8rem", maxHeight:"12.888rem"}}>
                                
                                    <div className='whitespace-normal line-clamp-2 break-words min-h-[3.5rem] text-sm  text-gray-900 text-align-center'>
                                        <span></span>
                                        
                                
                                        
                                            <b className='text-gray-700 text-base'> {item.title}</b> 
                                    </div>
                                    <div className="flex justify-between items-center space-x-1 text-gray-900">
                                        <div className="max-w-full flex-grow-1 flex-shrink-0 truncate text-shopee-primary flex items-center font-medium">
                                        <span aria-label="promotion price"> <CircleDollarSign className='text-sm'/></span>
                                        <div className="truncate flex items-baseline">
                                            <span className="text-xs/sp14 font-medium mr-px"></span>
                                            <span className="font-bold text-xl truncate">{(item.price_sale)}$ </span>
                                            <span className="text-xs/sp14 font-medium mr-px line-through  px-2 font-base "> </span>
                                        </div>
                                        </div>
                                        {/* <div className="truncate text-shopee-black87  min-h-4 flex-shrink-1 ml-auto flex items-center text-md  font-bold  line-through ">{item.price_sale}$</div> */}
                                    </div>
                                    <div className='task-review  mb-1 mt-1'>
                                        <div>
                                            <div className="space-y-1">
                                                <div className='flex justify-start items-center'>
                                                <div className='text-gray-700'>
                                                {/* <Ratings rating={item.star} /> */}
                                                </div>
                                              
                                                </div>
                                            
                                            </div>
                                             <div className="space-y-1">
                                                <div className='flex justify-start items-center gap-4'>
                                                <div className='text-gray-700'>
                                                 <span className="text-md font-bold">Total:</span>   ${(item?.price_sale * item?.quantity).toFixed(2)}
                                                </div>
                                                
                                                <div className='text-gray-700'>
                                                    Quantity:{item?.quantity}
                                                </div>
                                                
                                                </div>
                                            
                                            </div> 
                                        
                                        </div>
                                    </div>
                                    <div className="flex justify-start gap-2 mb-2">
                                    <div className="Removeitem">
                                        <Button className="text-sm" onClick={()=>{removeCartHanlder(item.id)}}>Remove</Button>
                                    </div>
                                    {/* <div className="Additem">
                                        <Button className="text-sm" onClick={()=>{addCartHandler(item)}}>Add</Button>
                                    </div> */}
                                    </div>
                              
                              
                                
                                </div>
                            
                            </div>

                    </div>
                })}
            </div>


            
        )}


        {items.length>0?<div className="flex justify-center text-sm mb-2">
                   <Link href="/checkout"> <RainbowButton >Check Out</RainbowButton></Link> 
            </div>:""}
        </div>
    </>
  );
}
export default SideCart