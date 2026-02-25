

import axios from 'axios';
import { 
  getSectionFetchStrategy,
  shouldShowInKidsSection 
} from '../utils/categoryHelpers';

const BASE_URL = 'https://dummyjson.com/products';

class SectionService {
  constructor() {
    // Agar future mein base URL change ho to yahan change karo
    this.api = axios.create({
      baseURL: BASE_URL,
      timeout: 10000 // 10 seconds timeout
    });
  }

  // Kisi section ke products fetch karo
  async fetchSectionProducts(section, page = 1, limit = 12) {
    try {
      const strategy = getSectionFetchStrategy(section);
      const skip = (page - 1) * limit;
      
      let products = [];
      let total = 0;

      if (strategy.type === 'CATEGORIES') {
        // Multiple categories se products laya
        const results = await this.fetchFromMultipleCategories(
          strategy.categories, 
          limit, 
          skip
        );
        products = results.products;
        total = results.total;
      } 
      else if (strategy.type === 'SEARCH' && section === 'KIDS') {
        // Kids section ke liye search karo
        const results = await this.fetchKidsProducts(limit, skip);
        products = results.products;
        total = results.total;
      }

      return {
        products,
        total,
        page,
        limit,
        hasMore: skip + products.length < total
      };

    } catch (error) {
      console.error(`Error fetching ${section} products:`, error);
      throw error;
    }
  }

  // Multiple categories se products fetch karo
  async fetchFromMultipleCategories(categories, limit, skip) {
    try {
      // Saare categories ke promises banao
      const promises = categories.map(category => 
        this.api.get(`/category/${category}?limit=${limit}&skip=${skip}`)
      );

      // Saare promises resolve karo
      const responses = await Promise.allSettled(promises);
      
      let allProducts = [];
      let totalCount = 0;

      responses.forEach(response => {
        if (response.status === 'fulfilled') {
          const data = response.value.data;
          allProducts = [...allProducts, ...data.products];
          totalCount += data.total;
        }
      });

      // Products ko shuffle karo taaki mix ho jayein
      allProducts = this.shuffleArray(allProducts);

      return {
        products: allProducts.slice(0, limit),
        total: totalCount
      };

    } catch (error) {
      console.error('Error fetching from categories:', error);
      throw error;
    }
  }

  // Kids section ke liye alag se fetch
  async fetchKidsProducts(limit, skip) {
    try {
      const searchTerms = getSectionFetchStrategy('KIDS').searchTerms;
      
      // Pehle search term se products lao
      const response = await this.api.get(`/search?q=kids&limit=100`);
      
      // Saare products mein se sirf kids wale filter karo
      const allProducts = response.data.products;
      const kidsProducts = allProducts.filter(shouldShowInKidsSection);
      
      // Pagination apply karo
      const paginatedProducts = kidsProducts.slice(skip, skip + limit);

      return {
        products: paginatedProducts,
        total: kidsProducts.length
      };

    } catch (error) {
      console.error('Error fetching kids products:', error);
      return { products: [], total: 0 };
    }
  }

  // Helper: Array shuffle karo
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Kisi specific category ke products lao
  async fetchCategoryProducts(category, page = 1, limit = 12) {
    try {
      const skip = (page - 1) * limit;
      const response = await this.api.get(
        `/category/${category}?limit=${limit}&skip=${skip}`
      );
      
      return {
        products: response.data.products,
        total: response.data.total,
        page,
        limit
      };
    } catch (error) {
      console.error(`Error fetching category ${category}:`, error);
      throw error;
    }
  }
}

// Singleton instance export karo
const sectionService = new SectionService();
export default sectionService;