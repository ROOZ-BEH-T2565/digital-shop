// import { getProducts } from "@/modules/products/services";

// export type ProductWithImages = Awaited<ReturnType<typeof getProducts>>[number];

// //export type ProductCategory = "Mobile" | "Laptop" | "Watch" | "Others";
// types/productsType.ts

/**
 * Category enum به صورت const object
 * - هم به عنوان value کار می‌کند: ProductCategory.Mobile
 * - هم به عنوان type کار می‌کند: category: ProductCategory
 * - با Object.values(ProductCategory) هم سازگار است
 */
export const ProductCategory = {
  Mobile: "Mobile",
  Laptop: "Laptop",
  Watch: "Watch",
  Others: "Others",
} as const;

export type ProductCategory =
  (typeof ProductCategory)[keyof typeof ProductCategory];

/**
 * شکل تصویر محصول (بدون back-reference به Product)
 * این دقیقاً همان چیزی است که include("images") برمی‌گرداند
 */
export type ProductImage = {
  id: number;
  image: string;
  productId: number | null;
};

/**
 * محصول به همراه تصاویر
 * دقیقاً همان شکل خروجی getProducts / getProductById
 */
export type ProductWithImages = {
  id: number;
  name: string;
  category: ProductCategory;
  description: string;
  price: number | null;
  quantity: number | null;
  images: ProductImage[];
};

/**
 * (اختیاری) داده‌های فرم برای create/update
 */
export type ProductFormData = {
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  quantity: number;
};
