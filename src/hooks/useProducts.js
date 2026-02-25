// Custom hook for products - isko components mein use karenge

import { useState, useEffect, useCallback } from 'react';
import productService from '../services/productService';

export const useProducts = (initialCategory = null, initialSearchQuery = null) => {
  // States
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  // Limit fixed rakho
  const limit = 12;

  // Fetch products function - useCallback mein wrap karo
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const skip = (page - 1) * limit;
      let response;

      // Condition ke according API call
      if (searchQuery) {
        // Search case
        response = await productService.searchProducts(searchQuery, limit, skip);
      } else if (category) {
        // Category filter case
        response = await productService.getProductsByCategory(category, limit, skip);
      } else {
        // Normal products case
        response = await productService.getAllProducts(limit, skip);
      }

      // Products set karo (append for pagination)
      setProducts(prev => page === 1 ? response.products : [...prev, ...response.products]);
      
      // Total count set karo
      setTotal(response.total);
      
      // Check karo ki aur products hain ya nahi
      setHasMore(skip + limit < response.total);

    } catch (err) {
      setError(err.message || 'Something went wrong');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [category, searchQuery, page, limit]); // Dependencies

  // Jab bhi dependencies change hon, fetch chale
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Load more products (pagination)
  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      setPage(p => p + 1);
    }
  }, [hasMore, loading]);

  // Category change karo
  const changeCategory = useCallback((newCategory) => {
    setCategory(newCategory);
    setPage(1); // Reset page
    setProducts([]); // Clear products
  }, []);

  // Search query change karo
  const changeSearchQuery = useCallback((newQuery) => {
    setSearchQuery(newQuery);
    setPage(1);
    setProducts([]);
  }, []);

  // Reset everything
  const resetFilters = useCallback(() => {
    setCategory(null);
    setSearchQuery(null);
    setPage(1);
    setProducts([]);
  }, []);

  // Return all values and functions
  return {
    // Data
    products,
    loading,
    error,
    hasMore,
    total,
    page,
    category,
    searchQuery,
    
    // Functions
    loadMore,
    changeCategory,
    changeSearchQuery,
    resetFilters,
    refetch: fetchProducts
  };
};