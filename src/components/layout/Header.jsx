import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
import { toggleCartDrawer } from '../../slices/uiSlice';

const Header = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  
  // Calculate total number of items in cart
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Navigation links for Men, Women, Kids
  const navLinks = [
    { path: ROUTES.MEN, label: 'Men' },
    { path: ROUTES.WOMEN, label: 'Women' },
    { path: ROUTES.KIDS, label: 'Kids' }
  ];

  // Handle cart icon click
  // Desktop par drawer khulega, mobile par cart page khulega
  const handleCartClick = (e) => {
    if (!isMobile) {
      // Desktop view - prevent navigation and open drawer
      e.preventDefault();
      dispatch(toggleCartDrawer());
    }
    // Mobile view - link will navigate to cart page normally
  };

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          {/* Logo Section */}
          <Typography
            variant="h6"
            component={Link}
            to={ROUTES.HOME}
            sx={{
              textDecoration: 'none',
              color: 'text.primary',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              minWidth: { xs: 'auto', md: 140 }
            }}
          >
            FASHION
            <Typography 
              component="span" 
              color="primary" 
              variant="h6" 
              fontWeight="bold"
              sx={{ display: { xs: 'none', sm: 'inline' } }}
            >
              STORE
            </Typography>
          </Typography>

          {/* Search Bar - Takes remaining space */}
          <Box sx={{ flexGrow: 1, maxWidth: 600, mx: 2 }}>
            <SearchBar />
          </Box>

          {/* Desktop Navigation Links */}
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

          {/* Shopping Cart Icon with Badge */}
          <IconButton 
            component={Link} 
            to={ROUTES.CART}
            onClick={handleCartClick}
            color="inherit"
            sx={{ ml: 'auto' }}
          >
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Mobile Menu Icon - Only visible on mobile */}
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