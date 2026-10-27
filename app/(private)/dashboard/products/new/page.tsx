import { Suspense } from "react";
import { io } from "next/cache";
import ProductForm from "@/modules/products/components/ProductForm";

async function NewProductContent() {
  await io();
  return <ProductForm product={null} />;
}

export default function NewProductPage() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <NewProductContent />
    </Suspense>
  );
}
