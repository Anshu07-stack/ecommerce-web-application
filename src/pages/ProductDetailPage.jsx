import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, Typography, Button, Rating, Chip, Breadcrumbs, Divider, IconButton, Alert, Avatar, Paper } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon             from '@mui/icons-material/Add';
import RemoveIcon          from '@mui/icons-material/Remove';
import NavigateNextIcon    from '@mui/icons-material/NavigateNext';
import productService  from '../services/productService';
import { addToCart }   from '../slices/cartSlice';
import { showSnackbar } from '../slices/uiSlice';

const GOLD = '#C9A96E';

const ProductDetailPage = () => {
  const { id }   = useParams();
  const dispatch = useDispatch();
  const isDark   = useSelector(s => s.ui.themeMode) === 'dark';

  const [product,   setProduct]   = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [activeImg, setActiveImg] = useState('');
  const [qty,       setQty]       = useState(1);

  useEffect(() => {
    setLoading(true); setError(null); setQty(1);
    productService.getById(id)
      .then(d => { setProduct(d); setActiveImg(d.thumbnail); })
      .catch(() => setError('Product not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ id:product.id, title:product.title, price:product.price, thumbnail:product.thumbnail }));
    dispatch(showSnackbar({ message:'✓ Added to cart!', severity:'success' }));
  };

  // Theme colors
  const pageBg        = isDark ? '#0A0806' : '#FDFAF4';
  const textPrimary   = isDark ? '#F0EDE6' : '#0E0C0A';
  const textSecondary = isDark ? 'rgba(240,237,230,0.5)' : '#64748B';
  const dividerColor  = isDark ? 'rgba(255,255,255,0.07)' : '#EEECE6';
  const paperBg       = isDark ? '#130F0B' : '#ffffff';
  const metaBg        = isDark ? 'rgba(255,255,255,0.04)' : '#F7F4EE';
  const thumbBorder   = isDark ? 'rgba(255,255,255,0.1)' : '#EEECE6';

  if (loading) return (
    <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'60vh', bgcolor:pageBg }}>
      <div className="loader-ring" />
    </Box>
  );
  if (error || !product) return (
    <Box sx={{ bgcolor:pageBg, minHeight:'100vh' }}>
      <Container maxWidth="xl" sx={{ py:8 }}>
        <Alert severity="error" sx={{ borderRadius:'10px' }}>{error}</Alert>
      </Container>
    </Box>
  );

  const originalPrice = product.discountPercentage > 0
    ? Math.round(product.price / (1 - product.discountPercentage / 100)) : null;
  const stockStatus = product.stock > 5 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock';
  const stockColor  = product.stock > 5 ? 'success' : product.stock > 0 ? 'warning' : 'error';

  return (
    <Box sx={{ bgcolor:pageBg, minHeight:'100vh' }}>
      <Container maxWidth="xl" sx={{ py:{ xs:3, md:5 } }}>

        {/* Breadcrumbs */}
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb:3.5 }}>
          <Typography component={Link} to="/" sx={{ textDecoration:'none', color:textSecondary, fontFamily:'"DM Sans",sans-serif', fontSize:'0.82rem', '&:hover':{ color:GOLD } }}>Home</Typography>
          <Typography component={Link} to={`/category/${product.category}`}
            sx={{ textDecoration:'none', color:textSecondary, textTransform:'capitalize', fontFamily:'"DM Sans",sans-serif', fontSize:'0.82rem', '&:hover':{ color:GOLD } }}>
            {product.category?.replace(/-/g,' ')}
          </Typography>
          <Typography noWrap sx={{ maxWidth:{ xs:120, sm:260 }, fontFamily:'"DM Sans",sans-serif', fontSize:'0.82rem', color:textPrimary }}>
            {product.title}
          </Typography>
        </Breadcrumbs>

        {/* 2-col grid */}
        <div className="detail-grid">
          <style>{`
            .detail-grid { display:grid; grid-template-columns:1fr; gap:24px; align-items:start; }
            @media (min-width:768px)  { .detail-grid { grid-template-columns:1fr 1fr; gap:40px; } }
            @media (min-width:1024px) { .detail-grid { gap:56px; } }
          `}</style>

          {/* Gallery */}
          <div>
            <Box sx={{ borderRadius:'14px', overflow:'hidden', bgcolor:paperBg, border:`1px solid ${dividerColor}`, position:'relative', paddingTop:'100%' }}>
              <Box component="img" src={activeImg} alt={product.title}
                sx={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'contain', p:{ xs:2, md:3 } }}
              />
            </Box>
            {product.images?.length > 1 && (
              <Box sx={{ display:'flex', flexWrap:'wrap', gap:1, mt:1.5 }}>
                {product.images.slice(0,6).map((img, i) => (
                  <Box key={i} onClick={() => setActiveImg(img)} sx={{
                    width:58, height:58, borderRadius:'8px', overflow:'hidden', cursor:'pointer',
                    border:`2px solid`, borderColor: activeImg===img ? GOLD : thumbBorder,
                    transition:'border-color 0.2s', '&:hover':{ borderColor:GOLD },
                  }}>
                    <Box component="img" src={img} sx={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  </Box>
                ))}
              </Box>
            )}
          </div>

          {/* Product info */}
          <div>
            {product.brand && (
              <Typography sx={{ color:GOLD, fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', fontFamily:'"DM Sans",sans-serif', mb:1 }}>
                {product.brand}
              </Typography>
            )}
            <Typography sx={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:700, fontSize:'clamp(1.5rem,3vw,2.4rem)', lineHeight:1.15, mb:2, color:textPrimary }}>
              {product.title}
            </Typography>

            <Box sx={{ display:'flex', alignItems:'center', gap:1.5, mb:2.5, flexWrap:'wrap' }}>
              <Rating value={product.rating} precision={0.5} readOnly size="small"
                sx={{ '& .MuiRating-iconFilled':{ color:GOLD }, '& .MuiRating-iconEmpty':{ color: isDark ? 'rgba(240,237,230,0.15)' : '#DDD9D0' } }}
              />
              <Typography variant="body2" sx={{ fontFamily:'"DM Sans",sans-serif', color:textSecondary }}>{product.rating} / 5</Typography>
              <Chip label={stockStatus} size="small" color={stockColor} variant="outlined" sx={{ fontWeight:700, fontSize:'0.7rem', height:20 }} />
            </Box>

            {/* Price */}
            <Box sx={{ display:'flex', alignItems:'baseline', gap:1.5, mb:2, flexWrap:'wrap' }}>
              <Typography sx={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:700, fontSize:'clamp(1.8rem,3vw,2.4rem)', color:GOLD, lineHeight:1 }}>
                ${product.price}
              </Typography>
              {originalPrice && (
                <>
                  <Typography sx={{ textDecoration:'line-through', color:textSecondary, fontSize:'1.1rem', fontFamily:'"DM Sans",sans-serif' }}>${originalPrice}</Typography>
                  <Chip label={`Save ${Math.round(product.discountPercentage)}%`} size="small"
                    sx={{ bgcolor: isDark ? 'rgba(201,169,110,0.15)' : 'rgba(201,169,110,0.1)', color:GOLD, fontWeight:700, fontSize:'0.68rem' }}
                  />
                </>
              )}
            </Box>

            <Typography sx={{ lineHeight:1.85, mb:3, fontFamily:'"DM Sans",sans-serif', fontSize:'0.9rem', color:textSecondary }}>
              {product.description}
            </Typography>

            <Divider sx={{ mb:3, borderColor:dividerColor }} />

            {/* Quantity */}
            <Box sx={{ mb:3 }}>
              <Typography sx={{ fontWeight:700, fontSize:'0.82rem', mb:1.5, fontFamily:'"DM Sans",sans-serif', color:textPrimary }}>Quantity</Typography>
              <Box sx={{ display:'inline-flex', alignItems:'center', border:`1.5px solid ${dividerColor}`, borderRadius:'10px', overflow:'hidden', bgcolor:paperBg }}>
                <IconButton size="small" onClick={() => setQty(q => Math.max(1,q-1))} disabled={qty<=1}
                  sx={{ borderRadius:0, px:1.25, color:textPrimary }}>
                  <RemoveIcon sx={{ fontSize:15 }} />
                </IconButton>
                <Typography sx={{ px:2, fontWeight:800, fontSize:'0.95rem', minWidth:36, textAlign:'center', fontFamily:'"DM Sans",sans-serif', color:textPrimary }}>
                  {qty}
                </Typography>
                <IconButton size="small" onClick={() => setQty(q => Math.min(product.stock,q+1))} disabled={qty>=product.stock}
                  sx={{ borderRadius:0, px:1.25, color:textPrimary }}>
                  <AddIcon sx={{ fontSize:15 }} />
                </IconButton>
              </Box>
            </Box>

            <Button fullWidth variant="contained" size="large"
              startIcon={<AddShoppingCartIcon />}
              disabled={product.stock===0}
              onClick={handleAddToCart}
              sx={{
                bgcolor:GOLD, color:'#080808', fontWeight:800, py:1.6, fontSize:'0.95rem',
                borderRadius:'10px', mb:3, textTransform:'none', fontFamily:'"DM Sans",sans-serif',
                boxShadow:'0 4px 20px rgba(201,169,110,0.28)',
                '&:hover':{ bgcolor:'#DFC08A', transform:'translateY(-1px)' },
                '&.Mui-disabled':{ bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', color: isDark ? 'rgba(255,255,255,0.26)' : 'rgba(0,0,0,0.26)' },
                transition:'all 0.25s ease',
              }}>
              {product.stock===0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>

            {/* Meta */}
            <Box sx={{ p:2.5, borderRadius:'10px', bgcolor:metaBg, border:`1px solid ${dividerColor}` }}>
              {[
                ['Category', product.category?.replace(/-/g,' ')],
                product.sku     ? ['SKU',  product.sku]              : null,
                product.tags?.length ? ['Tags', product.tags.join(', ')] : null,
              ].filter(Boolean).map(([k,v]) => (
                <Box key={k} sx={{ display:'flex', gap:2, mb:1, '&:last-child':{ mb:0 } }}>
                  <Typography variant="body2" sx={{ minWidth:76, flexShrink:0, fontFamily:'"DM Sans",sans-serif', color:textSecondary }}>{k}</Typography>
                  <Typography variant="body2" sx={{ fontWeight:600, textTransform:'capitalize', fontFamily:'"DM Sans",sans-serif', color:textPrimary }}>{v}</Typography>
                </Box>
              ))}
            </Box>
          </div>
        </div>

        {/* Reviews */}
        {product.reviews?.length > 0 && (
          <Box sx={{ mt:{ xs:5, md:8 } }}>
            <Typography sx={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:700, fontSize:'clamp(1.4rem,3vw,1.9rem)', mb:1, color:textPrimary }}>
              Customer Reviews
            </Typography>
            <Box sx={{ width:40, height:3, bgcolor:GOLD, borderRadius:2, mb:3.5 }} />
            <div className="reviews-grid">
              <style>{`
                .reviews-grid { display:grid; grid-template-columns:1fr; gap:14px; }
                @media (min-width:600px)  { .reviews-grid { grid-template-columns:repeat(2,1fr); } }
                @media (min-width:960px)  { .reviews-grid { grid-template-columns:repeat(3,1fr); } }
              `}</style>
              {product.reviews.map((r, i) => (
                <Paper key={i} sx={{ p:2.5, borderRadius:'12px', bgcolor:paperBg, border:`1px solid ${dividerColor}`, boxShadow:'none' }}>
                  <Box sx={{ display:'flex', gap:1.5, mb:1.5, alignItems:'center' }}>
                    <Avatar sx={{ width:34, height:34, bgcolor: isDark ? 'rgba(201,169,110,0.2)' : '#1B2A4A', color: isDark ? GOLD : '#fff', fontSize:'0.85rem', fontWeight:700 }}>
                      {(r.reviewerName||'A')[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight:700, fontFamily:'"DM Sans",sans-serif', fontSize:'0.82rem', color:textPrimary }}>
                        {r.reviewerName||'Customer'}
                      </Typography>
                      <Rating value={r.rating} readOnly size="small"
                        sx={{ '& .MuiRating-iconFilled':{ color:GOLD }, '& .MuiRating-iconEmpty':{ color: isDark ? 'rgba(240,237,230,0.15)' : '#DDD9D0' }, fontSize:'0.7rem' }}
                      />
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ lineHeight:1.7, fontFamily:'"DM Sans",sans-serif', fontSize:'0.82rem', color:textSecondary }}>
                    {r.comment}
                  </Typography>
                </Paper>
              ))}
            </div>
          </Box>
        )}
      </Container>
    </Box>
  );
};
export default ProductDetailPage;
