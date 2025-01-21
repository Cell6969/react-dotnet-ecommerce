import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog({
  product,
}: {
  product: Product[];
}) {
  return (
    <>
      <ProductList product={product} />
    </>
  );
}
