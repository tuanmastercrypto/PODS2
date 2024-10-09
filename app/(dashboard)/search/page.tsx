import { Metadata } from "next";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { BorderBeam } from "@/components/ui/border-beam";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
// Metadata for SEO
import { Product } from "@/app/Types";
import { Suspense } from "react";
export const metadata: Metadata = {
    // title: 'Tìm kiếm Master SVG',
    // description: 'SAU HA',
};

// Server component to render the search page

import SearchHome from "@/app/components/ui/customesearch";
import { Button } from "@/components/ui/button";
export default async function Page({ searchParams }: { searchParams: { key?: string } }) {
    // Extract the 'key' parameter from the URL
    const searchKey = searchParams.key || 'No search key provided';



  
    const formattedSearchKey = `${searchKey.replace(/\s+/g, '+')}`;
    const [productResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/searchkey?keyid=${formattedSearchKey}&page=1`),
       
      ]);
  
    const productData = await productResponse.json();
   
    
    const data: Product[] = Array.isArray(productData.data) ? productData.data : [];
    

    return (
        <div>
           <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
       
                <div className=" w-full md:max-w-screen-xl mx-auto   ">
                    
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 z-2">
                        <Card className="sm:col-span-2 text-center relative">
                            <BorderBeam size={250} duration={12} delay={9} />
                            <CardHeader className="pb-3">
                            <CardTitle className="text-md">Your Orders</CardTitle>
                            <CardTitle>

                                <h1>Oladino Free & Premium Digital SVG and PNG Files for Every Occasion</h1>
                            </CardTitle>
                            <CardDescription className="text-center">
                                Stay ahead with trend-setting designs, updated daily and hourly on store.
                            </CardDescription>
                            </CardHeader>
                            <CardFooter className="text-center flex justify-center m-2">
                              
                                <Button>Shop now</Button>
                          
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="max-w-md rounded-md mt-2 mb-2">
                                 <h2 className="px-2 py-2 text-md font-bold  bg-slate-900  text-white rounded-md" >Search Results for {searchKey}</h2>
                    </div>

                    <Suspense fallback={<div>Loading data...</div>}>
                        <SearchHome  ListProductProps={data} />
                    </Suspense>

                </div>

            </main>
        </div>
    );
}
