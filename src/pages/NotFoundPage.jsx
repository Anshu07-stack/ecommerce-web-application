import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Box, Button } from '@mui/material';
import HomeIcon     from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GOLD = '#C9A96E';

const NotFoundPage = () => {
  const isDark = useSelector(s => s.ui.themeMode) === 'dark';
  const textPrimary = isDark ? '#F0EDE6' : '#0E0C0A';
  const textSecondary = isDark ? 'rgba(240,237,230,0.45)' : '#64748B';

  return (
    <Box sx={{ bgcolor: isDark ? '#0A0806' : '#FDFAF4', minHeight:'100vh', display:'flex', alignItems:'center' }}>
      <Container maxWidth="sm" sx={{ textAlign:'center', py:10, display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{
          fontFamily:'"Cormorant Garamond",serif', fontWeight:700,
          fontSize:'clamp(6rem,18vw,11rem)', lineHeight:1,
          background:`linear-gradient(135deg,${isDark ? '#F0EDE6' : '#1B2A4A'} 30%,${GOLD})`,
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          marginBottom:16,
        }}>404</div>
        <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:700, fontSize:'1.8rem', marginBottom:12, color:textPrimary }}>
          Page Not Found
        </h2>
        <p style={{ color:textSecondary, marginBottom:40, maxWidth:320, lineHeight:1.7, fontFamily:'"DM Sans",sans-serif' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center' }}>
          <Button component={Link} to="/" variant="contained" size="large" startIcon={<HomeIcon />} sx={{
            px:3.5, bgcolor:GOLD, color:'#080808', fontWeight:700, borderRadius:'10px', textTransform:'none', fontFamily:'"DM Sans",sans-serif',
            '&:hover':{ bgcolor:'#DFC08A' },
          }}>Go Home</Button>
          <Button variant="outlined" size="large" startIcon={<ArrowBackIcon />} onClick={() => window.history.back()} sx={{
            px:3.5, borderRadius:'10px', textTransform:'none', fontFamily:'"DM Sans",sans-serif', fontWeight:600,
            borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(14,12,10,0.2)',
            color: textPrimary,
            '&:hover':{ borderColor:GOLD, color:GOLD },
          }}>Go Back</Button>
        </div>
      </Container>
    </Box>
  );
};
export default NotFoundPage;
