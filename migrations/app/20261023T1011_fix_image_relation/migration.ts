#!/usr/bin/env -S node
import type { Contract as Start } from "../../snapshots/3ad75c6e92918cf2f25b4dce61271422fca7090cd33fce5d9f0068cb8b009ba9/contract";
import startContract from "../../snapshots/3ad75c6e92918cf2f25b4dce61271422fca7090cd33fce5d9f0068cb8b009ba9/contract.json" with { type: "json" };
import type { Contract as End } from "../../snapshots/cba8aa465ebca3c765f227cd391ebccd0395f45f70fc3979f14c06dec762f892/contract";
import endContract from "../../snapshots/cba8aa465ebca3c765f227cd391ebccd0395f45f70fc3979f14c06dec762f892/contract.json" with { type: "json" };
import {
  Migration,
  MigrationCLI,
  col,
  primaryKey,
} from "@prisma/orm-postgres/migration";

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: "public",
        table: "Image",
        columns: [
          col("id", "SERIAL", {
            notNull: true,
            codecRef: { codecId: "pg/int4@1" },
          }),
          col("image", "text", {
            notNull: true,
            codecRef: { codecId: "pg/text@1" },
          }),
          col("productId", "int4", { codecRef: { codecId: "pg/int4@1" } }),
        ],
        constraints: [primaryKey(["id"])],
      }),
      this.createIndex({
        schema: "public",
        table: "Image",
        index: "Image_productId_idx_5858600a",
        columns: ["productId"],
      }),
      this.addForeignKey({
        schema: "public",
        table: "Image",
        foreignKey: {
          name: "Image_productId_fkey",
          columns: ["productId"],
          references: { schema: "public", table: "Product", columns: ["id"] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
