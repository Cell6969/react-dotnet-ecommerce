import { Typography } from "@mui/material";
import { useGetCartQuery } from "../../api/cartApi";

export default function CartPage() {
  const { isLoading, data } = useGetCartQuery();

  if (isLoading) return <Typography>Loading ....</Typography>

  if (!data) return <Typography variant="h3">Your cart is empty</Typography>

  return (
    <div>
      {data.cartId}
    </div>
  );
}
