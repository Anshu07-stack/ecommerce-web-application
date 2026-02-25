import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Main content area */}
      <main className="grow container mx-auto px-4 py-8">
        <Outlet /> {/* Yahan par pages render honge */}
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;