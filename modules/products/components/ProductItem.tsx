import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ProductWithImages } from "@/types/productsType";
import { GalleryThumbnails, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function ProductItem({ products }: { products: ProductWithImages }) {
  return (
    <Card className="w-[480px] transform transition-transform duration-300 hover:scale-102">
      <CardHeader>
        <div className="relative w-full h-[300px]">
          <Image
            src={products?.images[0]?.image || "/assets/noImage.jpg"}
            alt={products?.name}
            fill
            className="rounded-t-lg object-cover"
          />
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{products?.name}</h2>
        <p className="text-gray-500">{products?.category}</p>
        <div className="flex justify-center items-center">
          <p className="mt-4 text-lg font-semibold">
            {products?.price?.toFixed(2)}
          </p>
          <div className="flex gap-2">
            <Heart />
            <Link href={`/products/catalog?id=${products.id}`}>
              <GalleryThumbnails />
            </Link>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/products/${products.id}`}
          className={
            buttonVariants({ variant: "default", size: "default" }) + " w-full"
          }
        >
          More Detail
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ProductItem;
