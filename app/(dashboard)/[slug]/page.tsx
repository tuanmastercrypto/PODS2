import { Suspense } from "react";
import { catehint, Product } from "@/app/Types";
import Cate from "@/app/components/ui/customecate";
import { redirect } from 'next/navigation'; // Import the redirect function
import { Metadata } from "next";



export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seocate?keyid=${slug}`);
  const data = await response.json();

  if (data.message === 'success' && data.data.length > 0) {
    const seoData = data.data[0];

    return {
      title: seoData.titleseo || seoData.title || 'Default Title',
      description: seoData.descriptionshort || 'Default description',
      robots: {
        follow: true,
        index: true,
      },
      openGraph: {
        title: seoData.titleseo || seoData.title,
        description: seoData.metadescription || 'Default OG description',
        url: `${process.env.NEXT_PUBLIC_IMG_HOST}${seoData.slug}`,
        images: [
          {
            url: seoData.image || '/default-image.png', 
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      other: {
        copyright: 'Mastersvg',
        author: 'Mastersvg',
        generator: 'Mastersvg',
      }, 
    };
  }

  // Fallback metadata if API call fails or no data returned
  return {
    title: 'Category  Master SVG',
    description: '',
  };
}








export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  // Fetch data on the server
  const [productResponse, breadcrumbResponse,catehints] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cateproduct?keyid=${slug}&page=1`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/breadcrumb?keyid=${slug}`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/catehint?keyid=${slug}`),
  ]);

  const productData = await productResponse.json();
  const breadcrumbs = await breadcrumbResponse.json();
  const categorys = await catehints.json()

  const data: Product[] = Array.isArray(productData.data) ? productData.data : [];
  const datacate: catehint[] = Array.isArray(categorys.data) ? categorys.data : [];

  if (breadcrumbs.data.length === 0) {
    redirect('/'); // Redirect to the homepage
  }

  return (
    <div>
      {/* Use Suspense to show loading while the  component fetches data */}
      <Suspense fallback={<div>Loading data...</div>}>
        {breadcrumbs.data.length > 0? <Cate brecrum={breadcrumbs} ListProductProps={data}       list_cate_hint ={datacate}   />:"No Cate Product"}
        
      </Suspense>
    </div>
  );
}
