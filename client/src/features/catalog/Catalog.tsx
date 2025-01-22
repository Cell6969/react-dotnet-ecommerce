import { useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
  const [product, setProduct]  = useState<Product[]>([]);


   useEffect(() => {
    fetch("https://localhost:5227/api/products")
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, []);

  return (
    <>
      <ProductList product={product} />
    </>
  );
}
