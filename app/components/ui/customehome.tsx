// 'use client'

// import { RainbowButton } from "@/components/ui/rainbow-button";
// import { ListProduct } from "../ListProuct";
// import { Product,  } from "@/app/Types";  // Adjust the import paths as necessary

// interface CategoryCardProps {
//   category: Category;
// }

// interface CategoryPageProps {
//   data: Category[];  // This expects an array of Category objects
// }

// export function Category_page_home({ data }: CategoryPageProps) {
//   return (
//     <>
//       {/* Map through the categories data */}
//       {data.map((item) => {
//         return (
//           <div key={item.category_id} className="m-4 p-4 border rounded shadow">
//             {/* Display Category Title with a RainbowButton */}
//             <div className="flex justify-start m-2">
//               <RainbowButton>{item.title}</RainbowButton> {/* Corrected to use 'title' */}
//             </div>

//             {/* List Products under each Category */}
//             <ListProduct data={item.products} />
//           </div>
//         );
//       })}
//     </>
//   );
// }
