// app/(public)/products/[id]/page.tsx
import { Suspense } from "react";
import { io } from "next/cache";
import { getProductById } from "@/modules/products/services";
import ProductDetail from "@/modules/products/components/ProductDetail";

// این کامپوننت async است و داخل <Suspense> قرار می‌گیرد
async function ProductContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // ← await داخل کامپوننت فرزند
  await io(); // ← برای جلوگیری از خطای crypto.randomUUID
  const product = await getProductById(Number(id));

  if (!product) {
    return <div>محصول پیدا نشد</div>;
  }

  return <ProductDetail product={product} />;
}

// این کامپوننت دیگر async نیست و params را await نمی‌کند
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <ProductContent params={params} />
    </Suspense>
  );
}
