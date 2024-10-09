import { ShoppingBagIcon } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import {
    Sheet,
    SheetContent,
 
    SheetTrigger,
  } from "@/components/ui/sheet"
   
import { RootState } from "@/store/Store";
import SideCart from "./SideCart";
const   ShoppingCartButton  =()=>{

    const items = useSelector((state:RootState)=>state.cart.items);
    const total = items.reduce((total,item)=> total +item.quantity,0)
    return <>
    <Sheet>
        <SheetTrigger>
        <div className=" relative">
            <span className=" absolute -top-3  -right-2 text-center flex justify-center flex-col text-xl color-red  bg-gray-700 rounded-full text-white w-6 h-6 ">{total}</span>
            <ShoppingBagIcon cursor={"pointer"} size={26}></ShoppingBagIcon>
        </div>
     
        </SheetTrigger>
        <SheetContent className=" overflow-auto h-full ">
            <SideCart items={items}/>
        </SheetContent>
    </Sheet>
  
    </>
}
export default ShoppingCartButton