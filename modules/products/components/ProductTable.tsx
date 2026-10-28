import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductWithImages } from "@/types/productsType";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DeleteButton } from "@/components/DeleteButton";

function ProductTable({ products }: { products: ProductWithImages[] }) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md mt-4">
      {/* هدر: عنوان سمت چپ، دکمه سمت راست */}
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <h1 className="text-xl font-semibold">Products</h1>
        <Link href="/dashboard/products/new" className={buttonVariants()}>
          Add New Product
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center">Image</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500 py-6">
                هیچ محصولی یافت نشد
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-center">
                  {product.category}
                </TableCell>
                <TableCell className="text-center">
                  {product.price != null ? `$${product.price.toFixed(2)}` : "—"}
                </TableCell>
                <TableCell className="text-center">
                  {product.quantity ?? 0}
                </TableCell>
                <TableCell className="text-center">
                  {product.images?.[0]?.image ? (
                    <Image
                      src={product.images[0].image}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded-full m-auto object-cover"
                    />
                  ) : (
                    <div className="w-[50px] h-[50px] rounded-full bg-gray-200 m-auto" />
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center items-center gap-2">
                    <Link
                      href={`/dashboard/products/${product.id}`}
                      className={buttonVariants({
                        variant: "ghost",
                        size: "icon",
                      })}
                      aria-label="ویرایش"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <DeleteButton id={product.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="font-semibold">
              Total
            </TableCell>
            <TableCell className="text-center font-semibold">
              {products.reduce((sum, p) => sum + (p.quantity ?? 0), 0)}
            </TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default ProductTable;
