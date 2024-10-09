'use client'

import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import { BorderBeam } from "@/components/ui/border-beam";

import { RainbowButton } from "@/components/ui/rainbow-button";
  

import { useState, useEffect } from "react";
import { Product_one } from "@/app/components/Product";
import { Product } from "@/app/Types";
import { toast } from "sonner"
import Link from "next/link";

import { catehint } from "@/app/Types";

interface CateProps {
  brecrum: any;
  ListProductProps: Product[];
  list_cate_hint: catehint[]

}

export default function Cate({ brecrum, ListProductProps,list_cate_hint}: CateProps) {
 
  const [page,setPage] = useState(1)
  const [products, setProducts] = useState<Product[]>(ListProductProps); // Initialize with props
  const [brecrum_is, setbrecrum_is] = useState<any>(brecrum); // Initialize with props

  useEffect(() => {
      setProducts(ListProductProps); 
      setbrecrum_is(brecrum)
  }, []);

  const onClickhanlderloadmore = async () => {
    const nextPage = page + 1;
    setPage(nextPage); // Increment page

    const slug_is = brecrum_is ? brecrum_is.data[0].current_slug : 1;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/cateproduct?keyid=${slug_is}&page=${nextPage}`;

    try {
      // Fetch new data
      const response = await fetch(url);
      const newProductData = await response.json();

      if (Array.isArray(newProductData.data)) {
        // Concatenate new products with the existing ones

        toast.success("success", {
          
          })
        setProducts((prevProducts) => [...prevProducts, ...newProductData.data]);
      }
    } catch (error) {
      console.error('Error loading more products:', error);
    }
  };

    return (
        <>
        
    {/* {brecrum_is ? brecrum_is.data[0].current_slug:""} */}
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="w-full md:max-w-screen-xl mx-auto">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
            <Card className="sm:col-span-2 text-center relative">
              <BorderBeam size={250} duration={12} delay={9} />
              <CardHeader className="pb-3">
                <CardTitle>{brecrum_is ?  brecrum_is.data[0].current_title : "No Category Available"}</CardTitle>
              </CardHeader>
              <CardFooter className="text-center flex justify-center m-2">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {brecrum_is ? (
                      <>
                        <BreadcrumbItem>
                          <BreadcrumbLink href={`/${ brecrum_is.data[0].level1_slug}`}>
                            { brecrum_is.data[0].level1_title}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                         {brecrum_is.data[0].level1_title?<BreadcrumbSeparator />:""}
                        <BreadcrumbItem>
                          <BreadcrumbPage>{ brecrum_is.data[0].current_title}</BreadcrumbPage>
                        </BreadcrumbItem>
                      </>
                    ) : (
                      <BreadcrumbItem>
                        <BreadcrumbPage>No Breadcrumbs</BreadcrumbPage>
                      </BreadcrumbItem>
                    )}
                  </BreadcrumbList>
                </Breadcrumb>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* catehint */}
        <div className="w-full md:max-w-screen-xl mx-auto">
               <div className="flex justify-start gap-2 bg-zinc-900 px-2 py-2 rounded-md">

                 {list_cate_hint.length >0?<>
                    {list_cate_hint.map((item,index)=>{
                      return<>
                         <div key={index} className="item-cateconcert">
                          <Link href={item.slug}> <RainbowButton>{item.title}</RainbowButton></Link>

                         </div>


                      </>
                    })}
                 
                 
                  </>:""
                 
                  
                
                } 
                </div>    
        </div>
  
        <div className="w-full md:max-w-screen-xl mx-auto">
          {products ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {products.map((product) => (
                <Product_one key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center m-6">
              <p>No Products Available</p>
            </div>
          )}
         
        </div>
       
        {products.length > 0?(  <div className="flex justify-center mt-4">
        <RainbowButton  onClick={onClickhanlderloadmore}>Load More</RainbowButton>
        </div>):<div className="flex justify-center mt-4">
        <Link  href="/"><RainbowButton  >No Products Available</RainbowButton></Link>
        </div>}
      
      </main>

      </>
    );
  }
  