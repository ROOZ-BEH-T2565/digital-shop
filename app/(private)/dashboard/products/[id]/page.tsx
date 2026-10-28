import { Suspense } from "react";
import { io } from "next/cache";
import ProductDetailView from "@/modules/products/views/ProductDetailView";
import { LoadingScreen } from "@/components/LoadingScreen";

async function ProductContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await io();
  return <ProductDetailView id={Number(id)} />;
}

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
