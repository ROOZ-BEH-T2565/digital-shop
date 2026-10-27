import CatalogList from "@/components/catalog/CatalogList";
import CatalogSelected from "@/components/catalog/Selector";

function Catalog() {
  return (
    <div className="flex flex-col items-center mx-auto my-4">
      <CatalogList />
      <CatalogSelected />
    </div>
  );
}

export default Catalog;
