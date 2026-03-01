import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon  from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon        from '@mui/icons-material/Favorite';
import { addToCart }    from '../../../slices/cartSlice';
import { showSnackbar } from '../../../slices/uiSlice';

const GOLD = '#C9A96E';

const ProductCard = ({ product, index = 0 }) => {
  const dispatch = useDispatch();
  const isDark   = useSelector(s => s.ui.themeMode) === 'dark';
  const [loved, setLoved] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault(); e.stopPropagation();
    dispatch(addToCart({ id:product.id, title:product.title, price:product.price, thumbnail:product.thumbnail }));
    dispatch(showSnackbar({ message:'✓ Added to cart', severity:'success' }));
  };
  const handleLove = (e) => { e.preventDefault(); e.stopPropagation(); setLoved(v => !v); };

  const discounted    = product.discountPercentage > 0;
  const originalPrice = discounted ? Math.round(product.price / (1 - product.discountPercentage / 100)) : null;
  const delayClass    = `anim-d${Math.min((index % 6) + 1, 6)}`;

  // Theme-aware colors
  const cardBg      = isDark ? '#1C1814' : '#ffffff';
  const cardBorder  = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(14,12,10,0.07)';
  const titleColor  = isDark ? '#F0EDE6' : '#0E0C0A';
  const priceColor  = isDark ? '#F0EDE6' : '#0E0C0A';
  const origColor   = isDark ? 'rgba(240,237,230,0.28)' : 'rgba(14,12,10,0.3)';
  const catColor    = GOLD;
  const wishlistBg  = isDark ? 'rgba(28,24,20,0.92)' : 'rgba(255,255,255,0.92)';
  const wishlistColor = isDark ? 'rgba(240,237,230,0.45)' : 'rgba(14,12,10,0.4)';
  const ratingEmpty = isDark ? 'rgba(240,237,230,0.15)' : 'rgba(14,12,10,0.15)';

  return (
    <>
      <style>{`
        .pc-info { padding: 8px 10px 10px; }
        .pc-title { font-size: 0.78rem; }
        .pc-price { font-size: 0.82rem; }
        .pc-cat   { font-size: 0.58rem; }
        @media (min-width: 480px) {
          .pc-info  { padding: 10px 12px 12px; }
          .pc-title { font-size: 0.82rem; }
        }
        @media (min-width: 768px) {
          .pc-title { font-size: 0.84rem; }
          .pc-price { font-size: 0.86rem; }
        }
      `}</style>

      <Link to={`/product/${product.id}`} style={{ textDecoration:'none', display:'block' }}
        className={`anim-fade-up ${delayClass}`}>
        <div className="product-card" style={{
          borderRadius:12, overflow:'hidden',
          background: cardBg,
          border: `1px solid ${cardBorder}`,
          boxShadow: isDark ? '0 1px 8px rgba(0,0,0,0.25)' : '0 1px 8px rgba(14,12,10,0.05)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}>

          {/* Image */}
          <div style={{ position:'relative', paddingTop:'100%', overflow:'hidden' }}>
            <img src={product.thumbnail} alt={product.title} loading="lazy"
              className="card-img"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', display:'block' }}
            />

            {/* Discount badge */}
            {discounted && (
              <span style={{ position:'absolute', top:7, left:7, zIndex:2, background:GOLD, color:'#0E0C0A', fontWeight:800, fontSize:'0.6rem', padding:'2px 7px', borderRadius:5, fontFamily:'"DM Sans",sans-serif' }}>
                −{Math.round(product.discountPercentage)}%
              </span>
            )}

            {/* Wishlist */}
            <button onClick={handleLove} style={{
              position:'absolute', top:7, right:7, zIndex:2,
              width:26, height:26, borderRadius:'50%',
              background: wishlistBg, border:'none', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 1px 6px rgba(0,0,0,0.18)', transition:'transform 0.2s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.transform='scale(1.15)'}
              onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
            >
              {loved
                ? <FavoriteIcon       sx={{ fontSize:12, color:'#e74c3c' }} />
                : <FavoriteBorderIcon sx={{ fontSize:12, color: wishlistColor }} />}
            </button>

            {/* Hover overlay */}
            <div className="card-overlay" style={{
              position:'absolute', inset:0, zIndex:3,
              background:'linear-gradient(to top,rgba(14,12,10,0.82) 0%,rgba(14,12,10,0.15) 55%,transparent 100%)',
              display:'flex', alignItems:'flex-end', justifyContent:'center', paddingBottom:10,
            }}>
              <button className="card-btn" onClick={handleAddToCart} style={{
                display:'flex', alignItems:'center', gap:5,
                background:GOLD, color:'#0E0C0A', border:'none', cursor:'pointer',
                padding:'6px 14px', borderRadius:8, fontWeight:700, fontSize:'0.7rem',
                fontFamily:'"DM Sans",sans-serif', whiteSpace:'nowrap',
              }}
                onMouseEnter={e => e.currentTarget.style.background='#DFC08A'}
                onMouseLeave={e => e.currentTarget.style.background=GOLD}
              >
                <AddShoppingCartIcon sx={{ fontSize:12 }} /> Add to Cart
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="pc-info" style={{ fontFamily:'"DM Sans",sans-serif' }}>
            <span className="pc-cat" style={{ color:catColor, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', display:'block', marginBottom:3 }}>
              {product.category?.replace(/-/g,' ')}
            </span>
            <p className="pc-title" style={{ fontWeight:600, color:titleColor, lineHeight:1.3, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden', minHeight:'2.6em', margin:0 }}>
              {product.title}
            </p>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:6 }}>
              <Rating value={product.rating} precision={0.5} size="small" readOnly
                sx={{ '& .MuiRating-iconFilled':{ color:GOLD }, '& .MuiRating-iconEmpty':{ color: ratingEmpty }, fontSize:'0.68rem' }}
              />
              <div style={{ display:'flex', alignItems:'baseline', gap:5 }}>
                <span className="pc-price" style={{ fontWeight:800, color:priceColor }}>${product.price}</span>
                {originalPrice && <span style={{ fontSize:'0.68rem', textDecoration:'line-through', color:origColor }}>${originalPrice}</span>}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
export default ProductCard;
