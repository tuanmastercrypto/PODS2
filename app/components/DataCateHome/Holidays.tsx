'use client'
import React, { useEffect, useState } from "react";
import ShineBorder from "@/components/ui/shine-border";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Button } from "@/components/ui/button";
import { ListProduct } from "../ListProuct";
import Link from "next/link";
export function Holidays() {
  const [data, setData] = useState<any>(null); // State to hold the data
  const [data2, setData2] = useState<any>(null); // State to hold the data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
     

        const [response1, response2,] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/category_page_home?keyid=13` , { next: { revalidate: 360000 },  }), // API 1
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/category_page_home?keyid=14`, { next: { revalidate: 360000 } }), // API 2
        
        ]);
        if (!response1.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response1.json();
        const result2 = await response2.json();
        setData(result.data);
        setData2(result2.data);
      } catch (error) {
        setError("error");
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) return <p>Loading...</p>; // Show loading state
  if (error) return <p>Error: {error}</p>; // Show error message if there's an error

  return (
    <>
      <div className="cate1">
        <div className="flex justify-center m-2"> 
          <Button variant={"ghost"}>
            <h2 className="font-bold text-md md:text-3xl px-2 py-2 rounded-md m-2 hover:font-black leading-snug text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 ">
              Holidays svg
            </h2>
          </Button>
        </div>
        <div className="h3 mt-2 mb-2">
          <div className="main-cate flex justify-between items-center shadow-md rounded-md px-2 py-2 bg-slate-900 ">
            <div className="top-main-cate w-5">
              <ShineBorder
                className="text-center text-md font-bold capitalize w-2 "
                color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              >
                <h3 className="text-sm md:text-md">Christmas SVG</h3>
              </ShineBorder>
            </div>
            <div className="top-main-cate-viewall text-sm md:text-md">
              <Link href="/christmas-svg">
              <RainbowButton>View all</RainbowButton></Link>
            </div>
          </div>

          <div className="product">
            <ListProduct data={data} />
          </div>
        </div>

        <div className="h3  mt-4 mb-2">
          <div className="main-cate flex justify-between items-center shadow-md rounded-md px-2 py-2 bg-slate-900 ">
            <div className="top-main-cate w-5">
              <ShineBorder
                className="text-center text-md font-bold capitalize w-2 "
                color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              >
                <h3 className="text-sm md:text-md">Halloween SVG </h3>
              </ShineBorder>
            </div>
            <div className="top-main-cate-viewall text-sm md:text-md">
              <Link href="/halloween-svg">
              <RainbowButton>View all</RainbowButton></Link>
            </div>
          </div>

          <div className="product">
            <ListProduct data={data2} />
          </div>
        </div>
      </div>

      
    </>
  );
}
export default Holidays;
