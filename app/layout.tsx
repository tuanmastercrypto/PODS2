
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/sonner"
import { Header } from "./components/header_home";
import StoreProvider from "@/StoreProvider/StroProvider";
// import {persistor} from "../store/Store"
import {
  ClerkProvider,
 
} from '@clerk/nextjs'

import Footer from "./components/Footer/Footer";


import { Inter } from 'next/font/google'
 
const inter = Inter({ subsets: ['latin'] })
 

import SearchProductMB from "./components/SearchProduct/SearchMB";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <html lang="en" >
      <body
      className={inter.className}
      style={{padding:"0 !important"}}
      >
      <StoreProvider>
          
     
         <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
               <Toaster position="top-center"   richColors />
              <div className="flex min-h-screen w-full flex-col bg-muted/40">
               
                <div className="">
                    <ClerkProvider>
                        <Header/>  
                        <div className="  grid-cols-1 px-1 py-1 md:hidden   mx-2" >
                          <SearchProductMB/>
                        </div>
                        {children}
                        <Footer/>

                    </ClerkProvider>
                </div>
              </div>
            
            
        </ThemeProvider>
       
        </StoreProvider>
      </body>
    </html>
  
    
  );
}
