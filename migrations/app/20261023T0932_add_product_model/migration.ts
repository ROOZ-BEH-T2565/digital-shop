#!/usr/bin/env -S node
import type { Contract as End } from "../../snapshots/b4ee261f666a7ff70749a101ccba44d427d80f52b3bf8fe6a02a440c4c6b35c7/contract";
import endContract from "../../snapshots/b4ee261f666a7ff70749a101ccba44d427d80f52b3bf8fe6a02a440c4c6b35c7/contract.json" with { type: "json" };
import {
  Migration,
  MigrationCLI,
  col,
  lit,
  primaryKey,
} from "@prisma/orm-postgres/migration";

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: "public" }),
      this.createTable({
        schema: "public",
        table: "Product",
        columns: [
          col("category", "text", {
            notNull: true,
            codecRef: { codecId: "pg/text@1" },
          }),
          col("description", "text", {
            notNull: true,
            codecRef: { codecId: "pg/text@1" },
          }),
          col("id", "SERIAL", {
            notNull: true,
            codecRef: { codecId: "pg/int4@1" },
          }),
          col("name", "text", {
            notNull: true,
            codecRef: { codecId: "pg/text@1" },
          }),
          col("price", "float8", {
            default: lit(0),
            codecRef: { codecId: "pg/float8@1" },
          }),
          col("quantity", "int4", {
            default: lit(0),
            codecRef: { codecId: "pg/int4@1" },
          }),
        ],
        constraints: [primaryKey(["id"])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
