import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import SearchOffIcon from '@mui/icons-material/SearchOff';

const GOLD = '#C9A96E';

const ProductGrid = ({ products, searchQuery }) => {
  const isDark = useSelector(s => s.ui.themeMode) === 'dark';

  if (!products?.length) {
    const iconColor   = isDark ? 'rgba(201,169,110,0.25)' : 'rgba(14,12,10,0.15)';
    const titleColor  = isDark ? 'rgba(240,237,230,0.7)'  : 'rgba(14,12,10,0.6)';
    const subColor    = isDark ? 'rgba(240,237,230,0.35)' : 'rgba(14,12,10,0.35)';
    const pillBg      = isDark ? 'rgba(201,169,110,0.08)' : 'rgba(201,169,110,0.07)';
    const pillBorder  = isDark ? 'rgba(201,169,110,0.2)'  : 'rgba(201,169,110,0.25)';

    return (
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '72px 24px', textAlign: 'center',
      }}>
        {/* Icon */}
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: pillBg,
          border: `1.5px solid ${pillBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20,
        }}>
          <SearchOffIcon sx={{ fontSize: 36, color: isDark ? GOLD : 'rgba(14,12,10,0.3)' }} />
        </div>

        {/* Title */}
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 700, fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          color: titleColor, marginBottom: 8, lineHeight: 1.2,
        }}>
          {searchQuery ? `No results for "${searchQuery}"` : 'No products found'}
        </p>

        {/* Subtitle */}
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.875rem', color: subColor,
          maxWidth: 280, lineHeight: 1.65,
        }}>
          {searchQuery
            ? 'Try a different keyword or check the spelling.'
            : 'Try adjusting your filters or browse other categories.'}
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .pg { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; width:100%; }
        @media (min-width:480px)  { .pg { grid-template-columns:repeat(3,1fr); gap:14px; } }
        @media (min-width:768px)  { .pg { grid-template-columns:repeat(4,1fr); gap:16px; } }
        @media (min-width:1024px) { .pg { grid-template-columns:repeat(5,1fr); gap:18px; } }
        @media (min-width:1280px) { .pg { grid-template-columns:repeat(6,1fr); gap:20px; } }
      `}</style>
      <div className="pg">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </>
  );
};

export default ProductGrid;
