// Custom hook for products - UPDATE EXISTING FILE with pagination support

import { useState, useEffect, useCallback } from 'react';
import productService from '../services/productService';

export const useProducts = (category = null, searchQuery = null, page = 1) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const limit = 12;

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const skip = (page - 1) * limit;
      let response;

      if (searchQuery) {
        response = await productService.searchProducts(searchQuery, limit, skip);
      } else if (category) {
        response = await productService.getProductsByCategory(category, limit, skip);
      } else {
        response = await productService.getAllProducts(limit, skip);
      }

      setProducts(response.products);
      setTotal(response.total);
      setHasMore(skip + limit < response.total);

    } catch (err) {
      setError(err.message || 'Something went wrong');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [category, searchQuery, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    total,
    hasMore,
    refetch: fetchProducts
  };
};