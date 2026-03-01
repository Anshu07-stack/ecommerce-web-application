
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box, Typography, Button, Divider, IconButton, Alert, Paper } from '@mui/material';
import AddIcon             from '@mui/icons-material/Add';
import RemoveIcon          from '@mui/icons-material/Remove';
import DeleteOutlineIcon   from '@mui/icons-material/DeleteOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowForwardIcon    from '@mui/icons-material/ArrowForward';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../slices/cartSlice';

const GOLD = '#C9A96E';

const CartPage = () => {
  const dispatch = useDispatch();
  const isDark   = useSelector(s => s.ui.themeMode) === 'dark';
  const items    = useSelector(s => s.cart.items);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 0 && subtotal < 100 ? 9.99 : 0;
  const tax      = subtotal * 0.08;
  const total    = subtotal + shipping + tax;

  const textPrimary   = isDark ? '#F0EDE6' : '#0E0C0A';
  const textSecondary = isDark ? 'rgba(240,237,230,0.5)' : '#64748B';
  const dividerColor  = isDark ? 'rgba(255,255,255,0.07)' : '#EEECE6';

  if (!items.length) {
    return (
      <Box sx={{ background: isDark ? '#0A0806' : '#FDFAF4', minHeight:'100vh' }}>
        <Container maxWidth="sm" sx={{ textAlign:'center', py:{ xs:10, md:14 } }}>
          <ShoppingBagOutlinedIcon sx={{ fontSize:72, color: isDark ? 'rgba(240,237,230,0.1)' : 'rgba(14,12,10,0.1)', mb:3 }} />
          <Typography sx={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:700, fontSize:'clamp(1.6rem,4vw,2.2rem)', color:textPrimary, mb:1 }}>
            Your bag is empty
          </Typography>
          <Typography sx={{ mb:5, fontFamily:'"DM Sans",sans-serif', color:textSecondary }}>
            Add something beautiful to get started.
          </Typography>
          <Button component={Link} to="/" variant="contained" size="large" endIcon={<ArrowForwardIcon />} sx={{
            bgcolor:GOLD, color:'#080808', fontWeight:700, borderRadius:'10px', textTransform:'none', fontFamily:'"DM Sans",sans-serif',
            '&:hover':{ bgcolor:'#DFC08A' },
          }}>Continue Shopping</Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ background: isDark ? '#0A0806' : '#FDFAF4', minHeight:'100vh' }}>
      <Container maxWidth="xl" sx={{ py:{ xs:3, md:5 } }}>

        <Typography sx={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:700, fontSize:'clamp(1.6rem,4vw,2.4rem)', color:textPrimary }}>
          Shopping Cart
        </Typography>
        <Box sx={{ width:40, height:3, bgcolor:GOLD, borderRadius:2, mt:1, mb:3.5 }} />

        <div className="cart-layout">
          <style>{`
            .cart-layout { display:grid; grid-template-columns:1fr; gap:20px; align-items:start; }
            @media (min-width:960px) { .cart-layout { grid-template-columns:1fr 360px; gap:24px; } }
          `}</style>

          {/* ── Cart Items ── */}
          <Paper sx={{
            borderRadius:'14px',
            border:`1px solid ${dividerColor}`,
            overflow:'hidden',
            bgcolor: isDark ? '#130F0B' : '#ffffff',
            boxShadow: isDark ? '0 2px 16px rgba(0,0,0,0.3)' : '0 2px 16px rgba(14,12,10,0.06)',
          }}>
            {items.map((item, idx) => (
              <Box key={item.id}>
                <Box sx={{ display:'flex', gap:{ xs:1.5, sm:2.5 }, p:{ xs:2, sm:3 }, alignItems:'center' }}>
                  <Box sx={{ width:{ xs:70, sm:90 }, height:{ xs:70, sm:90 }, borderRadius:'10px', overflow:'hidden', flexShrink:0, border:`1px solid ${dividerColor}` }}>
                    <Box component="img" src={item.thumbnail} alt={item.title} sx={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  </Box>
                  <Box sx={{ flex:1, minWidth:0 }}>
                    <Typography sx={{ fontWeight:600, fontSize:{ xs:'0.8rem', sm:'0.9rem' }, mb:0.5, fontFamily:'"DM Sans",sans-serif', color:textPrimary }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color:GOLD, fontWeight:700, fontSize:'0.8rem', fontFamily:'"DM Sans",sans-serif' }}>
                      ${item.price} each
                    </Typography>
                    <Box sx={{ display:'flex', alignItems:'center', gap:1.5, mt:1.5, flexWrap:'wrap' }}>
                      <Box sx={{ display:'inline-flex', alignItems:'center', border:`1.5px solid ${dividerColor}`, borderRadius:'8px', overflow:'hidden' }}>
                        <IconButton size="small" onClick={() => dispatch(decreaseQuantity(item.id))} sx={{ borderRadius:0, p:'4px 8px', color:textPrimary }}>
                          <RemoveIcon sx={{ fontSize:13 }} />
                        </IconButton>
                        <Typography sx={{ px:1.5, fontWeight:700, fontSize:'0.875rem', minWidth:26, textAlign:'center', fontFamily:'"DM Sans",sans-serif', color:textPrimary }}>
                          {item.quantity}
                        </Typography>
                        <IconButton size="small" onClick={() => dispatch(increaseQuantity(item.id))} sx={{ borderRadius:0, p:'4px 8px', color:textPrimary }}>
                          <AddIcon sx={{ fontSize:13 }} />
                        </IconButton>
                      </Box>
                      <IconButton size="small" onClick={() => dispatch(removeFromCart(item.id))}
                        sx={{ color: isDark ? 'rgba(240,237,230,0.28)' : 'rgba(14,12,10,0.28)', '&:hover':{ color:'#e53e3e' }, borderRadius:'8px' }}>
                        <DeleteOutlineIcon sx={{ fontSize:17 }} />
                      </IconButton>
                      <Typography sx={{ fontWeight:800, fontSize:'0.9rem', ml:'auto', fontFamily:'"DM Sans",sans-serif', color:textPrimary }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {idx < items.length - 1 && <Divider sx={{ borderColor:dividerColor }} />}
              </Box>
            ))}
            <Box sx={{ p:{ xs:2, sm:3 }, borderTop:`1px solid ${dividerColor}` }}>
              <Button component={Link} to="/" sx={{ color:textSecondary, fontWeight:500, textTransform:'none', fontFamily:'"DM Sans",sans-serif', fontSize:'0.82rem', '&:hover':{ color:GOLD } }}>
                ← Continue Shopping
              </Button>
            </Box>
          </Paper>

          {/* ── Order Summary ── */}
          <Paper sx={{
            borderRadius:'14px',
            border:`1px solid ${dividerColor}`,
            p:{ xs:2.5, sm:3 },
            bgcolor: isDark ? '#130F0B' : '#ffffff',
            boxShadow: isDark ? '0 2px 16px rgba(0,0,0,0.3)' : '0 2px 16px rgba(14,12,10,0.06)',
            position:{ lg:'sticky' }, top:{ lg:88 },
          }}>
            <Typography sx={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:700, fontSize:'1.35rem', mb:3, color:textPrimary }}>
              Order Summary
            </Typography>
            <Box sx={{ display:'flex', flexDirection:'column', gap:2, mb:2.5 }}>
              {[
                [`Subtotal (${items.reduce((n,i)=>n+i.quantity,0)} items)`, `$${subtotal.toFixed(2)}`, false],
                ['Shipping', shipping===0 ? 'FREE' : `$${shipping.toFixed(2)}`, shipping===0],
                ['Tax (8%)', `$${tax.toFixed(2)}`, false],
              ].map(([k, v, isGreen]) => (
                <Box key={k} sx={{ display:'flex', justifyContent:'space-between' }}>
                  <Typography sx={{ fontSize:'0.875rem', fontFamily:'"DM Sans",sans-serif', color:textSecondary }}>{k}</Typography>
                  <Typography sx={{ fontWeight:700, fontFamily:'"DM Sans",sans-serif', color: isGreen ? 'success.main' : textPrimary }}>{v}</Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my:2, borderColor:dividerColor }} />
            <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:3 }}>
              <Typography sx={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:700, fontSize:'1.1rem', color:textPrimary }}>Total</Typography>
              <Typography sx={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:700, fontSize:'1.6rem', color:GOLD }}>${total.toFixed(2)}</Typography>
            </Box>
            {subtotal > 0 && subtotal < 100 && (
              <Alert severity="info" sx={{ borderRadius:'10px', mb:2.5, fontSize:'0.8rem', bgcolor: isDark ? 'rgba(201,169,110,0.1)' : 'rgba(201,169,110,0.07)', color:textPrimary, '& .MuiAlert-icon':{ color:GOLD }, fontFamily:'"DM Sans",sans-serif' }}>
                Add <strong>${(100-subtotal).toFixed(2)}</strong> more for free shipping!
              </Alert>
            )}
            <Typography sx={{ fontSize:'0.73rem', color:textSecondary, textAlign:'center', lineHeight:1.6, fontFamily:'"DM Sans",sans-serif' }}>
              Checkout coming soon. Your cart is saved automatically.
            </Typography>
          </Paper>
        </div>
      </Container>
    </Box>
  );
};
export default CartPage;
