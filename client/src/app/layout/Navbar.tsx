import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

export default function Navbar({
  darkMode,
  toggleTheme,
}: {
  darkMode: boolean;
  toggleTheme: () => void;
}) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">E-Com</Typography>
        <IconButton onClick={toggleTheme}>
          {darkMode ? <DarkMode /> : <LightMode sx={{ color: "white" }} />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
