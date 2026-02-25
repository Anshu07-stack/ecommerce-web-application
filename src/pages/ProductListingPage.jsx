// Main product listing page jo sab use karega

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/features/product/ProductGrid';
import ProductSkeleton from '../components/features/product/ProductSkeleton';
import Pagination from '../components/features/product/Pagination';

const ProductListingPage = ({ category, section }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  // URL se page number lo
  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  // Custom hook use karo
  const {
    products,
    loading,
    error,
    total,
    hasMore
  } = useProducts(category, null, currentPage); // Hook ko update karna hoga

  // Total pages calculate karo
  const totalPages = Math.ceil(total / 12);

  // Page change handler
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSearchParams({ page: newPage });
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state
  if (loading && products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          {section ? `${section} Collection` : category ? category : 'All Products'}
        </h1>
        <ProductSkeleton />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {section ? `${section} Collection` : category ? category : 'All Products'}
        </h1>
        <p className="text-gray-600 mt-1">
          {total} products found
        </p>
      </div>

      {/* Products Grid */}
      <ProductGrid products={products} />

      {/* Loading more indicator */}
      {loading && products.length > 0 && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* No results */}
      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
