import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import productService from '../services/productService';
import ProductCard from '../components/features/product/ProductCard';

const GOLD = '#C9A96E';

const FEATURES = [
  { icon: <LocalShippingOutlinedIcon />, title:'Free Shipping',  desc:'On orders above $100' },
  { icon: <ReplayIcon />,               title:'Easy Returns',    desc:'30-day hassle free' },
  { icon: <LockOutlinedIcon />,         title:'Secure Payment',  desc:'100% safe & encrypted' },
];

const CATEGORIES = [
  { label:"Men's",   sub:'Shirts · Shoes · Watches', path:'/men',
    img:'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=1000&fit=crop&q=80' },
  { label:"Women's", sub:'Dresses · Bags · Beauty',  path:'/women',
    img:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1000&fit=crop&q=80' },
];

// Lazy-loading category card with shimmer effect
const CatCard = ({ cat, GOLD, ArrowForwardIcon }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Link to={cat.path} className={`cat-card${loaded ? ' cat-img-loaded' : ''}`}>
      {/* Shimmer skeleton shown until image loads */}
      <div className="cat-shimmer" />
      <img
        src={cat.img}
        alt={cat.label}
        className={loaded ? 'cat-img-visible' : 'cat-img-hidden'}
        onLoad={() => setLoaded(true)}
      />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(5,5,5,0.82) 0%,rgba(5,5,5,0.15) 55%,transparent 100%)', opacity: loaded ? 1 : 0, transition:'opacity 0.4s ease' }} />
      {loaded && (
        <div style={{ position:'absolute', bottom:0, left:0, padding:'20px 24px' }}>
          <h3 style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:700, fontSize:'clamp(1.4rem,3vw,1.9rem)', color:'#fff', marginBottom:2 }}>{cat.label}</h3>
          <p style={{ color:'rgba(255,255,255,0.58)', fontSize:'0.82rem', fontFamily:'"DM Sans",sans-serif', marginBottom:12 }}>{cat.sub}</p>
          <div className="cat-cta" style={{ display:'inline-flex', alignItems:'center', gap:6, background:GOLD, color:'#0E0C0A', fontWeight:700, fontSize:'0.78rem', padding:'7px 16px', borderRadius:8, fontFamily:'"DM Sans",sans-serif' }}>
            Explore <ArrowForwardIcon sx={{ fontSize:13 }} />
          </div>
        </div>
      )}
    </Link>
  );
};

