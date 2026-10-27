// modules/products/components/DeleteButton.tsx
"use client";

import { useTransition } from "react";
import { Trash } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { deleteProduct } from "@/modules/products/actions";

export function DeleteButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("محصول حذف شود؟")) return;

    startTransition(async () => {
      const result = await deleteProduct(id);
      if (result?.error) {
        alert(result.error);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className={buttonVariants({ variant: "ghost", size: "icon" })}
      aria-label="حذف"
    >
      <Trash
        className={`h-4 w-4 text-red-500 ${isPending ? "opacity-50" : ""}`}
      />
    </button>
  );
}
