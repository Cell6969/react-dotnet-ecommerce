import ProductList from "./ProductList";
import { useFetchProductsQuery } from "../../api/catalogApi";

export default function Catalog() {
  const { data, isLoading } = useFetchProductsQuery();

  if (isLoading || !data) return <div></div>

  return (
    <>
      <ProductList product={data} />
    </>
  );
}
