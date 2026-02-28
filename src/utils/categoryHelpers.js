

import { 
  MEN_CATEGORIES, 
  WOMEN_CATEGORIES, 
  KIDS_SEARCH_TERMS,
  findSectionForCategory,
  formatCategoryName 
} from '../constants/categoryMappings';

// Breadcrumbs ke liye category path banaya
export const getCategoryBreadcrumbPath = (category) => {
  const section = findSectionForCategory(category);
  
  if (section) {
    return {
      section: section,
      sectionName: section === 'MEN' ? 'Men' : 'Women',
      category: formatCategoryName(category),
      fullPath: `/${section.toLowerCase()}/category/${category}`
    };
  }
  
  // Agar category kisi section mein nahi hai to return 
  return {
    section: 'OTHER',
    sectionName: 'Other',
    category: formatCategoryName(category),
    fullPath: `/category/${category}`
  };
};

// Kisi section ke liye API call kaise karni hai - 
export const getSectionFetchStrategy = (section) => {
  switch(section?.toUpperCase()) {
    case 'MEN':
      return {
        type: 'CATEGORIES',
        categories: MEN_CATEGORIES,
        endpoint: 'multiple-categories' // Multiple categories fetch karni hain
      };
      


    case 'WOMEN':
      return {
        type: 'CATEGORIES',
        categories: WOMEN_CATEGORIES,
        endpoint: 'multiple-categories'
      };

            
    case 'KIDS':
      return {
        type: 'SEARCH',
        searchTerms: KIDS_SEARCH_TERMS,
        endpoint: 'search' // Search API use karni hai
      };
      
    default:
      return {
        type: 'UNKNOWN',
        categories: []
      };
  }
};

// Check karo ki kisi product ko kids section mein dikhana chahiye ya nahi
export const shouldShowInKidsSection = (product) => {
  if (!product || !product.tags) return false;
  
  // Product ke tags mein kids related terms hain kya?
  const hasKidsTag = product.tags?.some(tag => 
    KIDS_SEARCH_TERMS.some(term => 
      tag.toLowerCase().includes(term.toLowerCase())
    )
  );
  
  // Ya title/description mein kids terms hain?
  const hasKidsInTitle = KIDS_SEARCH_TERMS.some(term =>
    product.title?.toLowerCase().includes(term.toLowerCase())
  );
  
  const hasKidsInDesc = KIDS_SEARCH_TERMS.some(term =>
    product.description?.toLowerCase().includes(term.toLowerCase())
  );
  
  return hasKidsTag || hasKidsInTitle || hasKidsInDesc;
};

// Saari categories ko sections ke hisaab se group kia
export const groupCategoriesBySection = (categories) => {
  const grouped = {
    MEN: [],
    WOMEN: [],
    OTHER: []
  };
  
  categories?.forEach(category => {
    const section = findSectionForCategory(category);
    
    if (section === 'MEN') {
      grouped.MEN.push(category);
    } else if (section === 'WOMEN') {
      grouped.WOMEN.push(category);
    } else {
      grouped.OTHER.push(category);
    }
  });
  
  return grouped;
};