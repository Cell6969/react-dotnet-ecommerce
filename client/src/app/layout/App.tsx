import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Box, Button, Container, Typography } from "@mui/material";

function App() {
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://localhost:5227/api/products")
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, []);

  const addProduct = () => {
    setProduct((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        name: "product" + (prevState.length + 1),
        price: prevState.length * 100 + 100,
        stock: 100,
        description: "test",
        url: "https://image/1",
        type: "test",
        brand: "test",
      },
    ]);
  };

  return (
    <Container maxWidth="xl">
      <Box display="flex" justifyContent="center" gap={3} marginY={3}>
        <Typography variant="h4">E-Commerce</Typography>
        <Button variant="contained" onClick={addProduct}>
          Add Product
        </Button>
      </Box>
      <Catalog product={product} />
    </Container>
  );
}

export default App;
