"use client";

import { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductWithImages, ProductCategory } from "@/types/productsType";
import { submitProduct } from "../actions";
import UploadImage from "./UploadImage";

function ProductForm({ product }: { product: ProductWithImages | null }) {
  const isEdit = product !== null;

  const [name, setName] = useState(product?.name ?? "");
  const [category, setCategory] = useState<ProductCategory>(
    product?.category ?? ProductCategory.Others,
  );
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(
    product?.price != null ? String(product.price) : "",
  );
  const [quantity, setQuantity] = useState(
    product?.quantity != null ? String(product.quantity) : "",
  );

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const data = {
      id: product?.id,
      name: name.trim(),
      category,
      description: description.trim(),
      price: price ? Number(price) : 0,
      quantity: quantity ? Number(quantity) : 0,
    };

    startTransition(async () => {
      const result = await submitProduct(data);
      if (result?.error) {
        setError(result.error);
      }
      // در صورت موفقیت، redirect خودکار توسط Server Action انجام می‌شود
    });
  }

  return (
    <Card className="w-[500px] mx-auto mt-10">
      <form onSubmit={handleSubmit} className="max-w-lg">
        <CardHeader>
          <CardTitle>{isEdit ? "Edit Product" : "New Product"}</CardTitle>
          <CardDescription>
            {isEdit ? "Update product details" : "Create a new product"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="my-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isPending}
            />
          </div>

          <div className="my-2">
            <Label htmlFor="category">Category</Label>
            <Select
              required
              value={category}
              onValueChange={(v) => setCategory(v as ProductCategory)}
              disabled={isPending}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ProductCategory).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="my-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending}
            />
          </div>

          <div className="my-2 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={isPending}
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                disabled={isPending}
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-md p-2 mt-2">
              {error}
            </p>
          )}
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending
              ? "در حال ذخیره..."
              : isEdit
                ? "Update Product"
                : "Create Product"}
          </Button>
        </CardFooter>
        {product?.id && (
          <CardFooter>
            <UploadImage productId={product?.id} />
          </CardFooter>
        )}
      </form>
    </Card>
  );
}

export default ProductForm;
