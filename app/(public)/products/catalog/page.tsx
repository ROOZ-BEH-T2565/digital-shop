import CatalogList from "@/components/catalog/CatalogList";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function Catalog() {
  return (
    <div className="flex flex-col items-center mx-auto my-4">
      <CatalogList />
      <Link
        href="/products"
        className={buttonVariants({ variant: "default", size: "default" })}
      >
        Back To Products List
      </Link>
    </div>
  );
}

export default Catalog;
