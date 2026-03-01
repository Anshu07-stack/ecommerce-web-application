import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Badge, Drawer, Divider, List, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon                from '@mui/icons-material/Menu';
import CloseIcon               from '@mui/icons-material/Close';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import DarkModeOutlinedIcon    from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon   from '@mui/icons-material/LightModeOutlined';
import SearchBar from '../features/search/SearchBar';
import { toggleTheme } from '../../slices/uiSlice';

const GOLD = '#C9A96E';
const NAV  = [
  { label:'Home',  path:'/',      end:true },
  { label:'Men',   path:'/men' },
  { label:'Women', path:'/women' },
];

export default function Header() {
  const dispatch  = useDispatch();
  const isDark    = useSelector(s => s.ui.themeMode) === 'dark';
  const cartCount = useSelector(s => s.cart.items.reduce((n, i) => n + i.quantity, 0));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const bg     = isDark ? 'rgba(10,8,6,0.94)' : 'rgba(253,250,244,0.94)';
  const border = isDark ? 'rgba(201,169,110,0.12)' : 'rgba(201,169,110,0.16)';

  return (
    <>
      <style>{`
        /* ── Spacer ── */
        .hdr-spacer { height: 64px; }

        /* ── Nav link pill hover ── */
        .hdr-navlink {
          position: relative;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          font-family: "DM Sans", sans-serif;
          text-decoration: none;
          transition: background 0.18s ease, color 0.18s ease;
        }
        .hdr-navlink:hover {
          background: rgba(201,169,110,0.08);
          color: ${GOLD} !important;
        }
        .hdr-navlink.active {
          color: ${GOLD} !important;
          background: rgba(201,169,110,0.1);
        }

        /* ── Desktop: 3-col layout ── */
        .hdr-left   { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
        .hdr-center { display: flex; align-items: center; gap: 16px; flex: 1; justify-content: center; max-width: 640px; margin: 0 auto; padding: 0 24px; }
        .hdr-right  { display: flex; align-items: center; gap: 2px; flex-shrink: 0; }
        .hdr-nav    { display: flex; align-items: center; gap: 2px; flex-shrink: 0; }
        .hdr-searchbox { flex: 1; min-width: 0; }
        .hdr-burger { display: none !important; }
        .hdr-mobile-search { display: none; }

        /* ── Mobile (< 768px) ── */
        @media (max-width: 767px) {
          .hdr-spacer        { height: 112px; }
          .hdr-center        { display: none; }
          .hdr-burger        { display: flex !important; }
          .hdr-mobile-search { display: block; padding: 0 0 10px; }
          /* Push right section to far right on mobile */
          .hdr-right         { margin-left: auto; }
        }
      `}</style>

      {/* ═══════════ NAVBAR ═══════════ */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1100,
        background: bg,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: `1px solid ${border}`,
        boxShadow: scrolled
          ? (isDark ? '0 2px 24px rgba(0,0,0,0.45)' : '0 2px 20px rgba(14,12,10,0.08)')
          : 'none',
        transition: 'box-shadow 0.3s ease',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', height: 64 }}>

          {/* LEFT — Logo */}
          <div className="hdr-left">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span style={{
                fontFamily: '"Cormorant Garamond",serif',
                fontWeight: 700, fontSize: '1.5rem', letterSpacing: '0.01em',
                color: isDark ? '#F7F4EE' : '#0E0C0A',
              }}>
                Cart<span style={{ color: GOLD }}>Aura</span>
              </span>
            </Link>
          </div>

          {/* CENTER — Nav links + Search (desktop only) */}
          <div className="hdr-center">
            {/* Nav pills */}
            <nav className="hdr-nav">
              {NAV.map(n => (
                <NavLink key={n.path} to={n.path} end={n.end}
                  className={({ isActive }) => `hdr-navlink${isActive ? ' active' : ''}`}
                  style={{ color: isDark ? 'rgba(255,255,255,0.52)' : 'rgba(14,12,10,0.5)' }}
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>

            {/* Divider line between nav and search */}
            <div style={{
              width: 1, height: 20, flexShrink: 0,
              background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(14,12,10,0.12)',
            }} />

            {/* Search */}
            <div className="hdr-searchbox">
              <SearchBar />
            </div>
          </div>

          {/* RIGHT — Theme + Cart + Hamburger */}
          <div className="hdr-right">

            {/* Theme toggle */}
            <IconButton size="small" onClick={() => dispatch(toggleTheme())} sx={{
              color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(14,12,10,0.4)',
              p: '7px', borderRadius: '8px',
              '&:hover': { color: GOLD, bgcolor: 'rgba(201,169,110,0.08)' },
              transition: 'all 0.2s',
            }}>
              {isDark
                ? <LightModeOutlinedIcon sx={{ fontSize: 18 }} />
                : <DarkModeOutlinedIcon  sx={{ fontSize: 18 }} />}
            </IconButton>

            {/* Divider */}
            <div style={{
              width: 1, height: 20, margin: '0 4px',
              background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(14,12,10,0.1)',
            }} />

            {/* Cart */}
            <IconButton component={Link} to="/cart" size="small" sx={{
              color: isDark ? '#F7F4EE' : '#0E0C0A', p: '7px', borderRadius: '8px',
              '&:hover': { color: GOLD, bgcolor: 'rgba(201,169,110,0.08)' },
              transition: 'all 0.2s',
            }}>
              <Badge badgeContent={cartCount} sx={{
                '& .MuiBadge-badge': {
                  bgcolor: GOLD, color: '#080808',
                  fontWeight: 800, fontSize: '0.58rem',
                  minWidth: 15, height: 15, padding: '0 3px',
                },
              }}>
                <ShoppingBagOutlinedIcon sx={{ fontSize: 20 }} />
              </Badge>
            </IconButton>

            {/* Hamburger — mobile only */}
            <IconButton
              className="hdr-burger"
              size="small"
              onClick={() => setDrawerOpen(true)}
              sx={{
                color: isDark ? 'rgba(255,255,255,0.7)' : '#0E0C0A',
                p: '7px', borderRadius: '8px', ml: '2px',
                '&:hover': { bgcolor: 'rgba(201,169,110,0.08)' },
              }}
            >
              <MenuIcon sx={{ fontSize: 22 }} />
            </IconButton>

          </div>
        </div>

        {/* Mobile search row */}
        <div className="hdr-mobile-search" style={{ padding: '0 16px 10px' }}>
          <SearchBar />
        </div>
      </header>

      <div className="hdr-spacer" />

      {/* ═══════════ MOBILE DRAWER ═══════════ */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: {
          width: 270,
          bgcolor: isDark ? '#0A0806' : '#FDFAF4',
          borderRight: `1px solid ${border}`,
        }}}
      >
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 18px 14px' }}>
          <span style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:700, fontSize:'1.4rem', color: isDark ? '#F7F4EE' : '#0E0C0A' }}>
            Cart<span style={{ color:GOLD }}>Aura</span>
          </span>
          <IconButton size="small" onClick={() => setDrawerOpen(false)}
            sx={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)' }}>
            <CloseIcon sx={{ fontSize:19 }} />
          </IconButton>
        </div>

        <div style={{ padding:'0 14px 14px' }}>
          <SearchBar onSelect={() => setDrawerOpen(false)} />
        </div>

        <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)' }} />

        <List sx={{ pt:1.5, px:1.5 }}>
          {NAV.map(n => (
            <ListItemButton
              key={n.path}
              component={NavLink}
              to={n.path}
              end={n.end}
              onClick={() => setDrawerOpen(false)}
              sx={{
                borderRadius:'10px', mb:0.75, py:1.25, px:2,
                color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(14,12,10,0.6)',
                transition: 'all 0.18s ease',
                '&.active': {
                  color: GOLD,
                  bgcolor: isDark ? 'rgba(201,169,110,0.12)' : 'rgba(201,169,110,0.09)',
                  '& .drawer-nav-label': { fontWeight: 700 },
                },
                '&:hover': {
                  color: GOLD,
                  bgcolor: isDark ? 'rgba(201,169,110,0.09)' : 'rgba(201,169,110,0.07)',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <ListItemText
                primary={n.label}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontFamily: '"DM Sans",sans-serif',
                  fontSize: '0.95rem',
                  className: 'drawer-nav-label',
                }}
              />
              <span style={{ color: 'inherit', opacity: 0.4, fontSize: '0.75rem' }}>›</span>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}
