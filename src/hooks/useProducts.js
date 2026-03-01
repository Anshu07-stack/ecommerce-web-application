// useProducts.js — fetches products based on type
import { useState, useEffect } from 'react';
import productService from '../services/productService';

const useProducts = ({ category = null, search = null } = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    let call;
    if (search)        call = productService.search(search);
    else if (category) call = productService.getByCategory(category);
    else               call = productService.getAll();

    call
      .then(r => setProducts(r.products))
      .catch(e => setError(e.message || 'Something went wrong.'))
      .finally(() => setLoading(false));
  }, [category, search]);

  return { products, loading, error };
};

export default useProducts;
