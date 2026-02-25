// Is file mein hum decide karenge ki kaunsa category kis section mein jayega
// Real project mein ye config frequently change hoti hai business team ke saath

// Men section ke liye categories - mostly fashion oriented
export const MEN_CATEGORIES = [
  'mens-shirts',
  'mens-shoes',
  'mens-watches',
  'sunglasses' // isko hum men mein rakhenge kyunki unisex hai
];

// Women section - fashion, beauty, accessories
export const WOMEN_CATEGORIES = [
  'womens-dresses',
  'womens-shoes', 
  'womens-watches',
  'womens-bags',
  'womens-jewellery',
  'fragrances',
  'skincare'
];

// Kids ke liye DummyJSON mein direct categories nahi h
// Isliye we use search based approach
export const KIDS_SEARCH_TERMS = [
  'kids',
  'children', 
  'baby',
  'toddler',
  'toy',
  'game'
];

// Jo categories kisi section mein fit nahi hain
export const OTHER_CATEGORIES = [
  'smartphones',
  'laptops',
  'furniture',
  'home-decoration',
  'groceries',
  'automotive',
  'motorcycle',
  'lighting',
  'tops'
];

// Yeh function batayega ki koi category kis section ki hai
export const findSectionForCategory = (categoryName) => {
  if (!categoryName) return null;
  
  if (MEN_CATEGORIES.includes(categoryName)) {
    return 'MEN';
  }
  
  if (WOMEN_CATEGORIES.includes(categoryName)) {
    return 'WOMEN';
  }
  
  // Kids ke liye direct mapping nahi hai, so we return null
  return null;
};


// this function checks that given section is valid or not
export const isValidSection = (section) => {
  const validSections = ['MEN', 'WOMEN', 'KIDS'];
  return validSections.includes(section?.toUpperCase());
};


// return section according to dispalay name 
export const getSectionDisplayName = (section) => {
  const names = {
    MEN: 'Men',
    WOMEN: 'Women',
    KIDS: 'Kids'
  };
  return names[section?.toUpperCase()] || section;
};

// Category name ko readable format mein convert krega ye function
export const formatCategoryName = (category) => {
  if (!category) return '';
  
  // Example: "mens-shirts" -> "Mens Shirts"
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};