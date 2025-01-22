import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const midLinks = [
  { title: 'Catalog', path: '/catalog' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
]

const rightLinks = [
  { title: 'Login', path: '/login' },
  { title: 'Register', path: '/register' },
]

const navStyle = {
  color: 'inherit',
  typography: 'h6',
  textDecoration: 'none',
  '&:hover': { 
    color: 'grey.500'
  },
  '&.active': {
    color: '#baecf9'
  }
}

export default function Navbar({
  darkMode,
  toggleTheme,
}: {
  darkMode: boolean;
  toggleTheme: () => void;
}) {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography component={NavLink} to='/' variant="h6" sx={{ color: 'white' }}>E-COM</Typography>
          <IconButton onClick={toggleTheme}>
            {darkMode ? <DarkMode /> : <LightMode sx={{ color: "white" }} />}
          </IconButton>
        </Box>
        <List sx={{ display: 'flex' }}>
          {midLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={navStyle}
            >
              {title}
            </ListItem>
          ))}
        </List>

        <Box display='flex' alignItems='center'>
          <IconButton size="large" sx={{ color: 'inherit' }}>
            <Badge badgeContent='4' color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: 'flex' }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={{ color: 'inherit', typography: 'h6' }}
              >
                {title}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
