import { Suspense } from "react";
import { io } from "next/cache";
import ProductForm from "@/modules/products/components/ProductForm";
import { LoadingScreen } from "@/components/LoadingScreen";

async function NewProductContent() {
  await io();
  return <ProductForm product={null} />;
}

export default function NewProductPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <NewProductContent />
    </Suspense>
  );
}
