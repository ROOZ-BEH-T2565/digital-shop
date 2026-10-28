import { ProductWithImages } from "@/types/productsType";
import ProductItem from "./ProductItem";

function ProductList({ products }: { products: ProductWithImages[] }) {
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center font-bold text-2xl">
        محصولی یافت نشد
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((item) => (
        <ProductItem key={item.id} products={item} />
      ))}
    </div>
  );
}

export default ProductList;
