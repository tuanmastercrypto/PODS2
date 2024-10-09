import DownloadItem from "@/app/components/ui/customesuccess";
import { Suspense } from "react";
interface Download {
  link_download: string;
  title: string;
  image:string;
}

export default async function Page({ searchParams }: { searchParams: { token?: string } }) {
  const tokens = searchParams.token;

  // Fetch data on the server
  const [productResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/verifytoken?token=${tokens}`),
  ]);

  const ListDownLoad = await productResponse.json();
  
  // Extracting the data and ensuring it's an array
  const data: Download[] = Array.isArray(ListDownLoad.data) ? ListDownLoad.data : [];



  return (
    <div>
      {}
      <Suspense fallback={<div>Loading data...</div>}>
           {data.length >0? <DownloadItem mydata={data} />:"no data"}
             
      </Suspense>
   
        

       
     
    </div>
  );
}
