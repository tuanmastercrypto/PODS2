
"use client"
 
import * as React from "react"
import Link from "next/link"
import { CircleUser, Menu, Package2,  } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "./Theme"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,

} from "@/components/ui/navigation-menu"
 
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

import ShoppingCartButton from "./ShoppingCart"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"


import SearchProduct from "./SearchProduct/Search"
export function Header() {
   
  const occasions = [
    {title:'Veteran Day SVG', url :'veteran-day-svg'},
    {title:' Easter Day SVG	 ', url :'easter-day-svg/'},
     {title:'ST Patricks day svg	', url :'st-patricks-day-svg/'},
     {title:'Mothers Day SVG	', url :'mother-day-svg/'},
    {title:"Father's Day SVG	", url :'fathers-day-svg'},
    {title:' Juneteenth SVG	', url :'juneteenth-svg/'},
     {title:'4th Of July SVG	', url :'4th-of-july-svg/'},
     {title:'Back To School	', url :'back-to-school'},
     {title:'Birthday SVG	', url :'birthday-svg'},
     {title:"Valentine's Day SVG", url :'valentines-day-svg'},
     {title:'Christmas SVG	', url :'christmas-svg'},
    {title:' Halloween SVG	', url :'halloween-svg'},
  ];
  
  return (
    <div className="flex  w-full flex-col">

      <div className="w-full md:max-w-screen-xl mx-auto">
        <div className="">
          <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 rounded-md">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                <img src="../favicon.ico"    className="h-14 w-28" />
                <span className="sr-only">Acme Inc</span>
              </Link>
            
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                  </Link>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Orders
                  </Link>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Products
                  </Link>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Customers
                  </Link>
                  <Link href="#" className="hover:text-foreground">
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-2   justify-end md:ml-auto md:gap-2 lg:gap-4">
           

              <div className=" w-full  hidden md:block">
                  <SearchProduct />
              </div>
         
                 
                  <ModeToggle/>
                
                  <ShoppingCartButton/>

             
                  <SignedIn>
                    <UserButton/>
                  </SignedIn>

                  <SignedOut>
                    <SignInButton> 
                    <CircleUser className="h-5 w-5" />
                   
                  </SignInButton>
                  </SignedOut>
                
            </div>
          </header>
          </div>
      </div>





    <div className="bg-gray-100 z-1 " >
      <div className="  flex justify-center w-full md:max-w-screen-sm mx-auto px-2 py-2 gap-2 hidden md:flex">
        <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>SVG Store</NavigationMenuTrigger>
            <NavigationMenuContent>
             
            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px] ">

                 <div className="">
                  <Link href="/holidays-svg"><span className=" font-bold text-md"> Holidays svg</span></Link>
                  <ul className="space-y-2">
                  {occasions.map((occasion, index) => (
                      <li key={index}>
                        <Link href={occasion.url}>
                          <p className="text-sm group relative w-max">
                            <span>{occasion.title}</span>
                            <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-red-300 group-hover:w-full" />
                          </p>
                        </Link>
                      </li>
                    ))}

                  
                    
                  </ul>
                 
                  
                  </div>
                  <div className="">
                  <Link href="/mickey-svg"><span className=" font-bold "> Movie svg</span></Link>
                  <ul className="space-y-2">
                    <li><Link href="/mickey-svg"><span className="text-sm"> Mickey svg</span></Link> </li>
                    <li><Link href="/minnie-svg"><span className="text-sm"> Minnie svg</span></Link> </li>
                    <li><Link href="/star-war-svg"><span className="text-sm"> Star War SVG</span></Link> </li>
                    <li><Link href="/harry-potter-svg"><span className="text-sm">Harry Potter SVG</span></Link> </li>
         
                  </ul>
                 
                  
                  </div>
                  <div className="">
                  <Link href="#"><span className=" font-bold "> Sport svg</span></Link>
                  <ul>
                    <li><Link href="/nfl-svg"><span className="text-sm">NFL svg</span></Link> </li>
                    <li><Link href="/nba-svg"><span className="text-sm">NBA svg</span></Link> </li>
      
                  </ul>
                 
                  
                  </div>
               
              </div>



            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Memberships</NavigationMenuTrigger>
            <NavigationMenuContent>
           

            </NavigationMenuContent>
          </NavigationMenuItem>
         
          <NavigationMenuItem>
            <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
            <NavigationMenuContent>
          
              
            </NavigationMenuContent>
          </NavigationMenuItem>
        
        </NavigationMenuList>
      </NavigationMenu>

      </div>
    </div>


    
    </div>
  )
}
