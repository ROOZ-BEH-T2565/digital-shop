// "use client";
// import { DATA } from "@/modules/products/mock/products";
// import { Card, CardContent } from "../ui/card";
// import Image from "next/image";
// // import { useSearchParams } from "next/navigation";

// type ProductImage = {
//   image: string;
// };

// function CatalogList() {
//   // const params = useSearchParams();
//   // const id = params.get("id");

//   const images: ProductImage[] = DATA[0].images;

//   return (
//     <div className="flex flex-wrap justify-center mb-4">
//       {images?.map((_image: any, index) => (
//         <div className="p-1" key={index}>
//           <Card>
//             <CardContent className="flex w-[400px] h-[400px] items-center justify-center p-6">
//               <Image
//                 src={_image.image}
//                 alt="gallery"
//                 width={400}
//                 height={400}
//                 className="hover:scale-102 transform transition-transform duration-300"
//               />
//             </CardContent>
//           </Card>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default CatalogList;
