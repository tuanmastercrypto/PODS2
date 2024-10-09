"use client"

import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux";
import {  CartItem, clearCart } from "@/store/cartSlice";

type  Props ={
    items:CartItem[];
}



import confetti from "canvas-confetti";
 
import SparklesText from "@/components/ui/sparkles-text";

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
import { useEffect } from "react";
import { toast } from "sonner";
 

interface Download {
  link_download: string;
  title: string;
  image:string;
}

interface DownloadItemProps {
  mydata: Download[];
}
export default function DownloadItem({ mydata }: DownloadItemProps) {
  const handleClick = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
 
    const frame = () => {
      if (Date.now() > end) return;
 
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });
 
      requestAnimationFrame(frame);
    };
 
    frame();
  };
  const dispatch = useDispatch()
  const handleDownload = (url: string) => {
    handleClick()
    toast.success("Ready to download", {
     
    })
    const a = document.createElement("a");
    a.href = url;
    a.download = ""; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    dispatch(clearCart()); 
  }, []); 
    return <div>
   
    
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
       
                  <div className=" w-full md:max-w-screen-xl mx-auto   ">
                      <div className="list_item ">
                          <Table>
                          
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px]">Image</TableHead>
                            
                              <TableHead>Name</TableHead>
                              <TableHead className="">Function</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                          {mydata.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium"><img src={"/images/"+item.image}/></TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>< Button onClick={() => handleDownload(item.link_download)}>
                                    Download
                                  </Button></TableCell>
                                
                              </TableRow>
                            ))}
                          </TableBody>
                          <TableFooter>
                             
                          </TableFooter>
                          </Table>
                        </div>
            
                          <div className="flex justify-center">
                          <SparklesText text="MasTer SVG" />;
                          </div>
                  

        </div>
    </main>
    
    
    </div>
  } 