// app/page.tsx

import React from 'react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
// import { MarqueeDemo } from "./components/ui/test";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Master svg - Craft Your Masterpiece with MasterSVG',
  description: 'Welcome to Master SVG - your go-to destination for high-quality SVG files. Discover thousands of beautiful svg and png!',
  robots: {
    follow: true,
    index: true,
  },
  openGraph: {
    locale: 'en_US',
    type: 'website',
    url: 'https://mastersvg.com/',
    title: 'Master svg - Craft Your Masterpiece with MasterSVG',
    description: 'Welcome to Master SVG - your go-to destination for high-quality SVG files. Discover thousands of beautiful svg and png!',
    siteName: 'Mastersvg',
  },
  alternates: {
    canonical: 'https://mastersvg.com/',
  },
  other: {
    copyright: 'Mastersvg',
    author: 'Mastersvg',
    generator: 'Mastersvg',
  },
};
import Holidays from './components/DataCateHome/Holidays';
// import Mikey from './components/DataCateHome/Mikey';
const Home = async () => {
  try {
    
 
    
   
    return (
      <>
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
          <div className="w-full md:max-w-screen-xl mx-auto">
            {/* Header Section */}
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 z-2">
           
              <Card className="sm:col-span-2 text-center relative">
                <BorderBeam size={250} duration={12} delay={9} />
                <CardHeader className="pb-3">
                  <h1 className='font-bold'>Oladino Free & Premium Digital SVG and PNG Files for Every Occasion</h1>
                  
                  <CardDescription className="text-center">
                    Stay ahead with trend-setting designs, updated daily and hourly on store.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="text-center flex justify-center m-2">
                  <Button>ORDER NOW</Button>
                </CardFooter>
              </Card>
            </div>

           

   
           
              <Holidays/>
                {/* <Mikey/> */}
           

             
             
          </div>
        
        </main>
        {/* <MarqueeDemo /> */}
      </>
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return (
      <div className="text-red-500">
        Error fetching categories: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }
};




export default Home;
