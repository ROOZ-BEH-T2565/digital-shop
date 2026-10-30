import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { db } from "@/src/prisma/db";
//GET ,POST,DELET

// POST
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const productId = formData.get("productId") as string | null;

    if (!file || !productId) {
      return NextResponse.json(
        { error: "Missing file or productId" },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 },
      );
    }

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large (max 5MB)" },
        { status: 400 },
      );
    }

    const numericProductId = Number(productId);
    if (!Number.isInteger(numericProductId) || numericProductId <= 0) {
      return NextResponse.json({ error: "Invalid productId" }, { status: 400 });
    }

    //  بررسی وجود محصول
    const product = await db.orm.public.Product.where({
      id: numericProductId,
    }).first();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    //  ذخیره‌ی فایل
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${numericProductId}-${Date.now()}-${safeName}`;

    const uploadDir = path.join(process.cwd(), "public", "assets");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, fileName), buffer);

    const url = `/assets/${fileName}`;

    //  ثبت در دیتابیس
    const image = await db.orm.public.Image.create({
      image: url,
      productId: numericProductId,
    });

    return NextResponse.json(
      { success: true, url, imageId: image.id },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/image error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

//GET
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (productId) {
      const numericProductId = Number(productId);
      if (!Number.isInteger(numericProductId) || numericProductId <= 0) {
        return NextResponse.json(
          { error: "Invalid productId" },
          { status: 400 },
        );
      }

      const images = await db.orm.public.Image.where({
        productId: numericProductId,
      }).all();

      return NextResponse.json({ images });
    }

    // همه‌ی تصاویر
    const images = await db.orm.public.Image.all();
    return NextResponse.json({ images });
  } catch (error) {
    console.error("GET /api/image error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
