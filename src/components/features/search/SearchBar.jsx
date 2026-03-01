import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  InputBase, IconButton, List, ListItemButton, ListItemAvatar,
  ListItemText, Avatar, Typography, CircularProgress, ClickAwayListener, Popper, Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon  from '@mui/icons-material/Close';
import productService from '../../../services/productService';

const GOLD = '#C9A96E';

const SearchBar = ({ onSelect }) => {
  const [q,           setQ]           = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [open,        setOpen]        = useState(false);
  const anchorRef = useRef(null);
  const navigate  = useNavigate();

  // Read dark mode from Redux to apply correct colors
  const isDark = useSelector(s => s.ui.themeMode) === 'dark';

  useEffect(() => {
    if (q.trim().length < 2) { setSuggestions([]); setOpen(false); return; }
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const result = await productService.search(q.trim());
        setSuggestions(result.products.slice(0, 5));
        setOpen(true);
      } catch { setSuggestions([]); }
      finally  { setLoading(false); }
    }, 450);
    return () => clearTimeout(timer);
  }, [q]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    setOpen(false); onSelect?.();
  };
  const handleSelect = (product) => {
    navigate(`/product/${product.id}`);
    setQ(''); setOpen(false); onSelect?.();
  };
  const handleClear = () => { setQ(''); setSuggestions([]); setOpen(false); };

  // ── Dynamic colors based on theme ──
  const barBg        = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(14,12,10,0.04)';
  const barBgFocused = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(14,12,10,0.04)';
  const borderColor  = open
    ? GOLD
    : isDark ? 'rgba(255,255,255,0.15)' : 'rgba(14,12,10,0.12)';
  const borderHover  = isDark ? 'rgba(255,255,255,0.28)' : 'rgba(14,12,10,0.22)';
  const inputColor   = isDark ? '#F0EDE6' : '#0E0C0A';
  const placeholderColor = isDark ? 'rgba(240,237,230,0.38)' : 'rgba(14,12,10,0.32)';
  const clearColor   = isDark ? 'rgba(240,237,230,0.3)' : 'rgba(14,12,10,0.28)';

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div ref={anchorRef} style={{ position:'relative', width:'100%' }}>

        {/* ── Search input bar ── */}
        <div
          component="form"
          style={{
            display:'flex', alignItems:'center',
            padding:'5px 6px 5px 12px',
            borderRadius:10,
            border:`1.5px solid ${borderColor}`,
            background: open ? barBgFocused : barBg,
            boxShadow: open ? `0 0 0 3px rgba(201,169,110,0.15)` : 'none',
            transition:'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
          }}
          onMouseEnter={e => { if (!open) e.currentTarget.style.borderColor = borderHover; }}
          onMouseLeave={e => { if (!open) e.currentTarget.style.borderColor = borderColor; }}
        >
          <form onSubmit={handleSubmit} style={{ display:'flex', alignItems:'center', flex:1, gap:0 }}>
            <InputBase
              value={q}
              onChange={e => setQ(e.target.value)}
              onFocus={() => suggestions.length && setOpen(true)}
              placeholder="Search products..."
              sx={{
                flex:1,
                fontSize:'0.85rem',
                fontFamily:'"DM Sans",sans-serif',
                color: inputColor,
                '& input': { color: inputColor, padding:0 },
                '& input::placeholder': { color: placeholderColor, opacity:1 },
              }}
              inputProps={{ 'aria-label':'search products' }}
            />

            {/* Clear button */}
            {q && (
              <IconButton
                size="small"
                onClick={handleClear}
                sx={{
                  p:'3px', color: clearColor,
                  '&:hover':{ color: isDark ? 'rgba(240,237,230,0.7)' : 'rgba(14,12,10,0.6)' },
                }}
              >
                <CloseIcon sx={{ fontSize:13 }} />
              </IconButton>
            )}

            {/* Search button */}
            <IconButton
              type="submit"
              size="small"
              sx={{
                p:'6px', color:GOLD, borderRadius:'7px',
                '&:hover':{ color:'#A8863F', bgcolor:'rgba(201,169,110,0.1)' },
                transition:'all 0.2s ease',
              }}
            >
              {loading
                ? <CircularProgress size={15} sx={{ color:GOLD }} />
                : <SearchIcon sx={{ fontSize:18 }} />
              }
            </IconButton>
          </form>
        </div>

        {/* ── Suggestions dropdown ── */}
        <Popper
          open={open && suggestions.length > 0}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          style={{ width: anchorRef.current?.offsetWidth, zIndex:1500 }}
        >
          <Paper
            elevation={0}
            sx={{
              mt:0.75, borderRadius:'12px', overflow:'hidden',
              border:'1px solid',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(14,12,10,0.08)',
              bgcolor: isDark ? '#1C1814' : '#fff',
              boxShadow: isDark
                ? '0 16px 48px rgba(0,0,0,0.5)'
                : '0 16px 40px rgba(14,12,10,0.14)',
            }}
          >
            <List disablePadding>
              {suggestions.map((product, i) => (
                <ListItemButton
                  key={product.id}
                  onClick={() => handleSelect(product)}
                  sx={{
                    py:1.5, px:2,
                    borderBottom: i < suggestions.length - 1
                      ? `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(14,12,10,0.05)'}`
                      : 'none',
                    '&:hover':{ bgcolor: isDark ? 'rgba(201,169,110,0.08)' : 'rgba(201,169,110,0.06)' },
                    transition:'background 0.15s ease',
                  }}
                >
                  <ListItemAvatar sx={{ minWidth:46 }}>
                    <Avatar
                      src={product.thumbnail}
                      variant="rounded"
                      sx={{ width:36, height:36, borderRadius:'7px' }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontWeight:600, fontSize:'0.82rem', fontFamily:'"DM Sans",sans-serif', color: isDark ? '#F0EDE6' : '#0E0C0A' }} noWrap>
                        {product.title}
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ color:GOLD, fontWeight:700, fontSize:'0.75rem', fontFamily:'"DM Sans",sans-serif' }}>
                        ${product.price}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Popper>

      </div>
    </ClickAwayListener>
  );
};

export default SearchBar;
