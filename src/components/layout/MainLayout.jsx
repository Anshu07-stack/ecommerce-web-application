import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  const isDark = useSelector(s => s.ui.themeMode) === 'dark';
  return (
    <div style={{
      display:'flex', flexDirection:'column', minHeight:'100vh',
      background: isDark ? '#0A0806' : '#FDFAF4',
      transition: 'background 0.3s ease',
    }}>
      <Header />
      <main style={{ flexGrow:1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
