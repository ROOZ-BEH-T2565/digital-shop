import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductWithImages } from "@/types/productsType";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ProductDetail({ product }: { product: ProductWithImages }) {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0].image}
                  alt={product.name}
                  height={500}
                  width={500}
                  className="rounded-lg"
                />
              ) : (
                <div>NO Image Available</div>
              )}
            </div>
            <div className="flex flex-col justify-between">
              <p className="text-xl font-semibold">
                ${product.price?.toFixed(2)}
              </p>
              <p className="text-gray-700">{product.quantity}</p>
              <p className="mt-2 text-sm">{product.category}</p>
              <p className="text-gray-800 line-clamp-1">
                {product.description}
              </p>
              <Button className="my-4">
                <ShoppingCart />
              </Button>
              <Link
                href="/products"
                className={buttonVariants({ variant: "secondary" })}
              >
                Back to Products
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductDetail;
