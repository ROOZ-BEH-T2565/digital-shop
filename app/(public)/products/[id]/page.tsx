import { Suspense } from "react";
import { io } from "next/cache";
import { getProductById } from "@/modules/products/services";
import ProductDetail from "@/modules/products/components/ProductDetail";
import { LoadingScreen } from "@/components/LoadingScreen";

async function ProductContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await io();
  const product = await getProductById(Number(id));

  if (!product) {
    return (
      <div className="flex justify-center items-center text-2xl font-bold">
        محصول پیدا نشد
      </div>
    );
  }

  return <ProductDetail product={product} />;
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
