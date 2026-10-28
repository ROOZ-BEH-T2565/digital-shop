import { Suspense } from "react";
import { io } from "next/cache";
import { getProducts } from "../services";
import ProductList from "../components/ProductList";
import { LoadingScreen } from "@/components/LoadingScreen";

async function ProductGrid() {
  await io();
  const products = await getProducts();
  return <ProductList products={products} />;
}

function ProductListView() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ProductGrid />
    </Suspense>
  );
}

export default ProductListView;
