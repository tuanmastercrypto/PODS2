// 'use client'
// import React, { CSSProperties, useRef, useState } from "react";
// import { default as Image } from "next/image";

// interface ZoomProps {
//   zoomPercentage?: number;
//   backgroundColor?: string;
//   backgroundOpacity?: number;
//   animationDuration?: number;
//   src: string;
//   alt?: string;
//   width?: number;
//   height?: number;
// }

// /**
//  * Zoom component
//  * @param {ZoomProps} props
//  */
// export const Zoom = ({
//   zoomPercentage = 90,
//   backgroundOpacity = 0.9,
//   backgroundColor = "white",
//   animationDuration = 300,
//   src,
//   alt = "Zoomable image",
//   width = 500,  // Giá trị mặc định cho width
//   height = 300,  // Giá trị mặc định cho height
// }: ZoomProps) => {

//   if (zoomPercentage < 1 || zoomPercentage > 100) {
//     throw new Error("Zoom percentage must be between 1 and 100");
//   }

//   if (backgroundOpacity < 0 || backgroundOpacity > 1) {
//     throw new Error("Background opacity must be between 0 and 1");
//   }

//   const containerRef = useRef<HTMLDivElement>(null);
//   const [clicked, setClicked] = useState(false);

//   const handleImageZoom = () => {
//     if (!containerRef.current || clicked) return;
  
//     const containerRect = containerRef.current.getBoundingClientRect();
//     const zoomPerc = 2; // Mặc định scale là 2
  
//     const clientWidth = containerRect.width;
//     const clientHeight = containerRect.height;
  
//     const scaleFactor = zoomPerc;
  
//     // Tính toán khoảng cách từ giữa màn hình đến vị trí hiện tại của ảnh
//     const translateX = 20
//     const translateY = 80
  
//     // Cập nhật transform để zoom ảnh vào giữa màn hình với scale mặc định là 2
//     containerRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleFactor})`;
  
//     window.document.addEventListener("scroll", closeWrapper, { once: true });
//     setClicked(true);
//   };
  
  
//   const closeWrapper = () => {
//     if (!containerRef.current) return;
//     containerRef.current.style.transform = `scale(1)`;
//     setClicked(false);
//   };

//   const styles: CSSProperties = {
//     position: "relative",
//     transition: `transform ${animationDuration}ms`,
//     display: "block",
//     width: "100%",
//     height: "100%",
//     zIndex: clicked ? 50 : 0,
//     overflow: "hidden",
//     backgroundColor: clicked ? "rgba(0,0,0,.3)" : "transparent",
//   };

//   return (
//     <>
//       {clicked && (
//         <div
//           style={{
//             backgroundColor: backgroundColor,
//             opacity: backgroundOpacity,
//             // position: "to",
//             // zIndex: 40,
//             // top: 0,
//             // left: 0,
//             width: "100%",
//             height: "100%",
//           }}
//           onClick={closeWrapper}
//         />
//       )}

//       <div style={styles} ref={containerRef} onClick={handleImageZoom} >
//         <Image src={src} alt={alt}   className="w-full h-auto object-cover  rounded-tr-md  rounded-tl-md hidden  md:block"
//                                     sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40 vw"
//                                     width={500} 
//                                     height={500}
//                                     style={{minHeight:"17rem", maxHeight:"18rem"}}
                                    
                                    
//                                     />

        
        
//       </div>
//     </>
//   );
// };

// export default Zoom;
