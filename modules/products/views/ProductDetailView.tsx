import ProductForm from "../components/ProductForm";
import { getProductById } from "../services";

async function ProductDetailView({ id }: { id: number }) {
  const Product = await getProductById(Number(id));
  return (
    <div>
      <ProductForm product={Product} />
    </div>
  );
}

export default ProductDetailView;
