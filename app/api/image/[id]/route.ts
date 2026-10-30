import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";
import { db } from "@/src/prisma/db";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const numericId = Number(id);

    console.log("[DELETE /api/image] id =", numericId);

    if (!Number.isInteger(numericId) || numericId <= 0) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const image = await db.orm.public.Image.where({ id: numericId }).first();
    console.log("[DELETE /api/image] found image =", image);

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    //  اگر .delete() کار نکرد، این را امتحان کن:
    // await db.orm.public.Image.where({ id: numericId }).deleteMany();
    await db.orm.public.Image.where({ id: numericId }).delete();

    console.log("[DELETE /api/image] deleted from DB");

    // حذف فایل از دیسک
    if (image.image.startsWith("/assets/")) {
      try {
        const filePath = path.join(
          process.cwd(),
          "public",
          image.image.replace(/^\//, ""),
        );
        await unlink(filePath);
        console.log("[DELETE /api/image] deleted file:", filePath);
      } catch (err) {
        console.warn("[DELETE /api/image] file not found:", image.image);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/image] error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
