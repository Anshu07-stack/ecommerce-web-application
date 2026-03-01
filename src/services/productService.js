import api from './api';

const SEL = 'id,title,price,thumbnail,rating,discountPercentage,category,stock';

const productService = {
  getAll() {
    return api.get(`/products?limit=30&select=${SEL}`).then(r => r.data);
  },

  getById(id) {
    return api.get(`/products/${id}`).then(r => r.data);
  },

  getByCategory(cat) {
    return api.get(`/products/category/${cat}?limit=30&select=${SEL}`).then(r => r.data);
  },

  search(q) {
    return api.get(`/products/search?q=${encodeURIComponent(q)}&limit=30&select=${SEL}`).then(r => r.data);
  },
};

export default productService;
