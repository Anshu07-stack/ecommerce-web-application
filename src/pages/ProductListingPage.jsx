import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Box, Typography, Alert, Button } from '@mui/material';
import productService from '../services/productService';
import useProducts    from '../hooks/useProducts';
import ProductGrid    from '../components/features/product/ProductGrid';

const GOLD = '#C9A96E';

const ProductListingPage = ({ title, categories }) => {
  const { name }  = useParams();
  const isDark    = useSelector(s => s.ui.themeMode) === 'dark';
  const pageTitle = title || name?.replace(/-/g,' ');

  const [multiProducts, setMultiProducts] = useState([]);
  const [multiLoading,  setMultiLoading]  = useState(false);
  const [multiError,    setMultiError]    = useState(null);

  useEffect(() => {
    if (!categories) return;
    setMultiProducts([]); setMultiLoading(true); setMultiError(null);
    Promise.all(
      categories.map(cat => productService.getByCategory(cat).then(r => r.products).catch(() => []))
    )
      .then(results => setMultiProducts(results.flat()))
      .catch(() => setMultiError('Failed to load products.'))
      .finally(() => setMultiLoading(false));
  }, [categories]);

  const { products, loading, error } = useProducts({ category: categories ? null : name });
  const displayProducts = categories ? multiProducts : products;
  const isLoading       = categories ? multiLoading  : loading;
  const displayError    = categories ? multiError    : error;

  return (
    <div style={{ overflowX:'hidden', background: isDark ? '#0A0806' : '#FDFAF4', minHeight:'100vh' }}>

      {/* Page header banner */}
      <div style={{
        background: isDark
          ? 'linear-gradient(135deg,#0A0806 0%,#1C1710 100%)'
          : 'linear-gradient(135deg,#0E0C0A 0%,#1C1710 100%)',
        padding:'48px 24px 40px', position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', top:'-20%', right:'-5%', width:280, height:280, background:'radial-gradient(ellipse,rgba(201,169,110,0.12) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ maxWidth:1280, margin:'0 auto', position:'relative' }}>
          <p style={{ color:GOLD, fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', fontFamily:'"DM Sans",sans-serif', marginBottom:8 }}>Collections</p>
          <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:700, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#F7F4EE', textTransform:'capitalize', lineHeight:1.1 }}>
            {pageTitle}
          </h1>
        </div>
      </div>

      <Container maxWidth="xl" sx={{ py:{ xs:3, md:5 } }}>
        {isLoading && (
          <Box sx={{ display:'flex', justifyContent:'center', py:8 }}>
            <div className="loader-ring" />
          </Box>
        )}
        {!isLoading && displayError && (
          <Alert severity="error"
            action={<Button size="small" onClick={() => window.location.reload()}>Retry</Button>}
            sx={{ borderRadius:'10px', fontFamily:'"DM Sans",sans-serif' }}>
            {displayError}
          </Alert>
        )}
        {!isLoading && !displayError && (
          <>
            <Typography sx={{ color:'text.secondary', fontSize:'0.82rem', mb:2.5, fontFamily:'"DM Sans",sans-serif' }}>
              {displayProducts.length} products
            </Typography>
            <ProductGrid products={displayProducts} />
          </>
        )}
      </Container>
    </div>
  );
};
export default ProductListingPage;
