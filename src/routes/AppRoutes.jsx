import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import MainLayout from '../components/layout/MainLayout';

// Scroll to top on every navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const HomePage = lazy(() => import('../pages/HomePage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const ProductListingPage = lazy(() => import('../pages/ProductListingPage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const Loader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <CircularProgress size={32} thickness={4} sx={{ color: '#C9A96E' }} />
  </Box>
);

const AppRoutes = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Suspense fallback={<Loader />}><HomePage /></Suspense>} />

        <Route path="/product/:id" element={<Suspense fallback={<Loader />}><ProductDetailPage /></Suspense>} />

        <Route path="/cart" element={<Suspense fallback={<Loader />}><CartPage /></Suspense>} />

        <Route path="/men" element={<Suspense fallback={<Loader />}><ProductListingPage title="Men's Collection" categories={['mens-shirts', 'mens-shoes', 'mens-watches', 'sunglasses']} /></Suspense>} />

        <Route path="/women" element={<Suspense fallback={<Loader />}><ProductListingPage title="Women's Collection" categories={['womens-dresses', 'womens-shoes', 'womens-watches', 'womens-bags', 'womens-jewellery', 'fragrances', 'skincare']} /></Suspense>} />

        <Route path="/search" element={<Suspense fallback={<Loader />}><SearchPage /></Suspense>} />

        <Route path="/category/:name" element={<Suspense fallback={<Loader />}><ProductListingPage /></Suspense>} />

        <Route path="*" element={<Suspense fallback={<Loader />}><NotFoundPage /></Suspense>} />

      </Route>
    </Routes>
  </>
);

export default AppRoutes;
