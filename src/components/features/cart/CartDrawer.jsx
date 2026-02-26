import { useSelector, useDispatch } from 'react-redux';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Divider,
  TextField,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { toggleCartDrawer } from '../../../slices/uiSlice';
import { removeFromCart, updateQuantity } from '../../../slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartDrawer } = useSelector(state => state.ui);
  const { items } = useSelector(state => state.cart);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleClose = () => {
    dispatch(toggleCartDrawer());
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleViewCart = () => {
    handleClose();
    navigate('/cart');
  };

  const handleCheckout = () => {
    handleClose();
    navigate('/checkout');
  };

  return (
    <Drawer
      anchor="right"
      open={cartDrawer}
      onClose={handleClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } }
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShoppingBagIcon />
          <Typography variant="h6">
            Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </Typography>
        </Box>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Cart Items */}
      {items.length === 0 ? (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary" gutterBottom>
            Your cart is empty
          </Typography>
          <Button 
            variant="contained" 
            onClick={handleClose}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <>
          <List sx={{ flex: 1, overflow: 'auto', p: 2 }}>
            {items.map((item) => (
              <ListItem 
                key={item.id}
                alignItems="flex-start"
                sx={{ 
                  p: 2, 
                  mb: 2, 
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  border: 1,
                  borderColor: 'divider'
                }}
              >
                <ListItemAvatar>
                  <Avatar 
                    src={item.thumbnail} 
                    alt={item.title}
                    variant="rounded"
                    sx={{ width: 60, height: 60, mr: 2 }}
                  />
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" noWrap sx={{ maxWidth: 180 }}>
                      {item.title}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="primary" fontWeight="bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                      
                      {/* Quantity Controls */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                        <IconButton 
                          size="small"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        
                        <TextField
                          size="small"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val) && val > 0) {
                              handleQuantityChange(item.id, val);
                            }
                          }}
                          inputProps={{ 
                            min: 1, 
                            style: { textAlign: 'center', width: 40 }
                          }}
                          sx={{ width: 70 }}
                        />
                        
                        <IconButton 
                          size="small"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                        
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleRemoveItem(item.id)}
                          sx={{ ml: 'auto' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>

          {/* Footer with Total and Actions */}
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1">Subtotal:</Typography>
              <Typography variant="h6" color="primary">
                ${subtotal.toFixed(2)}
              </Typography>
            </Box>

            <Alert severity="info" sx={{ mb: 2 }}>
              Shipping calculated at checkout
            </Alert>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleCheckout}
              sx={{ mb: 1 }}
            >
              Checkout
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleViewCart}
            >
              View Cart
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;