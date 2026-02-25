// services/sectionService.js - UPDATE EXISTING FILE

import productService from './productService';
import { 
  MEN_CATEGORIES, 
  WOMEN_CATEGORIES, 
  KIDS_SEARCH_TERMS 
} from '../constants/categoryMappings';

class SectionService {
  
  // Kisi section ke products fetch karo
  async fetchSectionProducts(section, page = 1, limit = 12) {
    try {
      const skip = (page - 1) * limit;
      
      switch(section?.toUpperCase()) {
        case 'MEN':
          return await this.fetchMenProducts(limit, skip);
          
        case 'WOMEN':
          return await this.fetchWomenProducts(limit, skip);
          
        case 'KIDS':
          return await this.fetchKidsProducts(limit, skip);
          
        default:
          return { products: [], total: 0 };
      }
    } catch (error) {
      console.error(`Error in fetchSectionProducts for ${section}:`, error);
      throw error;
    }
  }

  // Men section ke liye
  async fetchMenProducts(limit, skip) {
    try {
      // Multiple categories se products lao
      const response = await productService.getProductsFromMultipleCategories(
        MEN_CATEGORIES, 
        4 // Har category se 4 products
      );
      
      // Pagination manually apply karo
      const paginatedProducts = response.products.slice(skip, skip + limit);
      
      return {
        products: paginatedProducts,
        total: response.total,
        hasMore: skip + limit < response.total
      };
    } catch (error) {
      console.error('Error fetching men products:', error);
      return { products: [], total: 0 };
    }
  }

  // Women section ke liye
  async fetchWomenProducts(limit, skip) {
    try {
      const response = await productService.getProductsFromMultipleCategories(
        WOMEN_CATEGORIES,
        4
      );
      
      const paginatedProducts = response.products.slice(skip, skip + limit);
      
      return {
        products: paginatedProducts,
        total: response.total,
        hasMore: skip + limit < response.total
      };
    } catch (error) {
      console.error('Error fetching women products:', error);
      return { products: [], total: 0 };
    }
  }

  // Kids section ke liye - search based
  async fetchKidsProducts(limit, skip) {
    try {
      // Pehle search term se search karo
      const response = await productService.searchProducts('kids', 100, 0);
      
      // Saare products mein se filter karo jo actually kids ke hain
      const kidsProducts = response.products.filter(product => {
        const titleMatch = KIDS_SEARCH_TERMS.some(term => 
          product.title?.toLowerCase().includes(term)
        );
        const descMatch = KIDS_SEARCH_TERMS.some(term => 
          product.description?.toLowerCase().includes(term)
        );
        return titleMatch || descMatch;
      });
      
      // Pagination
      const paginatedProducts = kidsProducts.slice(skip, skip + limit);
      
      return {
        products: paginatedProducts,
        total: kidsProducts.length,
        hasMore: skip + limit < kidsProducts.length
      };
    } catch (error) {
      console.error('Error fetching kids products:', error);
      return { products: [], total: 0 };
    }
  }
}

const sectionService = new SectionService();
export default sectionService;