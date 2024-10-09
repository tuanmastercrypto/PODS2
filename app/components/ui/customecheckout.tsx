"use client"
 
import * as React from "react"
import { useState } from "react";
import { BorderBeam } from "@/components/ui/border-beam"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

import process from "process";


// import logo from "../../../public/images/paypal.png"
import Link from "next/link"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
   
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { toast } from "sonner"
 
import { RootState } from "@/store/Store"
import { useSelector } from "react-redux"
import {  CartItem, clearCart, removeItem } from "@/store/cartSlice";
import { RainbowButton } from "@/components/ui/rainbow-button"
import { useDispatch } from "react-redux";
import { Separator } from "@/components/ui/separator"
import PayPalButton from "../PayPalButton"
import { useRouter } from "next/navigation"
import { SignJWT } from 'jose';
import { Button } from "@/components/ui/button";



type  Props ={
    items:CartItem[];
}
export default function ViewCheckOut() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
    const router =useRouter()
    const dispatch = useDispatch()
    const items = useSelector((state:RootState)=>state.cart.items);
    //  const addCartHandler =(item:CartItem)=> dispatch(addItem(item))
    //  const removeCartHanlder =(id:number)=> dispatch(removeItem({id}))
    // const totalquantity = items.reduce((total,item) => total + item.quantity,0)  
    const handlerequi=(title:any)=>{
      toast.warning(title, {
        description:` Fill in full ${title} information`,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    }

 

    const handleSuccess= async (details:any)=>{

        
      
    
      
      try {
        const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY_TOKEN ;
        const secretKey = new TextEncoder().encode(SECRET_KEY); 
        const payload = {  productIds: items.map(item => item.id), email: email };
  
        // Tạo JWT
        const token = await new SignJWT(payload)
          .setProtectedHeader({ alg: 'HS256' })
          .setExpirationTime('10d')
          .sign(secretKey);
  
       
        router.push(`/success?token=${token}`);
      } catch (error) {
        console.error('Lỗi tạo token:', error);
        alert('gửi qua email')
      }
      // 
        // dispatch(clearCart())
    }
    

    const handleError=async()=>{

    }








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
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">

              

<Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="text-xl">Billing details</CardTitle>
        <CardDescription>
          Enter your information 
        </CardDescription>
      </CardHeader>
      <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2 mt-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                placeholder="Max"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="grid gap- mt-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                placeholder="Robinson"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2  mt-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2 mt-2">
            <Label htmlFor="additional-info">Additional Information</Label>
            <Textarea
              defaultValue ='aa'
              id="additional-info"
              placeholder="Note about your order, e.g., special notes for delivery"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </div>

      </CardContent>
    </Card>


    <Card x-chunk="dashboard-06-chunk-0" className=" relative ">
        <BorderBeam/>
                <CardHeader>
                  <CardTitle>Your Order</CardTitle>
                 
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className=" w-[100px] sm:table-cell">
                          <span className="sr-only text-black">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        
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
                                        <TableCell className="md:table-cell">
                                            <img
                                                alt={item.title}
                                                className="aspect-square rounded-md object-cover"
                                                height="64"
                                                src={"/images/"+item.image  }
                                                width="64"
                                            />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                               {item.title}
                                            </TableCell>
                                            <TableCell>
                                            <Badge variant="outline">{item.quantity}</Badge>
                                            </TableCell>
                                          
                                            
                                            <TableCell className=" md:table-cell">
                                            {(item?.price_sale * item?.quantity).toFixed(2)}$
                                            </TableCell >
                                            
                                            
                                        </TableRow>
                                   })
                                }
                                  
                            
                                  <Separator/>
                    </TableBody>
                    
                  </Table>
                </CardContent>
               
                <CardContent className="">

                            <div className="flex justify-between">     
                                <div className="sub">
                                        <span className="text-md font-bold">SubTotal</span>
                                    </div>
                                    <div className="total price">
                                    <span className="text-md font-bold">{totalprice.toFixed(2)}$</span>
                                    </div>
                            </div>
                       
                        <div className="flex justify-center m-2">
                            
                            <Textarea readOnly>Pay via PayPa  you can pay with your credit card if you dont have a PayPal account.</Textarea>
                          

                        </div>
                        <div className="flex start m-2">
                            
                           <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <Link href="#" className="  font-bold  "> Privacy Policy.</Link> </p>
                          

                        </div>
                        <div className="items-top flex space-x-2 m-2">
                        <Checkbox id="terms1" checked={true} />
                        <div className="grid gap-1.5 leading-none">
                            <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                            I have read and agree to the website 
                            </label>
                            <p className="text-sm text-muted-foreground">
                       
                            </p>
                        </div>
                        </div>
                        <div className="flex justify-start  w-full  ">
                            
                            
                                
                        {/* {email.length == 0?<RainbowButton onClick={()=>handlerequi("Email")}>Check Out PayPal</RainbowButton>:firstName.length == 0?<RainbowButton onClick={()=>handlerequi(" FirstName")}>Check Out PayPal</RainbowButton>:  lastName.length == 0?<RainbowButton onClick={()=>handlerequi("LastName ")}>Check Out PayPal</RainbowButton> :
                        email.includes('@')?
                       
                          :<RainbowButton onClick={()=>handlerequi("Email @")}>Check Out PayPal</RainbowButton>
                        } */}




                      
                         <PayPalButton
                          
                          amount={totalprice}
                          onSuccess={handleSuccess}
                          onError={handleError}
                        
                        />
                        </div>
                
                </CardContent>
              </Card>
         </div>
        )}


        </div>
    </main>
    
    
    </div>
  } 