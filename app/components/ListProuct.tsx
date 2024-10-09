

import { Product_one } from "./Product";
import type { Product } from "../Types";
interface ListProductProps {
    data: Product[]; 
  }


export function  ListProduct({ data }: ListProductProps) {


  // console.log("trong list product",data)

  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
               
                {data.map((product, index) => (

                    <Product_one key={index}  product ={product}/>
                ))}
            

        </div>
    </>
  );
}