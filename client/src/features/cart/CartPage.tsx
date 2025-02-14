import { Grid2, Typography } from "@mui/material";
import { useGetCartQuery } from "../../api/cartApi";
import CartItem from "./CartItem";

export default function CartPage() {
  const { isLoading, data } = useGetCartQuery();

  if (isLoading) return <Typography>Loading ....</Typography>;

  if (!data) return <Typography variant="h3">Your cart is empty</Typography>;

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={8}>
        {data.items.map((item) => (
          <CartItem item={item} key={item.productId} />
        ))}
      </Grid2>
    </Grid2>
  );
}
