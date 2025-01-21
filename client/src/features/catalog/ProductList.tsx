import { Box } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

export default function ProductList({ product }: { product: Product[] }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
      }}
    >
      {product.map((item) => (
        <ProductCard product={item} key={item.id}/>
      ))}
    </Box>
  );
}
