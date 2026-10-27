// modules/products/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/src/prisma/db";
import type { ProductCategory } from "@/types/productsType";

type ProductFormData = {
  id?: number;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  quantity: number;
};

export async function submitProduct(data: ProductFormData) {
  const { id, ...fields } = data;

  try {
    if (id) {
      await db.orm.public.Product.where({ id }).update(fields);
    } else {
      await db.orm.public.Product.create(fields);
    }
  } catch (error) {
    console.error("خطا در ذخیره محصول:", error);
    return { error: "ذخیره محصول با خطا مواجه شد. دوباره تلاش کنید." };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function deleteProduct(id: number) {
  try {
    await db.orm.public.Image.where({ productId: id }).delete();

    await db.orm.public.Product.where({ id }).delete();

    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (error) {
    console.error("خطا در حذف محصول:", error);
    return { error: "حذف محصول با خطا مواجه شد." };
  }
}
