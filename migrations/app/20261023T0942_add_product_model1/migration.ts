#!/usr/bin/env -S node
import type { Contract as End } from "../../snapshots/3ad75c6e92918cf2f25b4dce61271422fca7090cd33fce5d9f0068cb8b009ba9/contract";
import endContract from "../../snapshots/3ad75c6e92918cf2f25b4dce61271422fca7090cd33fce5d9f0068cb8b009ba9/contract.json" with { type: "json" };
import type { Contract as Start } from "../../snapshots/b4ee261f666a7ff70749a101ccba44d427d80f52b3bf8fe6a02a440c4c6b35c7/contract";
import startContract from "../../snapshots/b4ee261f666a7ff70749a101ccba44d427d80f52b3bf8fe6a02a440c4c6b35c7/contract.json" with { type: "json" };
import { Migration, MigrationCLI, sql } from "@prisma/orm-postgres/migration";

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addCheckConstraint({
        schema: "public",
        table: "Product",
        constraint: "Product_category_check_2f2ef40a",
        expression: sql`"category" IN ('Mobile', 'Laptop', 'Watch', 'Others')`,
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
