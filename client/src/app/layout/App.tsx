import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import Navbar from "./Navbar";

function App() {
  const [product, setProduct] = useState<Product[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const paletteType = darkMode ? "dark" : "light";

  const toggleTheme = () => setDarkMode(!darkMode);

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  useEffect(() => {
    fetch("https://localhost:5227/api/products")
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode
            ? "radial-gradient(circle, #1e3aBa, #111B27)"
            : "radial-gradient(circle, #baecf9, #f0f9ff)",
          py: 6,
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 8 }}>
          <Catalog product={product} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
