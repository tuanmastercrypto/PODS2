

'use client'
import { useSearchParams } from "next/navigation";


import { RainbowButton } from "@/components/ui/rainbow-button";
  

import { useState, useEffect } from "react";
import { Product_one } from "@/app/components/Product";
import { Product } from "@/app/Types";
import { toast } from "sonner"
import Link from "next/link";
 
interface SearchProps {
  ListProductProps: Product[];
}

export default function SearchHome({ListProductProps }:  SearchProps) {
 
  const [page,setPage] = useState(1)
  const [products, setProducts] = useState<Product[]>(ListProductProps); // Initialize with props
  const searchParams = useSearchParams()
    
    const key = searchParams.get('key') 
    console.log(key)

  useEffect(() => {
      setProducts(ListProductProps); 
    
  }, []);

  const onClickhanlderloadmore = async () => {
    const nextPage = page + 1;
    setPage(nextPage); // Increment page
  
  
    const url = `${process.env.NEXT_PUBLIC_API_URL}/searchkey?keyid=${key}&page=${nextPage}`;

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
        
   
        
       
        <div className="w-full md:max-w-screen-xl mx-auto">

                <div className="text-xs text-muted-foreground">
                    Showing <strong>{page}-100</strong> of <strong>3200</strong>{" "}
                    products
                </div>






          {products ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {products.map((product) => (
                <Product_one key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center m-10">
              <p>No Products Available</p>
            </div>
          )}
         
        </div>
       
        {products.length > 0?(  <div className="flex justify-center">
        <RainbowButton  onClick={onClickhanlderloadmore}>Load More</RainbowButton>
        </div>):<div className="flex justify-center m-10">
        <Link  href="/"><RainbowButton  >No Products Available</RainbowButton></Link>
        </div>}
      
     

      </>
    );
  }
  



