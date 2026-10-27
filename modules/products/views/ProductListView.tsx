import { Suspense } from "react";
import ProductList from "../components/ProductList";
import { getProducts } from "../services";

async function ProductGrid() {
  const products = await getProducts();
  return <ProductList products={products} />;
}

function ProductListView() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <ProductGrid />
    </Suspense>
  );
}

export default ProductListView;
