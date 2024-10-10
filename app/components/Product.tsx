

'use client'
import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircleDollarSign } from "lucide-react";

import { RainbowButton } from "@/components/ui/rainbow-button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { Product } from "@/app/Types";
import { toast } from "sonner"
type Props = {
    product: Product;
}
  
export function Product_one({product}:  Props) {

  const [isOpen, setIsOpen] = useState(false); 
  const handleOpenChange = (open: boolean) => {
      setIsOpen(open); 
  };
  
  const dispatch = useDispatch();
  const addtoCartHandler =(product:Product)=>{
      dispatch(addItem(product))
      toast.success('Success', {
        action: {
          label: "Undo",
          onClick: () => console.log("Undo clicked"), 
        },
      })
      setIsOpen(false)
  }
      
 
    return (
      <>

        
                           
                        <div  className='item shadow-xl hover:shadow-gray-800 focus:zoom-in rounded-bl-[5px] rounded-br-[5px] px-1 py-1 dark:bg-white    rounded-md  '>
                        <Dialog  open={isOpen}  onOpenChange={handleOpenChange}  >
                        <DialogTrigger asChild className="" >    
                                <div className="">
                                  <div className='relative z-0 w-full pt-full'>
                                
                                    <div className='item-image w-full relative mx-auto h-auto overflow-hidden rounded-lg ' >
                                      <img 
                                        // loading='lazy'
                                        src={"/images/"+product.image}
                                        alt={product.title} 
                                        className="w-full h-auto object-cover  rounded-tr-md  rounded-tl-md transition-all duration-300 hover:scale-110" 
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40 vw"
                                        width={500} 
                                        height={500}
                                        style={{minHeight:"17rem", maxHeight:"18rem"}}
                                      />
                                    </div>
                                  
                                    <div className='item-banner absolute top-0   right-5 rounded-md'>
                                      <div className='status px-1 py-1 w-10 text-left rounded-md text-white text-sm opacity-80 '>
                                        {/* <Badge className="text-sm">{product.price_sale == product.price?"":"Free"}</Badge>  */}
                                      
                                      </div>
                                    </div>
                                      
                                      
                                    <div className='item-banner absolute top-0   left-0 rounded-md '>
                                      <div className='status px-1 py-1 w-10 text-left rounded-md text-white text-sm opacity-80 '>
                                      {product.price_sale == 0?<Badge className="text-md md:text-lg  bg-red-600 dark:text-white" >Free</Badge> :""}
                                      
                                      </div>
                                    </div>
                                  
                                  </div>
                                  <div className='p-2 flex-1 flex flex-col justify-between bg-gray-100  rounded-bl-md rounded-br-md ' style={{minHeight:"6.8rem", maxHeight:"6.888rem"}}>
                                    
                                    <div className='whitespace-normal line-clamp-2 break-words min-h-[2.5rem] text-sm  text-gray-900 text-align-center'>
                                          <span></span>
                                        
                                  
                                        
                                            <b className='text-gray-700 text-base'>{product.title}</b> 
                                    </div>
                                    <div className="flex justify-between items-center space-x-1 text-gray-900">
                                      <div className="max-w-full flex-grow-1 flex-shrink-0 truncate text-shopee-primary flex items-center font-medium">
                                        <span aria-label="promotion price"> <CircleDollarSign className='text-sm'/></span>
                                        <div className="truncate flex items-baseline">
                                          <span className="text-xs/sp14 font-medium mr-px"></span>
                                          <span className="font-bold text-xl truncate">{product.price_sale}$ </span>
                                          {/* <span className="text-xs/sp14 font-medium mr-px line-through  px-2 font-base "> {product.price_sale}$</span> */}
                                        </div>
                                      </div>
                                      <div className="truncate  min-h-1 flex-shrink-1 ml-auto flex items-center text-md line-through ">
                                      <span className='px-1 text-base'></span></div>
                                    </div>
                                  
                                  </div>
                                </div>  
                                </DialogTrigger>
                                <DialogContent 
                                    className="sm:max-w-[400px] sm:max-h-[400px] sm:min-h-[300px] sm:min-w-[300px] lg:min-w-[1024px] lg:min-h-[1024px]"
                                  >
                                <DialogHeader>
                                <DialogTitle> <Badge className="text-md"> {product.title}</Badge></DialogTitle>
                          
                                </DialogHeader>
                                <div className="flex justify-center ">
                             
                                <img
                                   
                                    src={"/images/"+product.image}
                                    alt={product.title} 
                                    className=" w-full h-auto  object-cover  rounded-tr-md  rounded-tl-md   " style={{width:"90%"}}  
                                 
                                    width={1024} 
                                    height={1024}
                                    // style={{minHeight:"50rem", maxHeight:"50rem"}}
                                    />
                                
                                </div>
                                <DialogFooter>
                                  <div className="w-full flex justify-center"> <RainbowButton onClick={()=>{
                                    addtoCartHandler(product)
                                  }}>Add To Cart</RainbowButton>
                                  
                                  
                                  </div>
                                
                                </DialogFooter>
                            </DialogContent>
                                        </Dialog>

                              <div className="  mt-1 text-sm md:text-md w-full">
                              <Button  className=" w-full dark:bg-black dark:text-white"      onClick={()=>{
                                                    addtoCartHandler(product)
                                                  }}>Add To Cart</Button>
                                                  
                          
                                          
                                                      
                            
                              </div>

                              
                          
                          
                        </div>
                      
      </>
    );
  }