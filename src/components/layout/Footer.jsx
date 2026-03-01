import { Link } from 'react-router-dom';
import { IconButton, Button, TextField } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon   from '@mui/icons-material/Twitter';
import FacebookIcon  from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const GOLD = '#C9A96E';
const LINKS = {
  Shop: [{ l:'Men\'s Collection', p:'/men' },{ l:'Women\'s Collection', p:'/women' },{ l:'New Arrivals', p:'/' },{ l:'Sale', p:'/' }],
  Help: [{ l:'FAQ', p:'#' },{ l:'Shipping & Returns', p:'#' },{ l:'Size Guide', p:'#' },{ l:'Contact Us', p:'#' }],
};
const SOCIAL = [{ Icon:InstagramIcon },{ Icon:TwitterIcon },{ Icon:FacebookIcon },{ Icon:PinterestIcon }];

const Footer = () => (
  <footer style={{ background:'linear-gradient(160deg,#0E0C0A 0%,#1A1610 60%,#0E0C0A 100%)', color:'#fff', marginTop:'auto' }}>
    <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(201,169,110,0.3),transparent)' }} />
    <div style={{ maxWidth:1280, margin:'0 auto', padding:'56px 24px 32px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'40px 32px', marginBottom:48 }}>

        {/* Brand */}
        <div style={{ gridColumn:'span 1' }}>
          <span style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:700, fontSize:'2rem', color:'#F7F4EE', display:'block', marginBottom:16 }}>
            Cart<span style={{ color:GOLD }}>Aura</span>
          </span>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'0.875rem', lineHeight:1.8, maxWidth:280, marginBottom:24, fontFamily:'"DM Sans",sans-serif' }}>
            Curated fashion for those who value quality and style. Shop confidently with easy returns.
          </p>
          <div style={{ display:'flex', gap:8 }}>
            {SOCIAL.map(({ Icon }, i) => (
              <a key={i} href="#" style={{ textDecoration:'none' }}>
                <IconButton size="small" sx={{
                  color:'rgba(255,255,255,0.3)', border:'1px solid rgba(201,169,110,0.18)', borderRadius:'8px', width:36, height:36,
                  '&:hover':{ color:GOLD, borderColor:GOLD, bgcolor:'rgba(201,169,110,0.08)', transform:'translateY(-2px)' }, transition:'all 0.25s ease',
                }}>
                  <Icon sx={{ fontSize:16 }} />
                </IconButton>
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([section, links]) => (
          <div key={section}>
            <p style={{ color:GOLD, fontSize:'0.7rem', fontWeight:600, letterSpacing:'0.18em', textTransform:'uppercase', fontFamily:'"DM Sans",sans-serif', marginBottom:20 }}>
              {section}
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {links.map(({ l, p }) => (
                <Link key={l} to={p} style={{ color:'rgba(255,255,255,0.4)', textDecoration:'none', fontSize:'0.875rem', fontFamily:'"DM Sans",sans-serif', transition:'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color=GOLD} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.4)'}>
                  {l}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Newsletter */}
        <div>
          <p style={{ color:GOLD, fontSize:'0.7rem', fontWeight:600, letterSpacing:'0.18em', textTransform:'uppercase', fontFamily:'"DM Sans",sans-serif', marginBottom:8 }}>
            Newsletter
          </p>
          <p style={{ color:'rgba(255,255,255,0.36)', fontSize:'0.875rem', marginBottom:20, lineHeight:1.7, fontFamily:'"DM Sans",sans-serif' }}>
            Early access, new arrivals & exclusive deals.
          </p>
          <div style={{ display:'flex', gap:8 }}>
            <TextField size="small" placeholder="your@email.com" sx={{
              flex:1,
              '& .MuiOutlinedInput-root':{ bgcolor:'rgba(255,255,255,0.04)', color:'#fff', borderRadius:'10px', fontSize:'0.82rem', fontFamily:'"DM Sans",sans-serif',
                '& fieldset':{ borderColor:'rgba(201,169,110,0.18)' }, '&:hover fieldset':{ borderColor:'rgba(201,169,110,0.4)' }, '&.Mui-focused fieldset':{ borderColor:GOLD, borderWidth:1 } },
              '& input::placeholder':{ color:'rgba(255,255,255,0.22)', opacity:1 },
            }} />
            <Button variant="contained" sx={{ bgcolor:GOLD, color:'#0E0C0A', fontWeight:700, borderRadius:'10px', minWidth:44, width:44, p:0,
              '&:hover':{ bgcolor:'#DFC08A', transform:'translateY(-1px)', boxShadow:'0 6px 20px rgba(201,169,110,0.3)' }, transition:'all 0.25s ease' }}>
              <ArrowForwardIcon sx={{ fontSize:18 }} />
            </Button>
          </div>
        </div>
      </div>

      <div style={{ borderTop:'1px solid rgba(201,169,110,0.1)', paddingTop:24, display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:12 }}>
        <p style={{ color:'rgba(255,255,255,0.22)', fontSize:'0.78rem', fontFamily:'"DM Sans",sans-serif' }}>
          © {new Date().getFullYear()} CartAura. All rights reserved.
        </p>
        <div style={{ display:'flex', gap:24 }}>
          {['Privacy','Terms','Cookies'].map(item => (
            <a key={item} href="#" style={{ color:'rgba(255,255,255,0.22)', fontSize:'0.78rem', textDecoration:'none', fontFamily:'"DM Sans",sans-serif', transition:'color 0.2s' }}
              onMouseEnter={e => e.target.style.color='rgba(255,255,255,0.55)'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.22)'}>
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
