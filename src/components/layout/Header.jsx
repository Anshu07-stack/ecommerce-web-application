import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Container,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from '../features/search/SearchBar';
import { ROUTES } from '../../routes/routeConfig';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { path: ROUTES.MEN, label: 'Men' },
    { path: ROUTES.WOMEN, label: 'Women' },
    { path: ROUTES.KIDS, label: 'Kids' }
  ];

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to={ROUTES.HOME}
            sx={{
              textDecoration: 'none',
              color: 'text.primary',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            FASHION
            <Typography component="span" color="primary" variant="h6" fontWeight="bold">
              STORE
            </Typography>
          </Typography>

          {/* Search Bar - Full width on desktop */}
          <Box sx={{ flexGrow: 1, maxWidth: 600, mx: 2 }}>
            <SearchBar />
          </Box>

          {/* Navigation - Desktop */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  component={NavLink}
                  to={link.path}
                  color="inherit"
                  sx={{
                    '&.active': {
                      color: 'primary.main',
                      fontWeight: 'bold'
                    }
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Cart Icon */}
          <IconButton component={Link} to={ROUTES.CART} color="inherit">
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;