import { createTheme } from '@mui/material/styles';
export const GOLD = '#C9A96E';

const typo = {
  fontFamily: '"DM Sans","Helvetica Neue",sans-serif',
  h1: { fontWeight:900, letterSpacing:'-0.03em', fontFamily:'"Cormorant Garamond",Georgia,serif' },
  h2: { fontWeight:800, letterSpacing:'-0.02em', fontFamily:'"Cormorant Garamond",Georgia,serif' },
  h3: { fontWeight:700, letterSpacing:'-0.015em', fontFamily:'"Cormorant Garamond",Georgia,serif' },
  h4: { fontWeight:700, fontFamily:'"Cormorant Garamond",Georgia,serif' },
  h5: { fontWeight:600 },
  h6: { fontWeight:600 },
  button: { textTransform:'none', fontWeight:600, letterSpacing:'0.01em' },
  body1:  { lineHeight:1.8 },
  body2:  { lineHeight:1.65 },
};

const mk = mode => ({
  MuiCssBaseline: { styleOverrides: { body: { scrollbarWidth:'thin', scrollbarColor:`${GOLD} transparent` } } },
  MuiButton: {
    defaultProps: { disableElevation:true },
    styleOverrides: { root: { borderRadius:12, fontWeight:700, fontSize:'0.875rem', padding:'11px 28px', fontFamily:'"DM Sans",sans-serif' } },
  },
  MuiCard:   { styleOverrides: { root: { borderRadius:16, backgroundImage:'none', boxShadow:'none', border: mode==='dark'?'1px solid rgba(255,255,255,0.07)':'1px solid #EEECE6' } } },
  MuiAppBar: { styleOverrides: { root: { backgroundImage:'none', boxShadow:'none' } } },
  MuiPaper:  { styleOverrides: { root: { backgroundImage:'none' } } },
  MuiDrawer: { styleOverrides: { paper: { backgroundImage:'none' } } },
  MuiChip:   { styleOverrides: { root: { borderRadius:8, fontWeight:700 } } },
  MuiDivider:{ styleOverrides: { root: { borderColor: mode==='dark'?'rgba(255,255,255,0.07)':'#EEECE6' } } },
  MuiRating: { styleOverrides: { iconFilled:{ color:GOLD }, iconEmpty:{ color: mode==='dark'?'rgba(255,255,255,0.15)':'#DDD9D0' } } },
});

export const darkTheme = createTheme({
  palette: {
    mode:'dark',
    primary:    { main:GOLD, light:'#DFC08A', dark:'#9A7A3E', contrastText:'#080808' },
    secondary:  { main:'#FFFFFF', contrastText:'#080808' },
    background: { default:'#0A0806', paper:'#130F0B' },
    text:       { primary:'#F0EDE6', secondary:'rgba(240,237,230,0.5)', disabled:'rgba(240,237,230,0.28)' },
    divider:'rgba(255,255,255,0.07)', error:{ main:'#FF6B6B' }, success:{ main:'#51CF66' },
  },
  typography:typo, shape:{ borderRadius:12 }, components:mk('dark'),
});

export const lightTheme = createTheme({
  palette: {
    mode:'light',
    primary:    { main:'#1B2A4A', light:'#2C3E6B', dark:'#0F1D33', contrastText:'#FFFFFF' },
    secondary:  { main:GOLD, light:'#DFC08A', dark:'#9A7A3E', contrastText:'#1B2A4A' },
    background: { default:'#FDFAF4', paper:'#FFFFFF' },
    text:       { primary:'#1B2A4A', secondary:'#64748B', disabled:'#A8B2C1' },
    divider:'#EEECE6', error:{ main:'#E53E3E' }, success:{ main:'#276749' },
  },
  typography:typo, shape:{ borderRadius:12 }, components:mk('light'),
});
