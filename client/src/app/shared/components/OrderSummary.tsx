import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { currencyFormat } from "../../../lib/util";
import { useGetCartQuery } from "../../../api/cartApi";
import { Item } from "../../models/cart";

export default function OrderSummary() {
  const { data: cart } = useGetCartQuery();
  const subtotal =
    cart?.items.reduce(
      (sum: number, item: Item) => sum + item.quantity * item.price,
      0
    ) ?? 0;
  const deliveryFee = subtotal > 10000 ? 0 : 500;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth="lg"
      mx="auto"
    >
      <Paper sx={{ mb: 2, p: 3, width: "100%", borderRadius: 3 }}>
        <Typography variant="h6" component="p" fontWeight="bold">
          Order Summary
        </Typography>

        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          Order Over $1000 qualify for free delivery
        </Typography>

        <Box mt={2}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="textSecondary">Subtotal</Typography>
            <Typography>{currencyFormat(subtotal)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="textSecondary">Discount</Typography>
            <Typography>-$0.00</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="textSecondary">Delivery Fee</Typography>
            <Typography>{currencyFormat(deliveryFee)}</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="textSecondary">Total</Typography>
            <Typography>{currencyFormat(subtotal + deliveryFee)}</Typography>
          </Box>
        </Box>

        <Box mt={2}>
          <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }}>
            Checkout
          </Button>
          <Button fullWidth>Continue Shopping</Button>
        </Box>
      </Paper>

      <Paper sx={{ width: "100%", borderRadius: 3, p: 3 }}>
        <form>
          <Typography variant="subtitle1" component="label">
            Do you have a voucher code ?
          </Typography>
          <TextField
            label="Voucher Code"
            variant="outlined"
            fullWidth
            sx={{ my: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Apply Voucher
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
