import { Suspense } from "react";
import { io } from "next/cache";
import ProductDashboardView from "@/modules/products/views/ProductDashboardView";
import { LoadingScreen } from "@/components/LoadingScreen";

async function ProductDashboardContent() {
  await io(); // ← اجرا را به زمان درخواست موکول می‌کند
  return <ProductDashboardView />;
}

export default function DashBoardProducts() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ProductDashboardContent />
    </Suspense>
  );
}
