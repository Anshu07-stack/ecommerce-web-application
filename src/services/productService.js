// Yeh main service file hai jisme saare product related API calls hain

import api from './api';

// Class based approach - real projects mein ye use karte hain
class ProductService {
  
  /**
   * Sabhi products fetch karo with pagination
   * @param {number} limit - Kitne products chahiye per page
   * @param {number} skip - Kitne products skip karne hain (pagination ke liye)
   */
  async getAllProducts(limit = 12, skip = 0) {
    try {
      // API call
      const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
      
      // Return data with pagination info
      return {
        products: response.data.products,
        total: response.data.total,
        skip: response.data.skip,
        limit: response.data.limit
      };
      
    } catch (error) {
      // Error ko throw karo taaki component handle kar sake
      console.error('getAllProducts error:', error);
      throw error;
    }
  }

  /**
   * Ek single product fetch karo by ID
   * @param {number|string} id - Product ID
   */
  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
      
    } catch (error) {
      console.error(`getProductById error for ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Category ke according products lao
   * @param {string} category - Category name
   * @param {number} limit - Products per page
   * @param {number} skip - Pagination skip
   */
  async getProductsByCategory(category, limit = 12, skip = 0) {
    try {
      const response = await api.get(
        `/products/category/${category}?limit=${limit}&skip=${skip}`
      );
      
      return {
        products: response.data.products,
        total: response.data.total,
        category: category
      };
      
    } catch (error) {
      console.error(`getProductsByCategory error for ${category}:`, error);
      throw error;
    }
  }

  /**
   * Search products by query
   * @param {string} query - Search term (e.g., 'shirt', 'phone')
   * @param {number} limit - Results per page
   * @param {number} skip - Pagination skip
   */
  async searchProducts(query, limit = 12, skip = 0) {
    try {
      const response = await api.get(
        `/products/search?q=${query}&limit=${limit}&skip=${skip}`
      );
      
      return {
        products: response.data.products,
        total: response.data.total,
        query: query
      };
      
    } catch (error) {
      console.error(`searchProducts error for query "${query}":`, error);
      throw error;
    }
  }

  /**
   * Saari available categories fetch karo
   */
  async getAllCategories() {
    try {
      const response = await api.get('/products/categories');
      return response.data;
      
    } catch (error) {
      console.error('getAllCategories error:', error);
      throw error;
    }
  }

  /**
   * Multiple categories se ek saath products lao
   * @param {Array} categories - Categories ki list
   * @param {number} limit - Per category kitne products
   */
  async getProductsFromMultipleCategories(categories, limit = 4) {
    try {
      // Saare categories ke liye promises banao
      const promises = categories.map(category => 
        this.getProductsByCategory(category, limit, 0)
      );
      
      // Sab promises ek saath resolve karo
      const results = await Promise.allSettled(promises);
      
      // Sirf successful results lo
      const allProducts = [];
      results.forEach(result => {
        if (result.status === 'fulfilled') {
          allProducts.push(...result.value.products);
        }
      });
      
      return {
        products: allProducts,
        total: allProducts.length
      };
      
    } catch (error) {
      console.error('getProductsFromMultipleCategories error:', error);
      throw error;
    }
  }
}

// Export karo instance - taaki poore app mein same instance use ho
const productService = new ProductService();
export default productService;