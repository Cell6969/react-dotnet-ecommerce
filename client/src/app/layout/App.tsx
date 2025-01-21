import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Container } from "@mui/material";
import Navbar from "./Navbar";

function App() {
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://localhost:5227/api/products")
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 14 }}>
        <Catalog product={product} />
      </Container>
    </>
  );
}

export default App;
