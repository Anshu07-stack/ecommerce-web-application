import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './routeConfig';

// Layout Components
import MainLayout from '../components/layout/MainLayout';

// Lazy load pages for better performance
const HomePage = lazy(() => import('../pages/HomePage'));
const MenPage = lazy(() => import('../pages/MenPage'));
const WomenPage = lazy(() => import('../pages/WomenPage'));
const KidsPage = lazy(() => import('../pages/KidsPage'));
const ProductDetailsPage = lazy(() => import('../pages/ProductDetailsPage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const CategoryPage = lazy(() => import('../pages/CategoryPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Loading component for Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Sab routes MainLayout ke andar honge */}
      <Route element={<MainLayout />}>
        {/* Home page */}
        <Route 
          path={ROUTES.HOME} 
          element={
            <Suspense fallback={<PageLoader />}>
              <HomePage />
            </Suspense>
          } 
        />

        {/* Section routes */}
        <Route 
          path={ROUTES.MEN} 
          element={
            <Suspense fallback={<PageLoader />}>
              <MenPage />
            </Suspense>
          } 
        />

        <Route 
          path={ROUTES.WOMEN} 
          element={
            <Suspense fallback={<PageLoader />}>
              <WomenPage />
            </Suspense>
          } 
        />

        <Route 
          path={ROUTES.KIDS} 
          element={
            <Suspense fallback={<PageLoader />}>
              <KidsPage />
            </Suspense>
          } 
        />

        {/* Product detail page */}
        <Route 
          path={ROUTES.PRODUCT_DETAIL} 
          element={
            <Suspense fallback={<PageLoader />}>
              <ProductDetailsPage />
            </Suspense>
          } 
        />

        {/* Search results */}
        <Route 
          path={ROUTES.SEARCH} 
          element={
            <Suspense fallback={<PageLoader />}>
              <SearchPage />
            </Suspense>
          } 
        />

        {/* Category page */}
        <Route 
          path={ROUTES.CATEGORY} 
          element={
            <Suspense fallback={<PageLoader />}>
              <CategoryPage />
            </Suspense>
          } 
        />

        {/* Cart page */}
        <Route 
          path={ROUTES.CART} 
          element={
            <Suspense fallback={<PageLoader />}>
              <CartPage />
            </Suspense>
          } 
        />

        {/* Checkout page - future implementation */}
        <Route 
          path={ROUTES.CHECKOUT} 
          element={
            <Suspense fallback={<PageLoader />}>
              <CheckoutPage />
            </Suspense>
          } 
        />

        {/* Redirect /home to / */}
        <Route 
          path="/home" 
          element={<Navigate to={ROUTES.HOME} replace />} 
        />

        {/* 404 route */}
        <Route 
          path={ROUTES.NOT_FOUND} 
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFoundPage />
            </Suspense>
          } 
        />

        {/* Catch all unmatched routes */}
        <Route 
          path="*" 
          element={<Navigate to={ROUTES.NOT_FOUND} replace />} 
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;