const HomePage = () => {
  const isDark  = useSelector(s => s.ui.themeMode) === 'dark';
  const [trending, setTrending] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    productService.getAll()
      .then(d => setTrending(d.products.slice(0, 10)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ overflowX:'hidden' }}>

      {/* ════════════════════ HERO ════════════════════ */}
      <style>{`
        /* Hero layout — mobile: single col centered, desktop: two col split */
        .hero-section {
          background: linear-gradient(145deg, #0E0C0A 0%, #1C1710 45%, #2A1F0E 100%);
          color: #fff;
          position: relative;
          overflow: hidden;
          min-height: clamp(480px, 80vh, 780px);
          display: flex;
          align-items: center;
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
          width: 100%;
        }
        /* Desktop: show two columns, left gets more space */
        @media (min-width: 900px) {
          .hero-inner { grid-template-columns: 1.1fr 0.9fr; gap: 48px; }
        }
        /* Right side images — hidden on mobile, shown on desktop */
        .hero-right {
          display: none;
        }
        @media (min-width: 900px) {
          .hero-right { display: flex; justify-content: center; align-items: center; }
        }
        .hero-img-main {
          border-radius: 18px;
          overflow: hidden;
          height: 380px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.55);
          border: 1px solid rgba(201,169,110,0.15);
          transition: transform 0.4s ease;
          position: relative;
        }
        .hero-img-main:hover { transform: scale(1.02); }
        .hero-img-mini {
          position: absolute;
          bottom: -16px;
          right: -28px;
          width: 120px;
          height: 158px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0,0,0,0.45);
          border: 2px solid rgba(201,169,110,0.25);
          transition: transform 0.4s ease;
        }
        .hero-img-mini:hover { transform: scale(1.05) rotate(2deg); }
      `}</style>

      <section className="hero-section">
        {/* Subtle background glows */}
        <div style={{ position:'absolute', top:'-15%', right:'-5%', width:'45vw', maxWidth:550, height:'45vw', maxHeight:550, background:'radial-gradient(ellipse,rgba(201,169,110,0.13) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'0', left:'-8%', width:320, height:320, background:'radial-gradient(ellipse,rgba(201,169,110,0.06) 0%,transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
        {/* Grid texture overlay */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(201,169,110,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,0.03) 1px,transparent 1px)', backgroundSize:'72px 72px', pointerEvents:'none' }} />

        <div style={{ maxWidth:1280, margin:'0 auto', padding:'60px 24px', position:'relative', width:'100%' }}>
          <div className="hero-inner">

            {/* ── LEFT: Text content ── */}
            <div className="anim-fade-up">
              {/* Eyebrow pill */}
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 14px', borderRadius:999, background:'rgba(201,169,110,0.1)', border:'1px solid rgba(201,169,110,0.22)', marginBottom:22 }}>
                <span className="pulse-dot" />
                <span style={{ color:GOLD, fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:'"DM Sans",sans-serif' }}>New Season · 2025</span>
              </div>

              {/* Main headline */}
              <h1 style={{
                fontFamily:'"Cormorant Garamond",Georgia,serif', fontWeight:600,
                fontSize:'clamp(2.6rem,5.5vw,5rem)', lineHeight:1.05,
                color:'#F7F4EE', marginBottom:20,
              }}>
                Dress With<br />
                <em style={{ color:GOLD, fontStyle:'italic' }}>Intention.</em>
              </h1>

              {/* Subtext */}
              <p style={{ color:'rgba(247,244,238,0.48)', fontSize:'clamp(0.9rem,1.8vw,1.05rem)', lineHeight:1.85, maxWidth:440, marginBottom:32, fontFamily:'"DM Sans",sans-serif', fontWeight:300 }}>
                Curated fashion that speaks before you do. Pieces crafted for the modern wardrobe.
              </p>

              {/* CTA Buttons */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:12, marginBottom:40 }}>
                <Button component={Link} to="/men" variant="contained" size="large" endIcon={<ArrowForwardIcon />} sx={{
                  bgcolor:GOLD, color:'#0E0C0A', fontWeight:700, px:3.5, borderRadius:'10px', textTransform:'none',
                  fontFamily:'"DM Sans",sans-serif', fontSize:'0.875rem',
                  boxShadow:'0 4px 20px rgba(201,169,110,0.3)',
                  '&:hover':{ bgcolor:'#DFC08A', transform:'translateY(-2px)', boxShadow:'0 8px 28px rgba(201,169,110,0.4)' },
                  transition:'all 0.25s ease',
                }}>Shop Men</Button>
                <Button component={Link} to="/women" variant="outlined" size="large" sx={{
                  color:'rgba(247,244,238,0.78)', borderColor:'rgba(247,244,238,0.22)', fontWeight:600, px:3.5,
                  borderRadius:'10px', textTransform:'none', fontFamily:'"DM Sans",sans-serif', fontSize:'0.875rem',
                  '&:hover':{ borderColor:GOLD, color:GOLD, bgcolor:'rgba(201,169,110,0.07)', transform:'translateY(-2px)' },
                  transition:'all 0.25s ease',
                }}>Shop Women</Button>
              </div>

              {/* Stats */}
              <div style={{ display:'flex', gap:36, paddingTop:8, borderTop:'1px solid rgba(255,255,255,0.08)' }}>
                {[['10K+','Products'],['50K+','Customers'],['100%','Authentic']].map(([n,l]) => (
                  <div key={l}>
                    <div style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:700, fontSize:'clamp(1.5rem,2.5vw,2rem)', color:GOLD, lineHeight:1.1 }}>{n}</div>
                    <div style={{ fontSize:'0.6rem', color:'rgba(247,244,238,0.32)', letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'"DM Sans",sans-serif', marginTop:4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Images (desktop only via CSS class) ── */}
            <div className="hero-right anim-fade-in anim-d2">
              <div style={{ position:'relative', width:300 }}>
                <div className="hero-img-main">
                  <img src={CATEGORIES[1].img} alt="Women's Collection" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(14,12,10,0.72) 0%,transparent 55%)' }} />
                  <div style={{ position:'absolute', bottom:0, left:0, padding:'20px 22px' }}>
                    <p style={{ color:GOLD, fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', fontFamily:'"DM Sans",sans-serif', marginBottom:5 }}>New Arrival</p>
                    <p style={{ color:'#F7F4EE', fontFamily:'"Cormorant Garamond",serif', fontSize:'1.1rem', fontWeight:600 }}>Women's Collection</p>
                  </div>
                </div>
                <div className="hero-img-mini">
                  <img src={CATEGORIES[0].img} alt="Men's Collection" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════ FEATURES STRIP ════════════════════ */}
      <section style={{ background: isDark ? '#130F0B' : '#fff', borderTop:'1px solid rgba(14,12,10,0.07)', borderBottom:'1px solid rgba(14,12,10,0.07)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 20px' }}>
          <div className="features-row">
            <style>{`
              .features-row { display:grid; grid-template-columns:1fr; }
              @media (min-width:600px) { .features-row { grid-template-columns:repeat(3,1fr); } }
              .feat-item { padding:20px 16px; display:flex; align-items:center; gap:14px; justify-content:center; }
              .feat-divider { border-bottom: 1px solid rgba(14,12,10,0.07); }
              @media (min-width:600px) { .feat-divider { border-bottom:none; border-right:1px solid rgba(14,12,10,0.07); } }
              .feat-divider:last-child { border:none; }
            `}</style>
            {FEATURES.map((f, i) => (
              <div key={f.title} className={`feat-item feat-divider`}>
                <div style={{ color:GOLD, fontSize:22, display:'flex', flexShrink:0 }}>{f.icon}</div>
                <div>
                  <p style={{ fontWeight:700, fontSize:'0.875rem', color: isDark ? '#F0EDE6' : '#0E0C0A', fontFamily:'"DM Sans",sans-serif', marginBottom:2 }}>{f.title}</p>
                  <p style={{ fontSize:'0.78rem', color: isDark ? 'rgba(240,237,230,0.4)' : '#64748B', fontFamily:'"DM Sans",sans-serif' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ SHOP BY CATEGORY ════════════════════ */}
      <section style={{ padding:'60px 0', background: isDark ? '#0A0806' : '#FDFAF4' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 20px' }}>

          {/* Heading */}
          <div style={{ textAlign:'center', marginBottom:36 }}>
            <p style={{ color:GOLD, fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', fontFamily:'"DM Sans",sans-serif', marginBottom:8 }}>Collections</p>
            <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:700, fontSize:'clamp(1.8rem,4vw,2.8rem)', color: isDark ? '#F0EDE6' : '#0E0C0A', marginBottom:10 }}>Shop by Category</h2>
            <div style={{ width:40, height:3, background:GOLD, borderRadius:2, margin:'0 auto' }} />
          </div>

          {/* Category cards grid — with lazy loading shimmer */}
          <style>{`
            .cat-grid { display:grid; grid-template-columns:1fr; gap:16px; }
            @media (min-width:600px) { .cat-grid { grid-template-columns:repeat(2,1fr); gap:20px; } }
            .cat-card { height:220px; position:relative; border-radius:16px; overflow:hidden; display:block; text-decoration:none; }
            @media (min-width:480px)  { .cat-card { height:260px; } }
            @media (min-width:768px)  { .cat-card { height:300px; } }
            @media (min-width:1024px) { .cat-card { height:340px; } }
            .cat-card img { transition:transform 0.55s ease; width:100%; height:100%; object-fit:cover; display:block; }
            .cat-card:hover img { transform:scale(1.05); }
            .cat-cta { opacity:0; transform:translateY(10px); transition:all 0.3s ease; }
            .cat-card:hover .cat-cta { opacity:1; transform:translateY(0); }
            /* shimmer placeholder */
            @keyframes catShimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
            .cat-shimmer {
              position:absolute; inset:0;
              background:linear-gradient(90deg,#1a1612 25%,#2a221a 50%,#1a1612 75%);
              background-size:800px 100%;
              animation:catShimmer 1.6s infinite linear;
              transition:opacity 0.4s ease;
            }
            .cat-img-loaded .cat-shimmer { opacity:0; pointer-events:none; }
            .cat-img-hidden { opacity:0; transition:opacity 0.4s ease; }
            .cat-img-visible { opacity:1; }
          `}</style>

          <div className="cat-grid">
            {CATEGORIES.map(cat => (
              <CatCard key={cat.path} cat={cat} GOLD={GOLD} ArrowForwardIcon={ArrowForwardIcon} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ TRENDING PRODUCTS ════════════════════ */}
      <section style={{ padding:'60px 0', background: isDark ? '#130F0B' : '#fff', borderTop:'1px solid', borderColor: isDark ? 'rgba(255,255,255,0.06)' : '#EEECE6' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 20px' }}>

          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:12, marginBottom:28 }}>
            <div>
              <p style={{ color:GOLD, fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', fontFamily:'"DM Sans",sans-serif', marginBottom:6 }}>Popular Now</p>
              <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:700, fontSize:'clamp(1.8rem,4vw,2.8rem)', color: isDark ? '#F0EDE6' : '#0E0C0A', lineHeight:1.1 }}>Trending Products</h2>
            </div>
            <Button component={Link} to="/search?q=a" variant="outlined" endIcon={<ArrowForwardIcon />} sx={{
              borderColor:GOLD, color:GOLD, borderRadius:'10px', textTransform:'none', fontFamily:'"DM Sans",sans-serif', fontWeight:600, fontSize:'0.82rem',
              '&:hover':{ borderColor:GOLD, bgcolor:'rgba(201,169,110,0.08)' },
            }}>View All</Button>
          </div>

          {loading ? (
            <div style={{ display:'flex', justifyContent:'center', padding:'48px 0' }}>
              <div className="loader-ring" />
            </div>
          ) : (
            <div className="trending-pg">
              <style>{`
                .trending-pg { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }
                @media (min-width:480px)  { .trending-pg { grid-template-columns:repeat(3,1fr); gap:14px; } }
                @media (min-width:768px)  { .trending-pg { grid-template-columns:repeat(4,1fr); gap:16px; } }
                @media (min-width:1024px) { .trending-pg { grid-template-columns:repeat(5,1fr); gap:18px; } }
              `}</style>
              {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════ SALE BANNER ════════════════════ */}
      <section style={{ background:'linear-gradient(135deg,#0E0C0A 0%,#1C1710 100%)', padding:'64px 20px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:500, height:500, borderRadius:'50%', border:'70px solid rgba(201,169,110,0.05)', pointerEvents:'none' }} />
        <div style={{ maxWidth:480, margin:'0 auto', position:'relative', zIndex:1 }}>
          <p style={{ color:GOLD, fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', fontFamily:'"DM Sans",sans-serif', marginBottom:10 }}>Limited Time</p>
          <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:600, fontSize:'clamp(1.9rem,4vw,3.2rem)', color:'#F7F4EE', lineHeight:1.1, marginBottom:14 }}>
            Up to 30% Off<br />New Arrivals
          </h2>
          <p style={{ color:'rgba(255,255,255,0.42)', fontSize:'0.95rem', fontFamily:'"DM Sans",sans-serif', marginBottom:32 }}>
            Shop the latest styles before they're gone.
          </p>
          <Button component={Link} to="/women" variant="contained" size="large" endIcon={<ArrowForwardIcon />} sx={{
            bgcolor:GOLD, color:'#0E0C0A', fontWeight:700, px:4, borderRadius:'10px', textTransform:'none', fontFamily:'"DM Sans",sans-serif',
            boxShadow:'0 4px 20px rgba(201,169,110,0.3)', '&:hover':{ bgcolor:'#DFC08A', transform:'translateY(-1px)' }, transition:'all 0.25s ease',
          }}>Shop the Sale</Button>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
