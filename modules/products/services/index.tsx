import { db } from "@/src/prisma/db";
import { ProductWithImages } from "@/types/productsType";

export const getProducts = async () => {
  return await db.orm.public.Product.include("images").all();
};

export const getProductById = async (id: number) => {
  return await db.orm.public.Product.where({ id }).include("images").first();
};

export const upsertProduct = async (
  product: Omit<ProductWithImages, "id" | "images"> & { id?: number },
) => {
  const { id, ...data } = product;

  if (id) {
    return await db.orm.public.Product.where({ id }).update(data);
  }

  return await db.orm.public.Product.create(data);
};
