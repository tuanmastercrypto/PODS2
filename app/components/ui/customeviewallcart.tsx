"use client"
 
import * as React from "react"
import { BorderBeam } from "@/components/ui/border-beam"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
   
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { RootState } from "@/store/Store"
import { useSelector } from "react-redux"
import {  CartItem, removeItem } from "@/store/cartSlice";
import { RainbowButton } from "@/components/ui/rainbow-button"
import { useDispatch } from "react-redux";
import { Separator } from "@/components/ui/separator"
type  Props ={
    items:CartItem[];
}
export default function ViewAllCart() {
    const dispatch = useDispatch()
    const items = useSelector((state:RootState)=>state.cart.items);
  
    //  const addCartHandler =(item:CartItem)=> dispatch(addItem(item))
     const removeCartHanlder =(id:number)=> dispatch(removeItem({id}))
    const totalquantity = items.reduce((total,item) => total + item.quantity,0)
    const totalprice = items.reduce((total,item)=>total +item.price_sale *item.quantity,0)
    return <div>
      {/* My Post: {params.slug} */}
    
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
       
       <div className=" w-full md:max-w-screen-xl mx-auto   ">

       {items.length == 0 &&(
                                    <div className="flex justify-center gap-3">
                                        <Link href="/"><RainbowButton > Cart is Emty</RainbowButton></Link>
                                        <Link href="/"><RainbowButton>Shop Now</RainbowButton></Link>
                                        
                                    </div>
                                )
                            }

        {items.length > 0 &&(
        <div className="grid grid-cols-1 gap-2 md:grid-cols-[70%_30%]">

                <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>List Products</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className=" w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                       
                        <TableHead className=" md:table-cell">
                          Price
                        </TableHead>
                        <TableHead className=" md:table-cell">
                            Quantity
                        </TableHead>
                        <TableHead className=" md:table-cell">
                          Total
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                  
                          

                                {
                              
                                   items.map((item)=>{
                                     return <TableRow key={item.id}>
                                        <TableCell className="">
                                            <img
                                                alt={item.title}
                                                className="aspect-square rounded-md object-cover"
                                                height="64"
                                                src={"/images/"+item.image  }
                                                width="64"
                                            />
                                            </TableCell>
                                            <TableCell className="font-medium ">
                                               <p className="">{item.title}</p> 
                                            </TableCell>
                                            {/* <TableCell>
                                            <Badge variant="outline">{item.price_sale?-(((item.price_sale - item.price_sale) /item.price_sale)*100).toFixed(1):0}%</Badge>
                                            </TableCell> */}
                                            <TableCell className="md:table-cell">
                                            {item.price_sale}$
                                            </TableCell>
                                            <TableCell className=" md:table-cell  ">
                                             {item.quantity}
                                            </TableCell>
                                            <TableCell className=" md:table-cell">
                                                    <div className="flex justify-start gap 1">{(item?.price_sale * item?.quantity).toFixed(2)}$</div> 
                                            </TableCell >
                                            
                                            <TableCell>
                                            <Button className="text-sm" onClick={()=>{removeCartHanlder(item.id)}}>Remove</Button>
                                            </TableCell>
                                        </TableRow>
                                   })
                                }
                                  
                            
                      
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  {/* <div className="text-xs text-muted-foreground text-right">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div> */}
                </CardFooter>
              </Card>


              <Card x-chunk="dashboard-06-chunk-0 " className=" relative ">
              <BorderBeam size={250} duration={12} delay={9} />
                <CardHeader>
                  <CardTitle><Button>Cart totals</Button> </CardTitle>
                  
                </CardHeader>
                
                <CardContent>
                     <div className="flex justify-between m-4">
                        <h3 className="font-bold">Total Quantity:</h3>
                      
                        <h3 className="font-bold">{totalquantity}</h3>
                     </div>
                     <Separator/>
                     <div className="flex justify-between m-4">
                        <h3 className="font-bold">Total Price:</h3>
                      
                        <h3 className="font-bold">{totalprice}$</h3>
                     </div>
                     <Separator/>
                   
                </CardContent>
                <CardFooter  className="flex justify-center  ">
                    <div >
                    <Link href="/checkout"> <RainbowButton>Check out</RainbowButton></Link>

                    </div>
              
                </CardFooter>
              </Card>

         </div>
        )}


        </div>
    </main>
    
    
    </div>
  } 