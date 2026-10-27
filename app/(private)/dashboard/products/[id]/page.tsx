// app/(private)/dashboard/products/[id]/page.tsx
import { Suspense } from "react";
import { io } from "next/cache";
import ProductDetailView from "@/modules/products/views/ProductDetailView";

// این کامپوننت async است و داخل <Suspense> قرار می‌گیرد
async function ProductContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // ✅ داخل Suspense
  await io(); // ✅ برای جلوگیری از خطای crypto.randomUUID مربوط به Prisma
  return <ProductDetailView id={Number(id)} />;
}

// این کامپوننت دیگر async نیست و params را await نمی‌کند
export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <ProductContent params={params} />
    </Suspense>
  );
}
