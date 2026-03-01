import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Box, Typography, Alert } from '@mui/material';
import useProducts from '../hooks/useProducts';
import ProductGrid from '../components/features/product/ProductGrid';

const GOLD = '#C9A96E';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const isDark = useSelector(s => s.ui.themeMode) === 'dark';
  const q      = searchParams.get('q') || '';
  const { products, loading, error } = useProducts({ search: q || null });

  if (!q) return (
    <Container maxWidth="xl" sx={{ py:8 }}>
      <Alert severity="info" sx={{ borderRadius:'10px', fontFamily:'"DM Sans",sans-serif' }}>
        Enter a search term to find products.
      </Alert>
    </Container>
  );

  return (
    <div style={{ overflowX:'hidden', background: isDark ? '#0A0806' : '#FDFAF4', minHeight:'100vh' }}>
      {/* Header banner */}
      <div style={{
        background:'linear-gradient(135deg,#0E0C0A 0%,#1C1710 100%)',
        padding:'48px 24px 40px', position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', top:'-20%', right:'-5%', width:280, height:280, background:'radial-gradient(ellipse,rgba(201,169,110,0.12) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ maxWidth:1280, margin:'0 auto', position:'relative' }}>
          <p style={{ color:GOLD, fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', fontFamily:'"DM Sans",sans-serif', marginBottom:8 }}>Search</p>
          <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:700, fontSize:'clamp(1.8rem,4vw,3rem)', color:'#F7F4EE', lineHeight:1.1 }}>Results</h1>
          <p style={{ color:'rgba(247,244,238,0.42)', fontFamily:'"DM Sans",sans-serif', fontSize:'0.875rem', marginTop:8 }}>
            {loading ? 'Searching...' : `${products.length} results for "${q}"`}
          </p>
        </div>
      </div>

      <Container maxWidth="xl" sx={{ py:{ xs:3, md:5 } }}>
        {loading && (
          <Box sx={{ display:'flex', justifyContent:'center', py:8 }}>
            <div className="loader-ring" />
          </Box>
        )}
        {!loading && error && <Alert severity="error" sx={{ borderRadius:'10px' }}>{error}</Alert>}
        {!loading && !error && <ProductGrid products={products} searchQuery={q} />}
      </Container>
    </div>
  );
};
export default SearchPage;
